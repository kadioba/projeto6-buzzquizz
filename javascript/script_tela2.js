let acertos = 0;
let respondidos = 0;
let numeroDePerguntas = 0;
let perguntasDoQuiz = [];
let levelDoQuiz = [];
let faixaDeAcerto;
let titulo;
let imgBanner;
let percentual;
let idQuizAtual;
const tela = document.querySelector('.tela-2');



function iniciarQuiz(id) {
    const tela1 = document.querySelector('.tela-1');
    tela1.classList.add('hiden');
    tela.classList.remove('hiden');

    const dados = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    dados.then(salvarDados);
    dados.catch(() => alert('Erro ao carregar quiz. Tente novamente mais tarde'));
}



function salvarDados(dados) {
    console.log(dados.data);
    perguntasDoQuiz = dados.data.questions;
    levelDoQuiz = dados.data.levels;
    titulo = dados.data.title;
    imgBanner = dados.data.image;
    numeroDePerguntas = perguntasDoQuiz.length;
    idQuizAtual = dados.data.id;
    exibirNaTela();
}



function selecionarAlternativa(elemento) {
    const filtroBranco = elemento.parentNode.firstChild.nextSibling;
    const ProximaQuestBox = elemento.parentNode.parentNode.nextElementSibling;
    elemento.classList.add('upZindex');
    elemento.parentNode.classList.remove('cor');
    filtroBranco.classList.remove('hiden');
    elemento.removeAttribute('onClick');
    respondidos++;
    if (elemento.classList.contains("true")) {
        acertos++;
    }
    if (respondidos === numeroDePerguntas) {
        mostrarResultado();
    } else {
        setTimeout(() => ProximaQuestBox.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }), 2000);
    }
}



function exibirNaTela() {

    tela.innerHTML = '';

    tela.innerHTML = `<div class="banner">
    <div class="mask">
    <h1 class="titulo">${titulo}</h1>
    </div>
    <img class="" src="${imgBanner}" alt="Erro ao carregar imagem">
    </div>`;

    for (let i = 0; i < numeroDePerguntas; i++) {

        tela.innerHTML += `
        <div class="questBox controle${i}">
        <div class="top">
        <h2 class="pergunta">${perguntasDoQuiz[i].title}</h2>
        </div>
        <div class="alternativas cor">
        <div class="filtro hiden"></div>`;

        let alternativas = document.querySelector(`.tela-2 .controle${i} .alternativas`);
        let respostas = perguntasDoQuiz[i].answers;
        respostas = respostas.sort(comparador);

        for (let j = 0; j < respostas.length; j++) {

            alternativas.innerHTML +=
                `<div class="card ${respostas[j].isCorrectAnswer
                }" onclick="selecionarAlternativa(this)"><img src="${respostas[j].image}" alt="Erro ao carregar imagem"><h3>${respostas[j].text}</h3></div>`;

        }
    }
    tela.innerHTML +=
        `<button onclick="reiniciarQuiz()" class="reiniciar">Reiniciar Quizz</button>
    <p onclick="voltarParaHome()" class="voltarHome">Voltar para Home</p>`;
}



function mostrarResultado() {
    gerarResultado();
    montarResultado();
    const resultadot2 = document.querySelector('.tela-2 .resultado');
    resultadot2.classList.remove('hiden');
    setTimeout(() => resultadot2.scrollIntoView({ behavior: "smooth" }), 2000);
}



function gerarResultado() {
    percentual = (100 / numeroDePerguntas * acertos).toFixed(0);
    let controle = 0;

    for (let i = 0; i < levelDoQuiz.length; i++) {

        if (levelDoQuiz[i].minValue <= percentual && levelDoQuiz[i].minValue >= controle
        ) {
            faixaDeAcerto = levelDoQuiz[i];
            controle = levelDoQuiz[i].minValue;
        }
    }
}



function montarResultado() {
    document.querySelector('.tela-2 .reiniciar').remove();
    document.querySelector('.tela-2 .voltarHome').remove();

    tela.innerHTML += `<div class="resultado hiden">
    <div class="percentualDeAcerto" >
        <p>${percentual}% de acerto:${faixaDeAcerto.title}</p>
    </div>
        <div class="mid">
          <img src="${faixaDeAcerto.image}" alt="Erro ao carregar img">
          <p>${faixaDeAcerto.text}</p>
        </div>
  </div>
 <button onclick="reiniciarQuiz()" class="reiniciar">Reiniciar Quizz</button>
 <p onclick="voltarParaHome()" class="voltarHome">Voltar para Home</p>`;
}



function comparador() {
    return Math.random() - 0.5;
}



function voltarParaHome() {
    window.location.reload(true);
}



function reiniciarQuiz() {
    acertos = 0;
    respondidos = 0;
    iniciarQuiz(idQuizAtual);
    tela.scrollIntoView({ behavior: "smooth" });
}