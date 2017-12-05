package com.cooksys.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.cooksys.pojo.RealFlight;

@Entity
public class RealFlightEntity {

	public RealFlightEntity() {}
	
	public RealFlightEntity(RealFlight f) {
		this.destinations = f.getFlightsAsEntities();
	}

	@Id
	@GeneratedValue
	private long id;

	@ManyToMany
	List<FlightEntity> destinations;

	public List<FlightEntity> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<FlightEntity> destinations) {
		this.destinations = destinations;
	}

}
