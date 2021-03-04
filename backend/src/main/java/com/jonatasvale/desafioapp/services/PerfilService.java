package com.jonatasvale.desafioapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jonatasvale.desafioapp.domain.Perfil;
import com.jonatasvale.desafioapp.dto.PerfilDTO;
import com.jonatasvale.desafioapp.repositories.PerfilRepository;
import com.jonatasvale.desafioapp.services.exceptions.DataIntegrityException;
import com.jonatasvale.desafioapp.services.exceptions.ObjectNotFoundException;

@Service
public class PerfilService {

	@Autowired
	private PerfilRepository repository;
	
	public Perfil buscar(Integer id) {
		Optional<Perfil> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado! Id: " + id + ", Tipo: " + Perfil.class.getName()));
	}
	
	@Transactional
	public Perfil inserir(Perfil obj) {
		obj.setId(null);
		try {
			obj = repository.save(obj);
		} catch (DataIntegrityViolationException err) {
			throw new DataIntegrityException("Nome ja cadastrado");
		}
		return obj;
	}
	
	@Transactional
	public Perfil atualizar(Perfil obj) {
		buscar(obj.getId());
		try {
			obj = repository.save(obj);
		} catch (DataIntegrityViolationException err) {
			throw new DataIntegrityException("Nome ja cadastrado");
		}
		return obj;
	}
	
	public void deletar(Integer id) {
		buscar(id);
		try {
			repository.deleteById(id);
		} catch(DataIntegrityViolationException err) {
			throw new DataIntegrityException("Nao eh possivel excluir um perfil vinculado a uma pessoa");
		}
		
	}
	
	public List<Perfil> buscarTudo(){
		return repository.findAll();
	}
	
	public Perfil fromDTO(PerfilDTO objDto) {
		return new Perfil(objDto.getId(),objDto.getNome());
	}
}

