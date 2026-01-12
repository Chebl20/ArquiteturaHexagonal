# Introdução ao Sistema de Consultas Médicas e Prontuários

## Visão Geral

Este projeto é uma implementação de um sistema de consultas médicas e prontuários, projetado com uma arquitetura hexagonal (Ports and Adapters) para garantir baixo acoplamento e alta coesão. O objetivo é criar um sistema robusto, testável e de fácil manutenção, separando a lógica de negócio das preocupações de infraestrutura.

## Arquitetura Hexagonal

A arquitetura hexagonal foi a base para a estruturação do projeto, dividindo-o em três camadas principais:

- **Core (`src/core`)**: O coração da aplicação. Contém as entidades de domínio (`Paciente`, `Consulta`, `Prontuario`, etc.), que encapsulam a lógica de negócio e as regras de validação. Esta camada é completamente independente de frameworks e tecnologias externas, garantindo que a lógica de negócio possa ser testada de forma isolada.

- **Application (`src/application`)**: A camada de aplicação define os casos de uso do sistema (use cases) através de interfaces (portas de entrada) e as dependências do mundo externo (como bancos de dados e serviços de notificação) através de outras interfaces (portas de saída). Ela orquestra as entidades de domínio para executar as funcionalidades da aplicação, como "Registrar um Prontuário" ou "Listar Consultas do Dia".

- **Adapters (`src/adapters`)**: Os adaptadores são a ponte entre a aplicação e o mundo externo. Eles implementam as portas definidas na camada de aplicação.
  - **Adaptadores de Entrada (`in`)**: Expor a aplicação a agentes externos. No nosso caso, um adaptador HTTP com Express expõe a API REST.
  - **Adaptadores de Saída (`out`)**: Implementam a comunicação com serviços externos. No nosso caso, temos repositórios em memória para persistência de dados e um serviço de notificação que escreve no console.

A **injeção de dependência** é realizada manualmente no arquivo `src/main/index.ts`, que atua como a "raiz da composição" (composition root). Este arquivo é responsável por "conectar os fios", ou seja, instanciar os adaptadores e injetá-los nos casos de uso, que por sua vez são injetados nos controladores.

Este design promove a separação de responsabilidades e o princípio da inversão de dependência (SOLID), tornando o sistema mais flexível a mudanças. Por exemplo, para trocar a persistência em memória por um banco de dados real, bastaria criar um novo adaptador que implemente as interfaces de repositório, sem a necessidade de alterar as camadas de aplicação ou domínio.
