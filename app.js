// Classe base (poderia ser abstrata)
class PrayerComponent {
  add(component) {
    throw new Error("Operação não suportada para este componente");
  }
  remove(component) {
    throw new Error("Operação não suportada para este componente");
  }
  getChild(index) {
    throw new Error("Operação não suportada para este componente");
  }
  flatten() {
    throw new Error("Operação não suportada para este componente");
  }
}

// representa uma oração individual Leaf
class PrayerLeaf extends PrayerComponent {
  constructor(title, text) {
    super();
    this.title = title;
    this.text = text;
  }
  flatten() {
    return [this];
  }
}
// representa um grupo de orações
class PrayerComposite extends PrayerComponent {
  constructor(title) {
    super();
    this.title = title;
    this.children = [];
  }
  add(component) {
    this.children.push(component);
  }
  remove(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
  getChild(index) {
    return this.children[index];
  }
  flatten() {
    let result = [];
    for (let child of this.children) {
      result = result.concat(child.flatten());
    }
    return result;
  }
}
class PrayerCompositeBuilder {
  constructor(prayers) {
    this.prayers = prayers;
  }

  build() {
    throw new Error("Método build() não implementado");
  }
}

/* –––––––––––––––––––––––––––––––––––– */
class RosaryCompositeBuilder extends PrayerCompositeBuilder {
  constructor(prayers, mystery = "joyful") {
    super(prayers);
    this.mystery = mystery;
    
    this.hoje = new Date();
    this.diaDaSemana = this.hoje.getDay();
    this.nomeDoDiaDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][this.diaDaSemana];
    this.numerosOrdinais = ["", "primeiro", "segundo", "terceiro", "quarto", "quinto"];
    this.sequence = [];
    this.currentStep = 0;
    this.currentMystery = this.getMystery(this.diaDaSemana);

    this.mysteries = {
      joyful: [
        "No Primeiro Mistério Gozoso contemplamos a Anunciação do Anjo a Nossa Senhora (Lc 1, 26-38).",
        "No Segundo Mistério Gozoso contemplamos a Visitação de Nossa Senhora a sua prima Santa Isabel (Lc 1, 39-56).",
        "No Terceiro Mistério Gozoso contemplamos o Nascimento de Nosso Senhor Jesus Cristo em Belém (Lc 2, 1-15).",
        "No Quarto Mistério Gozoso contemplamos a Apresentação do Menino Jesus no Templo e a Purificação de Nossa Senhora (Lc 2, 22-35).",
        "No Quinto Mistério Gozoso contemplamos a perda e o encontro do Menino Jesus (Lc 2, 42-52).",
      ],
      sorrowful: [
        "No Primeiro Mistério Doloroso contemplamos a Agonia de Jesus no Horto das Oliveiras (Mc 14, 32-42).",
        "No Segundo Mistério Doloroso contemplamos a Flagelação de Nosso Senhor Jesus Cristo (Jo 19, 1).",
        "No Terceiro Mistério Doloroso contemplamos a Coroação de espinhos de Nosso Senhor (Mt 27, 29).",
        "No Quarto Mistério Doloroso contemplamos Nosso Senhor carregando penosamente a Cruz até o alto do Calvário (Lc 23, 26-32).",
        "No Quinto Mistério Doloroso contemplamos a Crucificação e morte de Nosso Senhor Jesus Cristo (Lc 23, 33-47).",
      ],
      glorious: [
        "No Primeiro Mistério Glorioso contemplamos a Ressurreição de Jesus Cristo (Mc 16, 1-8).",
        "No Segundo Mistério Glorioso contemplamos a Ascensão de Jesus aos Céus (At 1, 3-11).",
        "No Terceiro Mistério Glorioso contemplamos a descida do Espírito Santo sobre Nossa Senhora e os Apóstolos no Cenáculo (At 2, 1-14).",
        "No Quarto Mistério Glorioso contemplamos a Assunção de Nossa Senhora aos Céus (1 Cor 15, 20-23, 53-55).",
        "No Quinto Mistério Glorioso contemplamos a gloriosa coroaçãod e Maria Santíssima como Rainha do Céu e da Terra (Ap 12, 1-6).",
      ],
      luminous: [
        "No Primeiro Mistério Luminoso contemplamos o Batismo de Jesus (Mt 3, 13-17).",
        "No Segundo Mistério Luminoso contemplamos a auto-revelação nas Bodas de Caná (Jo 2, 1-12).",
        "No Terceiro Mistério Luminoso contemplamos o Anúncio do Reino de Deus convidando à conversão (Mc 1, 14-15).",
        "No Quarto Mistério Luminoso contemplamos a Transfiguração de Jesus (Lc 9, 28-36).",
        "No Quinto Mistério Luminoso contemplamos a instituição da Eucaristia (Mt 26, 26-29).",
      ],
    };
  }
  
  build() {
    const mysteriesDescriptions = this.mysteries[this.mystery];
    if (!mysteriesDescriptions) {
      throw new Error(`Mistério "${this.mystery}" não encontrado!`);
    }
    const root = new PrayerComposite("Rosário");
    const initial = new PrayerComposite("Parte Inicial");
    initial.add(new PrayerLeaf("Oferecimento", this.prayers["OferecimentoTerco"]));
    initial.add(new PrayerLeaf("Sinal da Cruz", this.prayers["SinalDaCruz"]));
    initial.add(new PrayerLeaf("Credo", this.prayers["Credo"]));
    initial.add(new PrayerLeaf("Pai Nosso", this.prayers["PaiNosso"]));

    for (let i = 1; i <= 3; i++) {
      initial.add(new PrayerLeaf(`Ave Maria (${i}/3)`, this.prayers["AveMaria"]));
    }

    initial.add(new PrayerLeaf("Glória", this.prayers["Gloria"]));
    initial.add(new PrayerLeaf("Ó meu Jesus, perdoai-nos!", this.prayers["OhMeuJesus"]));
    root.add(initial);

    for (let i = 0; i < 5; i++) {
      const mystOrdinal = this.numerosOrdinais[i + 1];
      const mystTitle = mystOrdinal.charAt(0).toUpperCase() + mystOrdinal.slice(1) + " Mistério";
      const mysteryComposite = new PrayerComposite(mystTitle);

      mysteryComposite.add(new PrayerLeaf(mystTitle, mysteriesDescriptions[i]));
      mysteryComposite.add(new PrayerLeaf("Pai Nosso", this.prayers["PaiNosso"]));
      
      const hailMaryComposite = new PrayerComposite("Ave Maria (10 vezes)");
      for (let j = 1; j <= 10; j++) {
        hailMaryComposite.add(new PrayerLeaf(`Ave Maria (${j}/10)`, this.prayers["AveMaria"]));
      }
      mysteryComposite.add(hailMaryComposite);
      
      mysteryComposite.add(new PrayerLeaf("Glória", this.prayers["Gloria"]));
      mysteryComposite.add(new PrayerLeaf("Ó meu Jesus, perdoai-nos!", this.prayers["OhMeuJesus"]));
      root.add(mysteryComposite);
    }

    const finalComposite = new PrayerComposite("Parte Final");
    finalComposite.add(new PrayerLeaf("Agradecimento", this.prayers["Agradecimento"]));
    finalComposite.add(new PrayerLeaf("Salve Rainha", this.prayers["SalveRainha"]));
    root.add(finalComposite);

    return root.flatten();
  }
  
  getMystery(weekDay) {
    if (weekDay === undefined || weekDay < 0 || weekDay > 6) {
      weekDay = new Date().getDay();
    }
    if (weekDay === 0 || weekDay === 3) {
      return "glorious";
    }
    if (weekDay === 1 || weekDay === 6) {
      return "joyful";
    }
    if (weekDay === 3 || weekDay === 5) {
      return "sorrowful";
    }
    if (weekDay === 4) {
      return "luminous";
    }
    return "glorious";
  }
}

class MorningPrayerBuilder extends PrayerCompositeBuilder {
  constructor(prayers) {
    super(prayers);
    this.sequence = [];
    this.currentStep = 0;
  }
  build() {
    let easterTime = false;
    const root = new PrayerComposite("Oração da Manhã");
    root.add(new PrayerLeaf("Sinal da Cruz", this.prayers["PeloSinalDaSantaCruz"]));
  
    const holySpirit = new PrayerComposite("Invocação ao Espírito Santo");
    holySpirit.add(new PrayerLeaf("Invocação ao Espírito Santo", this.prayers["VindeEspiritoSanto"] || "Vinde Espírito Santo..."));
    for (let i = 1; i <= 3; i++) {
        holySpirit.add(new PrayerLeaf(`Jaculatória Vinde Espírito Santo (${i}/3)`, this.prayers["JaculatoriaVindeEspiritoSanto"]));
    }
    root.add(holySpirit);
  
    const offeringDay = new PrayerComposite("Oferecimento do dia");
    offeringDay.add(new PrayerLeaf("Oferecimento do dia", this.prayers["OferecimentoDia"]));
    offeringDay.add(new PrayerLeaf("Pai Nosso", this.prayers["PaiNosso"]));
    offeringDay.add(new PrayerLeaf("Ave Maria", this.prayers["AveMaria"]));
    offeringDay.add(new PrayerLeaf("Glória", this.prayers["Gloria"]));
    root.add(offeringDay);
  
    if (easterTime) {
        const holyQueen = new PrayerComposite("Rainha do Céu (durante o Tempo Pascal)");
        for (let i = 1; i <= 4; i++) {
          holyQueen.add(new PrayerLeaf(`Rainha do Céu (durante o Tempo Pascal)`, this.prayers[`RainhaDoCeu0${i}`]));
        }
        root.add(holyQueen);
    }
    else {
      const angelus = new PrayerComposite("Angelus");
      for (let i = 1; i <= 3; i++) {
        angelus.add(new PrayerLeaf(`Oração do Anjo (Angelus)`, this.prayers[`Angelus0${i}`]));
        if (i <= 3) {
          angelus.add(new PrayerLeaf(`Ave Maria`, this.prayers["AveMaria"]));
        }
      }
      for (let i = 1; i <= 3; i++) {
        angelus.add(new PrayerLeaf(`Glória (${i}/3)`, this.prayers["Gloria"]));
      }
      root.add(angelus);
    }
  
    const consecrationOurLady = new PrayerComposite("Consagração a Nossa Senhora");
    consecrationOurLady.add(new PrayerLeaf("Consagração a Nossa Senhora", this.prayers["ConsagracaoNossaSenhora"]));
    root.add(consecrationOurLady);
  
    const holyAngel = new PrayerComposite("Invocação ao Santo Anjo da guarda");
    holyAngel.add(new PrayerLeaf("Invocação ao Santo Anjo da guarda", this.prayers["SantoAnjo"]));
    root.add(holyAngel);
  
    const soulsOfPurgatory = new PrayerComposite("Oração pelas almas do Purgatório");
    soulsOfPurgatory.add(new PrayerLeaf("Oração pelas almas do Purgatório", this.prayers["AlmasPurgatorio"]));
    root.add(soulsOfPurgatory);
  
    const agonizing = new PrayerComposite("Oração pelos agonizantes");
    agonizing.add(new PrayerLeaf("Oração pelos agonizantes", this.prayers["Agonizantes"]));
    root.add(agonizing);
  
    const myself = new PrayerComposite("Oferecimento de si mesmo");
    myself.add(new PrayerLeaf("Oferecimento de si mesmo", this.prayers["SiMesmo"]));
    root.add(myself);
  
    const spiritualCommunion = new PrayerComposite("Comunhão Espiritual");
    spiritualCommunion.add(new PrayerLeaf("Comunhão Espiritual", this.prayers["ComunhaoEspiritual"]));
    root.add(spiritualCommunion);
  
    const sweetLady = new PrayerComposite("Ó Doce Senhora Minha");
    sweetLady.add(new PrayerLeaf("Ó Doce Senhora Minha", this.prayers["DoceSenhoraMinha"]));
    root.add(sweetLady);
  
    return root.flatten();
  }
}

class NightPrayerBuilder extends PrayerCompositeBuilder {
  constructor(prayers) {
    super(prayers);
    this.sequence = [];
    this.currentStep = 0;
  }
  build() {
    const root = new PrayerComposite("Oração da Noite ");
    root.add(new PrayerLeaf("Sinal da Cruz", this.prayers["PeloSinalDaSantaCruz"]));

    const conscience = new PrayerComposite("Breve Exame de Consciência");
    conscience.add(new PrayerLeaf("Breve Exame de Consciência", this.prayers["ExameConsciencia"]));
    conscience.add(new PrayerLeaf("Ato Penitencial", this.prayers["AtoPenitencial"]));
    root.add(conscience);

    const family = new PrayerComposite("Oração pela própria Familia");
    family.add(new PrayerLeaf("Oração pela própria Familia", this.prayers["OracaoPropriaFamilia"]));
    family.add(new PrayerLeaf("Pai Nosso", this.prayers["PaiNosso"]));
    family.add(new PrayerLeaf("Ave Maria", this.prayers["AveMaria"]));
    family.add(new PrayerLeaf("Glória", this.prayers["Gloria"]));
    root.add(family);

    const underYourProtection = new PrayerComposite("Sob a vossa proteção");
    underYourProtection.add(new PrayerLeaf("Sob a vossa proteção", this.prayers["SobVossaProtecao"]));
    root.add(underYourProtection);

    const jesusLivingInMary = new PrayerComposite("Oração a Jesus vivendo em Maria");
    jesusLivingInMary.add(new PrayerLeaf("Oração a Jesus vivendo em Maria", this.prayers["JesusVivendoMaria"]));
    root.add(jesusLivingInMary);

    const jesusSacredHeart = new PrayerComposite("Oração ao Sagrado Coração de Jesus");
    for (let i = 1; i <= 3; i++) {
      jesusSacredHeart.add(new PrayerLeaf("Oração ao Sagrado Coração de Jesus", this.prayers[`SagradoCoracaoJesus0${i}`]));
      jesusSacredHeart.add(new PrayerLeaf("Glória", this.prayers["Gloria"]));
    }
    root.add(jesusSacredHeart);

    const remember = new PrayerComposite("Lembrai-vos");
    remember.add(new PrayerLeaf("Lembrai-vos", this.prayers["LembraiVosMaria"]));
    root.add(remember);

    const spiritualCommunion = new PrayerComposite("Comunhão Espiritual");
    spiritualCommunion.add(new PrayerLeaf("Comunhão Espiritual", this.prayers["ComunhaoEspiritual"]));
    root.add(spiritualCommunion);

    const sweetLady = new PrayerComposite("Ó Doce Senhora Minha");
    sweetLady.add(new PrayerLeaf("Ó Doce Senhora Minha", this.prayers["DoceSenhoraMinha"]));
    root.add(sweetLady);

    return root.flatten();
  }
}

class AngelusPrayerBuilder extends PrayerCompositeBuilder {
  constructor(prayers) {
    super(prayers);
    this.sequence = [];
    this.currentStep = 0;
  }
  build() {
    const root = new PrayerComposite("Oração do Anjo (Angelus)");
    root.add(new PrayerLeaf("Introdução", this.prayers["AngelusIntro"]));

    const angelus = new PrayerComposite("Angelus");
    for (let i = 1; i <= 3; i++) {
      angelus.add(new PrayerLeaf(`Oração do Anjo (Angelus)`, this.prayers[`Angelus0${i}`]));
      if (i <= 3) {
        angelus.add(new PrayerLeaf(`Ave Maria`, this.prayers["AveMaria"]));
      }
    }
    for (let i = 1; i <= 3; i++) {
      angelus.add(new PrayerLeaf(`Glória (${i}/3)`, this.prayers["Gloria"]));
    }
    
    root.add(angelus);
    return root.flatten();
  }
}

async function loadPrayers() {
  try {
    const response = await fetch("prayers.pt-br.json");
     return await response.json();
  } catch (error) {
    console.error("Erro ao carregar as orações do JSON:", error);
    // Em caso de erro, você pode fornecer orações padrão ou mostrar uma mensagem ao usuário
    return {
    "SinalDaCruz": "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
    "Credo": "Creio em Deus Pai todo-poderoso...",
    "PaiNosso": "Pai nosso, que estais no céu...",
    "AveMaria": "Ave Maria, cheia de graça...",
    "Glória": "Glória ao Pai, ao Filho...",
    "OhMeuJesus": "Ó meu Jesus, perdoai-nos...",
    "OferecimentoTerco": "Divino Jesus, eu vos ofereço este terço...",
    "Agradecimento": "Infinitas graças vos damos, soberana Rainha...",
    "SalveRainha": "Salve Rainha! Mãe de misericórdia..."
    };
  }
}

function saveState() {
  const state = {
    mystery: appState.currentMystery,
    step: appState.currentStep,
    diaDaSemana: appState.diaDaSemana,
  };
  localStorage.setItem("rosaryState", JSON.stringify(state));
}

function loadState() {
  const state = localStorage.getItem("rosaryState");
  if (state) {
    const parsed = JSON.parse(state);
    const today = new Date().getDay();
    if (parsed.diaDaSemana !== today) {
      clearState();
      appState.currentMystery = "";
      appState.currentStep = 0;
      appState.diaDaSemana = today;
      return;
    }
    appState.currentMystery = parsed.mystery;
    appState.currentStep = parsed.step;
    appState.diaDaSemana = parsed.diaDaSemana;
    appState.sequence = getPrayerSequence(appState.prayers, "rosary", appState.currentMystery);
  }
}

function removeState() {
  localStorage.removeItem("rosaryState");
}

function capitalizeFirstLetter(str) {
  if (str === undefined || str.length == 0) {
    console.log("Não enviado parametro str");
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPrayerSequence(prayers, type, mysteryType) {
  let builder;
  switch(type) {
    case "rosary":
      builder = new RosaryCompositeBuilder(prayers, mysteryType);
      break;
    case "morning":
      builder = new MorningPrayerBuilder(prayers);
      break;
    case "evening":
      builder = new NightPrayerBuilder(prayers);
      break;
    case "angelus":
      builder = new AngelusPrayerBuilder(prayers);
      break;
    default:
      throw new Error("Tipo de oração desconhecido");
  }
  return builder.build();
}

const appState = {
  sequence: [],
  currentStep: 0,
  currentMystery: "joyful",
  diaDaSemana: new Date().getDay(),
  prayers: null
};

class UIController {
  constructor() {
    this.startBtn = document.getElementById("startBtn");
    this.resumeBtn = document.getElementById("resumeBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.prevBtn = document.getElementById("prevBtn");
    this.prayerSelect = document.getElementById("prayerSelect");
    this.prayerTitle = document.getElementById("prayerTitle");
    this.prayerText = document.getElementById("prayerText");
    this.progressText = document.getElementById("progressText");
    this.mysteryText = document.getElementById("mysteryText");
    this.welcomeScreenButtons = document.getElementById("welcome-screen-buttons");
    this.prayerScreen = document.getElementById("prayer-screen");
    this.increaseBtn = document.getElementById("increaseBtn");
    this.decreaseBtn = document.getElementById("decreaseBtn");
    this.currentFontSize = 16;
  }

  setupEventListeners(rosary) {
    this.prayerSelect.value = rosary.currentMystery;

    this.prayerSelect.addEventListener("change", () => {
      this.welcomeScreenButtons.style.display = "block";
    });

  this.startBtn.addEventListener("click", () => {
    let selected = this.prayerSelect.value;
      let type, mysteryType;
      if (selected === "morning" || selected === "evening" || selected === "angelus") {
        type = selected;
        mysteryType = null;
      } else {
        type = "rosary";
        mysteryType = selected;
      }
      appState.currentMystery = mysteryType || "joyful";
      appState.sequence = getPrayerSequence(appState.prayers, type, mysteryType);
    appState.currentStep = 0;
    this.showPrayerScreen();
    this.displayStep();
    saveState();
  });

    this.resumeBtn.addEventListener("click", () => {
      rosary.loadState();
      rosary.generateSequence(rosary.currentMystery);
      showPrayerScreen();
      this.displayStep(rosary);
    });

    this.nextBtn.addEventListener("click", () => {
      if (appState.currentStep < appState.sequence.length - 1) {
        appState.currentStep++;
        this.displayStep();
        saveState();
      } else {
        alert("Oração finalizada!");
      }
    });
    
    this.prevBtn.addEventListener("click", () => {
      if (appState.currentStep > 0) {
        appState.currentStep--;
        this.displayStep();
        saveState();
      }
    });

    this.increaseBtn.addEventListener("click", () => {
      this.increaseFontSize();
      saveState();
    });

    this.decreaseBtn.addEventListener("click", () => {
      decreaseFontSize();
      saveState();
    });
  }

  showPrayerScreen() {
    this.welcomeScreenButtons.style.display = "none";
    this.prayerScreen.style.display = "block";
  }

  displayStep() {
    const prayerSelected = this.prayerSelect.selectedIndex;
    const mysteryText = this.prayerSelect.options[prayerSelected].text;
    const step = appState.sequence[appState.currentStep];
    this.prayerTitle.innerText = step.title;
    this.prayerText.innerText = step.text;
    this.progressText.innerText = (appState.currentStep + 1) + " / " + appState.sequence.length;
    this.mysteryText.innerText = mysteryText + " - ";
  }

  updateResumeButton(hasState) {
    this.resumeBtn.style.display = hasState ? "inline-block" : "none";
  }

  increaseFontSize() {
    this.currentFontSize++;
    this.updateFontSize();
  }

  decreaseFontSize() {
    this.currentFontSize--;
    this.updateFontSize();
  }

  updateFontSize() {
    this.prayerText.style.fontSize = this.currentFontSize + "px";
  }
}


document.addEventListener("DOMContentLoaded", async function () {
  const prayers = await loadPrayers();
  appState.prayers = prayers;
  
  const prayerSelect = document.getElementById("prayerSelect");
  let selectedType = prayerSelect ? prayerSelect.value : "joyful";
  
  // Exemplo de lógica para decidir o tipo e o mistério:
  let type, mysteryType;
  if (selectedType === "morning" || selectedType === "evening" || selectedType === "angelus") {
    type = selectedType;
    mysteryType = null;
  } else {
    type = "rosary";
    mysteryType = selectedType; // deve ser "joyful", "glorious", etc
  }
  
  appState.currentMystery = mysteryType || "joyful";
  appState.sequence = getPrayerSequence(prayers, type, mysteryType);
  
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookiesBtn = document.getElementById("accept-cookies");

  const storedState = localStorage.getItem("rosaryState");
  const uiController = new UIController();
  uiController.setupEventListeners(appState);
  uiController.updateResumeButton(storedState);
  
  

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("show");
    }
  });

  // Verifica se já aceitou cookies
  function checkCookieConsent() {
    const cookieAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookieAccepted) {
      cookieConsent.style.display = "block";
    }
  }

  // Aceitar cookies
  function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    cookieConsent.style.display = "none";
  }

  checkCookieConsent();
  acceptCookiesBtn.addEventListener("click", acceptCookies);
});
