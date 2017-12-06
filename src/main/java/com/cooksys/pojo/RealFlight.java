package com.cooksys.pojo;

import java.util.List;
import java.util.stream.Collectors;

import com.cooksys.entity.RealFlightEntity;

public class RealFlight implements Comparable<RealFlight> {

	private List<Flight> flights;
	private long id;

	public RealFlight() {
	}

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

	public long getId() {
		return id;
	}

	public RealFlight setId(long id) {
		this.id = id;
		return this;
	}

	@Override
	public int compareTo(RealFlight o) {
		// Other object*** //Get Other Duration
		// (
		// Last Flight landing time
		// (-) First Flight departure time
		// )
		// (-)
		// This Object*** /Subtract this duration
		// (
		// Last Flight landing time
		// (-) First Flight landing time
		// )

		return (int) -(((o.getFlights().get(o.getFlights().size() - 1).getOffset()+ o.getFlights().get(o.getFlights().size() - 1).getFlightTime())
				- (o.getFlights().get(0).getOffset()))
				- ((this.flights.get(this.flights.size() - 1).getOffset() + this.flights.get(this.flights.size() -1).getFlightTime())
						- (this.flights.get(0).getOffset())));
	}
}
