# APP
Gym Way API

## RFs (Requisitos Funcionais)

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel fazer login;
- [ ] Deve ser possivelobter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario;
- [ ] Deve ser possivel obter o historico de check-ins do usuario;
- [ ] Deve ser possivel realizar um check-in em uma academia;
- [ ] Deve ser possivel validar um check-in de um usuario;
- [ ] Deve ser possivel obter o buscar a academia mais proxima;
- [ ] Deve ser possivel obter o buscar a academia por nome;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs (Regras de Negócio)

- [ ] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario nao pode validar um check-in que nao existe;
- [ ] O usuario nao pode validar um check-in que ja foi validado;
- [ ] O usuario nao pode se cadastrar com um email que ja esta cadastrado;
- [ ] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O check-in so pode ser validado ate 20 min apos criado;
- [ ] O check-in so pode ser validado por um administrador;
- [ ] A academia so pode ser cadastrada por um administrador;


## RNFs (Requisitos Não Funcionais)

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicacao precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por um JWT



