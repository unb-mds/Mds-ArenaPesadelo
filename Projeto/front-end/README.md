# API para Gerenciamento de Campeonatos da Pesadelo

Este projeto faz parte de todo o sistema que compõe a proposta de gerencimento
de campeonatos mata-mata das modalidades ofertadas pela fraternidade Pesadelo da
Universidade de Brasília (UNB).

# Dependências

Este projeto foi construído utilizando *ReactJS + Typescript*.

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

| Variável  | Descrição                                                             | Obrigatório |
| --------- | --------------------------------------------------------------------- | ----------- |
| `API_URL` | URL da API que faz parte do projeto que compõe o sistema da Pesadelo. | ✅           |

