package com.cooksys.entity;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.cooksys.pojo.RealFlight;

@Entity
public class RealFlightEntity {

	public RealFlightEntity() {}
	
	public RealFlightEntity(RealFlight f) {
		this.destinations = f.getFlights().stream().map(x -> new FlightEntity(x)).collect(Collectors.toList());
		}

	@Id
	@GeneratedValue
	private long id;

	@ManyToMany
	List<FlightEntity> destinations;
	
	private Boolean active;

	public List<FlightEntity> getDestinations() {
		return destinations;
	}

	public RealFlightEntity setDestinations(List<FlightEntity> destinations) {
		this.destinations = destinations;
		return this;
	}

	public Boolean isActive() {
		return active;
	}

	public RealFlightEntity setActive(Boolean active) {
		this.active = active;
		return this;
	}

	public long getId() {
		return this.id;
	}

}
