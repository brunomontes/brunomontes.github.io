// ===== DADOS DA PÁGINA DA CTDOR =====
// Tudo o que costuma mudar fica aqui: número do WhatsApp e lista de atendimentos.

// Número da recepção da CTDOR (com 55 + DDD). Troque aqui se mudar.
var WHATSAPP = "5588997173507";

// ===== ATENDIMENTOS =====
// Para incluir, tirar ou mudar um atendimento, edite esta lista.
// cat: consultas, exames, estetica, cuidados (pode ter mais de uma, separadas por espaço)
// foto: rosto do profissional em equipe/ (sem .jpg); imagem: foto ilustrativa (Unsplash) quando não há profissional; sem nenhuma, aparece o ícone
var ATENDIMENTOS = [
  { nome: "Medicina da Dor", prof: "Dr. Romário Reis", foto: "romario", cat: "consultas", ic: "dor",
    servicos: ["Coluna, joelho e articulações", "Dor de cabeça e enxaqueca", "Dores crônicas e neuropáticas", "Fibromialgia", "Hérnia de disco"] },
  { nome: "Harmonização Facial", prof: "Dra. Amanda Rafaela", foto: "amanda", cat: "estetica", ic: "rosto",
    servicos: ["Full Face AR", "Estímulo de colágeno", "Contorno e sustentação facial", "Botox", "Preenchimento com ácido hialurônico"] },
  { nome: "Cardiologia", prof: "Dr. Adriano Siqueira", foto: "adriano", cat: "consultas", ic: "coracao",
    servicos: ["Avaliação cardiológica completa", "Prevenção de doenças do coração"] },
  { nome: "Endocrinologia", prof: "Dra. Stéphany Pequeno", foto: "stephany", cat: "consultas", ic: "gota",
    servicos: ["Diabetes", "Obesidade", "Tireoide", "Alterações hormonais", "Colesterol e triglicerídeos"] },
  { nome: "Geriatria", prof: "Dr. Wilson Filho", foto: "wilson", cat: "consultas", ic: "idoso",
    servicos: ["Avaliação global do idoso", "Doenças crônicas", "Demências, Alzheimer e Parkinson", "Prevenção de quedas", "Cuidados paliativos"] },
  { nome: "Pediatria e Neuropediatria", prof: "Dr. Daniel", foto: "daniel", cat: "consultas", ic: "crianca",
    servicos: ["Do nascimento à adolescência", "Atraso de fala", "TDAH", "TEA", "Convulsões"] },
  { nome: "Dermatologia", prof: "Dr. Ronaldo Moura", foto: "ronaldo", cat: "consultas", ic: "pele", servicos: [] },
  { nome: "Coloproctologia", prof: "Dr. Joaquim De La Puente", foto: "joaquim", cat: "consultas", ic: "estetoscopio", servicos: [] },
  { nome: "Endoscopia e Gastroenterologia", prof: "Dr. Walter Peixoto", foto: "walter", cat: "consultas exames", ic: "estomago",
    servicos: ["Endoscopia digestiva alta com sedação", "Gastrite", "Refluxo", "Detecção precoce de lesões"] },
  { nome: "Ultrassonografia", prof: "Dra. Eduarda Abreu", foto: "eduarda", cat: "exames", ic: "ultrassom",
    servicos: ["Abdome", "Pélvica", "Transvaginal", "Mamas", "Tireoide", "Obstétrica", "Próstata", "E outras"] },
  { nome: "Exames Laboratoriais", prof: "CTDOR LAB", imagem: "lab", cat: "exames", ic: "tubo", servicos: [] },
  { nome: "Eletrocardiograma", prof: "Exame do coração", imagem: "ecg", cat: "exames", ic: "ecg", servicos: [] },
  { nome: "Harmonização Corporal e Glútea", prof: "Dra. Naysa Sousa", foto: "naysa", cat: "estetica", ic: "brilho",
    servicos: ["Endolaser", "Harmonização glútea"] },
  { nome: "Nutrição", prof: "Dra. Andressa Lima", foto: "andressa", cat: "cuidados", ic: "folha",
    servicos: ["Acompanhamento nutricional personalizado", "Método Bodymetrix", "Saúde da mulher e fertilidade"] },
  { nome: "Saúde da Mulher", prof: "Enf. Giovanna Sales", foto: "giovanna", cat: "cuidados exames", ic: "mulher",
    servicos: ["Exame preventivo", "Taping", "Laserterapia", "Consultoria de amamentação"] },
  { nome: "Tratamento de Feridas", prof: "Enf. Vanessa Santos", cat: "cuidados", ic: "curativo",
    servicos: ["Tratamento avançado de feridas"] }
];

var ICONES = {
  dor: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/><path d="M3.2 12h4.3l2-3 3 6 2-3h6.3"/>',
  coracao: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  gota: '<path d="M12 2.7s-6 6.4-6 11.3a6 6 0 0 0 12 0c0-4.9-6-11.3-6-11.3Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  idoso: '<circle cx="11" cy="4.5" r="2"/><path d="M11 8v6l-3 7M11 14l3 7M8 11l3-3 3 3M17 11v10"/>',
  crianca: '<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0"/>',
  pele: '<path d="M12 3c4 3 7 6 7 10a7 7 0 0 1-14 0c0-4 3-7 7-10Z"/><circle cx="10" cy="13" r="1"/><circle cx="14" cy="15" r="1"/><circle cx="13" cy="10.5" r=".6"/>',
  estetoscopio: '<path d="M5 3v6a5 5 0 0 0 10 0V3"/><path d="M10 14v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/>',
  estomago: '<path d="M8 3v4a4 4 0 0 0 4 4h2a5 5 0 0 1 5 5 5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-1"/><path d="M14 11a3 3 0 0 0 3-3V3"/>',
  ultrassom: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M7 13a5 5 0 0 1 10 0M8 21h8M12 17v4"/>',
  tubo: '<path d="M9 3h6M10 3v13a2 2 0 0 0 4 0V3"/><path d="M10 10h4"/><path d="M5 21h14"/>',
  ecg: '<path d="M2 12h4l2-5 4 10 3-7 2 2h5"/>',
  rosto: '<path d="M12 3c4.4 0 7 3.1 7 7.5 0 5-3.4 10.5-7 10.5s-7-5.5-7-10.5C5 6.1 7.6 3 12 3Z"/><path d="M9.5 10h.01M14.5 10h.01M10 15c1.2.8 2.8.8 4 0"/>',
  brilho: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8Z"/>',
  folha: '<path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-10-1 12-5 16-10 16Z"/><path d="M4 21c3-6 7-9 11-11"/>',
  mulher: '<circle cx="12" cy="8" r="5"/><path d="M12 13v8M9 18h6"/>',
  curativo: '<rect x="2.5" y="8" width="19" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="M10.5 10.5h.01M13.5 13.5h.01M13.5 10.5h.01M10.5 13.5h.01"/>'
};
