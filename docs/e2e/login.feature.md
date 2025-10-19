# Feature: Autenticação e Login

## Descrição

Como um usuário do sistema
Eu quero realizar login na aplicação
Para que eu possa acessar as funcionalidades protegidas

---

## Cenário 1: Login bem-sucedido

**Tags**: `@smoke` `@critical` `@P0`

**Objetivo**: Verificar que o usuário consegue fazer login com sucesso

### Given (Dado)

```gherkin
Dado que estou na página de login
E a aplicação está carregada completamente
```

### When (Quando)

```gherkin
Quando eu clico no botão "Login"
```

### Then (Então)

```gherkin
Então devo ver uma notificação de sucesso com a mensagem "Welcome!."
E devo ser redirecionado para a página "/chat"
E a URL atual deve ser "/chat"
```

---

## Cenário 2: Elementos visuais da página de login

**Tags**: `@ui` `@regression` `@P1`

**Objetivo**: Verificar que todos os elementos visuais estão presentes na página de login

### Given (Dado)

```gherkin
Dado que estou na página de login
```

### When (Quando)

```gherkin
Quando a página terminar de carregar
```

### Then (Então)

```gherkin
Então devo ver a imagem do logo "/assets/images/lemon-icon.png"
E devo ver o título "Boilerplate"
E devo ver o subtítulo "A amazing boilerplate using react, firebase, zustand and more!"
E devo ver o botão "Login"
E o background deve ter a imagem "login-background.jpg"
E o container deve ter as classes de estilo corretas:
  | Classe                  | Presente |
  | rounded-xl              | sim      |
  | bg-gray-800             | sim      |
  | bg-opacity-50           | sim      |
  | backdrop-blur-md        | sim      |
```

---

## Cenário 3: Responsividade da página de login

**Tags**: `@responsive` `@ui` `@P2`

**Objetivo**: Verificar que a página de login é responsiva em diferentes tamanhos de tela

### Given (Dado)

```gherkin
Dado que estou na página de login
```

### When (Quando)

```gherkin
Quando eu redimensionar a janela para <largura> x <altura>
```

### Then (Então)

```gherkin
Então o layout deve se adaptar corretamente
E todos os elementos devem permanecer visíveis
E o padding deve ser ajustado conforme o tamanho da tela

Exemplos:
  | largura | altura | classe_padding |
  | 320     | 568    | max-sm:px-8    |
  | 768     | 1024   | px-16          |
  | 1920    | 1080   | px-16          |
```

---

## Cenário 4: Interação com o botão de login

**Tags**: `@ui` `@P1`

**Objetivo**: Verificar que o botão de login é interativo e possui os estados corretos

### Given (Dado)

```gherkin
Dado que estou na página de login
```

### When (Quando)

```gherkin
Quando eu passo o mouse sobre o botão "Login"
```

### Then (Então)

```gherkin
Então o cursor deve mudar para "pointer"
E o botão deve ter as classes de estilo:
  | Classe      | Presente |
  | text-lg     | sim      |
  | text-white  | sim      |
  | font-bold   | sim      |
```

---

## Cenário 5: Navegação direta para a página de login

**Tags**: `@smoke` `@P0`

**Objetivo**: Verificar que é possível acessar a página de login diretamente pela URL

### Given (Dado)

```gherkin
Dado que estou em qualquer página da aplicação
```

### When (Quando)

```gherkin
Quando eu navego diretamente para "/"
```

### Then (Então)

```gherkin
Então devo ver a página de login
E todos os elementos devem estar visíveis
E a página deve estar totalmente carregada
```

---

## Cenário 6: Exibição da notificação de sucesso

**Tags**: `@ui` `@notification` `@P1`

**Objetivo**: Verificar que a notificação de sucesso é exibida corretamente

### Given (Dado)

```gherkin
Dado que estou na página de login
```

### When (Quando)

```gherkin
Quando eu clico no botão "Login"
```

### Then (Então)

```gherkin
Então uma notificação toast deve aparecer
E a notificação deve ter o tipo "success"
E a mensagem deve ser "Welcome!."
E a notificação deve desaparecer após alguns segundos
```

---

## Cenário 7: Acessibilidade da página de login

**Tags**: `@a11y` `@P2`

**Objetivo**: Verificar que a página de login possui recursos de acessibilidade

### Given (Dado)

```gherkin
Dado que estou na página de login
```

### When (Quando)

```gherkin
Quando eu navego pela página usando apenas o teclado
```

### Then (Então)

```gherkin
Então devo conseguir focar no botão de login usando a tecla Tab
E devo conseguir clicar no botão usando a tecla Enter ou Space
E as imagens devem ter atributos alt apropriados
```

---

## Cenário 8: Performance do carregamento da página

**Tags**: `@performance` `@P2`

**Objetivo**: Verificar que a página de login carrega rapidamente

### Given (Dado)

```gherkin
Dado que limpo o cache do navegador
```

### When (Quando)

```gherkin
Quando eu acesso a página de login
```

### Then (Então)

```gherkin
Então a página deve carregar em menos de 3 segundos
E todas as imagens devem estar visíveis
E todos os estilos devem estar aplicados
```

---

## Dados de Teste

### Imagens Esperadas

- Logo: `/assets/images/lemon-icon.png` (150px width)
- Background: `assets/images/login-background.jpg`

### Textos Esperados

- Título principal: "Boilerplate"
- Subtítulo: "A amazing boilerplate using react, firebase, zustand and more!"
- Texto do botão: "Login"
- Mensagem de sucesso: "Welcome!."

### Rotas

- Página de login: `/`
- Redirecionamento após login: `/chat`

---

**Prioridade Geral**: P0 (Crítico)

**Estimativa de Execução**: ~5 minutos

**Dependências**: Nenhuma
