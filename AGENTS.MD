# Diretrizes Técnicas e de Qualidade

## Tecnologias Obrigatórias
- Código-fonte e testes devem ser escritos sempre em TypeScript.
- Estilos devem ser implementados exclusivamente com Tailwind CSS.
- Estado global é gerenciado com Zustand.
- Requisições e cache de dados ficam sob responsabilidade do React Query.
- Feedbacks de interface (sucesso, erro, info) devem usar React Toastify.

## Testes
- Testes unitários devem ser implementados com Vitest.
- Toda nova tela deve vir acompanhada de testes E2E (Playwright está disponível em `e2e/`).
- Sempre que possível, validar fluxos críticos com cenários positivos e negativos.

## Práticas de Desenvolvimento
- Reutilizar hooks e componentes quando fizer sentido e manter responsabilidade única.
- Documentar comportamentos relevantes em componentes complexos diretamente nos arquivos `.tsx`.
- Garantir que configurações compartilhadas (por exemplo, providers de Zustand e React Query) permaneçam centralizadas para facilitar manutenção.
- Ao introduzir novas dependências, registrar o racional neste documento e no PR correspondente.

Siga estas diretrizes em todas as entregas e comunique exceções antes de implementá-las.
