package com.jonatasvale.desafioapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jonatasvale.desafioapp.domain.Aplicativo;
import com.jonatasvale.desafioapp.domain.Perfil;
import com.jonatasvale.desafioapp.dto.AplicativoDTO;
import com.jonatasvale.desafioapp.repositories.AplicativoRepository;
import com.jonatasvale.desafioapp.repositories.PerfilRepository;
import com.jonatasvale.desafioapp.services.exceptions.DataIntegrityException;
import com.jonatasvale.desafioapp.services.exceptions.ObjectNotFoundException;

@Service
public class AplicativoService {

	@Autowired
	private AplicativoRepository repositoryAplicativo;
	
	@Autowired
	private PerfilRepository repositoryPerfil;
	
	public Aplicativo buscar(Integer id) {
		Optional<Aplicativo> obj = repositoryAplicativo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Aplicativo nao encontrado!"));
	}
	
	@Transactional
	public Aplicativo inserir(Aplicativo obj) {
		obj.setId(null);
		try {
			obj = repositoryAplicativo.save(obj);
		} catch (Exception err) {
			throw new DataIntegrityException("Nome ja cadastrado");
		}
		return obj;
	}
	
	@Transactional
	public Aplicativo atualizar(Aplicativo obj) {
		buscar(obj.getId());
		List<Aplicativo> apps = repositoryAplicativo.findByNome(obj.getNome());
		try {
			if(apps.size() > 0) {
				throw new Exception();			
			} 
			obj = repositoryAplicativo.save(obj);
			
		} catch (Exception err) {
			throw new DataIntegrityException("Nome ja cadastrado");
		}
		return obj;
	}
	
	public void deletar(Integer id) {
		buscar(id);
		try {
			repositoryAplicativo.deleteById(id);
		} catch(DataIntegrityViolationException err) {
			throw new DataIntegrityException("Nao eh possivel excluir um aplicativo vinculado a um perfil");
		}
		
	}
	
	public List<Aplicativo> buscarTudo(){
		return repositoryAplicativo.findAll();
	}
	
	
	public Page<Aplicativo> buscarPagina(Integer page, Integer linesPerPage, String orderBy, String direction){
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),orderBy);
		return repositoryAplicativo.findAll(pageRequest);
	}
	
	public Aplicativo fromDTO(AplicativoDTO objDto) {
		return new Aplicativo(objDto.getId(),objDto.getNome());
	}
	
	public Page<Aplicativo> buscar(String nome, List<Integer> ids,Integer page, Integer linesPerPage, String orderBy, String direction){
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),orderBy);
		List<Perfil> perfis = repositoryPerfil.findAllById(ids);
		return repositoryAplicativo.findDistinctByNomeContainingAndPerfisIn(nome, perfis, pageRequest);
	}
	
	public Page<Aplicativo> buscar(String nome, Integer page, Integer linesPerPage, String orderBy, String direction){
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),orderBy);
		return repositoryAplicativo.findDistinctByNomeContaining(nome, pageRequest);
	}

}
