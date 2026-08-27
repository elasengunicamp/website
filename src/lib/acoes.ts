// Helpers compartilhados entre a listagem (/acoes) e o detalhe (/acoes/[slug])
// — mantidos num só lugar pra listagem e detalhe nunca divergirem (cor de tag
// por hash, formato de data).
import type { AccentToken } from '../components/ui/Badge.astro';

const ACCENTS: AccentToken[] = ['blue', 'teal', 'pink', 'purple', 'yellow', 'rose'];

// Hash simples e estável — mesma tag sempre cai no mesmo accent, mas sem
// precisar mapear cada tag manualmente (tags são livres, vindas do CMS).
export function accentForTag(tag: string): AccentToken {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  return ACCENTS[hash % ACCENTS.length];
}

export const acaoDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});
