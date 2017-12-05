package com.cooksys.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.cooksys.pojo.Flight;

@Entity
public class FlightEntity {
	
	@Id
	@GeneratedValue
	private long id;

	//Name of city where flight originates
	private String origin;
	
	//Name of city where flight lands
	private String destination;
	
	//How many hours flight is in the air
	private long flightTime;
	
	//How many hours after the start of the day until the flight takes off

	@Column(name = "Flightoffset")
	private long offset;
	
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public long getFlightTime() {
		return flightTime;
	}
	public void setFlightTime(long flightTime) {
		this.flightTime = flightTime;
	}
	public long getOffset() {
		return offset;
	}
	public void setOffset(long offset) {
		this.offset = offset;
	}
	public FlightEntity(String origin, String destination, int flightTime, int offset) {
		super();
		this.origin = origin;
		this.destination = destination;
		this.flightTime = flightTime;
		this.offset = offset;
	}
	
	public FlightEntity() {}
	public FlightEntity(Flight x) {
		this.origin = x.getOrigin();
		this.destination = x.getDestination();
		this.flightTime = x.getFlightTime();
		this.offset = x.getOffset();
	}
	
	

}
