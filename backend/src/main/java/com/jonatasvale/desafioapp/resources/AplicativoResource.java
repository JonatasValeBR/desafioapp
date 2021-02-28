package com.jonatasvale.desafioapp.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jonatasvale.desafioapp.domain.Aplicativo;
import com.jonatasvale.desafioapp.services.AplicativoService;

@RestController
@RequestMapping(value="/aplicativos")
public class AplicativoResource {

	@Autowired
	private AplicativoService service;
	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Aplicativo obj = service.buscar(id);
		return ResponseEntity.ok().body(obj); 
		
	}
	
}
