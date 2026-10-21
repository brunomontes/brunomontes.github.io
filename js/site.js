/* =========================================================
   MOVIE MONTES — comportamento do site
   (não é preciso editar este arquivo; use js/conteudo.js)
   ========================================================= */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const ICONE_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
  const ICONE_FOTO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h4l2-3h6l2 3h4v11H3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/></svg>';

  /* ---------- contato ---------- */
  const whatsLink = (texto) =>
    `https://wa.me/${CONFIG.whatsapp}${texto ? "?text=" + encodeURIComponent(texto) : ""}`;

  $("#link-whats").href = whatsLink("Olá, Bruno! Vi seu portfólio da Movie Montes e gostaria de um orçamento.");
  $("#txt-whats").textContent = formatarFone(CONFIG.whatsapp);
  if (CONFIG.instagram) {
    $("#link-insta").href = `https://instagram.com/${CONFIG.instagram}`;
    $("#txt-insta").textContent = "@" + CONFIG.instagram;
  } else {
    $("#link-insta").parentElement.remove();
  }
  $("#link-email").href = `mailto:${CONFIG.email}`;
  $("#txt-email").textContent = CONFIG.email;
  $("#ano").textContent = new Date().getFullYear();

  function formatarFone(n) {
    const m = String(n).match(/^55(\d{2})(\d{4,5})(\d{4})$/);
    return m ? `(${m[1]}) ${m[2]}-${m[3]}` : "WhatsApp";
  }

  $("#form-contato").addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const linhas = [
      `Olá, Bruno! Meu nome é ${d.get("nome")}.`,
      `Tenho interesse em: ${d.get("servico")}.`,
      d.get("quando") ? `Data/local: ${d.get("quando")}.` : "",
      d.get("mensagem") ? `\n${d.get("mensagem")}` : "",
    ].filter(Boolean);
    window.open(whatsLink(linhas.join("\n")), "_blank", "noopener");
  });

  /* ---------- menu e cabeçalho ---------- */
  const topo = $("#topo"), menu = $(".menu"), menuBtn = $(".menu-btn");
  const aoRolar = () => topo.classList.toggle("rolado", scrollY > 40);
  addEventListener("scroll", aoRolar, { passive: true }); aoRolar();

  menuBtn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    menuBtn.setAttribute("aria-expanded", aberto);
    document.body.style.overflow = aberto ? "hidden" : "";
  });
  $$(".menu a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("aberto"); menuBtn.setAttribute("aria-expanded", false); document.body.style.overflow = "";
  }));

  /* ---------- vídeo de fundo ---------- */
  if (CONFIG.videoFundo) {
    const v = $(".hero-video");
    v.src = CONFIG.videoFundo; v.hidden = false;
  }

  /* ---------- capas ---------- */
  const CORES = {
    "Eventos": [18, 32], "Videomarketing": [350, 20], "Institucional": [210, 30],
    "Gastronomia": [25, 45], "Saúde & Medicina": [175, 200], "Outros": [260, 300],
    "Casamentos": [30, 350], "Aniversários": [320, 40], "Eventos Culturais": [45, 15],
  };
  function capaProvisoria(item) {
    const [h1, h2] = CORES[item.categoria] || [30, 15];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${h1} 45% 22%)"/><stop offset="1" stop-color="hsl(${h2} 55% 12%)"/></linearGradient>
        <radialGradient id="s"><stop offset="0" stop-color="hsl(${h1} 90% 70%)" stop-opacity=".55"/><stop offset="1" stop-color="hsl(${h1} 90% 60%)" stop-opacity="0"/></radialGradient></defs>
      <rect width="800" height="600" fill="url(#g)"/>
      <circle cx="560" cy="250" r="220" fill="url(#s)"/>
      <path d="M0 600 L0 430 L150 330 L270 420 L420 300 L560 410 L680 340 L800 420 L800 600Z" fill="#000" opacity=".28"/>
      <path d="M0 600 L0 500 L200 430 L380 490 L560 420 L800 490 L800 600Z" fill="#000" opacity=".3"/>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function capaDe(item) {
    if (item.capa) return item.capa;
    if (item.youtube) return `https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg`;
    if (item.fotos && item.fotos.length) return item.fotos[0];
    return capaProvisoria(item);
  }

  // vídeos enviados de um item (aceita "arquivo" ou "arquivos: [...]")
  const arquivosDe = (item) => item.arquivos || (item.arquivo ? [item.arquivo] : []);

  /* ---------- portfólio ---------- */
  const grade = $("#grade"), subfiltros = $(".subfiltros");
  let tipoAtual = "todos", catAtual = null, listaVisivel = [];

  function renderSubfiltros() {
    subfiltros.innerHTML = "";
    if (tipoAtual === "todos") return;
    const usadas = new Set(PORTFOLIO.filter(i => i.tipo === tipoAtual).map(i => i.categoria));
    const cats = CATEGORIAS[tipoAtual].filter(c => usadas.has(c));
    ["Todas", ...cats].forEach(c => {
      const b = document.createElement("button");
      b.className = "sub" + ((c === "Todas" && !catAtual) || c === catAtual ? " ativo" : "");
      b.textContent = c;
      b.onclick = () => { catAtual = c === "Todas" ? null : c; renderSubfiltros(); renderGrade(); };
      subfiltros.appendChild(b);
    });
  }

  function renderGrade() {
    listaVisivel = PORTFOLIO.filter(i =>
      (tipoAtual === "todos" || i.tipo === tipoAtual) && (!catAtual || i.categoria === catAtual));
    grade.innerHTML = "";
    if (!listaVisivel.length) {
      grade.innerHTML = '<p class="grade-vazia">Nenhum trabalho nesta categoria ainda.</p>';
      return;
    }
    listaVisivel.forEach((item, idx) => {
      const card = document.createElement("button");
      card.className = "card";
      card.style.animationDelay = `${idx * 60}ms`;
      card.setAttribute("aria-label", `${item.tipo === "video" ? "Assistir" : "Ver fotos"}: ${item.titulo}`);
      const arqs = arquivosDe(item);
      const qtd = item.tipo === "video" ? arqs.length : (item.fotos || []).length;
      const extra = qtd > 1 ? `${qtd} ${item.tipo === "video" ? "vídeos" : "fotos"}` : "";
      card.innerHTML = `
        ${arqs.length && !item.capa
          ? `<video src="${arqs[0]}#t=0.5" muted playsinline loop preload="metadata"></video>`
          : `<img src="${capaDe(item)}" alt="" loading="lazy">`}
        <span class="card-tipo">${item.tipo === "video" ? ICONE_PLAY : ICONE_FOTO}</span>
        <span class="card-info">
          <span class="card-cat">${item.tipo === "video" ? "Vídeo" : "Foto"} · ${item.categoria}</span>
          <span class="card-titulo">${item.titulo}</span>
          ${item.cliente || extra ? `<span class="card-cliente">${[item.cliente, extra].filter(Boolean).join(" · ")}</span>` : ""}
        </span>`;
      card.onclick = () => abrirItem(item);
      // vídeo enviado: prévia em movimento ao passar o mouse
      const previa = card.querySelector("video");
      if (previa) {
        card.addEventListener("mouseenter", () => previa.play().catch(() => {}));
        card.addEventListener("mouseleave", () => previa.pause());
      }
      grade.appendChild(card);
    });
  }

  function definirTipo(tipo) {
    tipoAtual = tipo; catAtual = null;
    $$(".filtro").forEach(f => {
      const on = f.dataset.tipo === tipo;
      f.classList.toggle("ativo", on); f.setAttribute("aria-selected", on);
    });
    renderSubfiltros(); renderGrade();
  }
  $$(".filtro").forEach(f => f.addEventListener("click", () => definirTipo(f.dataset.tipo)));
  $$("[data-filtro]").forEach(a => a.addEventListener("click", () => definirTipo(a.dataset.filtro)));
  renderGrade();

  /* ---------- visualizador ---------- */
  const visor = $("#visor"), palco = $(".visor-palco"), legenda = $(".visor-legenda");
  const btnAnt = $(".visor-ant"), btnProx = $(".visor-prox");
  let album = [], idx = 0;

  function abrirVisor() { visor.hidden = false; document.body.style.overflow = "hidden"; $(".visor-fechar").focus(); }
  function fecharVisor() { visor.hidden = true; palco.innerHTML = ""; document.body.style.overflow = ""; }

  function mostrarVazio(msg) {
    palco.innerHTML = `<div class="visor-vazio"><img src="assets/logo-marca.svg" alt=""><p>${msg}</p></div>`;
  }

  // mostra o item atual do álbum (foto ou vídeo enviado)
  function mostrarAtual() {
    const m = album[idx], multi = album.length > 1;
    if (m.tipo === "video") {
      palco.innerHTML = `<video src="${m.src}" ${m.capa ? `poster="${m.capa}"` : ""} controls autoplay playsinline controlslist="nodownload"></video>`;
      if (multi) palco.querySelector("video").onended = () => passo(1);
    } else {
      palco.innerHTML = `<img src="${m.src}" alt="">`;
    }
    btnAnt.hidden = btnProx.hidden = !multi;
    legenda.textContent = `${album.titulo}${multi ? `  ·  ${idx + 1} / ${album.length}` : ""}`;
  }

  function abrirAlbum(itens, titulo) {
    album = itens; album.titulo = titulo; idx = 0;
    mostrarAtual(); abrirVisor();
  }

  function mostrarVideo(item) {
    const titulo = [item.titulo, item.cliente].filter(Boolean).join(" — ");
    const arqs = arquivosDe(item);
    if (arqs.length) return abrirAlbum(arqs.map(src => ({ tipo: "video", src, capa: item.capa })), titulo);
    album = []; btnAnt.hidden = btnProx.hidden = true;
    legenda.textContent = titulo;
    if (item.youtube) palco.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="${item.titulo}"></iframe>`;
    else if (item.vimeo) palco.innerHTML = `<iframe src="https://player.vimeo.com/video/${item.vimeo}?autoplay=1&title=0&byline=0&portrait=0&dnt=1" allow="autoplay; fullscreen" allowfullscreen title="${item.titulo}"></iframe>`;
    else mostrarVazio("Este vídeo ainda não foi adicionado.<br>Cadastre-o em <b>js/conteudo.js</b>.");
    abrirVisor();
  }

  function abrirItem(item) {
    if (item.tipo === "video") return mostrarVideo(item);
    const fotos = item.fotos && item.fotos.length ? item.fotos : (item.capa ? [item.capa] : []);
    if (!fotos.length) {
      album = []; btnAnt.hidden = btnProx.hidden = true;
      legenda.textContent = item.titulo;
      mostrarVazio("Este álbum ainda não tem fotos.<br>Adicione-as em <b>js/conteudo.js</b>.");
      return abrirVisor();
    }
    abrirAlbum(fotos.map(src => ({ tipo: "foto", src })), item.titulo);
  }

  const passo = (d) => { if (album.length > 1) { idx = (idx + d + album.length) % album.length; mostrarAtual(); } };
  btnAnt.onclick = () => passo(-1);
  btnProx.onclick = () => passo(1);
  $(".visor-fechar").onclick = fecharVisor;
  visor.addEventListener("click", (e) => { if (e.target === visor || e.target === palco) fecharVisor(); });
  addEventListener("keydown", (e) => {
    if (visor.hidden) return;
    if (e.key === "Escape") fecharVisor();
    if (e.key === "ArrowLeft") passo(-1);
    if (e.key === "ArrowRight") passo(1);
  });
  // gesto de arrastar no celular
  let toqueX = null;
  visor.addEventListener("touchstart", (e) => { toqueX = e.target.tagName === "VIDEO" ? null : e.touches[0].clientX; }, { passive: true });
  visor.addEventListener("touchend", (e) => {
    if (toqueX === null) return;
    const dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 50) passo(dx < 0 ? 1 : -1);
    toqueX = null;
  });

  $("#btn-showreel").addEventListener("click", () =>
    mostrarVideo({ titulo: "Showreel Movie Montes", youtube: CONFIG.showreelYoutube }));

  /* ---------- animação ao rolar ---------- */
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visivel"); obs.unobserve(en.target); } });
  }, { threshold: 0.15 });
  $$(".revelar").forEach(el => obs.observe(el));
})();
