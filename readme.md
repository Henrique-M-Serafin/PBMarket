# PBMarket — Sistema de Gerenciamento de Produtos

**PBMarket** é uma aplicação full-stack desenvolvida para fins de estudo e portfólio, simulando um sistema de gerenciamento de produtos de um supermercado. O projeto demonstra a integração entre um backend robusto em **Go** e um frontend moderno em **React**, com foco em boas práticas de desenvolvimento, autenticação e organização de código.

[![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🚀 Tecnologias Utilizadas

O projeto é dividido em duas partes principais: o backend, responsável pela lógica de negócio e persistência de dados, e o frontend, que consome a API e oferece a interface ao usuário.

### Backend

| Tecnologia | Descrição |
| :--- | :--- |
| **Go** | Linguagem de programação principal, conhecida pela performance e concorrência. |
| **Gin** | Framework web minimalista e de alta performance para Go. |
| **Gorm** | ORM (Object-Relational Mapper) para facilitar a interação com o banco de dados. |
| **PostgreSQL** | Sistema de gerenciamento de banco de dados relacional, robusto e confiável. |
| **JWT** | Padrão de autenticação para criação de tokens de acesso seguros. |
| **Docker** | Plataforma para desenvolvimento, deploy e execução de aplicações em containers. |

### Frontend

| Tecnologia | Descrição |
| :--- | :--- |
| **React** | Biblioteca JavaScript para construção de interfaces de usuário. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática ao código. |
| **React Router** | Biblioteca para gerenciamento de rotas na aplicação. |
| **Context API** | Solução nativa do React para gerenciamento de estado global. |
| **Axios** | Cliente HTTP para realizar requisições à API do backend. |
| **TailwindCSS** | Framework de CSS utilitário para estilização rápida e consistente. |
| **shadcn/ui** | Coleção de componentes de UI reutilizáveis para React. |

## 📂 Estrutura do Projeto

A estrutura do projeto foi pensada para manter uma clara separação de responsabilidades entre o backend e o frontend, facilitando a manutenção e escalabilidade.

```
PBMarket/
├── pbmarket_backend/
│   ├── controllers/  # Lógica de requisição/resposta
│   ├── database/     # Conexão e migrações do banco
│   ├── middleware/   # Middlewares (ex: autenticação)
│   ├── models/       # Estruturas de dados
│   ├── routes/       # Definição das rotas da API
│   └── utils/        # Funções utilitárias (ex: JWT)
│
├── pb_market_frontend/
│   ├── src/
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── services/     # Comunicação com a API
│   │   ├── contexts/     # Gerenciamento de estado (ex: AuthContext)
│   │   └── hooks/        # Hooks customizados
│
└── README.md
```

## ⚙️ Funcionalidades

- [x] **Cadastro de Usuário:** Permite que novos usuários se registrem no sistema.
- [x] **Login com Autenticação JWT:** Geração de token para acesso seguro às rotas protegidas.
- [x] **Cadastro de Produtos:** Criação de novos produtos no banco de dados.
- [x] **Listagem de Produtos:** Visualização de todos os produtos cadastrados.
- [x] **Atualização de Produtos:** Edição das informações de um produto existente.
- [x] **Remoção de Produtos:** Exclusão de produtos do sistema.
- [x] **Rotas Protegidas:** Acesso a determinadas funcionalidades apenas para usuários autenticados.
- [x] **Controle de Sessão:** Gerenciamento do estado de autenticação no frontend.

## 🔐 Autenticação

A autenticação é baseada em **JSON Web Tokens (JWT)**. Após o login, um token é gerado e enviado ao cliente, que o armazena no `localStorage` e o envia no cabeçalho de cada requisição para rotas protegidas.

1.  **`POST /register`**: Cria um novo usuário no banco de dados.
2.  **`POST /login`**: Autentica o usuário e retorna um token JWT válido.

As rotas de `POST`, `PATCH` e `DELETE` de produtos exigem um token válido para serem acessadas.

## 🐳 Como Rodar o Backend com Docker

Para executar o backend, é necessário ter o Docker e o Docker Compose instalados.

1.  **Crie o arquivo `.env`**

    Dentro da pasta `pbmarket_backend`, crie um arquivo `.env` com as seguintes variáveis de ambiente:

    ```
    DB_HOST=postgres
    DB_USER=admin
    DB_PASSWORD=admin123
    DB_NAME=pb_market_db
    DB_PORT=5432
    JWT_SECRET=uma_chave_segura_aqui
    ```

    > ⚠️ **Atenção:** Nunca suba seu arquivo `.env` real para o GitHub. Adicione-o ao `.gitignore`.

2.  **Suba os Containers**

    Com o Docker em execução, navegue até a pasta `pbmarket_backend` e execute:

    ```bash
    docker-compose up --build
    ```

    A API estará disponível em `http://localhost:8080`.

## 💻 Como Rodar o Frontend

Para executar o frontend, você precisa do Node.js e do npm (ou outro gerenciador de pacotes) instalados.

1.  **Instale as Dependências**

    Navegue até a pasta `pb_market_frontend` e execute:

    ```bash
    npm install
    ```

2.  **Inicie a Aplicação**

    Após a instalação, execute:

    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173`.

## 📌 Endpoints Principais da API

| Método | Rota | Descrição | Protegido |
| :--- | :--- | :--- | :---: |
| `POST` | `/register` | Cadastro de um novo usuário. | Não |
| `POST` | `/login` | Login e geração de token JWT. | Não |
| `GET` | `/products` | Lista todos os produtos. | Não |
| `POST` | `/products` | Cria um novo produto. | Sim |
| `PATCH` | `/products/:id` | Atualiza um produto existente. | Sim |
| `DELETE` | `/products/:id` | Remove um produto. | Sim |

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de aplicar e demonstrar conhecimentos em:

-   Desenvolvimento de backend com **Go** e o ecossistema moderno.
-   Criação e estruturação de **APIs RESTful**.
-   Implementação de autenticação segura com **JWT**.
-   Organização e boas práticas em projetos **full-stack**.
-   Construção de interfaces reativas com **React e TypeScript**.
-   Utilização de **Docker** para criar ambientes de desenvolvimento reproduzíveis.

## 👨‍💻 Autor

**Henrique Serafin**

-   **GitHub:** [https://github.com/Henrique-M-Serafin](https://github.com/Henrique-M-Serafin)

---

*Este projeto foi desenvolvido para fins de aprendizado e portfólio, mas segue padrões e práticas de aplicações reais utilizadas no mercado.*
