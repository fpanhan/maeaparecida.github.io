/* Variáveis globais */
const hoje = new Date();
const diaDaSemana = hoje.getDay();
const nomeDoDiaDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][diaDaSemana];
const numerosOrdinais = ["", "primeiro", "segundo", "terceiro", "quarto", "quinto"];
let sequence = [];
let currentStep = 0;
let currentMystery = "";

if (diaDaSemana === 0 || diaDaSemana === 3) {
	currentMystery = "glorious";
}
if (diaDaSemana === 1 || diaDaSemana === 6) {
	currentMystery = "joyful";
}
if (diaDaSemana === 3 || diaDaSemana === 5) {
	currentMystery = "sorrowful";
}
if (diaDaSemana === 4) {
	currentMystery = "luminous";
}

// Quando o DOM estiver carregado...
document.addEventListener("DOMContentLoaded", function() {
	const startBtn = document.getElementById("startBtn");
	const resumeBtn = document.getElementById("resumeBtn");
	const nextBtn = document.getElementById("nextBtn");
	const prevBtn = document.getElementById("prevBtn");
	const mysterySelect = document.getElementById("mysterySelect");
	mysterySelect.value = currentMystery;

	// Verifica se há estado salvo no localStorage
	const storedState = localStorage.getItem("rosaryState");
	if (storedState) {
		resumeBtn.style.display = "inline-block";
	} else {
		resumeBtn.style.display = "none";
	}
	
	mysterySelect.addEventListener("change", function() {
		document.getElementById("welcome-screen-buttons").style.display = "block";
	});

	startBtn.addEventListener("click", function() {
		const mysterySelect = document.getElementById("mysterySelect");
		currentMystery = mysterySelect.value;
		sequence = generateSequence(currentMystery);
		currentStep = 0;
		showPrayerScreen();
		displayStep();
		saveState(currentMystery, currentStep);
	});

	resumeBtn.addEventListener("click", function() {
		const state = localStorage.getItem("rosaryState");
		if (state) {
			const parsed = JSON.parse(state);
			currentMystery = parsed.mystery;
			currentStep = parsed.step;
			sequence = generateSequence(currentMystery);
			showPrayerScreen();
			displayStep();
		}
	});

	nextBtn.addEventListener("click", function() {
		if (currentStep < sequence.length - 1) {
			currentStep++;
			displayStep();
			updateState();
		} else {
			alert("Terço finalizado!");
		}
	});

	prevBtn.addEventListener("click", function() {
		if (currentStep > 0) {
			currentStep--;
			displayStep();
			updateState();
		}
	});
});

/* Função que exibe a tela do Rosário e oculta a de boas-vindas */
function showPrayerScreen() {
	document.getElementById("welcome-screen-buttons").style.display = "none";
	document.getElementById("prayer-screen").style.display = "block";
}

/* Exibe o passo atual (título, texto e progresso) */
function displayStep() {
	const mysterySelect = document.getElementById("mysterySelect");
	const mysterySelected = mysterySelect.selectedIndex;
    const mysteryText = mysterySelect.options[mysterySelected].text;
	document.getElementById("prayerTitle").innerText = sequence[currentStep].title;
	document.getElementById("prayerText").innerText = sequence[currentStep].text;
	document.getElementById("progressText").innerText = currentStep + 1 + " / " + sequence.length;
	document.getElementById("mysteryText").innerText = mysteryText + " - ";
}

/* Gera a sequência do Rosário */
function generateSequence(mysteryType) {
	const seq = [];

	seq.push({
		title: "Oferecimento",
		text: "Divino Jesus, eu vos ofereço este terço que vou rezar, contemplando os mistérios de nossa Redenção. Concedei-me, pela intercessão de Maria, vossa Mãe Santíssima, a quem me dirijo, as graças necessárias para bem rezá-lo para ganhar as indulgências desta santa devoção. (Pode-se acrescentar o que segue, e também intenções particulares: Ofereço-Vos também em reparação aos Corações de Jesus e Maria, nas intenções do Imaculado Coração de Maria, nas intenções do Santo Padre, pelo Santo Padre e por toda a Igreja, pela santificação do clero e das famílias, pelas vocações sacerdotais, religiosas, missionárias e leigas, pela paz no mundo, pelo Brasil.)"
	});
	
	seq.push({
		title: "Sinal da Cruz",
		text: "Em nome do Pai, do Filho e do Espírito Santo. Amém!"
	});
	
	seq.push({
		title: "Credo",
		text: "Creio em Deus Pai todo-poderoso, Criador do céu e da terra. E em Jesus Cristo, Seu Filho, Nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos; foi crucificado, morto e sepultado; desceu aos infiéis; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso; de onde há de vir para julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne e na vida eterna. Amém."
	});

	seq.push({
		title: "Pai Nosso",
		text: "Pai nosso, que estais no céu, santificado seja o Vosso nome; venha a nós o Vosso reino; seja feita a Vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém."
	});


	seq.push({
		title: "Ave Maria (1/3)",
		text: "A primeira Ave Maria em honra a Deus Pai que nos criou: Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
	});
	
	seq.push({
		title: "Ave Maria (2/3)",
		text: "A segunda Ave Maria a Deus Filho que nos remiu: Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
	});

	seq.push({
		title: "Ave Maria (3/3)",
		text: "A terceira Ave Maria ao Espírito Santo que nos santifica: Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
	});
	
	seq.push({
		title: "Glória",
		text: "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém."
	});
	
	seq.push({
		title: "Ó meu Jesus, perdoai-nos!",
		text: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente aquelas que mais precisarem da vossa misericórdia."
	});

	// Definição dos mistérios para cada tipo
	const mysteries = {
		joyful: [
			"No Primeiro Mistério Gozoso contemplamos a Anunciação do Anjo a Nossa Senhora (Lc 1, 26-38).",
			"No Segundo Mistério Gozoso contemplamos a Visitação de Nossa Senhora a sua prima Santa Isabel (Lc 1, 39-56).",
			"No Terceiro Mistério Gozoso contemplamos o Nascimento de Nosso Senhor Jesus Cristo em Belém (Lc 2, 1-15).",
			"No Quarto Mistério Gozoso contemplamos a Apresentação do Menino Jesus no Templo e a Purificação de Nossa Senhora (Lc 2, 22-35).",
			"No Quinto Mistério Gozoso contemplamos a perda e o encontro do Menino Jesus (Lc 2, 42-52)."
		],
		sorrowful: [
			"No Primeiro Mistério Doloroso contemplamos a Agonia de Jesus no Horto das Oliveiras (Mc 14, 32-42).",
			"No Segundo Mistério Doloroso contemplamos a Flagelação de Nosso Senhor Jesus Cristo (Jo 19, 1).",
			"No Terceiro Mistério Doloroso contemplamos a Coroação de espinhos de Nosso Senhor (Mt 27, 29).",
			"No Quarto Mistério Doloroso contemplamos Nosso Senhor carregando penosamente a Cruz até o alto do Calvário (Lc 23, 26-32).",
			"No Quinto Mistério Doloroso contemplamos a Crucifixão e morte de Nosso Senhor Jesus Cristo (Lc 23, 33-47)."
		],
		glorious: [
			"No Primeiro Mistério Glorioso contemplamos a Ressurreição de Jesus Cristo (Mc 16, 1-8).",
			"No Segundo Mistério Glorioso contemplamos a Ascensão de Jesus aos Céus (At 1, 3-11).",
			"No Terceiro Mistério Glorioso contemplamos a descida do Espírito Santo sobre Nossa Senhora e os Apóstolos no Cenáculo (At 2, 1-14).",
			"No Quarto Mistério Glorioso contemplamos a Assunção de Nossa Senhora aos Céus (1 Cor 15, 20-23, 53-55).",
			"No Quinto Mistério Glorioso contemplamos a gloriosa coroação de Maria Santíssima como Rainha do Céu e da Terra (Ap 12, 1-6)."
		],
		luminous: [
			"No Primeiro Mistério Luminoso contemplamos o Batismo de Jesus (Mt 3, 13-17).",
			"No Segundo Mistério Luminoso contemplamos a auto-revelação nas Bodas de Caná (Jo 2, 1-12).",
			"No Terceiro Mistério Luminoso contemplamos o Anúncio do Reino de Deus convidando à conversão (Mc 1, 14-15).",
			"No Quarto Mistério Luminoso contemplamos a Transfiguração de Jesus (Lc 9, 28-36).",
			"No Quinto Mistério Luminoso contemplamos a instituição da Eucaristia (Mt 26, 26-29)."
		],
	};

	// Seleciona o vetor de mistérios conforme o tipo escolhido
	const selectedMysteries = mysteries[mysteryType];

	// Para cada um dos cinco mistérios, adiciona as orações correspondentes
	for (let i = 0; i < 5; i++) {
		seq.push({
			title: capitalizeFirstLetter(numerosOrdinais[(i + 1)]) + " Mistério",
			text: selectedMysteries[i],
		});
		
		seq.push({
			title: "Pai Nosso",
			text: "Pai nosso, que estais no céu, santificado seja o Vosso nome; venha a nós o Vosso reino; seja feita a Vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém."
		});
		
		for (let j = 1; j <= 10; j++) {
			seq.push({
				title: "Ave Maria (" + j + "/10)",
				text: "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
			});
		}
		
		seq.push({
			title: "Glória",
			text: "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém."
		});
		
		seq.push({
			title: "Ó meu Jesus, perdoai-nos!",
			text: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente aquelas que mais precisarem da vossa misericórdia."
		});
	}
	
	seq.push({
		title: "Agradecimento",
		text: "Infinitas graças vos damos, soberana Rainha, pelos benefícios que recebemos todos os dias de vossas mãos liberais, dignai-vos agora e para sempre tomar-nos debaixo de vosso poderoso amparo, e para mais vos alegrar vos saudamos com uma Salve-Rainha."
	});
	
	seq.push({
		title: "Salve Rainha",
		text: "Salve Rainha! Mãe de misericórdia, vida, doçura, esperança nossa, Salve! A vós bradamos os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. O clemente, ó piedosa, ó doce, sempre Virgem Maria. Rogai por nós Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém!"
	});

	return seq;
}

/* Salva o estado atual (tipo de mistério e etapa atual) no localStorage */
function saveState(mystery, step) {
	const state = {
		mystery: mystery,
		step: step
	};
	localStorage.setItem("rosaryState", JSON.stringify(state));
}

/* Atualiza o estado salvo */
function updateState() {
	saveState(currentMystery, currentStep);
}

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}