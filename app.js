class Prayer {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
}

class Mystery {
  constructor(type, prayers) {
    this.type = type;
    this.prayers = prayers;
  }
}

class Rosary {
  constructor() {
    this.hoje = new Date();
    this.diaDaSemana = this.hoje.getDay();
    this.nomeDoDiaDaSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ][this.diaDaSemana];
    this.numerosOrdinais = [
      "",
      "primeiro",
      "segundo",
      "terceiro",
      "quarto",
      "quinto",
    ];
    this.sequence = [];
    this.currentStep = 0;
    this.currentMystery = this.getDefaultMystery();
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
        "No Quinto Mistério Doloroso contemplamos a Crucifixão e morte de Nosso Senhor Jesus Cristo (Lc 23, 33-47).",
      ],
      glorious: [
        "No Primeiro Mistério Glorioso contemplamos a Ressurreição de Jesus Cristo (Mc 16, 1-8).",
        "No Segundo Mistério Glorioso contemplamos a Ascensão de Jesus aos Céus (At 1, 3-11).",
        "No Terceiro Mistério Glorioso contemplamos a descida do Espírito Santo sobre Nossa Senhora e os Apóstolos no Cenáculo (At 2, 1-14).",
        "No Quarto Mistério Glorioso contemplamos a Assunção de Nossa Senhora aos Céus (1 Cor 15, 20-23, 53-55).",
        "No Quinto Mistério Glorioso contemplamos a gloriosa coroação de Maria Santíssima como Rainha do Céu e da Terra (Ap 12, 1-6).",
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

  getDefaultMystery() {
    if (this.diaDaSemana === 0 || this.diaDaSemana === 3) {
      return "glorious";
    }
    if (this.diaDaSemana === 1 || this.diaDaSemana === 6) {
      return "joyful";
    }
    if (this.diaDaSemana === 3 || this.diaDaSemana === 5) {
      return "sorrowful";
    }
    if (this.diaDaSemana === 4) {
      return "luminous";
    }

    return "glorious";
  }

  generateSequence(mysteryType) {
    const seq = [];

    seq.push(
      new Prayer(
        "Oferecimento",
        "Divino Jesus, eu vos ofereço este terço que vou rezar, contemplando os mistérios de nossa Redenção. Concedei-me, pela intercessão de Maria, vossa Mãe Santíssima, a quem me dirijo, as graças necessárias para bem rezá-lo para ganhar as indulgências desta santa devoção. (Pode-se acrescentar o que segue, e também intenções particulares.) Ofereço-Vos também em reparação aos Corações de Jesus e Maria, nas intenções do Imaculado Coração de Maria, nas intenções do Santo Padre, pelo Santo Padre e por toda a Igreja, pela santificação do clero e das famílias, pelas vocações sacerdotais, religiosas, missionárias e leigas, pela paz no mundo, pelo Brasil."
      )
    );

    seq.push(
      new Prayer(
        "Sinal da Cruz",
        "Em nome do Pai, do Filho e do Espírito Santo. Amém."
      )
    );

    seq.push(
      new Prayer(
        "Credo",
        "Creio em Deus Pai todo-poderoso, Criador do céu e da terra. E em Jesus Cristo, Seu Filho, Nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos; foi crucificado, morto e sepultado; desceu a mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso; de onde há de vir para julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne e na vida eterna. Amém."
      )
    );

    seq.push(
      new Prayer(
        "Pai Nosso",
        "Pai nosso, que estais no céu, santificado seja o Vosso nome; venha a nós o Vosso reino; seja feita a Vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém."
      )
    );

    seq.push(
      new Prayer(
        "Ave Maria (1/3)",
        "A primeira Ave Maria em honra a Deus Pai que nos criou: \nAve Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
      )
    );

    seq.push(
      new Prayer(
        "Ave Maria (2/3)",
        "A segunda Ave Maria a Deus Filho que nos remiu: \nAve Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
      )
    );

    seq.push(
      new Prayer(
        "Ave Maria (3/3)",
        "A terceira Ave Maria ao Espírito Santo que nos santifica: \nAve Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
      )
    );

    seq.push(
      new Prayer(
        "Glória",
        "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém."
      )
    );

    seq.push(
      new Prayer(
        "Ó meu Jesus, perdoai-nos!",
        "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente aquelas que mais precisarem da vossa misericórdia."
      )
    );

    const selectedMysteries = this.mysteries[mysteryType];

    for (let i = 0; i < 5; i++) {
      seq.push(
        new Prayer(
          this.capitalizeFirstLetter(this.numerosOrdinais[i + 1]) + " Mistério",
          selectedMysteries[i]
        )
      );

      seq.push(
        new Prayer(
          "Pai Nosso",
          "Pai nosso, que estais no céu, santificado seja o Vosso nome; venha a nós o Vosso reino; seja feita a Vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém."
        )
      );

      for (let j = 1; j <= 10; j++) {
        seq.push(
          new Prayer(
            "Ave Maria (" + j + "/10)",
            "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
          )
        );
      }

      seq.push(
        new Prayer(
          "Glória",
          "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém."
        )
      );

      seq.push(
        new Prayer(
          "Ó meu Jesus, perdoai-nos!",
          "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente aquelas que mais precisarem da vossa misericórdia."
        )
      );
    }

    seq.push(
      new Prayer(
        "Agradecimento",
        "Infinitas graças vos damos, soberana Rainha, pelos benefícios que recebemos todos os dias de vossas mãos liberais, dignai-vos agora e para sempre tomar-nos debaixo de vosso poderoso amparo, e para mais vos alegrar vos saudamos com uma Salve-Rainha."
      )
    );

    seq.push(
      new Prayer(
        "Salve Rainha",
        "Salve Rainha! Mãe de misericórdia, vida, doçura, esperança nossa, Salve! A vós bradamos os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. O clemente, ó piedosa, ó doce, sempre Virgem Maria. \nRogai por nós Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém."
      )
    );

    return seq;
  }

  saveState() {
    const state = {
      mystery: this.currentMystery,
      step: this.currentStep,
    };
    localStorage.setItem("rosaryState", JSON.stringify(state));
  }

  loadState() {
    const state = localStorage.getItem("rosaryState");
    if (state) {
      const parsed = JSON.parse(state);
      this.currentMystery = parsed.mystery;
      this.currentStep = parsed.step;
    }
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

class UIController {
  constructor() {
    this.startBtn = document.getElementById("startBtn");
    this.resumeBtn = document.getElementById("resumeBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.prevBtn = document.getElementById("prevBtn");
    this.mysterySelect = document.getElementById("mysterySelect");
    this.prayerTitle = document.getElementById("prayerTitle");
    this.prayerText = document.getElementById("prayerText");
    this.progressText = document.getElementById("progressText");
    this.mysteryText = document.getElementById("mysteryText");
    this.welcomeScreenButtons = document.getElementById(
      "welcome-screen-buttons"
    );
    this.prayerScreen = document.getElementById("prayer-screen");
    this.increaseBtn = document.getElementById("increaseBtn");
    this.decreaseBtn = document.getElementById("decreaseBtn");
    this.currentFontSize = 16;
  }

  setupEventListeners(rosary) {
    this.mysterySelect.value = rosary.currentMystery;

    this.mysterySelect.addEventListener("change", () => {
      this.welcomeScreenButtons.style.display = "block";
    });

    this.startBtn.addEventListener("click", () => {
      rosary.currentMystery = this.mysterySelect.value;
      rosary.sequence = rosary.generateSequence(rosary.currentMystery);
      rosary.currentStep = 0;
      this.showPrayerScreen();
      this.displayStep(rosary);
      rosary.saveState();
    });

    this.resumeBtn.addEventListener("click", () => {
      rosary.loadState();
      rosary.sequence = rosary.generateSequence(rosary.currentMystery);
      this.showPrayerScreen();
      this.displayStep(rosary);
    });

    this.nextBtn.addEventListener("click", () => {
      if (rosary.currentStep < rosary.sequence.length - 1) {
        rosary.currentStep++;
        this.displayStep(rosary);
        rosary.saveState();
      } else {
        alert("Terço finalizado!");
      }
    });

    this.prevBtn.addEventListener("click", () => {
      if (rosary.currentStep > 0) {
        rosary.currentStep--;
        this.displayStep(rosary);
        rosary.saveState();
      }
    });

    this.increaseBtn.addEventListener("click", () => {
      this.increaseFontSize();
      rosary.saveState();
    });

    this.decreaseBtn.addEventListener("click", () => {
      this.decreaseFontSize();
      rosary.saveState();
    });
  }

  showPrayerScreen() {
    this.welcomeScreenButtons.style.display = "none";
    this.prayerScreen.style.display = "block";
  }

  displayStep(rosary) {
    const mysterySelected = this.mysterySelect.selectedIndex;
    const mysteryText = this.mysterySelect.options[mysterySelected].text;
    this.prayerTitle.innerText = rosary.sequence[rosary.currentStep].title;
    this.prayerText.innerText = rosary.sequence[rosary.currentStep].text;
    this.progressText.innerText =
      rosary.currentStep + 1 + " / " + rosary.sequence.length;
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

document.addEventListener("DOMContentLoaded", function () {
  const rosary = new Rosary();
  const uiController = new UIController();
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookiesBtn = document.getElementById("accept-cookies");

  // Verifica se há estado salvo no localStorage para exibir/ocultar o botão "Continuar"
  const storedState = localStorage.getItem("rosaryState");
  uiController.updateResumeButton(storedState);

  if (storedState) {
    rosary.loadState();
  } else {
    uiController.updateFontSize();
  }

  uiController.setupEventListeners(rosary);

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

  // Inicializa a verificação de cookies
  checkCookieConsent();

  // Evento de aceite
  acceptCookiesBtn.addEventListener("click", acceptCookies);
});
