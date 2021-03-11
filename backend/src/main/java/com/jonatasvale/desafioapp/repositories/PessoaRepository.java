package com.jonatasvale.desafioapp.repositories;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jonatasvale.desafioapp.domain.Perfil;
import com.jonatasvale.desafioapp.domain.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
	
	@Transactional(readOnly=true)
	Pessoa findByCpf(String cpf);
	
	@Transactional(readOnly=true)
	 List<Pessoa> findDistinctByNomeContainingAndPerfilIn(String nome, List<Perfil> perfis);
}
