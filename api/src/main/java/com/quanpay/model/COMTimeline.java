package com.quanpay.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.id.UUIDGenerator;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;


/**
 * (Pas très obligatoire car : Possible de déninir directement les champs dans les classes utilisatrices),
 * mais peut être intéressante à implémenter
 * Intéressante au niveau retraçage de toutes les actions sur les objects du système
 *
 * Utilisez cette classe presque toujours en association sur les actions où l'utilisateur efféctue une action surtout critique
 */
@Data
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "com_timeline")
@JsonIgnoreProperties
public class COMTimeline implements Serializable {
    @Id
    private final String id = new UUIDGenerator().toString();
    private LocalDateTime submittedOnDate;
    private String submittedByUsername;
    private String submittedByFirstname;
    private String submittedByLastname;

    private LocalDateTime activatedOnDate;
    private String activatedByUsername;
    private String activatedByFirstname;
    private String activatedByLastname;

    private LocalDateTime approvedOnDate;
    private String approvedByUsername;
    private String approvedByFirstname;
    private String approvedByLastname;

    private LocalDateTime closedOnDate;
    private String closedByUsername;
    private String closedByFirstname;
    private String closedByLastname;

    private LocalDateTime updatedOnDate;
    private String updatedByUsername;
    private String updatedByFirstname;
    private String updatedByLastname;

    private LocalDateTime deletedOnDate;
    private String deletedByUsername;
    private String deletedByFirstname;
    private String deletedByLastname;

    private LocalDateTime archivedOnDate;
    private String archivedByUsername;
    private String archivedFirstname;
    private String archivedLastname;

    private LocalDateTime transactionDate;
    private LocalDateTime actualDisbursementDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof COMTimeline)) {
            return false;
        }
        COMTimeline that = (COMTimeline) o;
        return Objects.equals(submittedOnDate, that.submittedOnDate) && Objects.equals(submittedByUsername, that.submittedByUsername)
                && Objects.equals(submittedByFirstname, that.submittedByFirstname)
                && Objects.equals(submittedByLastname, that.submittedByLastname) && Objects.equals(activatedOnDate, that.activatedOnDate)
                && Objects.equals(activatedByUsername, that.activatedByUsername)
                && Objects.equals(activatedByFirstname, that.activatedByFirstname)
                && Objects.equals(activatedByLastname, that.activatedByLastname) && Objects.equals(closedOnDate, that.closedOnDate)
                && Objects.equals(closedByUsername, that.closedByUsername) && Objects.equals(closedByFirstname, that.closedByFirstname)
                && Objects.equals(closedByLastname, that.closedByLastname);
    }

    @Override
    public int hashCode() {
        return Objects.hash(submittedOnDate, submittedByUsername, submittedByFirstname, submittedByLastname, activatedOnDate,
                activatedByUsername, activatedByFirstname, activatedByLastname, closedOnDate, closedByUsername, closedByFirstname,
                closedByLastname);
    }
}
