package com.cooksys.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.entity.Userentity;
import com.cooksys.pojo.User;
import com.cooksys.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository repo;
	
	@Transactional
	public boolean createUser(User user) {
		if(repo.findByEmailAddress(user.getEmailAddress()) != null)
			return false;
		repo.save(new Userentity(user));
		return true;
	}
	
	public User getUserByEmail(String email) {
		return new User(repo.findByEmailAddress(email));
	}
	
	public boolean validateUser(String email, String password) {
		return repo.findByEmailAddress(email).getPassword().equals(password);
	}
}
