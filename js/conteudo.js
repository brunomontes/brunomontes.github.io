/* =========================================================
   MOVIE MONTES — ARQUIVO DE CONTEÚDO
   ---------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para
   atualizar o site. Veja o guia em COMO-USAR.md
   ========================================================= */

const CONFIG = {
  nome: "Bruno Montes",
  marca: "Movie Montes",

  // Contato — troque pelos seus dados reais
  whatsapp: "5588981068140",            // só números: 55 + DDD + número
  email: "brunorsilva75@gmail.com",
  instagram: "bruno.montes",                      // sem o @ (vazio = não aparece no site)
  youtube: "",                          // link do canal (opcional)
  cidade: "Tauá — Ceará",

  // Showreel: vídeo exibido no botão "Assistir showreel"
  // Use o ID do YouTube (o que vem depois de "v=" no link)
  showreelYoutube: "",

  // Vídeo de fundo do topo do site (opcional, arquivo .mp4 curto e leve)
  // Ex.: "midia/videos/fundo.mp4"
  videoFundo: "",
};

/* ---------------------------------------------------------
   PORTFÓLIO
   ---------------------------------------------------------
   tipo:      "video" ou "foto"
   categoria: uma das categorias listadas abaixo
   titulo:    nome do trabalho
   cliente:   (opcional) nome do cliente/local
   capa:      imagem de capa (ex.: "midia/fotos/casamento-ana-capa.jpg")
              — se deixar vazio, aparece uma capa provisória

   Para VÍDEO, use UM destes:
     youtube: "ID_DO_VIDEO"
     vimeo:   "ID_DO_VIDEO"
     arquivo: "midia/videos/meu-video.mp4"

   Para FOTO, liste as imagens do álbum:
     fotos: ["midia/fotos/a.jpg", "midia/fotos/b.jpg", ...]
   --------------------------------------------------------- */

const CATEGORIAS = {
  video: ["Videomarketing", "Eventos", "Documentário", "Institucional", "Gastronomia", "Saúde & Medicina", "Outros"],
  foto:  ["Casamentos", "Formaturas & Cerimônias", "Aniversários", "Eventos Culturais"],
};

// Para vários vídeos no mesmo card, use  arquivos: ["a.mp4", "b.mp4", ...]
const V = "midia/videos/", F = "midia/fotos/";
const serie = (prefixo, n) => Array.from({ length: n }, (_, i) => `${prefixo}-${String(i + 1).padStart(2, "0")}`);

const PORTFOLIO = [
  // ===== VÍDEOS =====
  { tipo: "video", categoria: "Videomarketing", titulo: "Reels de marketing", cliente: "",
    arquivos: serie(V + "marketing", 12).map(n => n + ".mp4") },

  { tipo: "video", categoria: "Eventos", titulo: "Aniversário de Parambu — 69 anos", cliente: "Parambu-CE",
    arquivo: V + "parambu-69-anos.mp4" },

  { tipo: "video", categoria: "Eventos", titulo: "TBT Festberro 2024", cliente: "",
    arquivo: V + "festberro-2024.mp4" },

  { tipo: "video", categoria: "Documentário", titulo: "Ritmo Urbano", cliente: "Documentário",
    capa: F + "ritmo-urbano-01.jpg", youtube: "7D5r1J9wwGk" },

  { tipo: "video", categoria: "Eventos", titulo: "Festejos de Jesus, Maria e José", cliente: "",
    capa: F + "festejos-01.jpg", arquivo: V + "festejos-jesus-maria-jose.mp4" },

  { tipo: "video", categoria: "Videomarketing", titulo: "Trenzinho MM", cliente: "",
    capa: F + "trenzinho-mm-01.jpg", arquivo: V + "trenzinho-mm.mp4" },

  { tipo: "video", categoria: "Eventos", titulo: "Cobertura de eventos", cliente: "Festa Renan Play",
    arquivos: [V + "festa-renan-play-1.mp4", V + "festa-renan-play-2.mp4"] },

  // ===== FOTOS =====
  { tipo: "foto", categoria: "Casamentos", titulo: "Casamento Andreyna e Vinícius", cliente: "",
    fotos: serie(F + "casamento-andreyna-vinicius", 6).map(n => n + ".jpg") },

  { tipo: "foto", categoria: "Formaturas & Cerimônias", titulo: "Cerimônia do Jaleco", cliente: "",
    fotos: serie(F + "jaleco", 7).map(n => n + ".jpg") },

  { tipo: "foto", categoria: "Eventos Culturais", titulo: "Festejos de Jesus, Maria e José", cliente: "",
    fotos: serie(F + "festejos", 3).map(n => n + ".jpg") },
];
