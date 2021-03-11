package com.jonatasvale.desafioapp.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.jonatasvale.desafioapp.domain.Perfil;
import com.jonatasvale.desafioapp.dto.PerfilDTO;
import com.jonatasvale.desafioapp.services.PerfilService;

@RestController
@RequestMapping(value="/perfis")
public class PerfilResource {

	@Autowired
	private PerfilService service;
	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<Perfil> find(@PathVariable Integer id) {
		Perfil obj = service.buscar(id);
		return ResponseEntity.ok().body(obj); 
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody PerfilDTO objDTO) {
		Perfil obj = service.fromDTO(objDTO);
		obj = service.inserir(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@RequestMapping(value="/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Void> update(@RequestBody PerfilDTO objDTO, @PathVariable Integer id) {
		Perfil obj = service.fromDTO(objDTO);
		obj.setId(id);
		obj = service.atualizar(obj);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.deletar(id);
		return ResponseEntity.noContent().build(); 
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<PerfilDTO>> findAll() {
		List<Perfil> list = service.buscarTudo();
		List<PerfilDTO> listDto = list.stream().map(obj -> new PerfilDTO(obj)).collect(Collectors.toList());	
		return ResponseEntity.ok().body(listDto);
	}
	
}

