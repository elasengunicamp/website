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
  { file: 'textures/46.png', tags: ['sticker', 'star', 'fabric'], descricao: 'Adesivo tecido — estrela roxa' },
  { file: 'textures/48.png', tags: ['unreviewed'] },
  { file: 'textures/50.png', tags: ['unreviewed'] },
  { file: 'textures/51.png', tags: ['unreviewed'] },
  { file: 'textures/52.png', tags: ['unreviewed'] },
  { file: 'textures/53.png', tags: ['unreviewed'] },
];

// Ilustrações soltas estilo colagem/scrapbook — reviewed: false até curadoria visual
export const decorative: GraphicVariant[] = [
  '12', '13', '15', '16', '19', '20', '22', '23', '25', '26', '27', '30', '31', '32', '33', '34',
  '35', '39', '40', '41', '42', '49',
].map((n) => ({ file: `decorative/${n}.png`, tags: ['unreviewed'] }));

// Ícones de linha (estilo doodle monolinha) — complementam DoodleDecoration.astro
export const icons: GraphicVariant[] = [
  '14', '17', '18', '21', '24', '28', '29', '36', '37', '38', '43', '44', '45', '47',
].map((n) => ({ file: `icons/${n}.png`, tags: ['unreviewed'] }));
