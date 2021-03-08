package com.jonatasvale.desafioapp.dto;

import java.io.Serializable;

import javax.validation.constraints.Max;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import com.jonatasvale.desafioapp.domain.Perfil;
import com.jonatasvale.desafioapp.domain.Pessoa;
import com.jonatasvale.desafioapp.domain.enums.TipoPessoa;


public class PessoaDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	@Length(min=5, max=80, message="O tamanho deve ser entre 5 e 80 caracteres")
	private String nome;
	
	@Max(value=150)
	private Integer idade;

	@CPF
	@Length(min=11, max=11, message="O tamanho deve ser exatamente 11 caracteres")
	private String cpf;
	
	private Integer tipo;
	
	private Perfil perfil;
	
	public PessoaDTO() {
		
	}
	
	public PessoaDTO(Pessoa obj) {
		this.id = obj.getId();
		this.nome = obj.getNome();
		this.idade = obj.getIdade();
		this.cpf = obj.getCpf();
		this.tipo = obj.getTipo() != null ? obj.getTipo().getCod() : null;		
		this.perfil = obj.getPerfil();
	}

	public Integer getIdade() {
		return idade;
	}

	public void setIdade(Integer idade) {
		this.idade = idade;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getTipo() {
		return TipoPessoa.toEnum(tipo) != null ? TipoPessoa.toEnum(tipo).getDescricao() : null;
	}

	public void setTipo(Integer tipo) {
		this.tipo = tipo;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Perfil getPerfil() {
		return perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}
	
}
