
//  Variaveis globais que registram as inputs do usuario
let numeroPerguntasCriadas;
let numeroNiveisCriados;
let objetoPerguntaCriada = {};
objetoPerguntaCriada.questions = [];
objetoPerguntaCriada.levels = [];


// Função que valida url
const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

function enviarInfoQuizCriado(){
    objetoPerguntaCriada.title = document.querySelector(".input-tiulo-criado").value;

    objetoPerguntaCriada.image = document.querySelector(".input-url-imagem-criada").value;

    numeroPerguntasCriadas = document.querySelector(".input-numero-perguntas-criadas").value;

    numeroNiveisCriados = document.querySelector(".input-numero-niveis-criados").value;

    const infoQuizValidos = isValidUrl(objetoPerguntaCriada.image) && objetoPerguntaCriada.title.length >= 20 && objetoPerguntaCriada.title.length <= 65 && numeroPerguntasCriadas >= 3 &&  numeroNiveisCriados >= 2;
    console.log(objetoPerguntaCriada);

    if(infoQuizValidos){
        document.querySelector(".info-quiz").classList.add("hiden");
        document.querySelector(".perguntas").classList.remove("hiden");
        gerarInputPerguntas();
    }

    else{
        alert("Preencha os dados corretamente!");
    }
}

function gerarInputPerguntas(){
    const divPerguntas = document.querySelector(".aba-perguntas");
    divPerguntas.innerHTML = "";
    let templatePergunta = "";

    for(let i = 1; i <= numeroPerguntasCriadas; i++){
        if(i == 1){
            templatePergunta = `
            <div class=" pergunta pergunta-${i} selecionada" onclick="abrirInputPerguntas(this)">
                <div class="pergunta-topo">
                    <h2>Pergunta ${i}</h2>
                    <img src="./imagens/Vector.png" alt="" class="icone-pergunta hiden">
                </div>
                <div class="input-perguntas">
                    <input type="text" placeholder="Texto da pergunta" class="titulo-pergunta">
                    <input type="text" placeholder="Cor de fundo da pergunta" class="cor-pergunta">
                    <h2>Resposta correta</h2>
                    <input type="text" placeholder="Resposta correta" class="resposta-correta">
                    <input type="text" placeholder="URL da imagem" class="url-imagem-correta">
                    <h2>Respostas incorretas</h2>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 1" class="texto-resposta-incorreta">
                            <input type="text" placeholder="URL da imagem 1" class="url-resposta-incorreta">
                        </li>
                    </ul>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 2" class="texto-resposta-incorreta">
                            <input type="text" placeholder="URL da imagem 2" class="url-resposta-incorreta">
                        </li>
                    </ul>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 3" class="texto-resposta-incorreta">
                            <input type="text" placeholder="URL da imagem 3" class="url-resposta-incorreta">
                        </li>
                    </ul>
                </div>
            </div>`
        }
        else{
            templatePergunta = `
            <div class="pergunta pergunta-${i}" onclick="abrirInputPerguntas(this)">
                <div class="pergunta-topo">
                    <h2>Pergunta ${i}</h2>
                    <img src="./imagens/Vector.png" alt="" class="icone-pergunta">
                </div>
                <div class="input-perguntas hiden">
                    <input type="text" placeholder="Texto da pergunta" class="titulo-pergunta">
                    <input type="text" placeholder="Cor de fundo da pergunta" class="cor-pergunta">
                    <h2>Resposta correta</h2>
                    <input type="text" placeholder="Resposta correta" class="resposta-correta">
                    <input type="text" placeholder="URL da imagem" class="url-imagem-correta">
                    <h2>Respostas incorretas</h2>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 1" class="texto-resposta-incorreta">
                            <input type="text" placeholder="URL da imagem 1" class="url-resposta-incorreta">
                        </li>
                    </ul>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 2" class="texto-resposta-incorreta">
                            <input type="text" placeholder="URL da imagem 2" class="url-resposta-incorreta">
                        </li>
                    </ul>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 3" class="texto-resposta-incorreta">
                            <input type="text" placeholder="URL da imagem 3" class="url-resposta-incorreta">
                        </li>
                    </ul>
                </div>
            </div>`
        }
        divPerguntas.innerHTML += templatePergunta;
    }

}

// Função que controla o comportamento do input ao ser clicado
function abrirInputPerguntas(divInputPergunta){

    const perguntaJaSelecionada = document.querySelector(".perguntas .selecionada");

    // Se ja houver uma pergunta selecionada, vai esonder ela e abrir a nova selecionada
    if(perguntaJaSelecionada != null){
        perguntaJaSelecionada.querySelector(".input-perguntas").classList.add("hiden");
        perguntaJaSelecionada.classList.remove("selecionada");
        perguntaJaSelecionada.querySelector(".icone-pergunta").classList.remove("hiden");
    }

    divInputPergunta.classList.add("selecionada");
    divInputPergunta.querySelector(".input-perguntas").classList.remove("hiden");
    divInputPergunta.querySelector(".icone-pergunta").classList.add("hiden");
}

function enviarPerguntasCriadas(){

    // Seleciona todos os elementos de input das perguntas
    const elementoPerguntasCriadas = document.querySelectorAll(".input-perguntas");
    console.log(elementoPerguntasCriadas)
    
    // Array que recebe os objetos de cada pergunta
    const objetoPerguntaParaEnviar = objetoPerguntaCriada.questions;

    elementoPerguntasCriadas.forEach(pergunta => {

        // Objeto da pergunta que recebe titulo, cor e respostas (repostas = array de objetos)
        const objetoPergunta = {};
        objetoPergunta.title = pergunta.querySelector(".titulo-pergunta").value;
        objetoPergunta.color = pergunta.querySelector(".cor-pergunta").value;

        // Array que recebe objetos de resposta
        objetoPergunta.answers = [];
        const arrayRespostas = objetoPergunta.answers;

        const respostaCorreta = {isCorrectAnswer: true};
        respostaCorreta.text = pergunta.querySelector(".resposta-correta").value;
        respostaCorreta.image = pergunta.querySelector(".url-imagem-correta").value;

        arrayRespostas.push(respostaCorreta);

        const elementosRespostasErradas = pergunta.querySelectorAll(".resposta-incorreta");

        elementosRespostasErradas.forEach(ElementoRespostaErrada => {
            const respostaErrada = {isCorrectAnswer: false};
            respostaErrada.text = ElementoRespostaErrada.querySelector(".texto-resposta-incorreta");
            respostaErrada.image = ElementoRespostaErrada.querySelector(".url-resposta-incorreta");
            arrayRespostas.push(respostaErrada);
        });

        objetoPerguntaParaEnviar.push(objetoPergunta);
    });
    console.log(objetoPerguntaCriada);
    }