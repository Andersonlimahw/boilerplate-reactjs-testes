# Feature: Página de Perfil

## Descrição

Como um usuário autenticado
Eu quero acessar e visualizar meu perfil
Para que eu possa ver minhas informações e dados do sistema

---

## Cenário 1: Carregamento inicial da página de perfil

**Tags**: `@smoke` `@critical` `@P0`

**Objetivo**: Verificar que a página de perfil carrega corretamente

### Given (Dado)

```gherkin
Dado que estou autenticado no sistema
E navego para a página "/profile"
```

### When (Quando)

```gherkin
Quando a página terminar de carregar
```

### Then (Então)

```gherkin
Então devo ver o header com gradiente de cores
E devo ver o texto "Welcome to your profile!"
E devo ver o texto "Request sample result on right!"
E devo ver o componente Footer
E devo ver a área de informações no lado direito
```

---

## Cenário 2: Exibição do estado de loading no perfil

**Tags**: `@api` `@ui` `@P0`

**Objetivo**: Verificar que o componente de loading é exibido durante carregamento de dados

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
E a API ainda não retornou os dados do perfil
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

## Cenário 3: Exibição de dados do perfil com sucesso

**Tags**: `@api` `@critical` `@P0`

**Objetivo**: Verificar que os dados do perfil são exibidos corretamente

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
E a API retornou dados com sucesso
```

### When (Quando)

```gherkin
Quando os dados forem carregados
```

### Then (Então)

```gherkin
Então devo ver o título "Profile page"
E devo ver "Api : Response"
E devo ver o contador de registros "count: <numero>"
E devo ver o nome do primeiro registro "Name: <nome>"
E o estado da tela deve ser "success"

Exemplos:
  | numero | nome            |
  | 10     | Luke Skywalker  |
  | 5      | Leia Organa     |
```

---

## Cenário 4: Tratamento de erro na página de perfil

**Tags**: `@api` `@error` `@P0`

**Objetivo**: Verificar que erros são tratados corretamente na página de perfil

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
E a API retornou um erro ao buscar dados do perfil
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
E o usuário deve poder tentar carregar os dados novamente
```

---

## Cenário 5: Funcionalidade de retry no perfil

**Tags**: `@api` `@error` `@P1`

**Objetivo**: Verificar que é possível recarregar dados do perfil após erro

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
E a API retornou um erro
E o ErrorApiComponent está visível
```

### When (Quando)

```gherkin
Quando eu clico no botão de retry
```

### Then (Então)

```gherkin
Então uma nova requisição deve ser feita para buscar os dados
E o componente LoadingComponent deve aparecer
E se a requisição for bem-sucedida, os dados devem ser exibidos
E se falhar novamente, o erro deve ser exibido novamente
```

---

## Cenário 6: Exibição de perfil sem dados

**Tags**: `@api` `@P1`

**Objetivo**: Verificar que o estado de "sem conteúdo" é exibido quando não há dados

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
E a API retornou uma resposta vazia
```

### When (Quando)

```gherkin
Quando os dados forem processados
```

### Then (Então)

```gherkin
Então devo ver o componente NoContentComponent
E devo ver uma mensagem indicando que não há dados disponíveis
E o estado da tela deve ser "noCotent"
```

---

## Cenário 7: Responsividade - Visualização mobile do perfil

**Tags**: `@responsive` `@ui` `@P1`

**Objetivo**: Verificar que a página de perfil se adapta para telas mobile

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
```

### When (Quando)

```gherkin
Quando eu redimensionar a janela para largura <= 690px
```

### Then (Então)

```gherkin
Então o layout deve mudar para modo mobile
E as classes "min-[0px]:block" devem ser aplicadas ao container
E a área de informações deve ocupar toda a largura
E o screenType deve ser "mobile"
E o conteúdo deve ser empilhado verticalmente
```

---

## Cenário 8: Responsividade - Visualização desktop do perfil

**Tags**: `@responsive` `@ui` `@P1`

**Objetivo**: Verificar que a página de perfil se adapta para telas desktop

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
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
E a distribuição do espaço deve ser balanceada
```

---

## Cenário 9: Header do perfil com gradiente temático

**Tags**: `@ui` `@theme` `@P2`

**Objetivo**: Verificar que o header do perfil aplica o gradiente do tema ativo

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
E o tema <tema> está ativo
```

### When (Quando)

```gherkin
Quando a página renderizar
```

### Then (Então)

```gherkin
Então o header deve ter altura de 160px (h-40)
E deve ter as classes "bg-gradient-to-r"
E deve aplicar o gradiente <gradiente> do tema
E deve ter largura total (w-full)

Exemplos:
  | tema  | gradiente                  |
  | light | from-blue-400 to-blue-600  |
  | dark  | from-gray-700 to-gray-900  |
```

---

## Cenário 10: Ícone de navegação condicional

**Tags**: `@ui` `@navigation` `@P2`

**Objetivo**: Verificar comportamento do ícone ArrowLineLeft

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
```

### When (Quando)

```gherkin
Quando hasSelectedContact for <estado>
```

### Then (Então)

```gherkin
Então o ícone ArrowLineLeft deve estar <visibilidade>
E deve ter tamanho de 48px
E deve ter cursor pointer quando visível
E deve ter as classes de margem e padding corretas

Exemplos:
  | estado | visibilidade |
  | true   | visível      |
  | false  | oculto       |
```

---

## Cenário 11: Animação da área de conteúdo

**Tags**: `@ui` `@animation` `@P2`

**Objetivo**: Verificar que a área de conteúdo possui animação wiggle

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
```

### When (Quando)

```gherkin
Quando a área de conteúdo for renderizada
```

### Then (Então)

```gherkin
Então deve ter a animação "animate-[wiggle_1s_ease-in-out_infinite]"
E deve ter shadow-sm
E deve ter display flex
E deve ter flex-direction column
E a animação deve ser executada continuamente
```

---

## Cenário 12: Integração do Footer no perfil

**Tags**: `@ui` `@component` `@P2`

**Objetivo**: Verificar que o Footer é renderizado corretamente no perfil

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
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
E deve estar abaixo do texto de boas-vindas "Welcome to your profile!"
E deve conter as informações do rodapé
```

---

## Cenário 13: Transição de estados da API

**Tags**: `@api` `@state` `@P0`

**Objetivo**: Verificar transições corretas entre estados da aplicação

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
```

### When (Quando)

```gherkin
Quando o peopleQuery transicionar de <estado_inicial> para <estado_final>
```

### Then (Então)

```gherkin
Então o componente deve mudar de <componente_inicial> para <componente_final>
E a transição deve ser suave
E não deve haver flickering

Exemplos:
  | estado_inicial | estado_final | componente_inicial  | componente_final    |
  | idle           | loading      | null                | LoadingComponent    |
  | loading        | success      | LoadingComponent    | SuccesComponent     |
  | loading        | error        | LoadingComponent    | ErrorApiComponent   |
  | error          | loading      | ErrorApiComponent   | LoadingComponent    |
  | error          | success      | ErrorApiComponent   | SuccesComponent     |
```

---

## Cenário 14: Container principal com estrutura correta

**Tags**: `@ui` `@layout` `@P2`

**Objetivo**: Verificar que a estrutura do container está correta

### Given (Dado)

```gherkin
Dado que estou na página "/profile"
```

### When (Quando)

```gherkin
Quando a página renderizar
```

### Then (Então)

```gherkin
Então o container principal deve ter as classes:
  | Classe           | Presente |
  | container        | sim      |
  | mx-auto          | sim      |
  | mt-[-128px]      | sim      |
  | rounded-sm       | sim      |
E o wrapper interno deve ter:
  | Classe           | Presente |
  | py-6             | sim      |
  | h-screen         | sim      |
E o card de conteúdo deve ter:
  | Classe           | Presente |
  | shadow-lg        | sim      |
  | rounded          | sim      |
  | h-full           | sim      |
```

---

## Cenário 15: Navegação direta para o perfil

**Tags**: `@navigation` `@smoke` `@P1`

**Objetivo**: Verificar que é possível acessar o perfil diretamente via URL

### Given (Dado)

```gherkin
Dado que estou autenticado
E estou em qualquer página da aplicação
```

### When (Quando)

```gherkin
Quando eu navego diretamente para "/profile"
```

### Then (Então)

```gherkin
Então a página de perfil deve carregar completamente
E todos os componentes devem ser inicializados
E os dados devem ser requisitados da API
E a URL deve ser "/profile"
```

---

## Cenário 16: Persistência do tema no perfil

**Tags**: `@theme` `@persistence` `@P2`

**Objetivo**: Verificar que o tema selecionado persiste na página de perfil

### Given (Dado)

```gherkin
Dado que estou autenticado
E selecionei o tema <tema>
```

### When (Quando)

```gherkin
Quando eu navego para "/profile"
```

### Then (Então)

```gherkin
Então o tema <tema> deve estar ativo
E o gradiente correspondente deve ser aplicado
E as cores do tema devem estar consistentes

Exemplos:
  | tema  |
  | light |
  | dark  |
```

---

## Dados de Teste

### Estados Possíveis

- `loading`: Carregando dados do perfil
- `error`: Erro ao carregar perfil
- `noCotent`: Sem dados de perfil
- `success`: Perfil carregado com sucesso

### Breakpoints Responsivos

- Mobile: largura <= 690px
- Desktop: largura > 690px

### Textos Esperados

- Boas-vindas: "Welcome to your profile!"
- Instrução: "Request sample result on right!"
- Título de sucesso: "Profile page"
- Label API: "Api : Response"

### Classes de Animação

- Wiggle: `animate-[wiggle_1s_ease-in-out_infinite]`

---

**Prioridade Geral**: P0 (Crítico)

**Estimativa de Execução**: ~7 minutos

**Dependências**: Autenticação, API SWAPI, Sistema de Temas
