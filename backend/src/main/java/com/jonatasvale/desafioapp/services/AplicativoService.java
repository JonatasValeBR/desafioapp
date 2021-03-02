package com.jonatasvale.desafioapp.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jonatasvale.desafioapp.domain.Aplicativo;
import com.jonatasvale.desafioapp.repositories.AplicativoRepository;
import com.jonatasvale.desafioapp.services.exceptions.ObjectNotFoundException;

@Service
public class AplicativoService {

	@Autowired
	private AplicativoRepository repository;
	
	public Aplicativo buscar(Integer id) {
		Optional<Aplicativo> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado! Id: " + id + ", Tipo: " + Aplicativo.class.getName()));
	}
	
}
