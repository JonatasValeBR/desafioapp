package com.jonatasvale.desafioapp.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import com.jonatasvale.desafioapp.domain.Perfil;
import com.jonatasvale.desafioapp.domain.Pessoa;
import com.jonatasvale.desafioapp.domain.enums.TipoPessoa;


public class PessoaNewDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	@NotEmpty(message="Preehchimento obrigatorio")
	@Length(min=5, max=120, message="O tamanho deve ser entre 5 e 80 caracteres")
	private String nome;
	
	private Integer idade;

	@NotEmpty(message="Preehchimento obrigatorio")
	@CPF
	@Length(min=11, max=11, message="O tamanho deve ser exatamente 11 caracteres")
	private String cpf;
	
	@NotNull
	private Integer tipo;
	
	@NotNull
	private Perfil perfil;
	
	public PessoaNewDTO() {
		
	}
	
	public PessoaNewDTO(Pessoa obj) {
		this.id = obj.getId();
		this.nome = obj.getNome();
		this.idade = obj.getIdade();
		this.cpf = obj.getCpf();
		this.tipo = obj.getTipo().getCod();		
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
		return TipoPessoa.toEnum(tipo).getDescricao();
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
