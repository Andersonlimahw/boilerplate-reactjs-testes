# Especifica��o BDD - Testes E2E

## Vis�o Geral

Este documento cont�m as especifica��es em formato BDD (Behavior-Driven Development) para os testes end-to-end do boilerplate React. Os testes s�o organizados por funcionalidade e seguem o padr�o Gherkin (Given-When-Then).

## Estrutura da Aplica��o

A aplica��o possui as seguintes p�ginas principais:
- **Login**: P�gina de autentica��o do usu�rio
- **Chat**: P�gina principal com funcionalidades de chat
- **Profile**: P�gina de perfil do usu�rio

## Framework de Testes

Os testes E2E ser�o implementados utilizando:
- **playwright**: [Framework de automa��o web](https://playwright.dev/)
- **Vitest**: Framework de testes
- **Gherkin**: Linguagem para especifica��o de comportamento

## Organiza��o dos Testes

Os cen�rios de teste est�o organizados nos seguintes arquivos:

1. [login.feature.md](./login.feature.md) - Cen�rios de autentica��o e login
2. [chat.feature.md](./chat.feature.md) - Cen�rios da p�gina de chat
3. [profile.feature.md](./profile.feature.md) - Cen�rios da p�gina de perfil
4. [components.feature.md](./components.feature.md) - Cen�rios de componentes compartilhados
5. [navigation.feature.md](./navigation.feature.md) - Cen�rios de navega��o e rotas
6. [api-feedback.feature.md](./api-feedback.feature.md) - Cen�rios de feedback de API

## Conven��es

### Tags
- `@smoke`: Testes cr�ticos que devem passar sempre
- `@regression`: Testes de regress�o
- `@critical`: Funcionalidades cr�ticas do sistema
- `@ui`: Testes de interface
- `@api`: Testes que envolvem requisi��es API
- `@responsive`: Testes de responsividade

### Prioridades
- **P0**: Cr�tico - Deve ser executado em todos os builds
- **P1**: Alto - Deve ser executado diariamente
- **P2**: M�dio - Deve ser executado semanalmente
- **P3**: Baixo - Pode ser executado sob demanda

## Ambiente de Testes

### Pr�-requisitos
- Node.js 18+
- Navegadores suportados: Chrome, Firefox, Safari
- API mockada com MirageJS

### Execu��o dos Testes

```bash
# Executar todos os testes E2E
npm run test:e2e

# Executar testes espec�ficos
npm run test:e2e -- --spec=login

# Executar com interface gr�fica
npm run test:e2e:ui

# Executar em modo headless
npm run test:e2e:headless
```

## Cobertura de Testes

### M�nimos Aceit�veis
- **Funcionalidades Cr�ticas**: 100%
- **Fluxos Principais**: 90%
- **Componentes UI**: 80%
- **Edge Cases**: 70%

## Dados de Teste

Os dados de teste s�o gerenciados atrav�s do MirageJS e incluem:
- Usu�rios mock para autentica��o
- Dados da SWAPI (Star Wars API) para testes de requisi��es
- Estados de erro simulados

## Manuten��o

Este documento deve ser atualizado sempre que:
- Novas funcionalidades forem adicionadas
- Fluxos de usu�rio forem modificados
- Bugs cr�ticos forem identificados e corrigidos
- Novos cen�rios de edge case forem descobertos

---

**�ltima atualiza��o**: 2025-10-19
**Respons�vel**: @anderson.lima.dev
**Vers�o**: 1.0.0
