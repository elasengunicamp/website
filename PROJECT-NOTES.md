# Notas do projeto — dúvidas, decisões e pendências

Registro vivo de decisões de arquitetura e problemas em aberto. Atualizar conforme o projeto
avança; não é histórico (isso é o git log), é o estado atual do que falta resolver.

## Decisões já tomadas (não reabrir sem motivo novo)

| Decisão | Escolha | Porquê |
|---|---|---|
| Interatividade | React instalado (`@astrojs/react`) | Libera ReactBits/Aceternity/`@react-three/fiber` como islands. |
| CMS | Sveltia CMS, backend GitHub, `editorial_workflow` | Config-compatível com Decap, mais leve e ativamente mantido. Editar cria PR, não commita direto na main. |
| Escopo desta rodada | Content collections + CMS + gráficos pra todas as seções do NOTES.md, com conteúdo placeholder | Permite construir as páginas de cada seção em paralelo depois. |
| Copy editável no CMS | Singletons `home` + `config` (`src/content/paginas/*.yaml`). Homepage em campos estruturados; nav fica no código; rodapé/SEO padrão no CMS. | Autonomia da equipe onde muda em ritmo de conteúdo; ver "Threshold" abaixo. |
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

## Threshold: o que é editável no CMS vs fica no código

Uma string vai pro **CMS** só se Q1–Q3 = sim **e** Q4 = seguro. Senão fica no **código**.

1. **Dono** — integrante/MKT plausivelmente quer mudar sozinha, sem dev?
2. **Cadência** — muda em ritmo de *conteúdo* (campanha, semestre, novo parceiro, rebrand),
   não de *dev* (refactor, nova página, mudança de layout)?
3. **Conteúdo vs scaffolding** — é uma frase que a organização *diz* (prosa, headings, texto
   de CTA), não fiação de UI (paths de rota, `aria-label`, validação, loading/empty/error)?
4. **Veto de segurança** — se o editor colar besteira, o estrago fica confinado ao bloco? Sem
   layout quebrado, sem rota morta, sem build quebrado, sem regressão de acessibilidade.

`editorial_workflow` (todo edit = PR revisável) é a rede que deixa casos "borderline mas
baratos" penderem pro CMS.

- **No CMS**: homepage (`home.yaml` — hero, quem somos, história, MVV, headings/intros de
  seção, blocos CTA), rodapé (`config.yaml` — redes, e-mail, copyright), SEO padrão + nome da
  org (`config.yaml`), override de SEO da home (`home.seo`). Fotos/nomes/áreas de membros e
  posts de blog já vêm das collections.
- **No código**: rótulos e hrefs do nav (acoplados a rota, IA não confirmada), `title` por
  rota, labels de `Button`/`aria-label`/`ThemeToggle`, textos de validação/loading/empty/error,
  página 404.
- **`src/i18n/ui.ts`**: não criado (YAGNI — site single-locale, microcopy de código é pouca e
  não duplicada). Revisitar se pedirem 2º locale ou a mesma string aparecer em 3+ componentes.

## Convenção: refinamento Zod ↔ `pattern` do Sveltia (não deixar divergir)

Campo com refinamento de formato no schema Zod (`.url()`, `.email()`) **tem que** espelhar esse
refinamento no `public/admin/config.yml` via `pattern` no widget string — senão o CMS aceita
valor que o `astro build` depois rejeita. Preferir `z.string()` puro pra qualquer coisa que
possa ser path relativo (`/acoes`) ou `mailto:`.

- CTA hrefs da home (`hero.ctaPrimario.href`, `ctaAcoes.href`, `ctaParcerias.href`) e
  `config.redes[].href`: `z.string()` puro + `widget: string`. **Não** usar `.url()`.
- `config.email`: `z.string().email()` no Zod **+** `pattern` no widget, mantidos em sync.
- Drift pré-existente resolvido nesta rodada: `parceiros.link` e `pesquisa.link` ganharam
  `pattern` no `config.yml` espelhando o `z.string().url()` (e a variante que aceita vazio) do
  schema.

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

**Correção (2026-09-10)**: a afirmação acima estava errada pro `logo-icon` — o PNG tinha fundo
**preto** sólido (quadrado arredondado), não transparente; só não foi percebido porque o preview
usado na curadoria tinha fundo escuro. Regerado a partir do master em alta resolução (fornecido
pela equipe fora do repo) com fundo realmente transparente, mais uma variante lilás
(`logo-icon-light.webp`, `lockup-horizontal-light.webp`) pro header em dark mode — o `Nav.astro`
antes mascarava o problema com `brightness`/`contrast` no `dark:`. `lockup-horizontal` também foi
regerado a partir de `graphics/logo/6.png` (fonte já indicada no manifesto) pra bater com o roxo da
marca. `favicon.ico` tinha o mesmo problema (fundo preto) — regerado multi-tamanho (16–128px) sem
fundo.
