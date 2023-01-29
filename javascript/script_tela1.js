function criarQuiz(){
    const tela1 = document.querySelector(".tela-1");
    const tela3 = document.querySelector(".tela-3");
    const tela3InfoQuiz = document.querySelector(".tela-3 .info-quiz");
    tela1.classList.add("hiden");
    tela3.classList.remove("hiden");
    tela3InfoQuiz.classList.remove("hiden");
    
}
function abrirPaginaDeUmQuiz(){
    const tela1 = document.querySelector(".tela-1");
    const tela2 = document.querySelector(".tela-2");
    tela1.classList.add("hiden");
    tela2.classList.remove("hiden");
}

function listarQuizzes(resposta){
    console.log(resposta);
    //Acessar a chave arrayQuizesUsuario e armazenar o valor (string) em uma variável e transformar a string em um array
    const listaDeIdsDoUsuario = JSON.parse(localStorage.getItem("arrayQuizesUsuario"));
    console.log(listaDeIdsDoUsuario);
    //Buscar e selecionar os elementos HTML correspondentes aos quizzes criados e aos demais quizzes
    const seletoresQuizzesDoUsuario = ".tela-1 .container-quizzes-criados .lista-criada .imagens-seus-quizzes";
    const elementoQuizzesDoUsuario = document.querySelector(seletoresQuizzesDoUsuario);
    const seletoresTodosOsQuizzes = ".tela-1 .container-todos-quizzes";
    const elementoTodosOsQuizzes = document.querySelector(seletoresTodosOsQuizzes);
    const seletoresListaVazia = ".tela-1 .container-quizzes-criados .lista-vazia";
    const elementoListaVazia = document.querySelector(seletoresListaVazia);
    const seletoresListaCriada = ".tela-1 .container-quizzes-criados .lista-criada";
    const elementoListaCriada = document.querySelector(seletoresListaCriada);

    if (listaDeIdsDoUsuario !== null){
        elementoListaVazia.classList.add("hiden");
        elementoListaCriada.classList.remove("hiden");
    }
    //Percorrer a lista de quizzes e verificar se o id de cada quiz é igual ao id dos quizzes criados pelo usuário
    for(let i = 0; i < resposta.data.length; i++){

        let quizz = resposta.data[i];

        let idQuizz = quizz.id;

        let template = `
        <div class="quizz" onclick="abrirPaginaDeUmQuiz()">
            <img src=${quizz.image}>
            <p>${quizz.title}</p>
        </div>`;
         //listar na tela todos os quizzes criados pelo usuário e os demais quizzes
        elementoTodosOsQuizzes.innerHTML += template;

        if(listaDeIdsDoUsuario !== null){

            for(let j = 0; j < listaDeIdsDoUsuario.length; j++){

                let idQuizzDoUsuario = listaDeIdsDoUsuario[j];

                if(idQuizz === idQuizzDoUsuario){
                    elementoQuizzesDoUsuario.innerHTML += template;
                }
            }
        }
    }
}


function tratarErroAoObterQuizzes(erro){
    console.log(erro);
    alert("Erro ao obter a lista de quizzes do servidor! Tente novamente mais tarde. Status code: "+erro.response.status);
    obterQuizzes();
}

function obterQuizzes(){
    //Fazer uma requisição get para a API
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    //Tratar o erro e o sucesso da requisição
    promise.then(listarQuizzes);
    promise.catch(tratarErroAoObterQuizzes);
}
obterQuizzes();