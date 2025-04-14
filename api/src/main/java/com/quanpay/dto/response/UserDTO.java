package com.quanpay.dto;

import com.quanpay.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String displayName, email, username, about;
    private Set<Role> roles;
}
