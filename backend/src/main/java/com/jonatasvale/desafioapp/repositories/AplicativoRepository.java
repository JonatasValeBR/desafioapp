package com.jonatasvale.desafioapp.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jonatasvale.desafioapp.domain.Aplicativo;
import com.jonatasvale.desafioapp.domain.Perfil;

@Repository
public interface AplicativoRepository extends JpaRepository<Aplicativo, Integer> {
	
	@Transactional(readOnly=true)
	Page<Aplicativo> findDistinctByNomeContaining(String nome, Pageable pageRequest);

	@Transactional(readOnly=true)
	Page<Aplicativo> findDistinctByNomeContainingAndPerfisIn(String nome, List<Perfil> perfis, Pageable pageRequest);
	
}
