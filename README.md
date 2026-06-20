# StockControl

## Dependências e afins

npm install
npx expo install @react-native-async-storage/async-storage
npm audit fix --force
npm install firebase --force




para iniciar a aplicação : npx expo start

## Descrição

O StockControl é um aplicativo mobile desenvolvido em React Native com Expo para auxiliar no controle simples de estoque de pequenos mercados, comércios e estabelecimentos que necessitam acompanhar seus produtos de forma prática.

O aplicativo permite cadastrar, visualizar, editar, pesquisar e excluir produtos armazenados no estoque, mantendo as informações organizadas e acessíveis diretamente pelo dispositivo móvel.

## Funcionalidades Implementadas

### Cadastro de Produtos

O usuário pode cadastrar novos produtos informando:

- Nome do produto
- Categoria
- Preço
- Quantidade em estoque

Após o cadastro, o produto é armazenado localmente no dispositivo.

### Listagem de Produtos

Todos os produtos cadastrados são exibidos em uma lista organizada contendo:

- Nome
- Categoria
- Preço
- Quantidade disponível
- Status do estoque

O status do estoque é calculado automaticamente:

- Em estoque
- Estoque baixo
- Sem estoque

### Pesquisa de Produtos

O aplicativo possui um campo de busca que permite localizar produtos rapidamente através do nome.

A lista é atualizada em tempo real conforme o usuário digita.

### Edição de Produtos

Os produtos cadastrados podem ser editados a qualquer momento.

O usuário pode alterar:

- Nome
- Categoria
- Preço
- Quantidade

As alterações são salvas automaticamente no armazenamento local.

### Exclusão de Produtos

O aplicativo permite remover produtos do estoque.

Antes da exclusão, uma confirmação é exibida para evitar remoções acidentais.

### Dashboard

A tela principal apresenta indicadores gerais do estoque:

- Total de produtos cadastrados
- Quantidade total de itens em estoque
- Produtos com estoque baixo

Essas informações auxiliam no acompanhamento rápido da situação do estoque.

## Armazenamento Local

O aplicativo utiliza AsyncStorage para armazenar os dados localmente no dispositivo.

Dessa forma, os produtos permanecem disponíveis mesmo após o fechamento do aplicativo.

## Funcionamento Offline

O StockControl foi desenvolvido com foco em utilização local, permitindo que todas as funcionalidades principais continuem operando mesmo sem conexão com a internet.

O usuário pode:

- Cadastrar produtos
- Consultar produtos
- Editar produtos
- Excluir produtos
- Pesquisar produtos

sem depender de conexão externa.

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- Expo Router
- AsyncStorage