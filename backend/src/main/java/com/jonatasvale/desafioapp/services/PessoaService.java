package com.jonatasvale.desafioapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.jonatasvale.desafioapp.domain.Pessoa;
import com.jonatasvale.desafioapp.repositories.PessoaRepository;
import com.jonatasvale.desafioapp.services.exceptions.DataIntegrityException;
import com.jonatasvale.desafioapp.services.exceptions.ObjectNotFoundException;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository repository;
	
	public Pessoa buscar(Integer id) {
		Optional<Pessoa> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado! Id: " + id + ", Tipo: " + Pessoa.class.getName()));
	}
	
	public Pessoa inserir(Pessoa obj) {
		obj.setId(null);
		return repository.save(obj);
	}
	
	public Pessoa atualizar(Pessoa obj) {
		buscar(obj.getId());
		return repository.save(obj);
	}
	
	public void deletar(Integer id) {
		buscar(id);
		try {
			repository.deleteById(id);
		} catch(DataIntegrityViolationException err) {
			throw new DataIntegrityException("Nao eh possivel excluir");
		}
		
	}
	
	public List<Pessoa> buscarTudo(){
		return repository.findAll();
	}
	
}
