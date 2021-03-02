package com.jonatasvale.desafioapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jonatasvale.desafioapp.domain.Perfil;
import com.jonatasvale.desafioapp.repositories.PerfilRepository;
import com.jonatasvale.desafioapp.services.exceptions.ObjectNotFoundException;

@Service
public class PerfilService {

	@Autowired
	private PerfilRepository repository;
	
	public Perfil buscar(Integer id) {
		Optional<Perfil> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado! Id: " + id + ", Tipo: " + Perfil.class.getName()));
	}
	
	public List<Perfil> buscarAll(){
		List<Perfil> obj = repository.findAll();
		return obj;
	}
	
}
