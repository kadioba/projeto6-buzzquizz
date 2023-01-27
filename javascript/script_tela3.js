
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

const validaCor = stringCor => {
    var codigoHexadecimal = /^#[a-fA-F0-9]{6}$/;
    return codigoHexadecimal.test(stringCor);
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
                            <input type="text" placeholder="Resposta incorreta 1" class="texto-resposta-incorreta1">
                            <input type="text" placeholder="URL da imagem 1" class="url-resposta-incorreta1">
                        </li>
                    </ul>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 2" class="texto-resposta-incorreta2">
                            <input type="text" placeholder="URL da imagem 2" class="url-resposta-incorreta2">
                        </li>
                    </ul>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 3" class="texto-resposta-incorreta3">
                            <input type="text" placeholder="URL da imagem 3" class="url-resposta-incorreta3">
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
                            <input type="text" placeholder="Resposta incorreta 1" class="texto-resposta-incorreta1">
                            <input type="text" placeholder="URL da imagem 1" class="url-resposta-incorreta1">
                        </li>
                    </ul>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 2" class="texto-resposta-incorreta2">
                            <input type="text" placeholder="URL da imagem 2" class="url-resposta-incorreta2">
                        </li>
                    </ul>
                    <ul>
                        <li class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 3" class="texto-resposta-incorreta3">
                            <input type="text" placeholder="URL da imagem 3" class="url-resposta-incorreta3">
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

    // Seleciona todos os elementos de input de perguntas
    const elementoPerguntasCriadas = document.querySelectorAll(".input-perguntas");
    
    // Array que recebe os objetos de cada pergunta
    const objetoPerguntaParaEnviar = objetoPerguntaCriada.questions;

    elementoPerguntasCriadas.forEach(pergunta => {

        // Objeto da pergunta que recebe titulo, cor e respostas (repostas = array de objetos)
        const objetoPergunta = {};
        
        let tituloPergunta = pergunta.querySelector(".titulo-pergunta").value;
        let corPergunta = pergunta.querySelector(".cor-pergunta").value;

        if(tituloPergunta.length >= 20 && validaCor(corPergunta)){
            objetoPergunta.title = tituloPergunta;
            objetoPergunta.color = corPergunta;


            // Array que recebe objetos de resposta
            objetoPergunta.answers = [];
            const arrayRespostas = objetoPergunta.answers;

            const respostaCorreta = {isCorrectAnswer: true};
            let textoRespostaCorreta = pergunta.querySelector(".resposta-correta").value;
            let imagemRespostaCorreta = pergunta.querySelector(".url-imagem-correta").value;

            const respostaErrada1 = {isCorrectAnswer: false};
            let textoRespostaErrada1 = document.querySelector(".texto-resposta-incorreta1").value;
            let imagemRespostaErrada1 = document.querySelector(".url-resposta-incorreta1").value;

            const respostaErrada2 = {isCorrectAnswer: false};
            let textoRespostaErrada2 = document.querySelector(".texto-resposta-incorreta2").value;
            let imagemRespostaErrada2 = document.querySelector(".url-resposta-incorreta2").value;

            const respostaErrada3 = {isCorrectAnswer: false};
            let textoRespostaErrada3 = document.querySelector(".texto-resposta-incorreta3").value;
            let imagemRespostaErrada3 = document.querySelector(".url-resposta-incorreta3").value;

            const verificacaoRespostas = textoRespostaCorreta != "" && isValidUrl(imagemRespostaCorreta) && textoRespostaErrada1 != "" &&isValidUrl(imagemRespostaErrada1);
            
            if(verificacaoRespostas){
                respostaCorreta.text = textoRespostaCorreta;
                respostaCorreta.image = imagemRespostaCorreta;

                respostaErrada1.text = textoRespostaErrada1;
                respostaErrada1.image = imagemRespostaErrada1;

                arrayRespostas.push(respostaCorreta);
                arrayRespostas.push(respostaErrada1);

                if(textoRespostaErrada2 != "" && isValidUrl(imagemRespostaErrada2)){
                    respostaErrada2.text = textoRespostaErrada2;
                    respostaErrada2.image = imagemRespostaErrada2;

                    arrayRespostas.push(respostaErrada2);
                }

                if(textoRespostaErrada3 != "" && isValidUrl(imagemRespostaErrada3)){
                    respostaErrada3.text = textoRespostaErrada3;
                    respostaErrada3.image = imagemRespostaErrada3;

                    arrayRespostas.push(respostaErrada3);
                }

                objetoPerguntaParaEnviar.push(objetoPergunta);
                document.querySelector(".perguntas").classList.add("hiden");
                document.querySelector(".quiz-pronto").classList.remove("hiden");
                gerarInputNiveis();

            }
            else{
                alert("Perguntas Invalidas, preencha novmanete!");
            }

        }

        else{
            alert("Perguntas Invalidas, preencha novmanete!");
        }

    });

    console.log(objetoPerguntaCriada);
}

function gerarInputNiveis(){
    
}