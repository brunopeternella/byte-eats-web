# Byte Eats Web

## Observação

O WebApp não está configurado para ser 100% responsivo e nem com todos os recursos esperados.

Entenda-o como uma breve e simples demonstração.

**Recomendado acessá-lo via Desktop.**

## Descrição

Este é um WebApp desenvolvido em Angular que consome a API Byte Eats em .NET para gerenciar e exibir pedidos. O aplicativo é responsivo e possui integração **parcial** com a API, sendo listagem de produtos, criação de pedidos e edição de pedidos (status e pagamento).

## Rotas

- **/**: Listagem de produtos com suas respectivas propriedades.
- **/admin**: Painel de administrador, onde há um menu que separado por contexo. **(Atualmente, apenas a página de pedidos)**
- **/admin/orders**: Acompanhamentos e atualização de pedidos. **(Atualmente não atualiza a página automáticamente)**

## Funcionalidades

### Usuário

- Adição de produtos no carrinho.
- Criação do pedido (atualmente gera um usuário mock aleatório via API).

### Admin (não há autenticação)

- Acompanhamentos de pedidos no formato Kaban.
- Atualização de status e pagamento de pedidos.

## Configuração

1. **Clone o Repositório**

    ```bash
    git clone https://github.com/brunopeternella/byte-eats-web.git
    cd byte-eats-web
    ```

2. **Instale as Dependências**

    ```bash
    npm install
    ```

3. **Configuração do Apontamento para a API**

    Atualize o arquivo `proxy.conf.json` com a o host e porta da API.
    Atualmente a porta está como `44317`, no qual é a porta utilizada caso deseje rodar via IIS.

4. **Execute o WebApp**

    ```bash
    ng serve
    ```

    Navegue até `http://localhost:4200` para acessar a aplicação.

## Estrutura do Projeto

- `src/app/components/` - Componentes da aplicação.
- `src/app/pages/` - Componentes atrelados a rotas da aplicação.
- `src/app/enums/` - Enums utilizados na aplicação.
- `src/app/models/` - Modelos de dados.
- `src/app/services/` - Camada de serviços responsável pelas requests e gerenciamento da aplicação.

## Design Patterns

- **Component-Based Architecture**: Organização (ou quase, rs) de UI em componentes reutilizáveis.
- **Service Pattern**: Para gerenciar a comunicação com a API.

## Publicação

O WebApp está publicado no Azure e acessível em `https://crossnexus.tech/web/byte-eats/`.

## Configuração do NGINX

- **Descrição**: O container do WebApp utiliza o NGINX como servidor web para servir o conteúdo estático da aplicação. O NGINX está configurado para fazer o proxy reverso para a aplicação.
- **Localização**: A configuração do NGINX está definida no arquivo `nginx.conf` incluído no Dockerfile.

## Pipeline (CI/CD)

### CI

#### Estágios

##### Pré Build

- **Job**: `BuildAndTest`
  - **Passos**:
    - Instalar Node.js versão 18.20
    - Executar `npm install` e `npm run build --prod`
    - Executar `npm run test` (continuar em erro)
    - Publicar resultados de cobertura de código

##### Build

- **Job**: `DockerBuild`
  - **Passos**:
    - Construir imagem Docker (`byte-eats-web:latest`)
    - Salvar imagem como `byte-eats-web-latest.tar.gz`
    - Publicar artefato Docker como resultado da Run

### CD

O processo de CD é disparado após o artefato (imagem docker) ser gerado pelo CI.

Foram utilizados conceitos simples de publicação no servidor.

- Baixa a imagem do Azure para o Agent
- Carrega o .tar.gz como uma docker image
- Para o container atual
- Remove o container atual
- Sobe um novo container com a nova imagem
