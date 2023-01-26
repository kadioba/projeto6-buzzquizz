let tituloCriado;
let urlImagemCriada;
let numeroPerguntasCriadas;
let numeroNiveisCriados;

function enviarInfoQuizCriado(){
    tituloCriado = document.querySelector(".input-tiulo-criado").value;

    urlImagemCriada = document.querySelector(".input-url-imagem-criada").value;

    numeroPerguntasCriadas = document.querySelector(".input-numero-perguntas-criadas").value;

    numeroNiveisCriados = document.querySelector(".input-numero-niveis-criados").value;

    console.log(tituloCriado);
    console.log(urlImagemCriada);
    console.log(numeroPerguntasCriadas);
    console.log(numeroNiveisCriados);

    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    const infoQuizValidos = isValidUrl(urlImagemCriada) && tituloCriado.length >= 20 && tituloCriado.length <= 65 && numeroPerguntasCriadas >= 3 &&  numeroNiveisCriados >= 2;
    console.log(infoQuizValidos);

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
    const divPerguntas = document.querySelector(".perguntas");
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
                <div  class="input-perguntas">
                    <input type="text" placeholder="Texto da pergunta">
                    <input type="text" placeholder="Cor de fundo da pergunta">
                    <h2>Resposta correta</h2>
                    <input type="text" placeholder="Resposta correta">
                    <input type="text" placeholder="URL da imagem">
                    <h2>Respostas incorretas</h2>
                    <ul>
                        <li>
                            <input type="text" placeholder="Resposta incorreta 1">
                            <input type="text" placeholder="URL da imagem 1">
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <input type="text" placeholder="Resposta incorreta 2">
                            <input type="text" placeholder="URL da imagem 2">
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <input type="text" placeholder="Resposta incorreta 3">
                            <input type="text" placeholder="URL da imagem 3">
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
                <div  class="input-perguntas hiden">
                    <input type="text" placeholder="Texto da pergunta">
                    <input type="text" placeholder="Cor de fundo da pergunta">
                    <h2>Resposta correta</h2>
                    <input type="text" placeholder="Resposta correta">
                    <input type="text" placeholder="URL da imagem">
                    <h2>Respostas incorretas</h2>
                    <ul>
                        <li>
                            <input type="text" placeholder="Resposta incorreta 1">
                            <input type="text" placeholder="URL da imagem 1">
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <input type="text" placeholder="Resposta incorreta 2">
                            <input type="text" placeholder="URL da imagem 2">
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <input type="text" placeholder="Resposta incorreta 3">
                            <input type="text" placeholder="URL da imagem 3">
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
    console.log(perguntaJaSelecionada);

    // Se ja houver uma pergunta selecionada, vai esonder ela e abrir a que foi clicada
    if(perguntaJaSelecionada != null){
        perguntaJaSelecionada.querySelector(".input-perguntas").classList.add("hiden");
        perguntaJaSelecionada.classList.remove("selecionada");
        perguntaJaSelecionada.querySelector(".icone-pergunta").classList.remove("hiden");
    }

    divInputPergunta.classList.add("selecionada");
    divInputPergunta.querySelector(".input-perguntas").classList.remove("hiden");
    divInputPergunta.querySelector(".icone-pergunta").classList.add("hiden");
}