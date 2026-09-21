# Professional Playwright Framework

Framework de automação desenvolvido com **Playwright + TypeScript** como terceiro nível da trilha **Playwright QA Lab**.

Este projeto parte dos fundamentos apresentados no **Playwright Starter Lab** e da automação estruturada apresentada no **Playwright Automation Lab** para demonstrar como projetar, organizar e manter uma suíte de automação de testes de forma profissional.

O objetivo não é simplesmente escrever mais testes.

O objetivo é entender **como estruturar uma solução de automação sustentável**.

---

## 🎯 Objetivo

Nos projetos anteriores, o foco evolui de escrever os primeiros testes para organizar uma suíte de automação.

Neste projeto, o foco passa a ser a **engenharia do framework**.

A evolução da trilha é:

```text
Playwright Starter Lab
        ↓
Aprender os fundamentos

Playwright Automation Lab
        ↓
Estruturar uma suíte de automação

Professional Playwright Framework
        ↓
Projetar e manter um framework de automação
```

O projeto demonstra, na prática:

- arquitetura de automação;
- separação de responsabilidades;
- testes API e E2E;
- Page Object Model;
- Service Layer;
- API Client;
- fixtures;
- geração de dados;
- contratos TypeScript;
- autenticação e `storageState`;
- estratégia de execução;
- testes positivos e negativos;
- CI/CD;
- debugging;
- manutenção de uma suíte de testes.

---

# 📚 Pré-requisitos

Este projeto faz parte de uma trilha progressiva.

É recomendado conhecer previamente:

- JavaScript/TypeScript básico;
- Playwright;
- locators;
- assertions;
- espera baseada em estado;
- Page Object Model;
- testes E2E;
- testes de API;
- fixtures;
- geração de dados;
- autenticação;
- Git;
- conceitos básicos de CI/CD.

Para quem está começando com Playwright, recomenda-se seguir primeiro os projetos anteriores da trilha.

---

# 🧠 O que este projeto ensina

## 1. Arquitetura de automação

Uma suíte profissional não deve concentrar toda a implementação dentro dos arquivos de teste.

O projeto separa responsabilidades entre diferentes camadas:

```text
tests/
    ↓
pages / services
    ↓
fixtures / data / auth
    ↓
Playwright / API
    ↓
Application Under Test
```

Cada camada possui uma responsabilidade específica.

---

## 2. Separação de responsabilidades

Um dos principais objetivos deste projeto é entender **onde cada responsabilidade deve estar**.

Por exemplo, nos testes de API:

```text
Test
 ↓
UsersService
 ↓
ApiClient
 ↓
API
```

O teste descreve o comportamento que precisa ser validado.

O `UsersService` representa operações relacionadas ao domínio de usuários.

O `ApiClient` concentra a comunicação HTTP.

Isso evita espalhar detalhes de implementação da API pelos testes.

---

# 🏗️ Estrutura do projeto

```text
professional-playwright-framework/
│
├── auth/
│   └── auth.helper.ts
│
├── config/
│   └── environment.ts
│
├── data/
│   ├── users.ts
│   └── invoices.ts
│
├── fixtures/
│   ├── api.fixture.ts
│   ├── cart.fixture.ts
│   ├── invoice.fixture.ts
│   └── test.fixture.ts
│
├── pages/
│   ├── account.page.ts
│   ├── login.page.ts
│   └── register.page.ts
│
├── services/
│   ├── api.client.ts
│   ├── auth.service.ts
│   ├── cart.service.ts
│   ├── invoice.service.ts
│   ├── products.service.ts
│   └── users.service.ts
│
├── tests/
│   ├── api/
│   ├── e2e/
│   ├── setup/
│   └── smoke/
│
├── utils/
│   ├── api-error.ts
│   ├── api-types.ts
│   └── assertions.ts
│
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

# 🧪 Estratégia de testes

O projeto trabalha com duas estratégias principais:

```text
API Testing
     +
E2E Testing
```

A escolha da camada depende do comportamento que queremos validar.

## API

Quando uma regra pode ser validada diretamente pela API, não existe necessariamente motivo para passar pela interface.

```text
Test
 ↓
Service
 ↓
API
```

## E2E

Quando precisamos validar o comportamento do usuário através da interface:

```text
Test
 ↓
Page Object
 ↓
Browser
 ↓
Application
```

A ideia é utilizar cada camada de teste de acordo com o objetivo da validação.

---

# 🔌 API Testing

Os testes de API são organizados por domínio:

```text
tests/api/
├── auth.spec.ts
├── users.spec.ts
├── user-profile.spec.ts
├── products.spec.ts
├── cart.spec.ts
├── cart-negative.spec.ts
├── invoice.spec.ts
└── invoice-negative.spec.ts
```

A comunicação HTTP é centralizada no:

```text
services/api.client.ts
```

Enquanto cada domínio possui seu próprio service.

Exemplo:

```text
users.spec.ts
      ↓
UsersService
      ↓
ApiClient
      ↓
/users/...
```

Isso permite que os testes expressem intenção sem conhecer os detalhes da implementação HTTP.

---

# 🖥️ E2E Testing

Os testes de interface utilizam Page Objects:

```text
tests/e2e/
      ↓
Page Objects
      ↓
Playwright
      ↓
Application
```

Exemplos:

```text
LoginPage
RegisterPage
AccountPage
```

O objetivo do Page Object não é esconder absolutamente tudo.

Ele deve concentrar comportamentos e detalhes de interação que realmente precisam ser reutilizados ou abstraídos.

---

# 🔐 Authentication e Test State

O projeto diferencia testes que precisam de autenticação daqueles que devem começar sem autenticação.

## Testes públicos

Executados pelo projeto:

```text
chromium-public
```

Esses testes não recebem `storageState`.

Exemplos:

- login;
- registro;
- smoke tests.

## Testes autenticados

Executados pelo projeto:

```text
chromium-authenticated
```

Esses testes utilizam:

```text
auth/user.json
```

gerado pelo projeto de setup.

O fluxo é:

```text
Setup
 ↓
Create User
 ↓
Register
 ↓
Login
 ↓
Create storageState
 ↓
Authenticated tests
```

Essa separação evita que todos os testes comecem implicitamente autenticados.

---

# 🧩 Fixtures

Fixtures são utilizadas para compor dependências necessárias aos testes.

Exemplos:

```text
test.fixture.ts
api.fixture.ts
cart.fixture.ts
invoice.fixture.ts
```

Uma fixture deve existir quando realmente facilita a composição ou preparação do cenário.

Nem toda função reutilizável precisa virar uma fixture.

Essa distinção é importante para evitar uma arquitetura excessivamente abstrata.

---

# 📦 Test Data

Os dados de teste ficam separados da implementação dos testes.

Exemplo:

```text
data/users.ts
```

O projeto utiliza geração dinâmica de dados quando necessário.

Por exemplo, usuários podem receber emails únicos:

```text
automation.<unique-id>@example.com
```

Isso reduz colisões entre execuções.

---

# 🔷 TypeScript e contratos

O TypeScript é utilizado para definir contratos entre as diferentes camadas.

Exemplo:

```text
CreateUserRequest
       ↓
createUser()
       ↓
UsersService.register()
       ↓
RegisterPage
```

Isso evita que cada camada mantenha uma definição diferente do mesmo objeto.

Um contrato tipado ajuda a identificar inconsistências durante o desenvolvimento, antes da execução dos testes.

---

# ❌ Testes negativos

Uma suíte profissional não deve validar apenas caminhos felizes.

O projeto possui cenários negativos para diferentes domínios.

Exemplos:

```text
Autenticação
→ credenciais inválidas

Users
→ dados inválidos
→ usuário duplicado

Products
→ produto inexistente

Cart
→ dados inválidos
→ recursos inexistentes

Invoice
→ dados inválidos
```

Um ponto importante é distinguir:

```text
estrutura válida
        ≠
dados válidos
```

Um objeto pode respeitar o contrato TypeScript e ainda assim ser rejeitado pela API devido aos seus valores.

---

# 🏷️ Tags e seleção de testes

Os testes utilizam tags para facilitar a seleção de diferentes grupos.

Exemplos:

```text
@smoke
@regression
@negative
@authenticated
```

Isso permite executar subconjuntos da suíte conforme a necessidade.

Por exemplo:

```bash
npx playwright test --grep @smoke
```

ou:

```bash
npx playwright test --grep @negative
```

A ideia é evitar que toda execução precise necessariamente executar todos os testes.

---

# ⚙️ Configuração

A configuração principal está em:

```text
playwright.config.ts
```

As URLs são obtidas através de variáveis de ambiente:

```text
BASE_URL
API_URL
```

A configuração separa os diferentes contextos de execução:

```text
setup
api
chromium-public
chromium-authenticated
```

Essa separação permite que cada grupo tenha suas próprias características.

---

# 🌎 Ambientes

As configurações específicas do ambiente não devem ser incorporadas diretamente aos testes.

O projeto utiliza:

```text
config/environment.ts
```

com variáveis de ambiente como:

```text
BASE_URL
API_URL
```

Para ambientes diferentes, os valores podem ser alterados sem modificar os testes.

---

# 🔄 CI/CD

O projeto possui integração com GitHub Actions.

A validação automatizada inclui etapas como:

```text
Install dependencies
        ↓
Formatting
        ↓
TypeScript
        ↓
API tests
```

Os testes E2E dependem de um ambiente externo utilizado pelo projeto.

Por isso, a estratégia de execução do CI deve considerar a disponibilidade e o comportamento desse ambiente.

O objetivo é que o pipeline produza feedback confiável, e não simplesmente execute a maior quantidade possível de testes.

---

# 🐞 Debugging

O Playwright está configurado para coletar evidências quando um teste falha:

```text
Trace
Screenshot
Video
HTML Report
```

A ideia é utilizar essas ferramentas para investigar a causa da falha.

Um processo de debugging deve seguir aproximadamente:

```text
Falha
 ↓
Reprodução
 ↓
Identificação da camada
 ↓
Coleta de evidências
 ↓
Hipótese
 ↓
Correção
 ↓
Nova execução
```

O objetivo não é apenas fazer o teste passar novamente, mas entender a causa do problema.

---

# 🧹 Manutenção

Um framework profissional não deve crescer apenas em quantidade de código.

Uma melhoria também pode significar:

- remover duplicação;
- melhorar um contrato;
- simplificar uma abstração;
- melhorar isolamento;
- reduzir acoplamento;
- corrigir uma responsabilidade colocada na camada errada;
- remover código que não possui consumidor.

Uma regra importante deste projeto é:

> **Não criar abstrações sem uma necessidade real.**

Uma arquitetura maior não é necessariamente uma arquitetura melhor.

---

# ▶️ Como executar

## Instalar dependências

```bash
npm ci
```

## Executar todos os testes

```bash
npm test
```

## Executar testes de API

```bash
npm run test:api
```

## Executar E2E

```bash
npx playwright test tests/e2e
```

## Executar smoke tests

```bash
npx playwright test tests/smoke
```

## Executar apenas Chromium público

```bash
npx playwright test --project=chromium-public
```

## Executar apenas Chromium autenticado

```bash
npx playwright test --project=chromium-authenticated
```

## Verificar TypeScript

```bash
npx tsc --noEmit
```

## Verificar formatação

```bash
npm run format:check
```

## Abrir relatório HTML

```bash
npm run report
```

---

# 📊 Estado atual

A suíte atual contém testes de:

```text
API
├── Authentication
├── Users
├── User Profile
├── Products
├── Cart
└── Invoice

E2E
├── Login
├── Register
├── Account
└── Smoke
```

A execução atual utiliza Chromium para os testes E2E.

Firefox e WebKit podem ser adicionados posteriormente quando houver uma necessidade específica de compatibilidade.

---

# 🎓 Relação com os projetos anteriores

Este projeto faz parte de uma progressão.

## 01 — Playwright Starter Lab

**Foco:** fundamentos.

O aluno aprende a escrever seus primeiros testes com Playwright.

```text
test
expect
locator
interação
assertions
waiting
```

## 02 — Playwright Automation Lab

**Foco:** automação estruturada.

O aluno passa a trabalhar com:

```text
TypeScript
Page Object
API Testing
Test Data
Fixtures
CI/CD
Reports
Debugging
```

## 03 — Professional Playwright Framework

**Foco:** arquitetura e engenharia de automação.

O aluno passa a trabalhar com:

```text
Framework Architecture
Service Layer
API Client
Test Strategy
Authentication State
Type Safety
Fixtures
API + E2E
CI/CD
Maintenance
```

A progressão é:

```text
Escrever testes
      ↓
Estruturar testes
      ↓
Projetar e manter um framework
```

---

# 🚫 O que este projeto não pretende fazer

Este framework não tenta adicionar uma ferramenta ou uma camada para cada possível necessidade.

Não são objetivos deste projeto:

- criar abstrações sem necessidade;
- testar tudo pela UI;
- aumentar a quantidade de código apenas para parecer mais avançado;
- utilizar múltiplos browsers sem um requisito real;
- criar fixtures para toda função reutilizável;
- adicionar ferramentas externas apenas para aumentar a complexidade;
- transformar cada locator em um método;
- utilizar waits fixos para mascarar problemas de sincronização.

O objetivo é demonstrar **decisões de engenharia aplicadas a uma suíte de automação**.

---

# 📖 Playwright QA Lab

Este projeto faz parte do **Playwright QA Lab**, uma trilha prática de aprendizado de automação de testes.

A proposta da trilha é evoluir progressivamente:

```text
Fundamentos
    ↓
Automação estruturada
    ↓
Arquitetura e engenharia
```

Cada projeto utiliza uma aplicação real de teste para transformar conceitos de automação em código executável.

---

# 📝 Próximos passos

A evolução deste projeto pode incluir conteúdos relacionados a:

- estratégias avançadas de execução;
- manutenção de suites;
- isolamento de testes;
- arquitetura de fixtures;
- evolução de CI/CD;
- análise de falhas;
- decisões arquiteturais;
- escalabilidade de frameworks.

O objetivo é evoluir o framework junto com os conceitos apresentados na trilha de aprendizado.
