package com.quanpay.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransfertDTO {
    private String fromAccountNumber;
    private String toAccountNumber;
    private BigDecimal amount;

    private Long beneficiaryId;
    private String beneficiaryFirstName;
    private String beneficiaryLastName;
}
