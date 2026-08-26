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
    autores: z.array(z.string()),
    revistaOuEvento: z.string().optional(),
    doi: z.string().optional(),
    data: z.coerce.date(),
    resumo: z.string(),
    link: z.union([z.string().url(), z.literal('')]).optional(),
  }),
});

// Blog — posts de MKT/entrevistas
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
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
    valor: z.number(),
    unidade: z.string().optional(),
    categoria: z.enum(['projeto', 'universidade', 'engenharia']),
    ano: z.number().optional(),
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
};
