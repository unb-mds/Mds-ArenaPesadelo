# API para Gerenciamento de Campeonatos da Pesadelo

Este projeto faz parte de todo o sistema que compõe a proposta de gerencimento
de campeonatos mata-mata das modalidades ofertadas pela fraternidade Pesadelo da
Universidade de Brasília (UNB).

Este documento conta com as instruções sobre como:
- Configurar suas variáveis de ambiente;
- Gerar o banco de dados no qual este projeto deve se conectar;
- Rodar o projeto localmente.

E também como um:
- Guia rápido para os endpoints expostos;
- Informativo geral sobre o projeto.

# Dependências

Este projeto foi construído utilizando *NodeJS + Typescript*. O framework HTTP
utilizado foi o *Express.js*.

A versão do Node.js utilizada para desenvolver o projeto foi a **20.14.0**.

Para gereciamento das dependencias e pacotes foi utilizado o *yarn*.

Antes de seguir para os passos abaixo é necessário instalar todos os pacotes
listados dentro do arquivo `package.json` que está localizado na raiz deste
projeto.

Para instalar os pacotes necessários insira este comando na raiz deste projeto:

`yarn install`

# Variáveis de ambiente

Antes de rodar o projeto é preciso configurar todas as variáveis de ambiente.
Na raiz do projeto existe um arquivo chamado **.env.example** que conta como um
arquivo exemplo para auxiliar quem vai rodar o projeto pela primeira vez.

Abaixo contém uma lista com a descrição de cada variável e os possíveis valores
que cada uma pode ter:

| Variável                     | Descrição                                                                   | Obrigatório |
| ---------------------------- | --------------------------------------------------------------------------- | ----------- |
| `APP_PORT`                   | Porta na qual a aplicação web irá rodar.                                    | ✅           |
| `APP_SECRET`                 | Chave secreta utilizada para assinaturas e criptografia de dados sensíveis. | ✅           |
| `APP_URL`                    | URL base da aplicação, incluindo o protocolo (http/https).                  | ✅           |
| `DATABASE_DB`                | Nome do banco de dados a ser utilizado pela aplicação.                      | ✅           |
| `DATABASE_PORT`              | Porta na qual o serviço de banco de dados está rodando.                     | ✅           |
| `DATABASE_HOST`              | Endereço do servidor onde o banco de dados está hospedado.                  | ✅           |
| `DATABASE_USERNAME`          | Nome de usuário para autenticação no banco de dados.                        | ✅           |
| `DATABASE_PASSWORD`          | Senha para autenticação no banco de dados.                                  | ✅           |
| `DATABASE_MIGRATIONS_FOLDER` | Caminho para a pasta onde as migrações do banco de dados estão localizadas. | ✅           |
| `DATABASE_ENTITIES`          | Lista de entidades/tabelas gerenciadas pela aplicação no banco de dados.    | ✅           |

Os valores dentro do arquivo de exemplo para as seguintes variáveis pode
permanecer igual no momento de rodar o projeto localmente.

- DATABASE_MIGRATIONS_FOLDER;
- DATABASE_ENTITIES.

As variáveis acima definem onde, no projeto, estão especificadas,
respectivamentes, as pastas de migração e entidades do banco de dados. Durante o
desenvolvimento elas foram colocadas como exemplo pois são um padrão (apenas no
desenvolvimento).

# Banco de dados

Esta aplicação utiliza um ORM (object relational model) para se conectar ao
banco de dados. Isso possibilitou que este projeto utilizasse de migrações e
linhas de comando para gerar as tabelas do banco de dados independente do
ambiente em que está rodando.

Para gerar as tabelas do banco de dados automaticamente com o comando abaixo é
**necessário** que as variáveis de ambiente relacionadas ao banco de dados
listadas anteriormente foram inseridas corretamente.

*Obs: o banco de dados no qual as tabelas irão ser inseridas DEVE existir previamente.*

Para rodas as migrações e levantar as tabelas automaticamente no banco de dados
basta digitar o seguinte comando na raiz deste projeto:

`yarn database:dev migration:run -d ./src/database/connection`

Após isso o ORM fará todo o trabalho necessário para criar as tabelas que foram
previamente configuradas em casa arquivo de migração dentro deste projeto.


# Guia rápido para os endpoints expostos

Abaixo estão os endpoints expostos por essa API e uma breve descrição do que o
endpoint faz.

### Endpoints - Users

#### Base Path: `/users`

| Método | Endpoint                  | Descrição                                   | Autenticação |
| ------ | ------------------------- | ------------------------------------------- | ------------ |
| GET    | `/users`                  | Lista todos os usuários.                    | Sim          |
| POST   | `/users`                  | Cria um novo usuário.                       | Não          |
| POST   | `/users/sessions`         | Cria uma sessão para autenticar um usuário. | Não          |
| PUT    | `/users`                  | Atualiza as informações de um usuário.      | Sim          |
| PATCH  | `/users/accesses/:userId` | Atualiza o nível de acesso de um usuário.   | Sim          |

#### Detalhes dos Endpoints

##### GET `/users`
- **Descrição**: Retorna uma lista de todos os usuários.
- **Autenticação**: Sim

##### POST `/users`
- **Descrição**: Cria um novo usuário.
- **Autenticação**: Não
- **Validações**:

  | Propriedade    | Tipo     | Requerida | Descrição                                      |
  | -------------- | -------- | --------- | ---------------------------------------------- |
  | `fullName`     | `string` | ✅         | Nome completo do usuário. Máx: 255 caracteres. |
  | `email`        | `string` | ✅         | E-mail do usuário. Máx: 255 caracteres.        |
  | `password`     | `string` | ✅         | Senha do usuário. Máx: 255 caracteres.         |
  | `registration` | `string` | ✅         | Registro do usuário. Máx: 255 caracteres.      |

##### POST `/users/sessions`
- **Descrição**: Cria uma sessão de autenticação para o usuário.
- **Autenticação**: Não
- **Validações**:

  | Propriedade | Tipo     | Requerida | Descrição                               |
  | ----------- | -------- | --------- | --------------------------------------- |
  | `email`     | `string` | ✅         | E-mail do usuário. Máx: 255 caracteres. |
  | `password`  | `string` | ✅         | Senha do usuário. Máx: 255 caracteres.  |

##### PUT `/users`
- **Descrição**: Atualiza as informações do usuário autenticado.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade    | Tipo     | Requerida | Descrição                                      |
  | -------------- | -------- | --------- | ---------------------------------------------- |
  | `fullName`     | `string` | ❌         | Nome completo do usuário. Máx: 255 caracteres. |
  | `email`        | `string` | ❌         | E-mail do usuário. Máx: 255 caracteres.        |
  | `oldPassword`  | `string` | ❌         | Senha antiga do usuário. Máx: 255 caracteres.  |
  | `password`     | `string` | ❌         | Nova senha do usuário. Máx: 255 caracteres.    |
  | `registration` | `string` | ❌         | Registro do usuário. Máx: 255 caracteres.      |

##### PATCH `/users/accesses/:userId`
- **Descrição**: Atualiza o nível de acesso de um usuário.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade | Tipo            | Requerida | Descrição                               |
  | ----------- | --------------- | --------- | --------------------------------------- |
  | `userId`    | `string (uuid)` | ✅         | ID do usuário. Deve ser um UUID válido. |
  | `access`    | `number`        | ✅         | Nível de acesso do usuário.             |


### Endpoints - Teams

#### Base Path: `/teams`

| Método | Endpoint                     | Descrição                                           | Autenticação |
| ------ | ---------------------------- | --------------------------------------------------- | ------------ |
| GET    | `/teams/:id`                 | Obtém informações detalhadas de um time específico. | Sim          |
| GET    | `/teams/leaders/list`        | Lista todos os times liderados por um usuário.      | Sim          |
| GET    | `/teams/leaders/list/filter` | Filtra times liderados por modalidade.              | Sim          |
| POST   | `/teams`                     | Cria um novo time.                                  | Sim          |
| PUT    | `/teams/:id`                 | Atualiza as informações de um time específico.      | Sim          |

#### Detalhes dos Endpoints

##### GET `/teams/:id`
- **Descrição**: Retorna informações detalhadas de um time específico.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade | Tipo            | Requerida | Descrição                            |
  | ----------- | --------------- | --------- | ------------------------------------ |
  | `id`        | `string (uuid)` | ✅         | ID do time. Deve ser um UUID válido. |

##### GET `/teams/leaders/list`
- **Descrição**: Retorna uma lista de todos os times liderados por um usuário autenticado.
- **Autenticação**: Sim

##### GET `/teams/leaders/list/filter`
- **Descrição**: Filtra os times liderados por modalidade.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade | Tipo     | Requerida | Descrição                  |
  | ----------- | -------- | --------- | -------------------------- |
  | `modality`  | `number` | ✅         | Modalidade a ser filtrada. |

##### POST `/teams`
- **Descrição**: Cria um novo time.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade   | Tipo     | Requerida | Descrição                               |
  | ------------- | -------- | --------- | --------------------------------------- |
  | `name`        | `string` | ✅         | Nome do time.                           |
  | `description` | `string` | ❌         | Descrição do time.                      |
  | `modality`    | `number` | ✅         | Modalidade do time.                     |
  | `image`       | `file`   | ❌         | Imagem representativa do time. (upload) |

##### PUT `/teams/:id`
- **Descrição**: Atualiza as informações de um time específico.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade   | Tipo     | Requerida | Descrição           |
  | ------------- | -------- | --------- | ------------------- |
  | `name`        | `string` | ❌         | Nome do time.       |
  | `description` | `string` | ❌         | Descrição do time.  |
  | `modality`    | `number` | ❌         | Modalidade do time. |


### Endpoints - Team Members

#### Base Path: `/team-members`

| Método | Endpoint                      | Descrição                                              | Autenticação |
|--------|-------------------------------|--------------------------------------------------------|--------------|
| GET    | `/team-members/teams/:teamId` | Lista todos os membros de um time específico.          | Sim          |
| GET    | `/team-members/:id`           | Obtém informações de um membro específico do time.     | Sim          |
| POST   | `/team-members`               | Adiciona um novo membro ao time.                       | Sim          |
| PUT    | `/team-members/:id`           | Atualiza as informações de um membro específico.       | Sim          |
| DELETE | `/team-members/:id`           | Remove um membro específico do time.                   | Sim          |

#### Detalhes dos Endpoints

##### GET `/team-members/teams/:teamId`
- **Descrição**: Retorna uma lista de todos os membros de um time específico.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade | Tipo            | Requerida | Descrição                                 |
  |-------------|-----------------|-----------|-------------------------------------------|
  | `teamId`    | `string (uuid)` | ✅        | ID do time. Deve ser um UUID válido.      |

##### GET `/team-members/:id`
- **Descrição**: Retorna as informações de um membro específico do time.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade | Tipo            | Requerida | Descrição                                 |
  |-------------|-----------------|-----------|-------------------------------------------|
  | `id`        | `string (uuid)` | ✅        | ID do membro. Deve ser um UUID válido.    |

##### POST `/team-members`
- **Descrição**: Adiciona um novo membro ao time.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade   | Tipo            | Requerida | Descrição                                 |
  |---------------|-----------------|-----------|-------------------------------------------|
  | `registration`| `string`        | ✅        | Registro do membro no time.               |
  | `name`        | `string`        | ✅        | Nome do membro.                           |
  | `teamId`      | `string (uuid)` | ✅        | ID do time. Deve ser um UUID válido.      |

##### PUT `/team-members/:id`
- **Descrição**: Atualiza as informações de um membro específico do time.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade   | Tipo            | Requerida | Descrição                                 |
  |---------------|-----------------|-----------|-------------------------------------------|
  | `id`          | `string (uuid)` | ✅        | ID do membro. Deve ser um UUID válido.    |
  | `registration`| `string`        | ✅        | Registro do membro no time.               |
  | `name`        | `string`        | ✅        | Nome do membro.                           |

##### DELETE `/team-members/:id`
- **Descrição**: Remove um membro específico do time.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade | Tipo            | Requerida | Descrição                                 |
  |-------------|-----------------|-----------|-------------------------------------------|
  | `id`        | `string (uuid)` | ✅        | ID do membro. Deve ser um UUID válido.    |

### Endpoints - Championships

#### Base Path: `/championships`

| Método  | Endpoint                        | Descrição                                                             | Autenticação |
|---------|---------------------------------|-----------------------------------------------------------------------|--------------|
| GET     | `/championships`                | Lista todos os campeonatos.                                           | Não          |
| GET     | `/championships/upcoming`       | Lista os próximos campeonatos.                                        | Não          |
| GET     | `/championships/ongoing`        | Lista os campeonatos em andamento.                                    | Não          |
| GET     | `/championships/modality/:modality` | Lista os campeonatos por modalidade.                                 | Não          |
| GET     | `/championships/:id`            | Obtém informações de um campeonato específico.                        | Não          |
| POST    | `/championships`                | Cria um novo campeonato.                                              | Sim          |
| PUT     | `/championships/:championshipId`| Atualiza as informações de um campeonato específico.                  | Sim          |
| DELETE  | `/championships/:id`            | Remove um campeonato específico.                                      | Sim          |

#### Detalhes dos Endpoints

##### GET `/championships`
- **Descrição**: Retorna uma lista de todos os campeonatos.
- **Autenticação**: Não
- **Validações**: Nenhuma

##### GET `/championships/upcoming`
- **Descrição**: Retorna uma lista dos próximos campeonatos.
- **Autenticação**: Não
- **Validações**: Nenhuma

##### GET `/championships/ongoing`
- **Descrição**: Retorna uma lista dos campeonatos em andamento.
- **Autenticação**: Não
- **Validações**: Nenhuma

##### GET `/championships/modality/:modality`
- **Descrição**: Retorna uma lista de campeonatos filtrados por modalidade.
- **Autenticação**: Não
- **Validações**:

  | Propriedade | Tipo     | Requerida | Descrição                      |
  |-------------|----------|-----------|--------------------------------|
  | `modality`  | `number` | ✅        | Modalidade do campeonato.      |

##### GET `/championships/:id`
- **Descrição**: Retorna as informações de um campeonato específico.
- **Autenticação**: Não
- **Validações**:

  | Propriedade | Tipo            | Requerida | Descrição                                 |
  |-------------|-----------------|-----------|-------------------------------------------|
  | `id`        | `string (uuid)` | ✅        | ID do campeonato. Deve ser um UUID válido.|

##### POST `/championships`
- **Descrição**: Cria um novo campeonato.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade   | Tipo     | Requerida | Descrição                                   |
  |---------------|----------|-----------|---------------------------------------------|
  | `date`        | `string` | ✅        | Data do campeonato (formato YYYY-MM-DD).   |
  | `from`        | `string` | ✅        | Hora de início (formato HH:MM).            |
  | `name`        | `string` | ✅        | Nome do campeonato.                        |
  | `modality`    | `number` | ✅        | Modalidade do campeonato.                  |
  | `location`    | `string` | ✅        | Local do campeonato.                       |
  | `participants`| `number` | ✅        | Número de participantes.                   |
  | `to`          | `string` | ❌        | Hora de término (formato HH:MM).           |
  | `description` | `string` | ❌        | Descrição do campeonato.                   |
  | `locationLat` | `number` | ❌        | Latitude do local do campeonato.           |
  | `locationLng` | `number` | ❌        | Longitude do local do campeonato.          |

##### PUT `/championships/:championshipId`
- **Descrição**: Atualiza as informações de um campeonato específico.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade   | Tipo     | Requerida | Descrição                                   |
  |---------------|----------|-----------|---------------------------------------------|
  | `date`        | `string` | ✅        | Data do campeonato (formato YYYY-MM-DD).   |
  | `from`        | `string` | ✅        | Hora de início (formato HH:MM).            |
  | `name`        | `string` | ✅        | Nome do campeonato.                        |
  | `modality`    | `number` | ✅        | Modalidade do campeonato.                  |
  | `location`    | `string` | ✅        | Local do campeonato.                       |
  | `participants`| `number` | ✅        | Número de participantes.                   |
  | `to`          | `string` | ❌        | Hora de término (formato HH:MM).           |
  | `description` | `string` | ❌        | Descrição do campeonato.                   |
  | `locationLat` | `number` | ❌        | Latitude do local do campeonato.           |
  | `locationLng` | `number` | ❌        | Longitude do local do campeonato.          |

##### DELETE `/championships/:id`
- **Descrição**: Remove um campeonato específico.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade | Tipo            | Requerida | Descrição                                 |
  |-------------|-----------------|-----------|-------------------------------------------|
  | `id`        | `string (uuid)` | ✅        | ID do campeonato. Deve ser um UUID válido.|

### Endpoints - Championship Registrations

#### Base Path: `/championship-registrations`

| Método | Endpoint                 | Descrição                                    | Autenticação |
|--------|--------------------------|----------------------------------------------|--------------|
| POST   | `/championship-registrations` | Realiza a inscrição de uma equipe em um campeonato. | Sim          |

#### Detalhes dos Endpoints

##### POST `/championship-registrations`
- **Descrição**: Realiza a inscrição de uma equipe em um campeonato específico.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade     | Tipo            | Requerida | Descrição                                      |
  |-----------------|-----------------|-----------|------------------------------------------------|
  | `teamId`        | `string (uuid)` | ✅        | ID da equipe que está sendo inscrita.          |
  | `championshipId`| `string (uuid)` | ✅        | ID do campeonato no qual a equipe será inscrita.|

### Endpoints - Games

#### Base Path: `/games`

| Método | Endpoint                            | Descrição                                     | Autenticação |
|--------|-------------------------------------|-----------------------------------------------|--------------|
| GET    | `/games/results/:championshipId`    | Obtém os resultados dos jogos de um campeonato. | Não          |
| GET    | `/games/phases/:championshipId`     | Lista os jogos de uma fase específica de um campeonato. | Não          |
| GET    | `/games/:championshipId`            | Lista todos os jogos de um campeonato específico. | Não          |
| PUT    | `/games/:id`                        | Atualiza a pontuação de um jogo específico.   | Sim          |

#### Detalhes dos Endpoints

##### GET `/games/results/:championshipId`
- **Descrição**: Obtém os resultados dos jogos de um campeonato específico.
- **Autenticação**: Não
- **Validações**:

  | Propriedade     | Tipo            | Requerida | Descrição                                      |
  |-----------------|-----------------|-----------|------------------------------------------------|
  | `championshipId`| `string (uuid)` | ✅        | ID do campeonato para o qual os resultados são obtidos. |

##### GET `/games/phases/:championshipId`
- **Descrição**: Lista os jogos de uma fase específica de um campeonato.
- **Autenticação**: Não
- **Validações**:

  | Propriedade     | Tipo            | Requerida | Descrição                                      |
  |-----------------|-----------------|-----------|------------------------------------------------|
  | `championshipId`| `string (uuid)` | ✅        | ID do campeonato para o qual os jogos são listados. |
  | `phase`         | `number`        | ✅        | Número da fase dos jogos a serem listados.     |

##### GET `/games/:championshipId`
- **Descrição**: Lista todos os jogos de um campeonato específico.
- **Autenticação**: Não
- **Validações**:

  | Propriedade     | Tipo            | Requerida | Descrição                                      |
  |-----------------|-----------------|-----------|------------------------------------------------|
  | `championshipId`| `string (uuid)` | ✅        | ID do campeonato para o qual os jogos são listados. |

##### PUT `/games/:id`
- **Descrição**: Atualiza a pontuação de um jogo específico.
- **Autenticação**: Sim
- **Validações**:

  | Propriedade     | Tipo            | Requerida | Descrição                                      |
  |-----------------|-----------------|-----------|------------------------------------------------|
  | `id`            | `string (uuid)` | ✅        | ID do jogo a ser atualizado.                   |
  | `homeScore`     | `number`        | ❌        | Pontuação do time da casa (mínimo 0).          |
  | `visitorScore`  | `number`        | ❌        | Pontuação do time visitante (mínimo 0).        |

