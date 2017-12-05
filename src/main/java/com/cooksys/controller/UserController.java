package com.cooksys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.pojo.User;
import com.cooksys.service.UserService;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {
	@Autowired
	UserService userService;
	
	@RequestMapping(method = RequestMethod.POST)
	public boolean newUser(@RequestBody User user) {
		
		return userService.createUser(user);
		
		
	}
	@RequestMapping("/{email}")
	public User getUser(@PathVariable String email) {
		
		return userService.getUserByEmail(email);
		
	}
	@RequestMapping("/validate")
	public boolean validateUser(@RequestBody User user) {
		return userService.validateUser(user.getEmailAddress(), user.getPassword());
	}
	
	
	
}
