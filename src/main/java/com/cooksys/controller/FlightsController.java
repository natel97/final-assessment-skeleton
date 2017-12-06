package com.cooksys.controller;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.ServerParameters;
import com.cooksys.pojo.RealFlight;
import com.cooksys.service.FlightService;
import com.cooksys.service.LocationService;

@RestController
@RequestMapping("flights")
@CrossOrigin
public class FlightsController {
	
	@Autowired
	LocationService locationService;
	
	@Autowired
	FlightService flightService;
	
	@RequestMapping
	public List<RealFlight> getFlightList()
	{
		List<RealFlight> flights = flightService.getDailyFlightList();
		Collections.sort(flights);
		return flights;
	}
	
	@RequestMapping("/{id}")
	public RealFlight getById(@PathVariable Long id) {
		return flightService.getFlightById(id);
	}
	
	@RequestMapping("refresh")
	public Long getRefreshTime() {
		return flightService.getNextRefresh();
	}

}
