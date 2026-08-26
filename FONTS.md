# Fontes — status e pendência

O manual de identidade visual (`manual_identidade_elas.pdf`) especifica fontes pagas/de fundição
que não têm licença confirmada de uso web/self-hosting:

| Papel                          | Fonte da marca (pretendida)                          | Status |
|---------------------------------|-------------------------------------------------------|--------|
| Título sóbrio                   | Extenda 40 Hecta / Heading Now 91 / Brasika            | Sem arquivo/licença — pendente |
| Título artístico/comemorativo   | Sloop Script Pro (ou Noto Serif Display / Drunken Hour)| Sem arquivo/licença — pendente |
| Corpo de texto                  | Montaser Arabic / Argent                               | Sem arquivo/licença — pendente |

## Substitutas usadas agora (self-hosted, gratuitas, via Fontsource)

| Token Tailwind   | Fonte substituta   | Pacote                        |
|-------------------|--------------------|--------------------------------|
| `font-heading`     | Space Grotesk       | `@fontsource/space-grotesk`   |
| `font-script`      | Alex Brush          | `@fontsource/alex-brush`      |
| `font-body`        | Inter                | `@fontsource/inter`           |
| `font-mono`         | JetBrains Mono      | `@fontsource/jetbrains-mono`  |

Justificativa da escolha: Space Grotesk tem caráter técnico/geométrico próximo do que o manual
descreve para os títulos sóbrios; Alex Brush é a substituta calibrada mais próxima de um script
elegante como o Sloop Script Pro; Inter cobre bem o corpo de texto STEM-pesado (boa legibilidade,
números tabulares).

## Como trocar pelas fontes originais

Como os componentes só referenciam fontes via tokens (`font-heading`/`font-script`/`font-body`/
`font-mono` em `src/styles/global.css`, bloco `@theme`), a troca é local a um arquivo:

1. Conseguir os arquivos `.woff2` licenciados para uso web das fontes originais.
2. Colocar em `src/fonts/` (ou `public/fonts/`).
3. Adicionar `@font-face` correspondente em `src/styles/global.css` e apontar os tokens `--font-*`
   pra elas.
4. Remover o import do pacote Fontsource equivalente em `src/layouts/BaseLayout.astro`.

Nenhum componente precisa mudar.

## Pendência

Confirmar com o time/designer se há arquivos licenciados de Extenda 40 Hecta, Heading Now 91,
Brasika, Sloop Script Pro, Montaser Arabic e Argent para uso web. Até lá, as substitutas acima
são o padrão do projeto.
