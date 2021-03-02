package com.jonatasvale.desafioapp.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jonatasvale.desafioapp.domain.Pessoa;
import com.jonatasvale.desafioapp.repositories.PessoaRepository;
import com.jonatasvale.desafioapp.services.exceptions.ObjectNotFoundException;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository repository;
	
	public Pessoa buscar(Integer id) {
		Optional<Pessoa> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado! Id: " + id + ", Tipo: " + Pessoa.class.getName()));
	}
	
}
