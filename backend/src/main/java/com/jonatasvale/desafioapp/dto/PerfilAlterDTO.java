package com.jonatasvale.desafioapp.dto;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import com.jonatasvale.desafioapp.domain.Aplicativo;
import com.jonatasvale.desafioapp.domain.Perfil;

public class PerfilAlterDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	@NotEmpty(message="Preehchimento obrigatorio")
	@Length(min=5, max=80, message="O tamanho deve ser entre 5 e 80 caracteres")
	private String nome;
	
	private List<Aplicativo> aplicativos;
	public PerfilAlterDTO() {
		
	}
	
	public PerfilAlterDTO(Perfil obj) {
		this.id = obj.getId();
		this.nome = obj.getNome();
		this.aplicativos = obj.getAplicativos();
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

	public List<Aplicativo> getAplicativos() {
		return aplicativos;
	}

	public void setAplicativos(List<Aplicativo> aplicativos) {
		this.aplicativos = aplicativos;
	}

}
