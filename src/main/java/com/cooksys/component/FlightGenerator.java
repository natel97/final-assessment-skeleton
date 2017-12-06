package com.cooksys.component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import com.cooksys.entity.FlightEntity;
import com.cooksys.entity.RealFlightEntity;
import com.cooksys.pojo.Cities;
import com.cooksys.pojo.Flight;
import com.cooksys.repository.FlightRepository;

@Component
public class FlightGenerator {

	@Transactional
	public ArrayList<RealFlightEntity> generateNewFlightList(FlightRepository flightRepo) {
		
		ArrayList<FlightEntity> result = new ArrayList<>();

		for (int i = 0; i < 20; i++) {

			int originIndex = ThreadLocalRandom.current().nextInt(0, 4);

			int destinationIndex = ThreadLocalRandom.current().nextInt(0, 4);

			while (destinationIndex == originIndex)
				destinationIndex = ThreadLocalRandom.current().nextInt(0, 4);

			String origin = Cities.values()[originIndex].getName();
			String destination = Cities.values()[destinationIndex].getName();
			int flightTime = ThreadLocalRandom.current().nextInt(1, 4);
			int offset = ThreadLocalRandom.current().nextInt(0, 10);

			FlightEntity f = new FlightEntity(new Flight(origin, destination, flightTime, offset));
			flightRepo.save(f);
			result.add(f);
		}
		
		ArrayList<RealFlightEntity> possibilities = new ArrayList<>();
		
		result.stream().forEach(level1 -> {
			possibilities.add(new RealFlightEntity().setDestinations(Arrays.asList(new FlightEntity[] {level1})));
			result.stream().forEach(level2 -> {
				if(!(level1.getDestination().equals(level2.getOrigin())) || level1.getOrigin().equals(level2.getDestination()) || level2.getOffset() < (level1.getFlightTime() + level1.getOffset() + 1))
					return;
				possibilities.add(new RealFlightEntity().setDestinations(Arrays.asList(new FlightEntity[] {level1, level2})));
				result.stream().forEach(level3 -> {
					if(!(level2.getDestination().equals(level3.getOrigin())) || level1.getOrigin().equals(level3.getDestination()) || level1.getDestination().equals(level3.getDestination()) || level2.getOrigin().equals(level3.getDestination()) ||  level3.getOffset() < (level2.getFlightTime() + level2.getOffset() + 1))
						return;
					possibilities.add(new RealFlightEntity().setDestinations(Arrays.asList(new FlightEntity[] {level1, level2, level3})));
				});
			});
		});
		return possibilities;
	}

}
