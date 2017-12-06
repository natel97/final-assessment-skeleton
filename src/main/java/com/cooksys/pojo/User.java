package com.cooksys.pojo;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import com.cooksys.entity.Userentity;

public class User {
	
	public User() { }

	public User(Userentity u) {
		this.firstName = u.getFirstName();
		this.lastName = u.getLastName();
		this.emailAddress = u.getEmailAddress();
		this.password = u.getPassword();
		if(u.getFlights() != null)
			this.flights = u.getFlights().stream().map(x -> new RealFlight(x)).collect(Collectors.toCollection(LinkedList::new));
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public String getPassword() {
		return password;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	public LinkedList<RealFlight> getFlights() {
		return flights;
	}

	public void setFlights(LinkedList<RealFlight> flights) {
		this.flights = flights;
	}


	private String firstName;
	private String lastName;
	private String emailAddress;
	private String password;
	private LinkedList<RealFlight> flights;
	
	
}
