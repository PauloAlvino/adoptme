## 📖 Sobre o Projeto

O **AdoptMe** é uma aplicação Full Stack desenvolvida para ser uma ponte de esperança entre animais de estimação que precisam de uma família e pessoas de bom coração. O projeto visa oferecer um ambiente seguro, prático e intuitivo, onde os usuários podem anunciar pets para adoção, navegar por perfis de animais disponíveis e gerenciar todo o processo de forma transparente.

A segurança é um pilar fundamental, com autenticação baseada em JWT e um sistema de validações robusto no backend para garantir a integridade e a consistência dos dados.

---

## ✨ Principais Funcionalidades

-   ✅ **Autenticação Segura:** Cadastro e Login de usuários com tokens JWT para gerenciamento de sessão.
-   ✅ **Validações Robustas:** Sistema completo de validações no backend para garantir a qualidade dos dados (formato de e-mail e telefone, senhas seguras, campos obrigatórios).
-   ✅ **Listagem de Animais:** Galeria com todos os pets disponíveis para adoção.
-   ✅ **Perfil Detalhado do Pet:** Página individual para cada animal com galeria de fotos, descrição, informações de contato do anunciante e status da adoção.
-   ✅ **Gerenciamento de Pets:** Usuários autenticados podem cadastrar novos animais para adoção.
-   ✅ **Fluxo de Adoção:** Sistema para iniciar e concluir um processo de adoção.
-   ✅ **Painel Pessoal:** Área do usuário para visualizar e gerenciar seus pets anunciados e suas candidaturas de adoção.

---

## 🛠️ Tecnologias Utilizadas

A aplicação foi construída com tecnologias modernas e eficientes do ecossistema JavaScript.

-   **Frontend:**
    -   [React.js](https://reactjs.org/)
    -   [CSS Modules](https://github.com/css-modules/css-modules)
    -   [Axios](https://axios-http.com/)

-   **Backend:**
    -   [Node.js](https://nodejs.org/)
    -   [Express.js](https://expressjs.com/)
    -   [Mongoose](https://mongoosejs.com/) (ODM para MongoDB)
    -   [JSON Web Tokens (JWT)](https://jwt.io/)
    -   [Bcrypt.js](https://github.com/kelektiv/node.bcrypt.js) (Para hashing de senhas)
    -   [Multer](https://github.com/expressjs/multer) (Para upload de imagens)

-   **Banco de Dados:**
    -   [MongoDB](https://www.mongodb.com/) (Banco de Dados NoSQL)

---

## 🚀 Começando

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) (servidor local ou um serviço em nuvem como o MongoDB Atlas)

### Instalação

1.  **Clone o repositório:**
    ```sh
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Configure o Backend:**
    -   Navegue até a pasta do backend: `cd backend`
    -   Instale as dependências:
      ```sh
      npm install
      ```

3.  **Configure o Frontend:**
    -   Navegue até a pasta do frontend: `cd ../frontend`
    -   Crie um arquivo `.env` na raiz da pasta `frontend`.
      ```env
      REACT_APP_API=http://localhost:5000
      ```
    -   Instale as dependências:
      ```sh
      npm install
      ```

### Executando a Aplicação

Você precisará de dois terminais abertos para executar o frontend e o backend simultaneamente.

1.  **Para iniciar o servidor Backend:**
    ```sh
    # No terminal 1, dentro da pasta /backend
    npm start
    ```
    O servidor será iniciado em `http://localhost:5000`.

2.  **Para iniciar o cliente Frontend:**
    ```sh
    # No terminal 2, dentro da pasta /frontend
    npm start
    ```
    A aplicação React será iniciada e abrirá em `http://localhost:3000` no seu navegador.

---

## 🗺️ Rotas da API (RESTful)

O backend expõe as seguintes rotas. Rotas marcadas com 🔒 requerem autenticação via token JWT no cabeçalho `Authorization`.

### Rotas de Usuário (`/users`)

| Método | Rota               | Descrição                                         |
| :----- | :----------------- | :------------------------------------------------ |
| `POST` | `/register`        | Registra um novo usuário.                         |
| `POST` | `/login`           | Autentica um usuário e retorna um token JWT.      |
| `GET`  | `/finduser`      🔒 | Retorna os dados do usuário logado via token.     |
| `GET`  | `/:id`             | Busca os dados de um usuário pelo seu ID.         |
| `PATCH`| `/edit/:id`      🔒 | Atualiza os dados do usuário (requer ser o dono). |

### Rotas de Pets (`/pets`)

| Método  | Rota                 | Descrição                                                     |
| :------ | :------------------- | :------------------------------------------------------------ |
| `POST`  | `/create`          🔒 | Cria um novo registro de pet (requer upload de imagens).      |
| `GET`   | `/`                  | Lista todos os pets disponíveis para adoção.                  |
| `GET`   | `/userPets`        🔒 | Lista todos os pets cadastrados pelo usuário logado.          |
| `GET`   | `/userAdoptions`   🔒 | Lista as adoções do usuário logado.                           |
| `GET`   | `/:id`               | Busca informações detalhadas de um pet pelo seu ID.           |
| `PATCH` | `/adopt/:id`       🔒 | Registra o interesse de um usuário em adotar um pet.          |
| `PATCH` | `/conclude/:id`    🔒 | Conclui o processo de adoção de um pet (requer ser o dono).   |
| `PATCH` | `/:id`             🔒 | Atualiza informações de um pet (requer ser o dono).           |
| `DELETE`| `/:id`             🔒 | Exclui o registro de um pet (requer ser o dono).              |

---

## 📝 Exemplo de Requisição

**Corpo da requisição para `POST /users/register`:**

```json
{
  "name": "Ricardo",
  "email": "ricardo.silva@example.com",
  "phone": "(16) 99137-3117",
  "password": "SenhaSegura123!",
  "confirmPassword": "SenhaSegura123!"
}
