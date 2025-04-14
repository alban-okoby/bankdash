package com.quanpay.service;

import com.quanpay.model.User;

public interface MailService {

	void sendVerificationToken(String token, User user);
}
