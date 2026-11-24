# Favicon MRC

O favicon usa a identidade enviada pelo autor: letras MRC brancas em um tile
escuro, barras verdes e um traço azul. A imagem foi adaptada com a ferramenta
integrada `imagegen`, mantendo essa composição, ampliando as letras e removendo
o fundo branco externo. O arquivo original em Downloads não foi alterado.

## Arquivos e integração no Next.js

| Arquivo | Uso |
| --- | --- |
| `frontend/assets/brand/mrc-icon-master.png` | Fonte com transparência, usada para exportar os tamanhos finais. |
| `frontend/app/favicon.ico` | Ícones de 16, 32 e 48 pixels em um único arquivo para as abas. |
| `frontend/app/icon.png` | PNG de 512 pixels com cantos transparentes. |
| `frontend/app/apple-icon.png` | PNG de 180 pixels com fundo opaco; o dispositivo aplica sua máscara de cantos. |

O Next.js App Router reconhece os três nomes em `app/` e inclui automaticamente
as tags `link` de ícones no HTML, compartilhadas pelas rotas em inglês e português.
Não é necessário inserir tags manualmente em `layout.tsx` nem adicionar JavaScript
no navegador para trocar o ícone.

Os ícones são recursos de imagem, não páginas. Eles estão excluídos em
`frontend/next-sitemap.config.js` para manter somente as dez páginas públicas
no sitemap gerado pelo postbuild.

Depois de instalar as dependências do frontend, reexporte os arquivos com:

```bash
cd frontend
node scripts/generate-favicons.mjs
```

O script usa `sharp`, já instalado entre as dependências opcionais do Next.js,
para redimensionar e codificar os arquivos. Ele não faz uma nova geração por IA.
Se `sharp` estiver ausente, reinstale as dependências com `npm ci --include=optional`.

Para visualizar, execute `npm run dev` em `frontend/` e abra o endereço local.
O favicon pode ficar em cache no navegador; uma nova aba ou janela privativa
ajuda a verificar a atualização. A publicação depende do deploy do projeto.

## Prompt usado na adaptação

Ferramenta integrada: `imagegen`, com a imagem enviada como alvo de edição e
`transparent_background: true`.

```text
Use case: precise-object-edit. Asset type: production favicon master for a personal backend developer portfolio. Edit target: the attached MRC logo PNG. Preserve the identity: exact letters "MRC" in heavy white block capitals, a near-black rounded-square tile, three ascending green bars above the left portion, and a short blue underscore under the C at lower right. Adapt this same mark for small browser-tab sizes: tighten the excessive empty top/bottom margins and use slightly condensed large bold MRC lettering so the monogram takes priority and is clear when reduced to 16–32px. Keep the same simple arrangement, lettering, green and blue accents and near-black fill; crisp flat artwork with clean edges, no texture, gradients, lighting, shadows, bevels or mockups. Output ONE perfectly square icon, 1024x1024, frontal flat graphic only. The tile should nearly fill the canvas, with smoothly rounded outer corners. Remove the baked-in white outside the tile: all pixels outside the rounded dark square must be genuinely transparent. Do not make the white MRC letters transparent. Do not introduce any additional text, border, shape, or decoration.
```

A ferramenta retornou uma imagem quadrada de 1254 × 1254 pixels; os arquivos
consumidos pelo site são exportados nos tamanhos definidos pelo script.

Referência: [convenções de ícones do Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).
