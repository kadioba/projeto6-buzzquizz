let acertos=0;
let respondidos=0;
let numeroDePerguntas=0;
let perguntasDoQuiz=[]
let levelDoQuiz=[]
let titulo;
let imgBanner;

function iniciarQuiz(id) {
    
const dados = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    dados.then(salvarDados);
    dados.catch(()=>alert('Erro ao carregar quiz. Tente novamente mais tarde'))
}

function salvarDados(dados) {
   console.log(dados.data);
   perguntasDoQuiz = dados.data.questions;
   levelDoQuiz = dados.data.levels
   titulo = dados.data.title
   imgBanner =dados.data.image
   numeroDePerguntas = perguntasDoQuiz.length
   exibirNaTela()
}



function selecionarAlternativa(elemento) {
    const filtroBranco = elemento.parentNode.firstChild.nextSibling;
    const ProximaQuestBox = elemento.parentNode.parentNode.nextElementSibling;
    elemento.classList.add('upZindex');
    elemento.parentNode.classList.remove('cor');
    filtroBranco.classList.remove('hiden');
    elemento.removeAttribute('onClick');
    respondidos++;
    if(elemento.classList.contains("true")){
        acertos++;
    }
    if (respondidos === numeroDePerguntas) {
     setTimeout(mostrarResultado,2000);
    }else{
         setTimeout(()=>ProximaQuestBox.scrollIntoView(),2000);
         setTimeout(()=>window.scrollBy(0,-80),2010);
}
}


function mostrarResultado() {
   const resultadot2= document.querySelector('.tela-2 .resultado');
   resultadot2.classList.remove('hiden');
   resultadot2.scrollIntoView() 
}

function gerarResultado() {
    const percentual = (100/numeroDePerguntas*acertos).toFixed(0)
}



function exibirNaTela() {
    const tela =document.querySelector('.tela-2')
    console.log(tela);
    tela.innerHTML=''

    tela.innerHTML=`<div class="banner">
    <div class="mask">
    <h1 class="titulo">${titulo}</h1>
    </div>
    <img class="" src="${imgBanner}" alt="Erro ao carregar imagem">
    </div>`

    for (let i = 0; i < numeroDePerguntas; i++) {

        tela.innerHTML += `
        <div class="questBox controle${i}">
        <div class="top">
        <h2 class="pergunta">${perguntasDoQuiz[i].title}</h2>
        </div>
        <div class="alternativas cor">
        <div class="filtro hiden"></div>`

        let alternativas=document.querySelector(`.tela-2 .controle${i} .alternativas`)

        for (let j = 0; j < perguntasDoQuiz[i].answers.length; j++) {

        alternativas.innerHTML+=`<div class="card ${perguntasDoQuiz[i].answers[j].isCorrectAnswer
        }" onclick="selecionarAlternativa(this)"><img src="${perguntasDoQuiz[i].answers[j].image}" alt="Erro ao carregar imagem"><h3>${perguntasDoQuiz[i].answers[j].text}</h3></div>`
            
        }
    }  
}
    
