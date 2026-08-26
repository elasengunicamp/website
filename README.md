# Elas na Engenharia

Site oficial do **Elas na Engenharia**, projeto de extensão da Faculdade de Engenharia
Mecânica da Unicamp (FEM/Unicamp). Projeto atua em duas frentes: acolhimento e
fortalecimento das alunas de engenharia da universidade, e aproximação com alunas de
ensino médio de escolas públicas interessadas em carreiras STEM.

## Proposta

Site organiza-se em três áreas:

- **Blog** — artigos, notícias e registros das ações do projeto, publicados pelas próprias
  integrantes.
- **Plataforma aberta de estudos para o vestibular** — vídeos, resoluções comentadas de
  questões e conteúdos interativos, acesso livre e gratuito, voltados às vestibulandas.
- **Seção institucional lúdica** — apresentação criativa e artística do projeto: história,
  impacto, equipe e parcerias.

Desenvolvimento voluntário, sem custo de mão de obra. Sistema 100% open-source e
público — futuras integrantes (ou outros projetos de extensão) podem mantê-lo, auditá-lo
e reaproveitá-lo livremente.

### Princípios

- **Custo fixo próximo de zero** — infraestrutura toda em planos gratuitos (hospedagem,
  CMS, analytics, formulários). Custo estimado: R$ 0/ano com subdomínio institucional
  (`elasnaengenharia.fem.unicamp.br`), ou ~R$ 40/ano com domínio próprio.
- **Autonomia das integrantes** — publicação de conteúdo via painel de edição visual
  (CMS), sem depender de conhecimento técnico ou do desenvolvedor.
- **Gestão de acessos simples e auditável** — controle de publicação via organização
  gratuita no GitHub; histórico de alterações sempre registrado.
- **Transparência e perenidade** — código e conteúdo em repositório público, sem
  lock-in de plataforma fechada.

Detalhes completos de arquitetura e orçamento: `proposta-site-elas-na-engenharia.md.pdf`.

## Stack técnica

- [**Astro**](https://astro.build) — site estático, rápido e sem servidor/banco de dados.
- **Tailwind CSS v4** — estilização via tokens de design (`src/styles/global.css`).
- **Fontsource** (self-hosted) — Space Grotesk (títulos), Alex Brush (script/artístico),
  Inter (corpo de texto), JetBrains Mono (código). Ver `FONTS.md` para status das fontes
  originais da marca (pendentes de licença) e como trocá-las.
- Planejado: MDX + CMS (Sveltia/Decap), busca com Pagefind, LaTeX via KaTeX, dark mode.

Ver `ANIMATIONS.md` para avaliação de bibliotecas de animação/componentes visuais
consideradas para a seção institucional.

## Identidade visual

Cores e tipografia derivadas do manual de identidade do projeto
(`manual_identidade_elas.pdf`), definidas como tokens Tailwind em
`src/styles/global.css`:

| Token              | Uso                                      |
|--------------------|-------------------------------------------|
| `brand`            | roxo escuro — logos, títulos, CTAs        |
| `brand-cream`      | fundos claros                             |
| `brand-lilac`      | destaques, info boxes                     |
| `brand-dark`       | fundo de página no dark mode              |
| `brand-dark-surface` | cards/superfícies no dark mode          |

Dark mode aplicado antes do primeiro paint (evita flash), com preferência salva em
`localStorage` e fallback pra `prefers-color-scheme`.

## Estrutura do projeto

```text
/
├── src/
│   ├── components/ui/   # Nav, Footer, Button, Card, ThemeToggle, mascote, etc.
│   ├── layouts/          # BaseLayout.astro
│   ├── pages/            # rotas (index, kitchen-sink)
│   └── styles/           # global.css — tokens de design (@theme)
├── public/                # assets estáticos (imagens de marca, favicon)
├── FONTS.md               # status de licenciamento das fontes da marca
├── ANIMATIONS.md          # avaliação de libs de animação
└── proposta-site-elas-na-engenharia.md.pdf
```

## Comandos

Todos rodados a partir da raiz do projeto:

| Comando           | Ação                                          |
|--------------------|------------------------------------------------|
| `npm install`      | instala dependências                          |
| `npm run dev`      | inicia servidor local em `localhost:4321`     |
| `npm run build`    | build de produção em `./dist/`                |
| `npm run preview`  | preview local do build                        |
| `npm run astro ...`| comandos CLI do Astro (ex.: `astro check`)    |

Requer Node.js `>=22.12.0`.

## Licença

Apache License 2.0 — ver `LICENSE`.
