package com.quanpay.controller;

import com.quanpay.dto.request.TransfertDTO;
import com.quanpay.dto.response.TransfertHistoryRES;
import com.quanpay.exception.InsufficientFundsException;
import com.quanpay.model.TransfertHistory;
import com.quanpay.repository.TransfertHistoryRepository;
import com.quanpay.service.impl.TransfertServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @CrossOrigin("*")
@RequestMapping("/api/v1/transfert")
public class TransfertController {
    private final TransfertServiceImpl transferService;
    private final TransfertHistoryRepository transferHistoryRepository;
    private final ModelMapper modelMapper;

    public TransfertController(TransfertServiceImpl transferService,
                               TransfertHistoryRepository transferHistoryRepository, ModelMapper modelMapper) {
        this.transferService = transferService;
        this.transferHistoryRepository = transferHistoryRepository;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/make-transfer")
    public ResponseEntity<String> makeTransfer(@RequestBody TransfertDTO transferDTO) {
        try {
            transferService.transferMoney(transferDTO);
            return ResponseEntity.ok("Transfert effectué avec succès");
        } catch (InsufficientFundsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fonds insuffisants");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Comptes invalides");
        }
    }

    @GetMapping("/{userId}/history")
    public ResponseEntity<List<TransfertHistoryRES>> getTransferHistory(@RequestParam Long userId) {
        return ResponseEntity.ok(transferService.transfertHistoryOfUserByUserId(userId));
    }
}