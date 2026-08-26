# Notas do projeto — dúvidas, decisões e pendências

Registro vivo de decisões de arquitetura e problemas em aberto. Atualizar conforme o projeto
avança; não é histórico (isso é o git log), é o estado atual do que falta resolver.

## Decisões já tomadas (não reabrir sem motivo novo)

| Decisão | Escolha | Porquê |
|---|---|---|
| Interatividade | React instalado (`@astrojs/react`) | Libera ReactBits/Aceternity/`@react-three/fiber` como islands. |
| CMS | Sveltia CMS, backend GitHub, `editorial_workflow` | Config-compatível com Decap, mais leve e ativamente mantido. Editar cria PR, não commita direto na main. |
| Escopo desta rodada | Content collections + CMS + gráficos pra todas as seções do NOTES.md, com conteúdo placeholder | Permite construir as páginas de cada seção em paralelo depois. |
| Hospedagem | **Em aberto** | Projeto vai passar pra outra conta — não decidir/hospedar usando as ferramentas Vercel desta sessão. Cloudflare Pages/Netlify/Vercel seguem como opções pra quem for gerenciar o deploy. |
| OAuth do CMS | Proxy `sveltia-cms-auth` em Cloudflare Worker (gratuito, template oficial) | Independente de onde o site final for hospedado. |

## Pendências reais

- **Fontes da marca**: `Extenda 40 Hecta`, `Heading Now 91`, `Brasika`, `Sloop Script Pro`,
  `Montaser Arabic`, `Argent` — sem licença de uso web confirmada. Usando substitutas (Space
  Grotesk/Alex Brush/Inter) via Fontsource. Ver `FONTS.md`.
- **Domínio final**: `astro.config.mjs` ainda tem TODO (`elasnaengenharia.fem.unicamp.br` vs domínio
  próprio registro.br).
- **Catálogo de `public/graphics/`**: só `logo/*`, `mascot/10.png` e `partners/11.png` foram
  identificados visualmente (ver `src/data/graphics-manifest.ts`). `decorative/*` (22 arquivos) e
  `icons/*` (14 arquivos) e a maior parte de `textures/*` estão listados só por nome de arquivo,
  marcados `tags: ['unreviewed']` — precisa alguém (ou um passo de curadoria visual) olhar cada um e
  decidir papel/uso antes de virarem componente.
- **Zip de origem dos gráficos**: movido de `public/elementos gráficos.zip` (ia pro `dist/` a cada
  build, ~19MB) pra `design-source/elementos-graficos.zip`, e adicionado ao `.gitignore` — decisão
  provisória de não versionar um binário de 19MB. Se quiser manter histórico/proveniência no repo,
  remover do `.gitignore` e commitar mesmo assim (custo: infla o `.git` permanentemente).
- **Métricas no CMS**: `src/content/metricas/metricas.yaml` é uma lista no nível raiz (mais simples
  pro loader `file()` do Astro). O formato de "files collection" do Sveltia pra um arquivo cujo
  conteúdo raiz é uma lista (em vez de objeto) não foi testado — por isso a coleção `metricas` não
  está exposta em `public/admin/config.yml` ainda. Testar na implementação; se não funcionar, mudar
  o YAML pra `{ metricas: [...] }` e ajustar o loader.

- **IA da navegação principal** (`Nav.astro`): atualizada pra refletir as 8 seções do NOTES.md
  (Início, Dados, Ações, Parcerias, Pesquisa, Blog, Escolas, Contato), substituindo os links antigos
  de fase 0 (`/vestibular`, `/sobre`) que não correspondiam a nenhuma seção do brief. Rótulos/ordem
  são um palpite razoável, não confirmado com o time — revisar antes de considerar definitivo.

## Riscos a verificar na implementação

- Confirmar que a versão atual do Sveltia CMS (verificar changelog/docs no momento de configurar o
  deploy) ainda suporta `publish_mode: editorial_workflow` como documentado aqui — API evolui rápido.
- `logo/6.png` (lockup horizontal) e `logo/3.png` (ícone) foram escolhidos por inspeção visual entre
  as variações 1–9; confirmar com o time de design se são de fato as versões "oficiais" pra uso
  público (vs. rascunhos/variações de teste).

## Assets de marca já existentes (achado durante a implementação)

`public/images/brand/{logo-icon,lockup-horizontal,ella-mascot}.png` **já existiam**, prontos e
recortados (fundo transparente) — não estavam quebrados como uma checagem superficial (`find
public/images -maxdepth 1`) sugeriu a princípio; só não tinham sido convertidos pra `.webp` ainda.
Convertidos agora (mesmo conteúdo, `.webp`); os `.png` originais ficaram no lugar, sem uso — remover
depois de confirmar que nada mais referencia `.png` diretamente.
