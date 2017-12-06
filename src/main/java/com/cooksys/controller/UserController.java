package com.cooksys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.pojo.RealFlight;
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
	@PostMapping("/user")
	public User getUser(@RequestBody User user) {
		return validateUser(user) ? userService.getUserByEmail(user.getEmailAddress()) : null;
	}
	@RequestMapping("/validate")
	public boolean validateUser(@RequestBody User user) {
		return userService.validateUser(user.getEmailAddress(), user.getPassword());
	}
	
	@PostMapping("/addFlight/{id}")
	public Boolean addFlight(@RequestBody User user, @PathVariable Long id) {
		if(!validateUser(user))
			return false;
		return userService.addFlight(id, user);
	}
	
	@PostMapping("/flights")
	public List<RealFlight> myFlights(@RequestBody User user){
		return validateUser(user) ? userService.getUserByEmail(user.getEmailAddress()).getFlights() : null;
	}
	
}
