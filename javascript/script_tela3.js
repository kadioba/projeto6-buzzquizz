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
    }

    else{
        alert("Preencha os dados corretamente!");
    }
}

function gerarInputPerguntas(){

}

function abrirInputPerguntas(divInputPergunta){

    const perguntaJaSelecionada = document.querySelector(".perguntas .selecionada");
    console.log(perguntaJaSelecionada);

    // Se ja houver uma pergunta selecionada, vai esonder ela e abrir a que foi clicada
    if(perguntaJaSelecionada != null){
        perguntaJaSelecionada.querySelector(".pergunta-fechada").classList.remove("hiden");
        perguntaJaSelecionada.querySelector(".pergunta-aberta").classList.add(".hiden")
    }

    divInputPergunta.classList.add("selecionado");
    divInputPergunta.querySelector(".pergunta-fechada").classList.add("hiden");
    divInputPergunta.querySelector(".pergunta-aberta").classlist.remove("hiden");
}