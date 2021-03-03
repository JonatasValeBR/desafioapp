package com.jonatasvale.desafioapp.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.jonatasvale.desafioapp.domain.Aplicativo;
import com.jonatasvale.desafioapp.dto.AplicativoDTO;
import com.jonatasvale.desafioapp.services.AplicativoService;

@RestController
@RequestMapping(value="/aplicativos")
public class AplicativoResource {

	@Autowired
	private AplicativoService service;
	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<Aplicativo> find(@PathVariable Integer id) {
		Aplicativo obj = service.buscar(id);
		return ResponseEntity.ok().body(obj); 
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Void> insert(@RequestBody Aplicativo obj) {
		obj = service.inserir(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@RequestMapping(value="/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Void> update(@RequestBody Aplicativo obj, @PathVariable Integer id) {
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
	public ResponseEntity<List<AplicativoDTO>> findAll() {
		List<Aplicativo> list = service.buscarTudo();
		List<AplicativoDTO> listDto = list.stream().map(obj -> new AplicativoDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto); 
	}
	
	@RequestMapping(value="/page",method=RequestMethod.GET)
	public ResponseEntity<Page<AplicativoDTO>> findPage(
			@RequestParam(value="page", defaultValue="0") Integer page, 
			@RequestParam(value="linesPerPage", defaultValue="24")Integer linesPerPage, 
			@RequestParam(value="orderBy", defaultValue="nome")String orderBy, 
			@RequestParam(value="direction", defaultValue="ASC")String direction) {
		Page<Aplicativo> list = service.buscarPagina(page, linesPerPage, orderBy, direction);
		Page<AplicativoDTO> listDto = list.map(obj -> new AplicativoDTO(obj));
		return ResponseEntity.ok().body(listDto); 
	}
	
	
	
}
