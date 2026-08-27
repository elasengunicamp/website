// Catálogo dos assets brutos em public/graphics/ (extraídos de
// "elementos gráficos.zip", nomes numéricos sem significado). Pastas
// confirmadas visualmente ficam com metadata completa; o resto lista
// arquivo + pasta só, pendente de curadoria (ver PROJECT-NOTES.md).
//
// Uso: componentes de colagem (GraphicSticker, SectionDivider etc.) importam
// daqui em vez de referenciar "public/graphics/decorative/23.png" direto no
// meio do código.

export type GraphicVariant = {
  file: string; // caminho relativo a /graphics
  tags: string[];
  descricao?: string;
};

export const logoVariants = {
  iconLilac: 'logo/1.png', // símbolo (engrenagem + punho) roxo claro — uso em fundo escuro
  iconDarkGray: 'logo/2.png', // símbolo cinza-escuro — uso neutro
  iconBrandPurple: 'logo/3.png', // símbolo roxo da marca — usar via public/images/brand/logo-icon.webp (já recortado)
  lockupHorizontalSolid: 'logo/6.png', // wordmark uma linha, roxo sólido — usar via public/images/brand/lockup-horizontal.webp
  lockupStackedGray: 'logo/7.png', // wordmark duas linhas, cinza + roxo
  lockupStackedPurple: 'logo/8.png', // wordmark duas linhas, roxo + lilás
  lockupArtisticScript: 'logo/9.png', // wordmark + script cursivo "Engenharia" — usar em contextos institucionais/festivos (font-script)
} satisfies Record<string, string>;

export const mascot = {
  ella: 'mascot/10.png', // mascote oficial — usar via public/images/brand/ella-mascot.webp (já recortado)
} satisfies Record<string, string>;

export const partners: GraphicVariant[] = [
  { file: 'partners/11.png', tags: ['swe', 'unicamp'], descricao: 'Logo SWE Brazil — Unicamp' },
];

export const textures: GraphicVariant[] = [
  // Corrigido durante a curadoria da Fase Ações/Parcerias: 46.png é uma
  // textura de papel rasgado branco (raster), não o adesivo de estrela —
  // essa descrição antiga pertencia na verdade a decorative/12.png (abaixo).
  { file: 'textures/46.png', tags: ['papel', 'rasgado', 'textura'], descricao: 'Papel branco amassado/rasgado — alternativa raster ao PaperTexture variant="torn" (que é CSS puro)' },
  { file: 'textures/48.png', tags: ['unreviewed'] },
  { file: 'textures/50.png', tags: ['unreviewed'] },
  { file: 'textures/51.png', tags: ['unreviewed'] },
  {
    file: 'textures/52.png',
    tags: ['washi-tape', 'gingham', 'lilac'],
    descricao: 'Fita washi xadrez gingham lilás/branco — usada como acento decorativo nas capas do blog',
  },
  { file: 'textures/53.png', tags: ['unreviewed'] },
];

// Ilustrações soltas estilo colagem/scrapbook — reviewed: false até curadoria visual
const decorativeUnreviewed = [
  '15', '16', '19', '20', '22', '23', '25', '26', '27', '30', '31', '32', '33', '34',
  '35', '39', '40', '41', '42', '49',
].map((n): GraphicVariant => ({ file: `decorative/${n}.png`, tags: ['unreviewed'] }));

export const decorative: GraphicVariant[] = [
  {
    file: 'decorative/12.png',
    tags: ['sticker', 'star', 'fabric'],
    descricao:
      'Adesivo de tecido (jeans) — estrela roxa com costura. Recortado e sem fundo em ' +
      'public/images/decor/sticker-star-fabric-escolas.webp (usado em /escolas), ' +
      'sticker-star-fabric-parcerias.webp (usado em /parcerias) e ' +
      'sticker-star-fabric-home.webp (usado na Home).',
  },
  { file: 'decorative/13.png', tags: ['doodle', 'sparkle', 'desenho-a-mao'], descricao: 'Estrela/brilho desenhado à mão, roxo sólido — mais elaborado que DoodleDecoration variant="sparkle"' },
  ...decorativeUnreviewed,
];

// Ícones de linha (estilo doodle monolinha) — complementam DoodleDecoration.astro
// Nota: apesar do nome da pasta, vários desses são renders 3D estilo emoji
// (não doodle monolinha) — descrição por item abaixo assim que revisados.
const iconsUnreviewed = [
  '21', '24', '28', '29', '36', '37', '38', '43', '44', '45', '47',
].map((n): GraphicVariant => ({ file: `icons/${n}.png`, tags: ['unreviewed'] }));

export const icons: GraphicVariant[] = [
  {
    file: 'icons/14.png',
    tags: ['3d', 'capacete', 'engenharia'],
    descricao:
      'Capacete de obra roxo, render 3D estilo emoji. Recortado e sem fundo em ' +
      'public/images/decor/icon-capacete-escolas.webp (usado em /escolas) e ' +
      'icon-capacete-dados.webp (usado em /dados).',
  },
  {
    file: 'icons/17.png',
    tags: ['3d', 'pin', 'mural', 'pushpin', 'lilac', 'sticker'],
    descricao:
      'Pin/tachinha lilás, render 3D — motivo "mural de cortiça" pra cards de Ações, ' +
      'recortado e sem fundo em public/images/decor/sticker-pushpin.webp (usado em /acoes). ' +
      'Também usado direto (sem recorte, PNG com fundo transparente) via /graphics/icons/17.png ' +
      'pra "fixar" cards de citação em /pesquisa.',
  },
  {
    file: 'icons/18.png',
    tags: ['halftone', 'megafone', 'ilustracao', 'aviso'],
    descricao:
      'Megafone em ilustração halftone roxo/rosa — recortado e sem fundo em ' +
      'public/images/decor/icon-megafone.webp (usado em /escolas); bom pra destaque de ' +
      '"novidades/avisos".',
  },
  ...iconsUnreviewed,
];
