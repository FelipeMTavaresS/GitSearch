<div align="center">
   <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="72" />
  
   # GitSearch
  
   _Busca avançada de usuários e repositórios do GitHub – Universal (Android, iOS e Web) com Expo + React Native + TypeScript._
</div>

## ✨ Visão Geral
Aplicativo que permite pesquisar perfis do GitHub, visualizar estatísticas principais e navegar pelos repositórios com carregamento incremental otimizado para evitar limites da API (rate limit). Inclui sugestões inteligentes, histórico recente, tema claro/escuro persistente e animações sutis para uma experiência mais fluida.

## 🚀 Principais Funcionalidades
* Busca de usuários do GitHub com feedback rápido
* Sugestões dinâmicas (histórico local + API) com highlight do termo
* Histórico de usuários pesquisados (com avatar) evitando duplicados
* Exibição do perfil: avatar, nome, login, localização, ID
* Estatísticas: total de repositórios públicos e seguidores
* Lista de repositórios com paginação manual
* Deduplicação de repositórios e prevenção de overfetch (tratamento de Link header e 403)
* Tema claro/escuro com persistência (localStorage no web)
* Transição suave de tema

## 🧠 Estratégias Técnicas
| Área | Decisão |
|------|---------|
| Paginação | `per_page=10` por chamada → mostra 5 inicial / expande conforme pedido |
| Rate Limit | Checagem de `X-RateLimit-Remaining` e tempo de reset para mensagem amigável |
| Sugestões | Cache em `Map` + fusão com histórico local (prioridade para histórico) |
| Dedup Repos | Set por `html_url` antes de atualizar estado |
| Tema | Contexto próprio + persistência condicional no web |
| Animações | `Animated` (React Native) com transições leves (< 200ms) |
| Acessibilidade | `role` / `aria-label` somente no web; `accessibilityRole/Label` no nativo |

## 📂 Estrutura (principais)
```
app/
   index.tsx              # Tela principal / orquestração
   themeContext.tsx       # Provider de tema com animação e persistência
   theme.ts               # Tokens de tema (dark/light)
   components/
      searchbarcomponent.tsx  # Barra de busca + sugestões animadas
      RepositoryList.tsx      # Lista com carregamento incremental
      RecentUsersMenu.tsx     # Histórico local de buscas
      userdata.tsx            # Bloco de informações do usuário
      userstats.tsx           # Contadores (repos, followers)
      modal.tsx               # Modal de mensagens / erros
      Skeleton.tsx            # Placeholders de carregamento
   styled.tsx             # Styled Components reutilizáveis
   assets/                # Logos e imagens
```

## 🛠️ Tecnologias
* Expo / React Native 0.74
* TypeScript
* Styled Components (native + web)
* Animated API (RN)
* Fetch API (chamadas GitHub)

## 🔧 Instalação
```bash
git clone <repo-url>
cd GitSearch
npm install
npm start        # abre menu interativo Expo
```
Atalhos:
```bash
npm run web      # abre no navegador
npm run android  # tenta abrir em emulador / device
npm run ios      # (macOS) abre simulador
```

## ▶️ Uso
1. Digite um usuário.
2. Veja sugestões (histórico + resultados da API).
3. Pressione Enter ou o botão de busca.
4. Role a lista de repositórios e use “Mostrar mais” para carregar mais páginas.
5. Troque o tema pelo botão no topo.

## ♿ Acessibilidade
* Elementos interativos recebem `role` / `aria-label` no web.
* Equivalentes nativos (`accessibilityRole`, `accessibilityLabel`) no mobile.
* Dropdown de sugestões remove interação após animação de saída (`pointerEvents='none'`).

## 🧪 Qualidade / Robustez
* Evita chamadas excedentes (não busca além do necessário para o total de repositórios)
* Lida com estado vazio, loading intermediário e erros de API (403, usuário inexistente genérico)
* Prevê flicker ao trocar tema (usa transição + Animated em mobile)

## 🚧 Melhorias Futuras (ideas backlog)
* Suporte a ordenação e filtros de repositórios (linguagem, stars)
* Prefetch da próxima página ao chegar perto do fim da atual
* Testes unitários (hooks e lógica de paginação)
* Modo offline parcial (cache de última resposta)

## 🔐 Limitações da API do GitHub
Sem token autenticado, a API pública possui limite reduzido de requisições por hora. Mensagem amigável é exibida quando o limite é atingido (estimativa de minutos até reset).

## 🧩 Decisões de Design
* Evitada dependência extra para dropdown (controle manual com Animated)
* Layout responsivo: breakpoint 1000px (colunas vs fluxo vertical)
* Wrapper único para input + sugestões evita “salto” de borda
* Raio fixo da barra (26px) para consistência ao expandir

## 🛡️ Licença
Projeto educacional / demonstrativo. Adapte livremente. Adicione uma licença formal se for publicar.

## 🙌 Contribuindo
Sinta-se livre para abrir issues ou enviar PR com melhorias, principalmente em acessibilidade e testes.

---
Se isso te ajudou, deixa uma ⭐ no repositório! 😉
