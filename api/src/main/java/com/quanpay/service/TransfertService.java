package com.quanpay.service;

import com.quanpay.dto.request.TransfertDTO;
import com.quanpay.dto.response.TransfertHistoryRES;
import com.quanpay.exception.InsufficientFundsException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface TransfertService {
    String transferMoney(TransfertDTO transferDTO) throws InsufficientFundsException;
    List<TransfertHistoryRES> transfertHistoryOfUserByUserId(Long userId);
}
