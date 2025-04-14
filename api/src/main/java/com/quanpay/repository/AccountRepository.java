package com.quanpay.repository;

import com.quanpay.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    @Query("select a from Account a where a.accountNumber = ?1 and a.user.displayName = ?2")
    Optional<Account> findByAccountNumberAAndUserDisplayName(String accountNumber, String displayName);

    @Query("select a from Account a where a.accountNumber = ?1 and a.user.id = ?2")
    Optional<Account> findByAccountNumberAAndUserId(String accountNumber, Long userId);

    @Query("select a from Account a where a.accountNumber = ?1")
    Optional<Account> findByAccountNumber(String accountNumber);
}
