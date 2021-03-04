INSERT INTO Aplicativo (nome) VALUES ('Aplicativo 1'),('Aplicativo 2'),('Aplicativo 3'),('Aplicativo 4'),('Aplicativo 5');

INSERT INTO Perfil (nome) VALUES ('Usuario Comum'),('Gestor'),('Administrador');

INSERT INTO Perfil_aplicativo (aplicativo_id, perfil_id) VALUES (1,1),(1,2),(2,3),(2,1);

SELECT * FROM PESSOA;
	
INSERT INTO Pessoa(cpf, idade, nome, tipo, perfil_id) VALUES ('04332193412',22,'Jonatas Vale',1,3);
	
Insert INTO Pessoa (cpf, idade, nome, tipo, perfil_id) VALUES ('12345678901',23,'Francisco Hugo',1,2);
	
Insert INTO Pessoa (cpf, idade, nome, tipo, perfil_id) VALUES ('01234567890',23,'Alexandre BoaVentura',1,2);
	
Insert INTO Pessoa (cpf, idade, nome, tipo, perfil_id) VALUES ('31234324570',22,'Fernada Keller',1,1);
	

