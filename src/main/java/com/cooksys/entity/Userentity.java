package com.cooksys.entity;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.cooksys.pojo.User;

@Entity
public class Userentity {
	
	public Userentity() {}
	public Userentity(User u){
		this.firstName = u.getFirstName();
		this.lastName = u.getLastName();
		this.emailAddress = u.getEmailAddress();
		this.password = u.getPassword();
		if(u.getFlights() != null)
			this.flights = u.getFlights().stream().map(x -> new RealFlightEntity(x)).collect(Collectors.toList());
	}
	
	@Id
	@GeneratedValue
	private long id;
	
	private String firstName;
	private String lastName;
	private String emailAddress;
	private String password;
	
	@ManyToMany
	private List<RealFlightEntity> flights;
	
	public long getId() {
		return id;
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
	public void setId(long id) {
		this.id = id;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public void setEmail(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<RealFlightEntity> getFlights() {
		return flights;
	}
	public void setFlights(List<RealFlightEntity> flights) {
		this.flights = flights;
	}
	
	public Userentity addFlight(RealFlightEntity flight) {
		this.flights.add(flight);
		return this;
	}
	
	
}
