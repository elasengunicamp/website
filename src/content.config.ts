import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Áreas de atuação (NOTES.md — "Áreas e membros")
const areas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/areas' }),
  schema: z.object({
    nome: z.string(),
    descricao: z.string(),
    // um dos --color-accent-* de src/styles/global.css (ver @source inline no global.css)
    accentToken: z.enum(['blue', 'teal', 'pink', 'purple', 'yellow', 'rose']).default('purple'),
    ordem: z.number().default(0),
  }),
});

// Membros por área — fotos alteráveis via CMS (NOTES.md)
const membros = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/membros' }),
  schema: z.object({
    nome: z.string(),
    area: reference('areas'),
    curso: z.string().optional(),
    cargo: z.string().optional(),
    foto: z.string(), // caminho em /images/uploads (CMS) ou /images/membros
    ordem: z.number().default(0),
  }),
});

// Ações (visitas a escolas, aniversário, dia da mulher...) — editável no CMS
const acoes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/acoes' }),
  schema: z.object({
    titulo: z.string(),
    data: z.coerce.date(),
    descricao: z.string(),
    cover: z.string(),
    galeria: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

// Parcerias — editável no CMS
const parceiros = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/parceiros' }),
  schema: z.object({
    nome: z.string(),
    logo: z.string(),
    sobre: z.string(),
    link: z.string().url(),
    categoria: z.string().optional(),
    ordem: z.number().default(0),
  }),
});

// Pesquisa/Elas indica — formato blog, conteúdo separado, com metadados de publicação
const pesquisa = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pesquisa' }),
  schema: z.object({
    titulo: z.string(),
    autores: z.array(z.string()).min(1),
    revistaOuEvento: z.string().optional(),
    doi: z.string().optional(),
    data: z.coerce.date(),
    resumo: z.string(),
    link: z.union([z.string().url(), z.literal('')]).optional(),
  }),
});

// Blog — posts de MKT/entrevistas. Corpo renderiza como MDX (@astrojs/mdx já
// configurado em astro.config.mjs) — glob aceita .md e .mdx.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    data: z.coerce.date(),
    autor: z.string(),
    cover: z.string(),
    resumo: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

// Escolas/Ensino — vídeos + acesso a flashcards
const escolasVideos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/escolas-videos' }),
  schema: z.object({
    titulo: z.string(),
    embedUrl: z.string().url(),
    descricao: z.string(),
    ordem: z.number().default(0),
  }),
});

// Dados/métricas — singleton (crescimento do projeto, participação feminina)
const metricas = defineCollection({
  loader: file('./src/content/metricas/metricas.yaml'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    // Opcional de propósito: omitir valor (em vez de gravar 0) é como o CMS
    // marca "ainda não medido" — ver StatTile/Meter, que tratam 0 como um
    // valor real e undefined como "sem dado ainda" (achado de code review:
    // tratar 0 como sentinela esconderia uma métrica que zerou de verdade).
    valor: z.number().optional(),
    unidade: z.string().optional(),
    categoria: z.enum(['projeto', 'universidade', 'engenharia']),
    ano: z.number().optional(),
  }),
});

// Conteúdo institucional editável no CMS (singletons).
// glob() sobre um arquivo específico -> 1 entrada por arquivo, objeto no nível
// raiz (evita o problema de lista-raiz do metricas.yaml, que impede file collection
// no Sveltia). file() NÃO serve aqui: em objeto flat trataria cada chave top-level
// como entrada separada.
const paginas = defineCollection({
  loader: glob({ pattern: 'home.yaml', base: './src/content/paginas' }),
  schema: z.object({
    hero: z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      // href relativo (rota interna) -> z.string() puro, NÃO .url() (ver convenção em PROJECT-NOTES.md)
      ctaPrimario: z.object({ label: z.string(), href: z.string() }),
      ctaSecundario: z.object({ label: z.string(), href: z.string() }).optional(),
    }),
    quemSomos: z.object({
      titulo: z.string().default('Quem somos'),
      corpo: z.string(),
    }),
    historia: z.object({
      titulo: z.string().default('Nossa história'),
      corpo: z.string(),
    }),
    mvv: z.object({
      missaoTitulo: z.string().default('Missão'),
      missao: z.string(),
      visaoTitulo: z.string().default('Visão'),
      visao: z.string(),
      valoresTitulo: z.string().default('Valores'),
      valores: z
        .array(z.object({ titulo: z.string(), descricao: z.string() }))
        .default([]),
    }),
    areasSection: z.object({
      titulo: z.string().default('Áreas e membros'),
      intro: z.string().optional(),
    }),
    blogSection: z.object({
      titulo: z.string().default('Do nosso blog'),
      intro: z.string().optional(),
    }),
    ctaAcoes: z.object({
      titulo: z.string(),
      texto: z.string(),
      label: z.string(),
      href: z.string(),
    }),
    ctaParcerias: z.object({
      titulo: z.string(),
      texto: z.string(),
      label: z.string(),
      href: z.string(),
    }),
    seo: z
      .object({
        titulo: z.string().optional(),
        descricao: z.string().optional(),
      })
      .optional(),
  }),
});

// Configurações globais (rodapé, contato, SEO padrão, marca) — singleton.
const site = defineCollection({
  loader: glob({ pattern: 'config.yaml', base: './src/content/paginas' }),
  schema: z.object({
    orgNome: z.string().default('Elas na Engenharia'),
    tituloSufixo: z.string().default('Elas na Engenharia'),
    metaDescricaoPadrao: z.string(),
    // único campo onde check de formato paga -> espelhado por `pattern` no config.yml
    email: z.string().email(),
    copyrightTexto: z.string(), // render: © {ano} {copyrightTexto}
    redes: z
      .array(
        z.object({
          label: z.string(),
          // aceita https:// e mailto: -> z.string() frouxo, NÃO .url()
          href: z.string(),
          tipo: z
            .enum(['instagram', 'youtube', 'linkedin', 'email', 'outro'])
            .default('outro'),
        }),
      )
      .default([]),
  }),
});

export const collections = {
  areas,
  membros,
  acoes,
  parceiros,
  pesquisa,
  blog,
  'escolas-videos': escolasVideos,
  metricas,
  paginas, // entrada única: id "home"
  site, // entrada única: id "config"
};
