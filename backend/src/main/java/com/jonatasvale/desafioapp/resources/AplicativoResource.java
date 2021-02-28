package com.jonatasvale.desafioapp.resources;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/aplicativos")
public class AplicativoResource {

	@RequestMapping(method=RequestMethod.GET)
	public String listar() {
		return "Rest esta ok";
	}
	
}
