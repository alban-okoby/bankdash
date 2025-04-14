package com.quanpay.dto;

import lombok.Data;

import java.util.Date;

@Data
public class GRepositoryDTO {
    private Long id;
    private String repositoryName;
    private String repositoryDescription;
    private boolean visibility;
    private Date createdAt;
    private Date updatedAt;
//    private List<Tag> tags;
//    @JsonIgnore
    private Long user_id;
    private UserDTO user;
}
