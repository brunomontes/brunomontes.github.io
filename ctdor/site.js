// Comportamento das páginas da CTDOR. Os dados ficam em dados.js.

function wa(msg) {
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
}
function esc(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
function icone(nome, tam) {
  return '<svg width="' + tam + '" height="' + tam + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + (ICONES[nome] || "") + "</svg>";
}
// Foto do profissional quando houver; senão, o ícone da especialidade
function avatar(a, tam) {
  return a.foto
    ? '<img src="equipe/' + a.foto + '.jpg" alt="' + esc(a.prof) + '" width="' + tam + '" height="' + tam + '" loading="lazy">'
    : icone(a.ic, Math.round(tam * 0.42));
}
var ZAP_SVG ='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z"/></svg>';

// ===== Página inicial: resumo das especialidades =====
var resumo = document.getElementById("resumo-esp");
if (resumo) {
  var comFoto = ATENDIMENTOS.filter(function (a) { return a.foto; });
  var rostos = comFoto.slice(0, 5);
  var resto = comFoto.length - rostos.length;
  resumo.querySelector(".icones").innerHTML =
    rostos.map(function (a) { return "<span>" + avatar(a, 46) + "</span>"; }).join("") +
    (resto > 0 ? '<span class="mais-n">+' + resto + "</span>" : "");
  resumo.querySelector("small").textContent =
    ATENDIMENTOS.slice(0, 3).map(function (a) { return a.nome; }).join(", ") +
    (ATENDIMENTOS.length > 3 ? " e mais " + (ATENDIMENTOS.length - 3) : "");
}

// ===== Página de especialidades: lista e filtros =====
var lista = document.getElementById("lista");
if (lista) {
  lista.innerHTML = ATENDIMENTOS.map(function (a) {
    // Mensagem que chega na recepção ao tocar na especialidade
    var msg = "Olá! Vim pelo Instagram e procuro atendimento em " + a.nome + ". Poderia me informar os horários disponíveis?";
    var servicos = a.servicos.length ? '<span class="servicos">' + esc(a.servicos.join(" · ")) + "</span>" : "";
    return '<a class="atend" data-cat="' + a.cat + '" href="' + wa(msg) + '" target="_blank" rel="noopener">' +
      '<span class="ic' + (a.foto ? " com-foto" : "") + '">' + avatar(a, 56) + "</span>" +
      '<span class="nome"><b>' + esc(a.nome) + "</b><small>" + esc(a.prof) + "</small>" + servicos + "</span>" +
      '<span class="wa" aria-hidden="true">' + ZAP_SVG + "</span>" +
    "</a>";
  }).join("");

  document.querySelectorAll(".filtro").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.dataset.filtro;
      document.querySelectorAll(".filtro").forEach(function (b) { b.setAttribute("aria-pressed", b === btn); });
      lista.querySelectorAll(".atend").forEach(function (d) {
        d.hidden = f !== "todos" && d.dataset.cat.split(" ").indexOf(f) < 0;
      });
    });
  });
}

// ===== Links de WhatsApp com mensagem pronta =====
document.querySelectorAll("a.zap").forEach(function (a) { a.href = wa(a.dataset.msg); });

// ===== Barra fixa e entrada suave =====
var barra = document.getElementById("barra");
var cta = document.getElementById("cta");
if ("IntersectionObserver" in window) {
  // Barra fixa aparece quando o botão principal sai da tela
  if (barra && cta) {
    new IntersectionObserver(function (e) {
      barra.classList.toggle("visivel", !e[0].isIntersecting && e[0].boundingClientRect.top < 0);
    }).observe(cta);
  }

  var obs = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visto"); obs.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".surge").forEach(function (el) { obs.observe(el); });
  // Garantia: nada fica escondido se o navegador não avisar a rolagem
  setTimeout(function () {
    document.querySelectorAll(".surge").forEach(function (el) { el.classList.add("visto"); });
  }, 1500);
} else {
  document.querySelectorAll(".surge").forEach(function (el) { el.classList.add("visto"); });
}
