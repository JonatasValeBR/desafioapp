<h1>Desafio MBA Mobi</h1>
<h2>Jonatas do Vale Nunes</h2>

<b>O que consiste o desafio?</b>

Implementar um CRUD no contexto de: 

“Uma pessoa está associada a vários aplicativos por meio de um perfil de acesso.”
“Pessoa deve constar, CPF, nome, idade, tipo.”
“Os perfis serão, usuário comum, gestor e administrador.” 
“Aplicativo deve conter nome e id.”

<b>Quais tecnologias usadas ?</b>

Banco: Mysql/H2
Backend/service: SpringBoot
Frontend: Ionic

<b>O que o aplicativo faz?</b>

Na aba de pessoas, conseguimos adicionar uma nova pessoa a partir de um perfil (usuário comum, gestor e administrador), editar, excluir, visualziar o perfil e aplicativos  que o mesmo possuir acesso.

Na aba de perfis, conseguimos atribuiur aplicativos ao perfil em questao e a visualizar todos as pessoas e aplicativos vinculados.

Na aba de aplicativo, conseguimos adicionar um aplicativo, editar, excluir e visualizar.

<b>Como está dividido a pasta do projeto?</b>

O backend em Spring encontra-se no diretório : backend

O frontend em Ionic encontra-se no diretório : frontend

Recursos de vídeo e prints(Modelo MER) encontra-se no diretório : Recursos

<b>Passo a Passo para execução do projeto:</b>

<b>Realize as alteracoes no BD</b>

##Para acessar o h2 Console, acesse a url: http://localhost:8080/api/h2-console/

Por padrao esta configurado o BD H2, para evitar a execucao sem realizar as alteracoes necessarias. 

Necessario ter MYSQL-SERVER instalado

Instale o gerenciador do MYSQL de sua preferencia (Workbench, xampp, lampp e etc), ao acessar o seu localhost ou usario de preferencia, crie uma database chamado "desafio_app"

Acesse "desafio-app/backend/src/main/resources/application-dev.properties", realize as seguintes alteracoes:

spring.datasource.url=jdbc:mysql://localhost:{{PORTA_DO_SEU_MYSQL}}/desafio_app

spring.datasource.username={{SEU_USUARIO}}

spring.datasource.password=((SUA_SENHA_CASO_EXISTA}}

spring.jpa.hibernate.ddl-auto=create -> Caso deseje que os dados persista, altere esse campo para "update"

Acesse "desafio-app/backend/src/main/resources/application.properties". realize a seguinte alteracao:

spring.profiles.active=test -> ALtere esse campo para 'dev' (Sem as ASPAS)

A populacao do BD esta sendo feito arquivo impot no proprio springboot.

<b>Execucao do Projeto Spring</b>

Necessario ter JAVA instalado, preferencia versao 11. 

Necessario ter APACHE MAVEN instalado, preferencia versao 3.6.3 ##Tutorial: https://maven.apache.org/install.html

Va ate a diretorio do projeto backend, execute o comando na raiz do mesmo:
  
  mvn clean package

Sera gerado um executavel.jar na pasta target, para executar esse jar, execute o comando:

  java -jar target/desafioapp-0.0.1-SNAPSHOT.jar
  
O projeto estara sendo executado via terminal.

<b>Execucao do Projeto Ionic</b>

Abra o diretório do Frontend e execute o comando para baixar as dependências na raiz: 

  NPM install 
  
Apos finalizar o dowload das depedencias execute o comando na raiz:

  ionic serve


<b>ENDPOINTS DA API</b>


Para acessar os endpoints da API, apos a iniciacao do projeto no spring, acesse a url:

http://localhost:8080/api/swagger-ui/

Atraves dessa url sera possivel consultar todos os end-points e suas repostas/erros.


