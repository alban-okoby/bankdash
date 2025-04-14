package com.quanpay.service;

import java.util.Map;
import java.util.Optional;

import com.quanpay.dto.UserInfo;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;

import com.quanpay.dto.LocalUser;
import com.quanpay.dto.SignUpRequest;
import com.quanpay.exception.UserAlreadyExistAuthenticationException;
import com.quanpay.model.User;

public interface UserService {

	public User registerNewUser(SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException;

	User findUserByEmail(String email);

	User findTheUserByEmail(String email);

	User findUserByUsername(String username);

	Optional<User> findUserById(Long id);
	Optional<UserInfo> findUserByUserId(Long userId);


	LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo);
	
	void createVerificationTokenForUser(User user, String token);

	boolean resendVerificationToken(String token);

	String validateVerificationToken(String token);
}
