# Feature: Componentes Compartilhados

## Descrição

Como desenvolvedor do sistema
Eu quero garantir que os componentes compartilhados funcionem corretamente
Para que eles possam ser reutilizados em toda a aplicação

---

## Feature: ThemeSwitcher Component

### Cenário 1: Alternância de tema

**Tags**: `@component` `@theme` `@P1`

**Objetivo**: Verificar que o componente de alternância de tema funciona corretamente

#### Given (Dado)

```gherkin
Dado que o componente ThemeSwitcher está renderizado
E o tema atual é <tema_atual>
```

#### When (Quando)

```gherkin
Quando eu clico no botão de alternar tema
```

#### Then (Então)

```gherkin
Então o tema deve mudar para <tema_novo>
E a interface deve refletir as cores do novo tema
E a preferência deve ser salva

Exemplos:
  | tema_atual | tema_novo |
  | light      | dark      |
  | dark       | light     |
```

---

### Cenário 2: Persistência do tema selecionado

**Tags**: `@component` `@theme` `@persistence` `@P1`

**Objetivo**: Verificar que a seleção do tema persiste após recarregar a página

#### Given (Dado)

```gherkin
Dado que selecionei o tema <tema>
E o tema foi aplicado
```

#### When (Quando)

```gherkin
Quando eu recarrego a página
```

#### Then (Então)

```gherkin
Então o tema <tema> deve continuar ativo
E as cores devem estar corretas

Exemplos:
  | tema  |
  | light |
  | dark  |
```

---

### Cenário 3: Ícone do ThemeSwitcher

**Tags**: `@component` `@ui` `@P2`

**Objetivo**: Verificar que o ícone correto é exibido baseado no tema

#### Given (Dado)

```gherkin
Dado que o componente ThemeSwitcher está renderizado
```

#### When (Quando)

```gherkin
Quando o tema ativo é <tema>
```

#### Then (Então)

```gherkin
Então o ícone <icone> deve ser exibido
E deve ter o tamanho apropriado
E deve ser clicável

Exemplos:
  | tema  | icone          |
  | light | MoonIcon       |
  | dark  | SunIcon        |
```

---

## Feature: Footer Component

### Cenário 4: Renderização do Footer

**Tags**: `@component` `@ui` `@P2`

**Objetivo**: Verificar que o Footer renderiza corretamente

#### Given (Dado)

```gherkin
Dado que uma página renderiza o componente Footer
```

#### When (Quando)

```gherkin
Quando a página carrega
```

#### Then (Então)

```gherkin
Então o Footer deve estar visível
E deve conter as informações de copyright
E deve ter o estilo correto aplicado
E deve estar posicionado no local apropriado
```

---

### Cenário 5: Links do Footer

**Tags**: `@component` `@navigation` `@P2`

**Objetivo**: Verificar que os links do Footer funcionam corretamente

#### Given (Dado)

```gherkin
Dado que o Footer está renderizado
```

#### When (Quando)

```gherkin
Quando eu clico em um link do Footer
```

#### Then (Então)

```gherkin
Então devo ser redirecionado para a página correta
Ou uma nova aba deve abrir com o link externo
E o link deve ter o atributo target apropriado
```

---

## Feature: Sample Component

### Cenário 6: Renderização do Sample Component

**Tags**: `@component` `@ui` `@P2`

**Objetivo**: Verificar que o Sample Component renderiza corretamente

#### Given (Dado)

```gherkin
Dado que o Sample Component é renderizado
```

#### When (Quando)

```gherkin
Quando a página carrega
```

#### Then (Então)

```gherkin
Então o componente deve estar visível
E deve exibir o conteúdo esperado
E deve aplicar os estilos corretos
```

---

## Feature: API Feedback Components

### Cenário 7: LoadingComponent - Exibição básica

**Tags**: `@component` `@api` `@loading` `@P0`

**Objetivo**: Verificar que o LoadingComponent é exibido corretamente

#### Given (Dado)

```gherkin
Dado que uma requisição API está em andamento
```

#### When (Quando)

```gherkin
Quando o LoadingComponent é renderizado
```

#### Then (Então)

```gherkin
Então devo ver um indicador de carregamento
E o indicador deve ter animação
E deve estar centralizado
E deve ter o tamanho apropriado
```

---

### Cenário 8: LoadingComponent - Acessibilidade

**Tags**: `@component` `@a11y` `@P2`

**Objetivo**: Verificar recursos de acessibilidade do LoadingComponent

#### Given (Dado)

```gherkin
Dado que o LoadingComponent está renderizado
```

#### When (Quando)

```gherkin
Quando um leitor de tela está ativo
```

#### Then (Então)

```gherkin
Então deve haver um atributo aria-label apropriado
E deve indicar que o conteúdo está sendo carregado
E deve ter role="status" ou role="progressbar"
```

---

### Cenário 9: ErrorApiComponent - Exibição de erro

**Tags**: `@component` `@api` `@error` `@P0`

**Objetivo**: Verificar que o ErrorApiComponent exibe erro corretamente

#### Given (Dado)

```gherkin
Dado que uma requisição API falhou
```

#### When (Quando)

```gherkin
Quando o ErrorApiComponent é renderizado
```

#### Then (Então)

```gherkin
Então devo ver uma mensagem de erro
E devo ver um ícone de erro
E devo ver um botão de "Retry" ou "Tentar novamente"
E os estilos de erro devem estar aplicados
```

---

### Cenário 10: ErrorApiComponent - Funcionalidade de retry

**Tags**: `@component` `@api` `@error` `@P0`

**Objetivo**: Verificar que a função de retry funciona corretamente

#### Given (Dado)

```gherkin
Dado que o ErrorApiComponent está renderizado
E a prop onRetry foi fornecida
```

#### When (Quando)

```gherkin
Quando eu clico no botão de retry
```

#### Then (Então)

```gherkin
Então a função onRetry deve ser chamada
E uma nova requisição deve ser iniciada
E o LoadingComponent deve aparecer
```

---

### Cenário 11: ErrorApiComponent - Sem handler de retry

**Tags**: `@component` `@api` `@P2`

**Objetivo**: Verificar comportamento quando não há handler de retry

#### Given (Dado)

```gherkin
Dado que o ErrorApiComponent está renderizado
E a prop onRetry não foi fornecida
```

#### When (Quando)

```gherkin
Quando o componente renderiza
```

#### Then (Então)

```gherkin
Então o botão de retry não deve estar visível
Ou deve estar desabilitado
E apenas a mensagem de erro deve ser exibida
```

---

### Cenário 12: NoContentComponent - Exibição

**Tags**: `@component` `@api` `@P1`

**Objetivo**: Verificar que o NoContentComponent é exibido corretamente

#### Given (Dado)

```gherkin
Dado que uma requisição API retornou lista vazia
```

#### When (Quando)

```gherkin
Quando o NoContentComponent é renderizado
```

#### Then (Então)

```gherkin
Então devo ver uma mensagem indicando "Sem conteúdo"
E devo ver um ícone apropriado
E deve estar centralizado
E deve ter estilo visual adequado
```

---

### Cenário 13: NoContentComponent - Mensagem customizada

**Tags**: `@component` `@api` `@P2`

**Objetivo**: Verificar que mensagens customizadas são exibidas

#### Given (Dado)

```gherkin
Dado que o NoContentComponent recebe uma prop de mensagem customizada
```

#### When (Quando)

```gherkin
Quando o componente é renderizado
```

#### Then (Então)

```gherkin
Então a mensagem customizada deve ser exibida
E não a mensagem padrão
E o estilo deve permanecer consistente
```

---

## Feature: Hooks Customizados

### Cenário 14: useHookSample - Inicialização

**Tags**: `@hook` `@api` `@P1`

**Objetivo**: Verificar que o hook customizado inicializa corretamente

#### Given (Dado)

```gherkin
Dado que um componente utiliza o useHookSample
```

#### When (Quando)

```gherkin
Quando o componente é montado
```

#### Then (Então)

```gherkin
Então o hook deve retornar peopleQuery
E deve retornar theme
E peopleQuery deve estar no estado inicial
E theme deve ter as propriedades corretas
```

---

### Cenário 15: useHookSample - Query de dados

**Tags**: `@hook` `@api` `@P0`

**Objetivo**: Verificar que o hook faz requisições corretamente

#### Given (Dado)

```gherkin
Dado que um componente utiliza o useHookSample
E o componente foi montado
```

#### When (Quando)

```gherkin
Quando o peopleQuery é executado
```

#### Then (Então)

```gherkin
Então uma requisição deve ser feita para a API
E o estado deve mudar para loading
E quando a resposta chegar, os dados devem ser populados
E o estado deve mudar para success
```

---

### Cenário 16: useHookSample - Tratamento de erro

**Tags**: `@hook` `@api` `@error` `@P0`

**Objetivo**: Verificar que o hook trata erros adequadamente

#### Given (Dado)

```gherkin
Dado que um componente utiliza o useHookSample
E a API irá retornar um erro
```

#### When (Quando)

```gherkin
Quando o peopleQuery é executado
```

#### Then (Então)

```gherkin
Então o estado deve mudar para error
E isError deve ser true
E error deve conter informações do erro
E data deve ser undefined ou null
```

---

### Cenário 17: useHookSample - Refetch

**Tags**: `@hook` `@api` `@P1`

**Objetivo**: Verificar que a função refetch funciona corretamente

#### Given (Dado)

```gherkin
Dado que um componente utiliza o useHookSample
E já foram carregados dados anteriormente
```

#### When (Quando)

```gherkin
Quando a função refetch é chamada
```

#### Then (Então)

```gherkin
Então uma nova requisição deve ser feita
E o estado deve mudar para loading temporariamente
E os dados devem ser atualizados
E o componente deve re-renderizar
```

---

## Feature: Integração de Componentes

### Cenário 18: Transição entre estados de API

**Tags**: `@component` `@integration` `@P0`

**Objetivo**: Verificar transições suaves entre componentes de feedback

#### Given (Dado)

```gherkin
Dado que uma página usa os componentes de API feedback
```

#### When (Quando)

```gherkin
Quando o estado da API transita de <estado_inicial> para <estado_final>
```

#### Then (Então)

```gherkin
Então o componente deve mudar de <componente_inicial> para <componente_final>
E não deve haver flickering
E a transição deve ser visualmente suave

Exemplos:
  | estado_inicial | estado_final | componente_inicial  | componente_final    |
  | loading        | success      | LoadingComponent    | SuccessContent      |
  | loading        | error        | LoadingComponent    | ErrorApiComponent   |
  | error          | loading      | ErrorApiComponent   | LoadingComponent    |
  | success        | loading      | SuccessContent      | LoadingComponent    |
```

---

### Cenário 19: Componentes com temas diferentes

**Tags**: `@component` `@theme` `@P2`

**Objetivo**: Verificar que todos componentes respeitam o tema ativo

#### Given (Dado)

```gherkin
Dado que vários componentes estão renderizados na página
E o tema <tema> está ativo
```

#### When (Quando)

```gherkin
Quando eu alterno para o tema <novo_tema>
```

#### Then (Então)

```gherkin
Então todos os componentes devem atualizar suas cores
E todos devem usar a paleta do <novo_tema>
E não deve haver inconsistências visuais

Exemplos:
  | tema  | novo_tema |
  | light | dark      |
  | dark  | light     |
```

---

### Cenário 20: Responsividade dos componentes

**Tags**: `@component` `@responsive` `@P1`

**Objetivo**: Verificar que os componentes são responsivos

#### Given (Dado)

```gherkin
Dado que <componente> está renderizado
```

#### When (Quando)

```gherkin
Quando eu redimensiono a tela para <largura> x <altura>
```

#### Then (Então)

```gherkin
Então o componente deve se adaptar ao tamanho
E deve permanecer funcional
E deve manter boa legibilidade

Exemplos:
  | componente           | largura | altura |
  | LoadingComponent     | 320     | 568    |
  | ErrorApiComponent    | 768     | 1024   |
  | NoContentComponent   | 1920    | 1080   |
  | Footer               | 375     | 667    |
```

---

## Dados de Teste

### Componentes de API Feedback

- **LoadingComponent**: Spinner, animação de loading
- **ErrorApiComponent**: Mensagem de erro, botão de retry
- **NoContentComponent**: Mensagem de sem conteúdo, ícone

### Temas Disponíveis

- `light`: Tema claro
- `dark`: Tema escuro

### Estados de Query

- `idle`: Inicial
- `loading`: Carregando
- `success`: Sucesso
- `error`: Erro

### Propriedades dos Hooks

```typescript
peopleQuery: {
  data: any[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

theme: {
  name: string
  styles: {
    gradient: string
    background: string
    text: string
  }
}
```

---

**Prioridade Geral**: P0-P2 (Variável por componente)

**Estimativa de Execução**: ~10 minutos

**Dependências**: Sistema de Temas, React Query, API SWAPI
