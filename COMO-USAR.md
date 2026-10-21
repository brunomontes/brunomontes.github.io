# Movie Montes — como usar o site

## Estrutura

```
Movie Montes/
├── index.html            ← a página
├── css/estilo.css        ← visual (cores, fontes)
├── js/conteudo.js        ← ⭐ SEU CONTEÚDO — o único arquivo que você precisa editar
├── js/site.js            ← funcionamento (não precisa mexer)
├── assets/
│   ├── logo-marca.svg    ← símbolo (ícone, foto de perfil)
│   └── logo-completa.svg ← símbolo + nome
└── midia/
    ├── fotos/            ← coloque aqui suas fotos (.jpg)
    └── videos/           ← vídeos curtos .mp4 (opcional)
```

## 1. Seus dados de contato

Abra `js/conteudo.js` e edite o bloco `CONFIG`:

```js
whatsapp: "5588999998888",   // 55 + DDD + número, só números
email: "seuemail@gmail.com",
instagram: "seuinstagram",
showreelYoutube: "dQw4w9WgXcQ", // ID do vídeo no YouTube
```

O formulário de contato monta a mensagem e abre o WhatsApp do cliente já com o texto pronto para você.

## 2. Adicionar um vídeo

O ideal é subir o vídeo no **YouTube** (pode ser "não listado") e usar só o ID.
No link `https://www.youtube.com/watch?v=AbC123xYz`, o ID é `AbC123xYz`.

```js
{ tipo: "video", categoria: "Gastronomia", titulo: "Hambúrguer artesanal",
  cliente: "Burger do Sertão", capa: "", youtube: "AbC123xYz" },
```

Sem `capa`, o site usa automaticamente a miniatura do YouTube.
Também funciona `vimeo: "123456"`. Em todos os casos o vídeo toca **dentro do site**, sem levar o cliente para outra página.

### Subir o vídeo direto no site (sem YouTube)

Copie o arquivo para `midia/videos/` e cadastre com `arquivo`:

```js
{ tipo: "video", categoria: "Videomarketing", titulo: "Reels — Loja X",
  cliente: "Loja X", capa: "", arquivo: "midia/videos/reels-loja-x.mp4" },
```

Sem `capa`, o card mostra um quadro do próprio vídeo, que começa a tocar quando o mouse passa por cima.

**Vários vídeos num card só** (como os Reels de marketing): use `arquivos` com uma lista. O visitante passa de um para o outro com as setas ‹ ›, e o próximo começa sozinho quando o atual termina:

```js
{ tipo: "video", categoria: "Eventos", titulo: "Cobertura de eventos", cliente: "Festa Renan Play",
  arquivos: ["midia/videos/festa-renan-play-1.mp4", "midia/videos/festa-renan-play-2.mp4"] },
```

**Exporte para web** (Premiere, DaVinci, CapCut ou HandBrake):
- MP4 · H.264 · áudio AAC
- 1080p a ~6–8 Mbps, ou 720p a ~3–4 Mbps
- Marque **"Web Optimized" / "Fast Start"**, para o vídeo começar a tocar antes de baixar inteiro
- Meta: **até ~30 MB por vídeo**. Um reel de 30 s fica com ~10–20 MB.

**Quando usar cada opção:**
| | Arquivo no site | Vimeo | YouTube |
|---|---|---|---|
| Player limpo, sem marca de terceiros | ✅ | ✅ (planos pagos) | ❌ |
| Ajusta a qualidade à internet do cliente | ❌ | ✅ | ✅ |
| Bom para vídeos longos | ❌ | ✅ | ✅ |
| Custo | grátis* | pago para tirar a marca | grátis |

\* Hospedagens grátis têm limite de tráfego mensal; vídeos pesados gastam esse limite rápido.

Recomendação: **reels e vídeos curtos → arquivo no site**; **institucionais e vídeos longos → Vimeo ou YouTube**.

## 3. Adicionar um álbum de fotos

1. Copie as fotos para `midia/fotos/` (de preferência JPG com até ~2000px de largura e ~500 KB cada — fica rápido no celular).
2. Cadastre:

```js
{ tipo: "foto", categoria: "Casamentos", titulo: "Ana & João",
  cliente: "Tauá-CE", capa: "midia/fotos/ana-joao-01.jpg",
  fotos: [
    "midia/fotos/ana-joao-01.jpg",
    "midia/fotos/ana-joao-02.jpg",
    "midia/fotos/ana-joao-03.jpg",
  ] },
```

**Categorias disponíveis** — vídeo: Eventos, Videomarketing, Institucional, Gastronomia, Saúde & Medicina, Outros · foto: Casamentos, Aniversários, Eventos Culturais.
Para criar uma nova, adicione o nome na lista `CATEGORIAS` e use-o no trabalho.

A ordem na lista é a ordem no site — coloque seus melhores trabalhos primeiro. Apague os exemplos quando cadastrar os seus.

## 4. Sua foto na seção "Sobre"

Em `index.html`, procure `Sua foto aqui` e troque o bloco `<div class="sobre-foto-provisoria">…</div>` por:

```html
<img src="midia/fotos/bruno.jpg" alt="Bruno Montes">
```

## 5. Ver no computador

Dentro da pasta do site, rode no Terminal:

```bash
python3 -m http.server 8080
```

E abra http://localhost:8080

## 6. Publicar (grátis)

- **Netlify Drop** — acesse app.netlify.com/drop e arraste a pasta inteira. Pronto, ganha um link. Para atualizar, arraste de novo.
- **GitHub Pages** ou **Vercel** — boas opções se quiser versionar.
- Domínio próprio (ex.: `moviemontes.com.br`) custa ~R$ 40/ano no registro.br e pode ser ligado a qualquer uma dessas opções.

## A logo

Símbolo dentro de uma **lente** (anel), com:
- **Serras em forma de "M"** — Montes, e as serras do sertão dos Inhamuns;
- **Botão play** recortado na serra — o vídeo;
- **Sol do sertão** — a luz de Tauá;
- **Onda sonora** na base — o músico.

Cores: âmbar `#F2A541`, terracota `#E4572E`, noite `#14110F`, areia `#F5EFE6`.
