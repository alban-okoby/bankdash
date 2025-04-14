package com.quanpay.dto.response;
import com.quanpay.model.Account;
import com.quanpay.model.TransferType;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class TransfertHistoryRES {
    @Id
    private String id;

    private Account fromAccount;

    private Account toAccount;

    private BigDecimal amount;

    private Date transferDate;

    private String beneficiaryName;

    @Enumerated(EnumType.STRING)
    private TransferType transferType;
}
