package com.jonatasvale.desafioapp.dto;

import java.io.Serializable;

import com.jonatasvale.desafioapp.domain.Pessoa;

public class PessoaDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String nome;
	private Integer idade;
	private String cpfOuCnpj;
	private Integer tipo;
	
	public PessoaDTO() {
		
	}
	
	public PessoaDTO(Pessoa obj) {
		this.id = obj.getId();
		this.nome = obj.getNome();
		this.idade = obj.getIdade();
		this.cpfOuCnpj = obj.getCpfOuCnpj();
		this.tipo = obj.getTipo().getCod();
	}

	public Integer getIdade() {
		return idade;
	}

	public void setIdade(Integer idade) {
		this.idade = idade;
	}

	public String getCpfOuCnpj() {
		return cpfOuCnpj;
	}

	public void setCpfOuCnpj(String cpfOuCnpj) {
		this.cpfOuCnpj = cpfOuCnpj;
	}

	public Integer getTipo() {
		return tipo;
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
	
}
