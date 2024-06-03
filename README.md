# Teste Tecnorise

Este projeto é constituído por uma página feita com Typescript, React e GraphQl, para consumir dados dos repositórios do github, e apresentar uma tabela ao usuário com as informações dos repositórios, permitindo a busca pelo nome do repositório, avançar e voltar páginas.

## Requisitos para rodar o projeto

- [Node LTS](https://nodejs.org/en)
  - Usando [`nvm`](https://github.com/nvm-sh/nvm)
    - `nvm install`
    - `nvm use`
- [Yarn 1.x](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (Opcional)

### Como rodar na minha máquina?

- Clone o projeto `git clone https://github.com/Igormazetti/tecnorise-teste.git`
- Ou clone o projeto com SSH `git@github.com:Igormazetti/tecnorise-teste.git`
- Crie uma pasta .env com a variável REACT_APP_GITHUB_TOKEN, com o valor do token gerado no github(https://medium.com/@mbohlip/how-to-generate-a-classic-personal-access-token-in-github-04985b5432c7).
- Rode `yarn` ou `npm i` para instalar os pacotes do projeto.
- Rode `yarn dev` ou `npm run dev`
- Pronto 🎉
