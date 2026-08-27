// Formatação de datas em pt-BR compartilhada entre /pesquisa e /blog (listas
// e detalhes) — evita reimplementar o mesmo Intl.DateTimeFormat em cada página.
export type EstiloData = 'curta' | 'longa';

export function formatarData(data: Date, estilo: EstiloData = 'curta') {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: estilo === 'longa' ? 'long' : 'short',
    year: 'numeric',
  }).format(data);
}
