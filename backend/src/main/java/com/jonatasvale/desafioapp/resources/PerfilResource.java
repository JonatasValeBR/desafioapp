package com.jonatasvale.desafioapp.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jonatasvale.desafioapp.domain.Perfil;
import com.jonatasvale.desafioapp.services.PerfilService;

@RestController
@RequestMapping(value="/perfis")
public class PerfilResource {

	@Autowired
	private PerfilService service;
	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Perfil obj = service.buscar(id);
		return ResponseEntity.ok().body(obj); 
	}
	
	@RequestMapping(value="/all",method=RequestMethod.GET)
	public ResponseEntity<?> findAll() {
		List<Perfil> obj = service.buscarAll();
		return ResponseEntity.ok().body(obj); 
	}
	
	
}
