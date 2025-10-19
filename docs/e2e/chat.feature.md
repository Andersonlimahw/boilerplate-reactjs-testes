# Feature: Página de Chat

## Descrição

Como um usuário autenticado
Eu quero acessar e interagir com a página de chat
Para que eu possa visualizar informações e conversar

---

## Cenário 1: Carregamento inicial da página de chat

**Tags**: `@smoke` `@critical` `@P0`

**Objetivo**: Verificar que a página de chat carrega corretamente

### Given (Dado)

```gherkin
Dado que estou autenticado no sistema
E navego para a página "/chat"
```

### When (Quando)

```gherkin
Quando a página terminar de carregar
```

### Then (Então)

```gherkin
Então devo ver o header com gradiente de cores
E devo ver o texto "Happy customs!"
E devo ver o texto "Request sample result on right!"
E devo ver o componente Footer
E devo ver a área de mensagens no lado direito
```

---

## Cenário 2: Exibição do estado de loading

**Tags**: `@api` `@ui` `@P0`

**Objetivo**: Verificar que o componente de loading é exibido durante requisições

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
E a API ainda não retornou os dados
```

### When (Quando)

```gherkin
Quando a página está carregando dados da API
```

### Then (Então)

```gherkin
Então devo ver o componente LoadingComponent
E o componente deve ter animação de carregamento
E o estado da tela deve ser "loading"
```

---

## Cenário 3: Exibição de dados da API com sucesso

**Tags**: `@api` `@critical` `@P0`

**Objetivo**: Verificar que os dados da API são exibidos corretamente

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
E a API retornou dados com sucesso
```

### When (Quando)

```gherkin
Quando os dados forem carregados
```

### Then (Então)

```gherkin
Então devo ver o título "Lets code!"
E devo ver "Api : Response"
E devo ver o contador de registros "count: <numero>"
E devo ver o nome do primeiro registro "Name: <nome>"
E o estado da tela deve ser "success"

Exemplos:
  | numero | nome            |
  | 10     | Luke Skywalker  |
  | 5      | Darth Vader     |
```

---

## Cenário 4: Tratamento de erro da API

**Tags**: `@api` `@error` `@P0`

**Objetivo**: Verificar que erros da API são tratados corretamente

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
E a API retornou um erro
```

### When (Quando)

```gherkin
Quando o erro for processado
```

### Then (Então)

```gherkin
Então devo ver o componente ErrorApiComponent
E devo ver um botão de "Retry" ou "Tentar novamente"
E o estado da tela deve ser "error"
```

---

## Cenário 5: Funcionalidade de retry após erro

**Tags**: `@api` `@error` `@P1`

**Objetivo**: Verificar que é possível tentar novamente após um erro

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
E a API retornou um erro
E o ErrorApiComponent está visível
```

### When (Quando)

```gherkin
Quando eu clico no botão de retry
```

### Then (Então)

```gherkin
Então uma nova requisição deve ser feita
E o componente LoadingComponent deve aparecer
E se a requisição for bem-sucedida, os dados devem ser exibidos
```

---

## Cenário 6: Exibição de conteúdo vazio

**Tags**: `@api` `@P1`

**Objetivo**: Verificar que o estado de "sem conteúdo" é exibido corretamente

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
E a API retornou uma lista vazia
```

### When (Quando)

```gherkin
Quando os dados forem processados
```

### Then (Então)

```gherkin
Então devo ver o componente NoContentComponent
E devo ver uma mensagem indicando que não há conteúdo
E o estado da tela deve ser "noCotent"
```

---

## Cenário 7: Responsividade - Visualização mobile

**Tags**: `@responsive` `@ui` `@P1`

**Objetivo**: Verificar que a página se adapta para telas mobile

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
```

### When (Quando)

```gherkin
Quando eu redimensionar a janela para largura <= 690px
```

### Then (Então)

```gherkin
Então o layout deve mudar para modo mobile
E as classes "min-[0px]:block" devem ser aplicadas ao container
E a área de mensagens deve ocupar toda a largura
E o screenType deve ser "mobile"
```

---

## Cenário 8: Responsividade - Visualização desktop

**Tags**: `@responsive` `@ui` `@P1`

**Objetivo**: Verificar que a página se adapta para telas desktop

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
```

### When (Quando)

```gherkin
Quando eu redimensionar a janela para largura > 690px
```

### Then (Então)

```gherkin
Então o layout deve mudar para modo desktop
E as classes "min-[690px]:flex flex" devem ser aplicadas ao container
E o conteúdo deve ser exibido em duas colunas
E o screenType deve ser "default"
```

---

## Cenário 9: Exibição do header com gradiente

**Tags**: `@ui` `@P2`

**Objetivo**: Verificar que o header possui o gradiente correto baseado no tema

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
E o tema está configurado
```

### When (Quando)

```gherkin
Quando a página renderizar
```

### Then (Então)

```gherkin
Então o header deve ter altura de 160px (h-40)
E deve ter as classes "bg-gradient-to-r"
E deve aplicar o gradiente do tema ativo
E deve ter largura total (w-full)
```

---

## Cenário 10: Ícone de voltar (quando contato selecionado)

**Tags**: `@ui` `@navigation` `@P2`

**Objetivo**: Verificar comportamento do ícone de voltar

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
```

### When (Quando)

```gherkin
Quando hasSelectedContact for <estado>
```

### Then (Então)

```gherkin
Então o ícone ArrowLineLeft deve estar <visibilidade>
E deve ter tamanho de 48px
E deve ter cursor pointer
E deve ter margem e padding corretos

Exemplos:
  | estado | visibilidade |
  | true   | visível      |
  | false  | oculto       |
```

---

## Cenário 11: Animação da área de mensagens

**Tags**: `@ui` `@animation` `@P2`

**Objetivo**: Verificar que a área de mensagens possui animação

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
```

### When (Quando)

```gherkin
Quando a área de mensagens for renderizada
```

### Then (Então)

```gherkin
Então deve ter a animação "animate-[wiggle_1s_ease-in-out_infinite]"
E deve ter shadow-sm
E deve ter display flex
E deve ter flex-direction column
```

---

## Cenário 12: Integração com o Footer

**Tags**: `@ui` `@P2`

**Objetivo**: Verificar que o Footer é renderizado corretamente

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
E hasSelectedContact é false
```

### When (Quando)

```gherkin
Quando a página renderizar
```

### Then (Então)

```gherkin
Então o componente Footer deve estar visível
E deve estar posicionado na área esquerda
E deve estar abaixo do texto de boas-vindas
```

---

## Cenário 13: Estados da tela baseados na query

**Tags**: `@api` `@state` `@P0`

**Objetivo**: Verificar que os estados corretos são renderizados baseados no peopleQuery

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
```

### When (Quando)

```gherkin
Quando o peopleQuery estiver no estado <estado>
```

### Then (Então)

```gherkin
Então o componente <componente> deve ser renderizado
E o stateKey deve retornar <chave>

Exemplos:
  | estado     | componente            | chave      |
  | isLoading  | LoadingComponent      | loading    |
  | isError    | ErrorApiComponent     | error      |
  | isEmpty    | NoContentComponent    | noCotent   |
  | isSuccess  | SuccesComponent       | success    |
```

---

## Cenário 14: Container principal com classes corretas

**Tags**: `@ui` `@P2`

**Objetivo**: Verificar que o container principal possui as classes de estilo corretas

### Given (Dado)

```gherkin
Dado que estou na página "/chat"
```

### When (Quando)

```gherkin
Quando a página renderizar
```

### Then (Então)

```gherkin
Então o container deve ter as classes:
  | Classe           | Presente |
  | container        | sim      |
  | mx-auto          | sim      |
  | mt-[-128px]      | sim      |
  | rounded-sm       | sim      |
E o wrapper interno deve ter:
  | Classe           | Presente |
  | py-6             | sim      |
  | h-screen         | sim      |
E o card deve ter:
  | Classe           | Presente |
  | shadow-lg        | sim      |
  | rounded          | sim      |
  | h-full           | sim      |
```

---

## Dados de Teste

### Estados Possíveis

- `loading`: Carregando dados
- `error`: Erro ao carregar
- `noCotent`: Sem conteúdo
- `success`: Dados carregados com sucesso

### Breakpoints

- Mobile: <= 690px
- Desktop: > 690px

### Textos Esperados

- Boas-vindas: "Happy customs!"
- Instrução: "Request sample result on right!"
- Título de sucesso: "Lets code!"
- Label API: "Api : Response"

---

**Prioridade Geral**: P0 (Crítico)

**Estimativa de Execução**: ~8 minutos

**Dependências**: Autenticação, API SWAPI
