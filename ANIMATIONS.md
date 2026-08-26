# Animações e componentes visuais — opções avaliadas

Projeto hoje (astro.config.mjs) não tem framework React/Vue/Svelte instalado — só Astro +
Tailwind. Qualquer opção baseada em React exige `npx astro add react` antes de usar.

## ReactBits

Biblioteca de componentes animados estilo copy-paste (como shadcn — não é `npm install` de
pacote, copia código ou instala via CLI individual). React + Tailwind + Framer Motion.

Cobre: text animations (split text, glitch, shiny text, gradient text, scramble/decrypt),
backgrounds (aurora, particles, waves, grid distortion, beams, plasma), animações gerais
(fade/scroll reveals, marquee, tilt cards, magnet effect, click spark), buttons/cards com
hover 3D e spotlight. TypeScript e JavaScript.

Custo: requer React + ReactDOM no bundle + Framer Motion (~30kb) por componente animado; os
backgrounds mais pesados (aurora, particles) usam WebGL/OGL. Rodaria como island Astro
(`client:visible` recomendado pra não carregar JS antes do componente estar na tela).

## Alternativas sem framework (custo zero de bundle)

- **Astro view transitions + CSS animations** — nativo, zero JS extra.
- **Motion One** — biblioteca de animação vanilla JS, usável direto em `.astro` sem island.
- **CSS scroll-driven animations** — nativo do browser, zero JS.
- **tailwindcss-animate** — classes utilitárias prontas, zero JS custom.

## Alternativas para backgrounds "artísticos" sem React

- **Vanta.js** — backgrounds animados (waves, birds, net, fog), só precisa `<script>`.
- **UnicornStudio** ou **Three.js puro** via script tag — mais controle, zero overhead de
  framework.

## Concorrentes diretos do ReactBits (caso se opte por instalar React mesmo assim)

- **Unlument UI** - top também, parece
- **Aceternity UI** — visual parecido (aurora, spotlight, 3d card), copy-paste, mais
  maduro/popular.
- **Magic UI** — mais polido, foco em marketing site, boa integração Tailwind.
- **Motion Primitives** — mais minimalista, menos "flashy".

## Recomendação (pendente de decisão)

Pra site institucional como o elasNaEng, sem React hoje: preferir CSS/Motion One nativo pros
efeitos simples (fade, reveal em scroll) e Vanta.js/UnicornStudio via script se quiser
background artístico pesado — evita trazer React inteiro só pra isso. ReactBits/Aceternity
ficam como opção se o projeto já for migrar pra React por outro motivo.

Também dá pra considerar GetLayers para inspiração e templates artísticos.
