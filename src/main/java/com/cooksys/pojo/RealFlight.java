package com.cooksys.pojo;

import java.util.List;
import java.util.stream.Collectors;

import com.cooksys.entity.FlightEntity;
import com.cooksys.entity.RealFlightEntity;

public class RealFlight {

	private List<Flight> flights;
	private long id;
	
	public RealFlight() {}
	public RealFlight(RealFlightEntity realFlightEntity) {
		this.flights = realFlightEntity.getDestinations().stream().map(y -> new Flight(y)).collect(Collectors.toList());
		this.id = realFlightEntity.getId();
	}

	public List<Flight> getFlights() {
		return flights;
	}

	public RealFlight setFlights(List<Flight> flights) {
		this.flights = flights;
		return this;
	}

	public List<FlightEntity> getFlightsAsEntities() {
		return this.flights.stream().map(x -> new FlightEntity(x)).collect(Collectors.toList());
	}
	public long getId() {
		return id;
	}
	public RealFlight setId(long id) {
		this.id = id;
		return this;
	}
}

