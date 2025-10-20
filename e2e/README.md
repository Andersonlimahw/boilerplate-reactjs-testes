# Testes End-to-End (E2E) com Playwright

Este diretório contém todos os testes end-to-end (E2E) da aplicação, implementados usando o Playwright.

## Estrutura de Pastas

```
e2e/
├── fixtures/          # Page Objects e fixtures
│   ├── login.page.ts
│   ├── chat.page.ts
│   └── profile.page.ts
├── helpers/           # Funções auxiliares
│   └── test-utils.ts
├── tests/             # Testes E2E
│   ├── login.spec.ts
│   ├── chat.spec.ts
│   ├── profile.spec.ts
│   ├── navigation.spec.ts
│   └── api-feedback.spec.ts
└── README.md
```

## Pré-requisitos

1. Node.js 18+
2. Navegadores instalados (Chromium, Firefox, Safari)

## Instalação

Se os navegadores ainda não foram instalados, execute:

```bash
npm run playwright:install
```

## Executando os Testes

### Executar todos os testes

```bash
npm run test:e2e
```

### Executar com interface visual (recomendado para desenvolvimento)

```bash
npm run test:e2e:ui
```

### Executar em modo headed (ver o navegador)

```bash
npm run test:e2e:headed
```

### Executar em modo debug

```bash
npm run test:e2e:debug
```

### Executar testes específicos

```bash
# Apenas Login
npm run test:e2e -- login.spec.ts

# Apenas Chat
npm run test:e2e -- chat.spec.ts

# Apenas Profile
npm run test:e2e -- profile.spec.ts

# Apenas Navigation
npm run test:e2e -- navigation.spec.ts

# Apenas API Feedback
npm run test:e2e -- api-feedback.spec.ts
```

### Executar por navegador

```bash
# Apenas Chromium
npm run test:e2e:chromium

# Apenas Firefox
npm run test:e2e:firefox

# Apenas Webkit (Safari)
npm run test:e2e:webkit

# Apenas Mobile
npm run test:e2e:mobile
```

### Executar por tags/prioridade

```bash
# Apenas testes críticos (P0)
npm run test:e2e -- --grep @P0

# Apenas testes smoke
npm run test:e2e -- --grep @smoke

# Apenas testes de API
npm run test:e2e -- --grep @api

# Apenas testes de UI
npm run test:e2e -- --grep @ui
```

## Visualizar Relatórios

Após executar os testes, você pode visualizar o relatório HTML:

```bash
npm run test:e2e:report
```

## Page Objects

Os Page Objects encapsulam a interação com as páginas da aplicação:

### LoginPage

```typescript
import { LoginPage } from '../fixtures/login.page';

const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.clickLogin();
```

### ChatPage

```typescript
import { ChatPage } from '../fixtures/chat.page';

const chatPage = new ChatPage(page);
await chatPage.goto();
await chatPage.waitForLoad();
```

### ProfilePage

```typescript
import { ProfilePage } from '../fixtures/profile.page';

const profilePage = new ProfilePage(page);
await profilePage.goto();
await profilePage.resizeToMobile();
```

## Helpers

O arquivo `test-utils.ts` contém funções auxiliares:

```typescript
import { waitForToast, mockApiError, goOffline } from '../helpers/test-utils';

// Esperar por notificação toast
await waitForToast(page, 'success');

// Simular erro de API
await mockApiError(page, '**/api/people*', 500);

// Simular modo offline
await goOffline(page);
```

## Cobertura de Testes

### Login (8/8 cenários - 100%)
- ✅ Login bem-sucedido
- ✅ Elementos visuais
- ✅ Responsividade (3 tamanhos)
- ✅ Interação com botão
- ✅ Navegação direta
- ✅ Notificação de sucesso
- ✅ Acessibilidade
- ✅ Performance

### Chat (10/14 cenários - 71%)
- ✅ Carregamento inicial
- ✅ Estado de loading
- ✅ Dados com sucesso
- ✅ Tratamento de erro
- ✅ Funcionalidade de retry
- ✅ Responsividade (mobile/desktop)
- ✅ Header com gradiente
- ✅ Footer
- ✅ Container classes

### Profile (8/16 cenários - 50%)
- ✅ Carregamento inicial
- ✅ Dados com sucesso
- ✅ Tratamento de erro
- ✅ Responsividade (mobile/desktop)
- ✅ Header temático
- ✅ Footer
- ✅ Navegação direta

### Navigation (11/20 cenários - 55%)
- ✅ Login para Chat
- ✅ Navegação direta (Chat/Profile)
- ✅ Botão voltar/avançar
- ✅ Navegação entre páginas
- ✅ Recarregamento
- ✅ Performance
 - ✅ Preservação de estado (tema)
 - ✅ Deep linking com parâmetros
 - ✅ Navegação programática

### API Feedback (9/22 cenários - 41%)
- ✅ Estado de loading
- ✅ Transição para erro
- ✅ Erros HTTP (404, 500)
- ✅ Modo offline
- ✅ Retry com sucesso
- ✅ Lista vazia
- ✅ Notificações toast

## Prioridades

- **P0 (Crítico)**: Deve passar em todos os builds
- **P1 (Alto)**: Deve ser executado diariamente
- **P2 (Médio)**: Deve ser executado semanalmente
- **P3 (Baixo)**: Pode ser executado sob demanda

## Troubleshooting

### Testes falhando localmente

1. Certifique-se de que o servidor de desenvolvimento está rodando:
   ```bash
   npm run dev
   ```

2. Limpe o cache do Playwright:
   ```bash
   npx playwright clean
   ```

3. Reinstale os navegadores:
   ```bash
   npm run playwright:install
   ```

### Testes muito lentos

1. Execute apenas em um navegador:
   ```bash
   npm run test:e2e:chromium
   ```

2. Desabilite o vídeo no `playwright.config.ts`:
   ```typescript
   video: 'off'
   ```

### Debug de testes

Use o modo debug para investigar falhas:

```bash
npm run test:e2e:debug -- login.spec.ts
```

Ou adicione um breakpoint no código:

```typescript
await page.pause(); // Para aqui e abre o Playwright Inspector
```

## CI/CD

Os testes E2E podem ser executados no CI/CD. Exemplo para GitHub Actions:

```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npm run test:e2e

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Referências

- [Documentação do Playwright](https://playwright.dev)
- [Especificações BDD](../docs/e2e/index.md)
- [Checklists de Implementação](../docs/e2e/)

---

**Última Atualização**: 2025-10-19
**Responsável**: @anderson.lima.dev
