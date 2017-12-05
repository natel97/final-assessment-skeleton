package com.cooksys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooksys.entity.Location;
import com.cooksys.entity.Userentity;

@Repository
public interface UserRepository extends JpaRepository<Userentity, Long> {

	Userentity findById(long id);
	
	Userentity findByEmailAddress(String cityName);
	
}
