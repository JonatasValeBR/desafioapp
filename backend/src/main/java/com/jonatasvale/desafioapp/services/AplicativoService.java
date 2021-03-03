package com.jonatasvale.desafioapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.jonatasvale.desafioapp.domain.Aplicativo;
import com.jonatasvale.desafioapp.repositories.AplicativoRepository;
import com.jonatasvale.desafioapp.services.exceptions.DataIntegrityException;
import com.jonatasvale.desafioapp.services.exceptions.ObjectNotFoundException;

@Service
public class AplicativoService {

	@Autowired
	private AplicativoRepository repository;
	
	public Aplicativo buscar(Integer id) {
		Optional<Aplicativo> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado! Id: " + id + ", Tipo: " + Aplicativo.class.getName()));
	}
	
	public Aplicativo inserir(Aplicativo obj) {
		obj.setId(null);
		return repository.save(obj);
	}
	
	public Aplicativo atualizar(Aplicativo obj) {
		buscar(obj.getId());
		return repository.save(obj);
	}
	
	public void deletar(Integer id) {
		buscar(id);
		try {
			repository.deleteById(id);
		} catch(DataIntegrityViolationException err) {
			throw new DataIntegrityException("Nao eh possivel excluir um aplicativo vinculado a um perfil");
		}
		
	}
	
	public List<Aplicativo> buscarTudo(){
		return repository.findAll();
	}
	
	public Page<Aplicativo> buscarPagina(Integer page, Integer linesPerPage, String orderBy, String direction){
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),
				orderBy);
		return repository.findAll(pageRequest);
	}
		
}
