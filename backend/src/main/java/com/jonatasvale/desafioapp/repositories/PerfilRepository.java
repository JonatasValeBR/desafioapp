package com.jonatasvale.desafioapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jonatasvale.desafioapp.domain.Aplicativo;
import com.jonatasvale.desafioapp.domain.Perfil;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Integer> {
	
	@Transactional(readOnly=true)
	 List<Perfil> findDistinctByNomeContainingAndAplicativosIn(String nome, List<Aplicativo> aplicativos);
}
