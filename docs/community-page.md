# Página Community - Documentação

## Visão Geral

A página Community foi desenvolvida para exibir comunidades de forma similar ao WhatsApp, com cards contendo imagens, títulos, descrições e botões de ação.

## Estrutura de Arquivos

```
src/
├── models/
│   └── community.ts                    # Modelos de dados
├── pages/
│   └── Community/
│       ├── index.tsx                   # Componente principal
│       ├── index.test.tsx              # Testes unitários (21 testes)
│       ├── hooks/
│       │   ├── use-community-hook.tsx  # Hook customizado
│       │   └── index.ts                # Barrel export
│       └── constants/
│           └── index.ts                # Constantes e mock data
│
e2e/
├── fixtures/
│   └── community.page.ts               # Page Object
└── tests/
    └── community.spec.ts               # Testes E2E (13 cenários)
```

## Funcionalidades Implementadas

### 1. Exibição de Comunidades
- Cards com layout responsivo
- Grid adaptável (1 coluna mobile, 2-3 colunas desktop)
- Imagens de comunidade
- Informações detalhadas (nome, descrição, categoria, membros)

### 2. Sistema de Busca
- Busca em tempo real
- Filtro por nome e descrição
- Input com ícone de busca

### 3. Filtros
- **Categoria**: Filtrar por tecnologia, negócios, educação, etc.
- **Ordenação**: Popular, Mais Recente, Mais Membros, Nome (A-Z)

### 4. Badges de Verificação
- Comunidades verificadas exibem badge azul com ícone
- Posicionado no canto superior direito da imagem

### 5. Informações dos Cards
- **Imagem**: 400x400px com crop
- **Nome**: Título da comunidade
- **Descrição**: Breve descrição (2 linhas máximo)
- **Membros**: Contagem formatada com ícone
- **Categoria**: Tag com cor de fundo
- **Botão Join**: Link para página da comunidade

### 6. Estados da UI
- Loading: Componente de carregamento
- Error: Componente de erro com retry
- No Content: Mensagem quando não há comunidades
- Success: Grid de comunidades

## Modelos de Dados

### CommunityModel
```typescript
{
  id: string;
  name: string;
  description: string;
  image: string;
  membersCount: number;
  category: string;
  isVerified: boolean;
  createdAt: string;
  link: string;
}
```

## Hooks Customizados

### useCommunityHook
- Gerencia estado de busca e filtros
- Integra com React Query para fetch de dados
- Filtragem e ordenação em tempo real
- Retorna comunidades filtradas e ordenadas

## Mock de Dados

6 comunidades de exemplo incluídas:
1. React Developers (15.4k membros)
2. Startup Founders (8.9k membros)
3. Online Learning Hub (23.5k membros)
4. Fitness Enthusiasts (12.3k membros)
5. Digital Nomads (9.8k membros)
6. Gaming Community (31.2k membros)

## Testes

### Testes Unitários (21 testes)
✅ Todos passando

- Render inicial
- Snapshots
- Exibição de elementos
- Funcionalidade de busca e filtros
- Estados de loading/error
- Verificação de badges
- Cards e informações

### Testes E2E (13 cenários)
Cobertura completa:

- Carregamento inicial
- Exibição de cards
- Busca e filtros
- Ordenação
- Badges de verificação
- Responsividade
- Navegação
- Combinação de filtros

## Acessando a Página

### URL
```
http://localhost:5173/community
```

### Comandos
```bash
# Iniciar servidor
npm run dev

# Testes unitários
npm run test -- src/pages/Community/index.test.tsx --run

# Testes E2E
npm run test:e2e -- community.spec.ts --project=chromium
```

## Tecnologias Utilizadas

- **React**: Biblioteca UI
- **TypeScript**: Tipagem estática
- **React Query**: Gerenciamento de estado assíncrono
- **Zustand**: Estado global
- **Tailwind CSS**: Estilização
- **Phosphor Icons**: Ícones
- **Vitest**: Testes unitários
- **Playwright**: Testes E2E
- **React Testing Library**: Testes de componentes

## Padrões Seguidos

- ✅ Mesma arquitetura das páginas Chat e Settings
- ✅ Hooks customizados isolados
- ✅ Componentes com data-testid
- ✅ Page Objects Pattern para E2E
- ✅ BDD (Given/When/Then) nos testes
- ✅ Mocks de dependências
- ✅ Snapshots para regressão visual
- ✅ Separação de concerns

## Próximos Passos (Sugestões)

1. Integração com API real
2. Paginação de resultados
3. Detalhes da comunidade em modal/página dedicada
4. Sistema de favoritos
5. Notificações de novas comunidades
6. Chat em tempo real
7. Sistema de convites
8. Perfis de membros
9. Estatísticas detalhadas
10. Moderação de comunidades

## Responsividade

- **Mobile**: Layout de coluna única, filtros em dropdown
- **Tablet**: Grid de 2 colunas
- **Desktop**: Grid de 3 colunas, filtros inline

## Acessibilidade

- Botões com aria-labels
- Imagens com alt text
- Contraste de cores adequado
- Navegação por teclado
- Focus states visuais

## Performance

- Imagens otimizadas (400x400px)
- Lazy loading de imagens
- Debounce na busca
- React Query cache (10 minutos)
- Componentes memo quando necessário
