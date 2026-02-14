# APP
Gym Way API

## RFs (Requisitos Funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel fazer login;
- [x] Deve ser possivelobter o perfil de um usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario;
- [x] Deve ser possivel obter o historico de check-ins do usuario;
- [x] Deve ser possivel realizar um check-in em uma academia;
- [x] Deve ser possivel obter o buscar a academia por nome;
- [x] Deve ser possivel cadastrar uma academia;
- [ ] Deve ser possivel validar um check-in de um usuario;
- [ ] Deve ser possivel obter o buscar a academia mais proxima;

## RNs (Regras de Negócio)

- [x] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuario nao pode se cadastrar com um email que ja esta cadastrado;
- [x] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O usuario nao pode validar um check-in que nao existe;
- [ ] O usuario nao pode validar um check-in que ja foi validado;
- [ ] O check-in so pode ser validado ate 20 min apos criado;
- [ ] O check-in so pode ser validado por um administrador;
- [ ] A academia so pode ser cadastrada por um administrador;


## RNFs (Requisitos Não Funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por um JWT



