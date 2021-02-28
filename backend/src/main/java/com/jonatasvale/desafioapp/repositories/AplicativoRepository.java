package com.jonatasvale.desafioapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jonatasvale.desafioapp.domain.Aplicativo;

@Repository
public interface AplicativoRepository extends JpaRepository<Aplicativo, Integer> {
	
}
