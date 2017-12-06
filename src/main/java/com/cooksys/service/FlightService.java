package com.cooksys.service;

import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.cooksys.ServerParameters;
import com.cooksys.component.FlightGenerator;
import com.cooksys.entity.RealFlightEntity;
import com.cooksys.pojo.RealFlight;
import com.cooksys.repository.FlightRepository;
import com.cooksys.repository.RealFlightRepository;

@Service
public class FlightService {
	
	@Autowired
	FlightGenerator generator;
	
	
	@Autowired
	FlightRepository flightRepo;
	
	@Autowired
	RealFlightRepository realFlights;
	
	private Long nextRefresh;

	private ArrayList<RealFlightEntity> flightList = new ArrayList<>();
	
	public List<RealFlight> getDailyFlightList()
	{
		return realFlights.findRealFlightEntityByActive(true).stream().map(x -> new RealFlight(x)).collect(Collectors.toList());
	}
	
	//The fixedDelay parameter determines how often a new day is generated as expressed in milliseconds
	//IF YOU CHANGE THE FIXED DELAY; PLEASE CHANGE THE VARIABLE IN SERVERPARAMETERS.JAVA TOO!
	@Transactional
	@Scheduled(fixedDelay=30000)
	private void refreshFlights()
	{
		flightList = generator.generateNewFlightList(flightRepo);
		realFlights.findRealFlightEntityByActive(true).stream().forEach(x -> realFlights.save(x.setActive(false)));
		flightList.forEach(x -> realFlights.save(x.setActive(true)));
		//the number at the end is just to be sure it is done calculating next time!
		this.nextRefresh = Date.from(Instant.now()).getTime() + (ServerParameters.getRecalculateTime() + 250);
	}

	public RealFlight getFlightById(Long id) {
		return new RealFlight(realFlights.getOne(id));
	}

	public Long getNextRefresh() {
		return nextRefresh;
	}

	public void setNextRefresh(Long nextRefresh) {
		this.nextRefresh = nextRefresh;
	}
	
}
