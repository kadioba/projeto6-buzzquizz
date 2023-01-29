
//  Variaveis globais que registram as inputs do usuario
let numeroPerguntasCriadas;
let numeroNiveisCriados;
let objetoQuizCriado = {};
objetoQuizCriado.questions = [];
objetoQuizCriado.levels = [];


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

// Função que valida a cores hexadecimais
const validaCor = stringCor => {
    var codigoHexadecimal = /^#[a-fA-F0-9]{6}$/;
    return codigoHexadecimal.test(stringCor);
}

function enviarInfoQuizCriado(){
    objetoQuizCriado.title = document.querySelector(".input-tiulo-criado").value;

    objetoQuizCriado.image = document.querySelector(".input-url-imagem-criada").value;

    numeroPerguntasCriadas = document.querySelector(".input-numero-perguntas-criadas").value;

    numeroNiveisCriados = document.querySelector(".input-numero-niveis-criados").value;

    const infoQuizValidos = isValidUrl(objetoQuizCriado.image) && objetoQuizCriado.title.length >= 20 && objetoQuizCriado.title.length <= 65 && numeroPerguntasCriadas >= 3 &&  numeroNiveisCriados >= 2;
    console.log(objetoQuizCriado);

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

// Função que controla o comportamento do input de perguntas ao ser clicado
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
    const objetoPerguntaParaEnviar = objetoQuizCriado.questions;

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
                document.querySelector(".niveis-geral").classList.remove("hiden");
                gerarInputNiveis();

            }
            else{
                alert("Perguntas Invalidas, preencha novamente!");
            }

        }

        else{
            alert("Perguntas Invalidas, preencha novamente!");
        }

    });

    console.log(objetoQuizCriado);
}

function gerarInputNiveis(){
    const divDados = document.querySelector(".aba-niveis");
    divDados.innerHTML = "";
    let templateDados = "";

    for(let i = 1; i <= numeroNiveisCriados; i++){
        if(i == 1){
            templateDados = `
            <div class=" nivel nivel-${i} selecionado" onclick="abrirInputNiveis(this)">
                <div class="nivel-topo">
                    <h2>Nível ${i}</h2>
                    <img src="./imagens/Vector.png" alt="" class="icone-nivel hide">
                </div>
                <div class="nivel-dados">
                    <input type="text" class="titulo-nivel" placeholder="Título do nível">
                    <input type="text" class="acerto-minimo" placeholder="% de acerto mínima">
                    <input type="text" class="url-imagem-nivel" placeholder="URL da imagem do nível">
                    <input type="text" class="descrição-nivel" placeholder="Descrição do nível">
                </div>
            </div>`
        }
        else{
            templateDados = `
            <div class=" nivel nivel-${i}" onclick="abrirInputNiveis(this)"> 
                <div class="nivel-topo">
                    <h2>Nível ${i}</h2>
                    <img src="./imagens/Vector.png" alt="" class="icone-nivel">
                </div>
                <div class="nivel-dados hiden">
                    <input type="text" class="titulo-nivel" placeholder="Título do nível">
                    <input type="text" class="acerto-minimo" placeholder="% de acerto mínima">
                    <input type="text" class="url-imagem-nivel" placeholder="URL da imagem do nível">
                    <input type="text" class="descrição-nivel" placeholder="Descrição do nível">
                </div>
            </div>`
        }
        divDados.innerHTML += templateDados;
    }

}

// Função que controla o comportamento do input de niveis ao serem clicados
function abrirInputNiveis(divInputNivel){

    // Busca a div ja selecionada
    const nivelJaSelecionado = document.querySelector(".niveis-geral .selecionado");

    // Se ja houver uma pergunta selecionada, esconde ela
    if(nivelJaSelecionado != null){
        nivelJaSelecionado.querySelector(".nivel-dados").classList.add("hiden");
        nivelJaSelecionado.classList.remove("selecionado");
        nivelJaSelecionado.querySelector(".icone-nivel").classList.remove("hiden");
    }

    // Abre a div selecionada
    divInputNivel.classList.add("selecionado");
    divInputNivel.querySelector(".nivel-dados").classList.remove("hiden");
    divInputNivel.querySelector(".icone-nivel").classList.add("hiden");
}

function enviarNiveisCriados(){

    const elementoNiveisCriados = document.querySelectorAll(".nivel-dados");

    // Array que recebe os niveis antes de enviar para o objeto global
    const arrayNiveis = [];

    // Array que armazena os niveis para verificação de nivel de acerto minimo (0%)
    const arrayPorcentagemNiveis = [];

    // Variavel que armazena o booleano true ou false resultante da verificacao de nivel 0 presente
    let verificadorPorcentagem;

    elementoNiveisCriados.forEach(nivel => {

        const objetoNivel = {};

        let tituloNivel = nivel.querySelector(".titulo-nivel").value;
        let acertoMinimoNivel = nivel.querySelector(".acerto-minimo").value;
        let imagemNivel = nivel.querySelector(".url-imagem-nivel").value;
        let descricaoNivel = nivel.querySelector(".descrição-nivel").value;

        const verificacaoNiveis = tituloNivel.length >= 10 && acertoMinimoNivel >= 0 && acertoMinimoNivel <=100 && isValidUrl(imagemNivel) && descricaoNivel.length >= 30;


        if(verificacaoNiveis){
            arrayPorcentagemNiveis.push(acertoMinimoNivel);
            objetoNivel.title = tituloNivel;
            objetoNivel.image = imagemNivel;
            objetoNivel.text = descricaoNivel;
            objetoNivel.minValue = Number(acertoMinimoNivel);
            arrayNiveis.push(objetoNivel);
        }
    });

    arrayPorcentagemNiveis.forEach(nivel => {
        if(nivel == 0){
            verificadorPorcentagem = true;
        }
    });

    if(verificadorPorcentagem && arrayNiveis.length == numeroNiveisCriados){
        objetoQuizCriado.levels = arrayNiveis;
        enviarQuizServidor();
    }

    else{
        alert("Dados de niveis invalidos");
    }
}

function enviarQuizServidor(){
    const enviarQuizParaServidor = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", objetoQuizCriado);

    enviarQuizParaServidor.then(envioQuizSucesso);
    enviarQuizParaServidor.catch(envioQuizFalha);
}

function envioQuizSucesso(quizCriado){

    // Se foi enviado com sucesso, vai pra ultima pagina
    document.querySelector(".niveis-geral").classList.add("hiden");
    document.querySelector(".quiz-pronto").classList.remove("hiden");

    // Limpa o que estava dentro das variaveis globais
    objetoQuizCriado = {};
    objetoQuizCriado.questions = [];
    objetoQuizCriado.levels = [];

    gerarTelaQuizCriado(quizCriado);

}

function envioQuizFalha(dadosFalha){
    console.log("Falha no envio");
    console.log(dadosFalha);
}

function gerarTelaQuizCriado(quizEnviado){

    // Envia o ID do quiz para o local storage
    // PODE ENTRAR NA FUNCAO envioQuizSucesso
    const arrayDeQuizzesNoServidorSerializados = localStorage.getItem("arrayQuizesUsuario");

    if(arrayDeQuizzesNoServidorSerializados != null){
        const arrayDeQuizzesNoServidorDeserializados = JSON.parse(arrayDeQuizzesNoServidorSerializados);
        arrayDeQuizzesNoServidorDeserializados.push(quizEnviado.data.id);
        localStorage.setItem("arrayQuizesUsuario", JSON.stringify(arrayDeQuizzesNoServidorDeserializados));
    }

    else{
        const arrayDeQuizzesDeserializados = [];
        arrayDeQuizzesDeserializados.push(quizEnviado.data.id);
        localStorage.setItem("arrayQuizesUsuario", JSON.stringify(arrayDeQuizzesDeserializados));
    }


    // Selecionar a div que tem a foto e texto
    const elementoQuizEnviado = document.querySelector(".quiz-criado");

    elementoQuizEnviado.innerHTML = `
    <img src="${quizEnviado.data.image}" alt="">
    <p class="nome-do-quiz-final">${quizEnviado.data.title}</p>`;

    const botaoQuizCriado = document.querySelector(".botao-acessar-quiz-criado");
    botaoQuizCriado.onclick = () => {abrirQuizCriado(quizEnviado.data.id)};

    const fotoQuizCriado = document.querySelector(".quiz-criado");
    fotoQuizCriado.onclick = () => {abrirQuizCriado(quizEnviado.data.id)};
}

function abrirQuizCriado(idRecebida){
    console.log(idRecebida)
    document.querySelector(".tela-3").classList.add("hiden");
    document.querySelector(".tela-2").classList.remove("hiden");
    iniciarQuiz(idRecebida);
}
