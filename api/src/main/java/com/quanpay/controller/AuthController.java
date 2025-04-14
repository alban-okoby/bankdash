package com.quanpay.controller;

import static dev.samstevens.totp.util.Utils.getDataUriForImage;

import java.util.UUID;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

import com.quanpay.model.VerificationToken;
import com.quanpay.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.quanpay.config.AppConstants;
import com.quanpay.config.CurrentUser;
import com.quanpay.dto.ApiResponse;
import com.quanpay.dto.JwtAuthenticationResponse;
import com.quanpay.dto.LocalUser;
import com.quanpay.dto.LoginRequest;
import com.quanpay.dto.SignUpRequest;
import com.quanpay.dto.SignUpResponse;
import com.quanpay.exception.UserAlreadyExistAuthenticationException;
import com.quanpay.model.User;
import com.quanpay.security.jwt.TokenProvider;
import com.quanpay.service.MailService;
import com.quanpay.service.UserService;
import com.quanpay.util.GeneralUtils;

import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrDataFactory;
import dev.samstevens.totp.qr.QrGenerator;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserService userService;

	@Autowired
	TokenProvider tokenProvider;

	@Autowired
	private VerificationTokenRepository verificationTokenRepository;

	@Autowired
	private QrDataFactory qrDataFactory;

	@Autowired
	private QrGenerator qrGenerator;

	@Autowired
	private CodeVerifier verifier;

	@Autowired
	MailService mailService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		LocalUser localUser = (LocalUser) authentication.getPrincipal();
		boolean authenticated = !localUser.getUser().isUsing2FA();
		String jwt = tokenProvider.createToken(localUser, authenticated);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, authenticated, authenticated ? GeneralUtils.buildUserInfo(localUser) : null));
	}

	@PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MODERATOR')")
	@GetMapping("/findUserByEmail")
	public ResponseEntity<?> findUserByEmail(@RequestBody String email) {
		User user = userService.findTheUserByEmail(email);
		if (user == null) {
			return new ResponseEntity("USER NOT FOUND", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity(user, HttpStatus.OK);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		try {
			User user = userService.registerNewUser(signUpRequest);
			final String token = UUID.randomUUID().toString();
			userService.createVerificationTokenForUser(user, token);
			mailService.sendVerificationToken(token, user);
			if (signUpRequest.isUsing2FA()) {
				QrData data = qrDataFactory.newBuilder().label(user.getEmail()).secret(user.getSecret()).issuer("John").build();
				String qrCodeImage = getDataUriForImage(qrGenerator.generate(data), qrGenerator.getImageMimeType());
				return ResponseEntity.ok().body(new SignUpResponse(true, qrCodeImage));
			}
		} catch (UserAlreadyExistAuthenticationException e) {
			log.error("Exception Ocurred", e);
			return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
		}
		catch (QrGenerationException e) {
			log.error("QR Generation Exception Ocurred", e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to generate QR code!"), HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
	}

	@PostMapping("/verify")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MODERATOR')")
	public ResponseEntity<?> verifyCode(@NotEmpty @RequestBody String code, @CurrentUser LocalUser user) {
		if (!verifier.isValidCode(user.getUser().getSecret(), code)) {
			return new ResponseEntity<>(new ApiResponse(false, "Invalid Code!"), HttpStatus.BAD_REQUEST);
		}
		String jwt = tokenProvider.createToken(user, true);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, true, GeneralUtils.buildUserInfo(user)));
	}

	@GetMapping("/token/verify")
	public ResponseEntity<?> confirmRegistration(@NotEmpty @RequestParam String token) {
		VerificationToken tokenValue = this.verificationTokenRepository.findByToken(token);

		if (tokenValue != null) {
			userService.validateVerificationToken(token);
			String buttonUrl =String.format("<a href=\"localhost:4200/auth/signin\" class=\"confirmation-button\">");
			return ResponseEntity.ok().body("Votre compte QuanPay à été activé avec succès ✅, vous pouvez dès à présent vous connecter." + buttonUrl);
		}
		else {
			return ResponseEntity.ok().body("Error ❌, Ce lien à déjà fait object de vérification ou à expiré.");
		}
	}

	// user activation - verification
	@PostMapping("/token/resend")
	@ResponseBody
	public ResponseEntity<?> resendRegistrationToken(@NotEmpty @RequestBody String expiredToken) {
		if (!userService.resendVerificationToken(expiredToken)) {
			return new ResponseEntity<>(new ApiResponse(false, "Token not found!"), HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body(new ApiResponse(true, AppConstants.SUCCESS));
	}
}