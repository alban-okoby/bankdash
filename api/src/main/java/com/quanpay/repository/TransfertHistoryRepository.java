package com.quanpay.repository;

import com.quanpay.model.TransfertHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransfertHistoryRepository extends JpaRepository<TransfertHistory, String> {
    /**
     * Récupérer l'historique des transferts par utilisateur
     */
    @Query("select t from TransfertHistory t where t.user.id = ?1")
    List<TransfertHistory> findByUserId(Long userId);

    /**
     * Récupérer l'historique des transferts par compte Envoyeur/Recepteur
     */
    @Query("select t from TransfertHistory t where t.fromAccount.accountNumber = ?1 or t.toAccount.accountNumber = ?2")
    List<TransfertHistory> findByFromAccountIdOrToAccountId(String accountNumber1, String accountNumber2);
}
