package com.jonatasvale.desafioapp.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

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

import com.jonatasvale.desafioapp.domain.Pessoa;
import com.jonatasvale.desafioapp.domain.enums.TipoPessoa;
import com.jonatasvale.desafioapp.dto.PessoaDTO;
import com.jonatasvale.desafioapp.dto.PessoaNewDTO;
import com.jonatasvale.desafioapp.resources.utils.URL;
import com.jonatasvale.desafioapp.services.PessoaService;

@RestController
@RequestMapping(value="/pessoas")
public class PessoaResource {

	@Autowired
	private PessoaService service;
	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<Pessoa> find(@PathVariable Integer id) {
		Pessoa obj = service.buscar(id);
		return ResponseEntity.ok().body(obj); 
	}
	
	@RequestMapping(value="/tipo",method=RequestMethod.GET)
	public ResponseEntity<TipoPessoa[]> buscarENUM() {
		return ResponseEntity.ok().body(service.buscarENUM()); 
	}
	
	@RequestMapping(value="/tipo/{id}",method=RequestMethod.GET)
	public ResponseEntity<TipoPessoa> buscarENUMbyID(@PathVariable Integer id) {
		return ResponseEntity.ok().body(service.buscarENUMbyID(id)); 
	}
	
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody PessoaNewDTO objDTO) {
		Pessoa obj = service.fromDTO(objDTO);
		obj = service.inserir(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@RequestMapping(value="/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @RequestBody PessoaDTO objDTO, @PathVariable Integer id) {
		Pessoa obj = service.fromDTO(objDTO);
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
	public ResponseEntity<List<PessoaDTO>> findAll() {
		List<Pessoa> list = service.buscarTudo();
		List<PessoaDTO> listDto = list.stream().map(obj -> new PessoaDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto); 
	}
	
	@RequestMapping(value="/page",method=RequestMethod.GET)
	public ResponseEntity<Page<PessoaDTO>> findPage(
			@RequestParam(value="page", defaultValue="0") Integer page, 
			@RequestParam(value="linesPerPage", defaultValue="6")Integer linesPerPage, 
			@RequestParam(value="orderBy", defaultValue="nome")String orderBy, 
			@RequestParam(value="direction", defaultValue="ASC")String direction) {
		Page<Pessoa> list = service.buscarPagina(page, linesPerPage, orderBy, direction);
		Page<PessoaDTO> listDto = list.map(obj -> new PessoaDTO(obj));
		return ResponseEntity.ok().body(listDto); 
	}
	
	@RequestMapping(value="perfis",method=RequestMethod.GET)
	public ResponseEntity<List<PessoaDTO>> findPerfis(
			@RequestParam(value="nome", defaultValue="") String nome, 
			@RequestParam(value="perfis", defaultValue="")String perfis) 
	{
		List<Integer> ids = URL.decodeIntList(perfis);
		List<Pessoa> list = service.buscarPerfis(nome, ids);
		List<PessoaDTO> listDto = list.stream().map(obj -> new PessoaDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto); 
	}
}
