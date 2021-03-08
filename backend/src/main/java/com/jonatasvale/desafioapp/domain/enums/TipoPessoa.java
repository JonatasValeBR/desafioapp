package com.jonatasvale.desafioapp.domain.enums;

public enum TipoPessoa {
		
		DEVTRAINNER(0, "Desenvolvedor trainner"),
		DEVJUNIOR(1, "Desenvolvedor junior"),
		DEVPLENO(2, "Desenvolvedor pleno"),
		DEVSENIOR(3, "Desenvolvedor senior");
		
	
		private int cod;
		private String descricao;
		
		
		private TipoPessoa(int cod, String descricao) {
			this.cod = cod;
			this.descricao = descricao;
		}

		public int getCod() {
			return cod;
		}

		public String getDescricao() {
			return descricao;
		}
		
		public static TipoPessoa toEnum(Integer cod) {
			if (cod == null) {
				return null;
			}
			
			for (TipoPessoa x : TipoPessoa.values()) {
				if (cod.equals(x.getCod())) {
					return x;
				}
			}
			
			throw new IllegalArgumentException("Id invalido: " + cod);
		}
		
		public static TipoPessoa toEnum(String nome) {
			if (nome == null) {
				return null;
			}
			
			for (TipoPessoa x : TipoPessoa.values()) {
				if (nome.equals(x.getDescricao())) {
					return x;
				}
			}
			
			throw new IllegalArgumentException("Id invalido: " + nome);
		}
}
