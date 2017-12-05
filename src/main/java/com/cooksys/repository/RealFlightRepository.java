package com.cooksys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooksys.entity.RealFlightEntity;


@Repository
public interface RealFlightRepository extends JpaRepository<RealFlightEntity, Long>{
	
	public List<RealFlightEntity> findRealFlightEntityByActive(boolean b);
	
	
		
}
