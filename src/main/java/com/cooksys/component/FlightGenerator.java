package com.cooksys.component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import com.cooksys.entity.FlightEntity;
import com.cooksys.pojo.Cities;
import com.cooksys.pojo.Flight;
import com.cooksys.pojo.RealFlight;
import com.cooksys.repository.FlightRepository;

@Component
public class FlightGenerator {

	@Transactional
	public ArrayList<RealFlight> generateNewFlightList(FlightRepository flightRepo) {
		
		ArrayList<Flight> result = new ArrayList<>();

		for (int i = 0; i < 10; i++) {

			int originIndex = ThreadLocalRandom.current().nextInt(0, 4);

			int destinationIndex = ThreadLocalRandom.current().nextInt(0, 4);

			while (destinationIndex == originIndex)
				destinationIndex = ThreadLocalRandom.current().nextInt(0, 4);

			String origin = Cities.values()[originIndex].getName();
			String destination = Cities.values()[destinationIndex].getName();
			int flightTime = ThreadLocalRandom.current().nextInt(1, 4);
			int offset = ThreadLocalRandom.current().nextInt(0, 10);

			Flight f = new Flight(origin, destination, flightTime, offset);
			flightRepo.save(new FlightEntity(f));
			result.add(f);
		}
		
		ArrayList<RealFlight> possibilities = new ArrayList<>();
		
		result.stream().forEach(level1 -> {
			possibilities.add(new RealFlight().setFlights(Arrays.asList(new Flight[] {level1})));
			result.stream().forEach(level2 -> {
				if(!(level1.getDestination().equals(level2.getOrigin())))
					return;
				possibilities.add(new RealFlight().setFlights(Arrays.asList(new Flight[] {level1, level2})));
				result.stream().forEach(level3 -> {
					if(!(level2.getDestination().equals(level3.getOrigin())) || level1.getDestination().equals(level3.getDestination()))
						return;
					possibilities.add(new RealFlight().setFlights(Arrays.asList(new Flight[] {level1, level2, level3})));
					result.stream().forEach(level4 -> {
						if(!level3.getDestination().equals(level4.getOrigin()))
							return;
						if(!(level1.getDestination().equals(level4.getDestination()) || level2.getDestination().equals(level4.getDestination()))) {
							possibilities.add(new RealFlight().setFlights(Arrays.asList(new Flight[] {level1, level2, level3, level4})));
						}
					});
				});
			});
		});
		return possibilities;
	}

}
