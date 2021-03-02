package com.jonatasvale.desafioapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jonatasvale.desafioapp.domain.Perfil;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Integer> {
	
}
