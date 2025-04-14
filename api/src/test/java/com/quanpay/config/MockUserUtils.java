package com.quanpay.config;

import java.util.Set;

import com.quanpay.model.Role;
import com.quanpay.model.User;

public class MockUserUtils {

	private MockUserUtils() {
	}
	/**
	 * 
	 */
	public static User getMockUser(String username) {
		User user = new User();
		user.setId(1L);
		user.setEmail(username);
		user.setPassword("secret");
		Role role = new Role();
		role.setName(Role.ROLE_PRE_VERIFICATION_USER);
		user.setRoles(Set.of(role));
		user.setEnabled(1);
		user.setSecret("secret");
		return user;
	}
}
