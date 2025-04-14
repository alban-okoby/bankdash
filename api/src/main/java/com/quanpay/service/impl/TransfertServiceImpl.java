package com.quanpay.service.impl;

import com.quanpay.dto.LocalUser;
import com.quanpay.dto.request.TransfertDTO;
import com.quanpay.dto.response.TransfertHistoryRES;
import com.quanpay.exception.InsufficientFundsException;
import com.quanpay.model.Account;
import com.quanpay.model.TransferType;
import com.quanpay.model.TransfertHistory;
import com.quanpay.repository.AccountRepository;
import com.quanpay.repository.TransfertHistoryRepository;
import com.quanpay.repository.UserRepository;
import com.quanpay.service.AuthenticationFacade;
import com.quanpay.service.TransfertService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class TransfertServiceImpl implements TransfertService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final AuthenticationFacade authenticationFacade;
    private final ModelMapper modelMapper;
    private final TransfertHistoryRepository transferHistoryRepository;
    public TransfertServiceImpl(AccountRepository accountRepository, UserRepository userRepository,
                                AuthenticationFacade authenticationFacade, ModelMapper modelMapper, TransfertHistoryRepository transferHistoryRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.authenticationFacade = authenticationFacade;
        this.modelMapper = modelMapper;
        this.transferHistoryRepository = transferHistoryRepository;
    }

   /** Check account validity and amount
      * Check balance
      * Debit and credit
      * Save accounts
      * Save transfer history
      * @param transferDTO
      * @return
      * @throws InsufficientFundsException
    */
    @Override
    public String transferMoney(TransfertDTO transferDTO) throws InsufficientFundsException {
        LocalUser currentUser = (LocalUser) authenticationFacade.getAuthentication().getPrincipal();
        Optional<Account> fromAccountOpt = accountRepository.findByAccountNumberAAndUserId(transferDTO.getFromAccountNumber(), currentUser.getUser().getId());
        Optional<Account> toAccountOpt = accountRepository.findById(transferDTO.getToAccountNumber());

        if (fromAccountOpt.isEmpty() || toAccountOpt.isEmpty()) {
            throw new IllegalArgumentException("Comptes invalides");
        }

        Account fromAccount = fromAccountOpt.get();
        Account toAccount = toAccountOpt.get();

        if (fromAccount.getBalance().compareTo(transferDTO.getAmount()) < 0) {
            throw new InsufficientFundsException("Fonds insuffisants");
        }

        fromAccount.setBalance(fromAccount.getBalance().subtract(transferDTO.getAmount()));
        toAccount.setBalance(toAccount.getBalance().add(transferDTO.getAmount()));

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        return "success";
    }


    // ========= TRANSFERT HISTORY =========

    /**
     * List of users transferts
     * @param userId userId
     * @return List<TransfertHistoryRES>
     */
    @Override
    public List<TransfertHistoryRES> transfertHistoryOfUserByUserId(Long userId) {
        List<TransfertHistory> transactionsHistories = transferHistoryRepository.findByUserId(userId);
        return transactionsHistories.stream()
                .map(tr -> modelMapper.map(tr, TransfertHistoryRES.class))
                .collect(Collectors.toList());
    }
}
