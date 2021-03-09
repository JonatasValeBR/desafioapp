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

import com.jonatasvale.desafioapp.domain.Pessoa;
import com.jonatasvale.desafioapp.domain.enums.TipoPessoa;
import com.jonatasvale.desafioapp.dto.PessoaDTO;
import com.jonatasvale.desafioapp.dto.PessoaNewDTO;
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
	
	@Transactional
	public Pessoa inserir(Pessoa obj) {
		obj.setId(null);
		try {
			obj = repository.save(obj);
		} catch (DataIntegrityViolationException err) {
			throw new DataIntegrityException("CPF ja cadastrado");
		}
		return obj;
	}
	
	@Transactional
	public Pessoa atualizar(Pessoa obj) {
		Pessoa newObj = buscar(obj.getId());
		atualizarDados(newObj, obj);
		try {
			obj = repository.save(newObj);
		} catch (DataIntegrityViolationException err) {
			throw new DataIntegrityException("CPF ja cadastrado");
		}
		return obj;
	}
	
	public void deletar(Integer id) {
		buscar(id);
		try {
			repository.deleteById(id);
		} catch(DataIntegrityViolationException err) {
			throw new DataIntegrityException("Nao eh possivel excluir");
		}
		
	}
	
	public TipoPessoa[] buscarENUM(){
		return TipoPessoa.values();
	}
	
	public List<Pessoa> buscarTudo(){
		return repository.findAll();
	}
	
	public Page<Pessoa> buscarPagina(Integer page, Integer linesPerPage, String orderBy, String direction){
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),
				orderBy);
		return repository.findAll(pageRequest);
	}
	
	public Pessoa fromDTO(PessoaDTO objDto) {
		return new Pessoa(objDto.getId(),objDto.getNome(), objDto.getIdade(), objDto.getCpf(), objDto.getTipo() != null ? TipoPessoa.toEnum(objDto.getTipo()) : null, objDto.getPerfil());
	}
	
	public Pessoa fromDTO(PessoaNewDTO objDto) {
		return new Pessoa(objDto.getId(),objDto.getNome(), objDto.getIdade(), objDto.getCpf(), TipoPessoa.toEnum(objDto.getTipo()), objDto.getPerfil());
	}
	
	private void atualizarDados(Pessoa newObj, Pessoa obj) {
		newObj.setNome(obj.getNome() == null ? newObj.getNome() : obj.getNome());
		newObj.setIdade(obj.getIdade() == null ? newObj.getIdade() : obj.getIdade());
		newObj.setCpf(obj.getCpf() == null ? newObj.getCpf() : obj.getCpf());
		newObj.setTipo(obj.getTipo() == null ? newObj.getTipo() : obj.getTipo());
		newObj.setPerfil(obj.getPerfil() == null ? newObj.getPerfil() : obj.getPerfil());
	}

	
}
