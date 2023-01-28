let acertos=0;
let respondidos=0;
const numeroDePerguntas=3;


function selecionarAlternativa(elemento) {
    const filtroBranco = elemento.parentNode.firstChild.nextSibling;
    const ProximaQuestBox = elemento.parentNode.parentNode.nextElementSibling;
    elemento.classList.add('upZindex');
    elemento.parentNode.classList.remove('cor');
    filtroBranco.classList.remove('hiden');
    elemento.removeAttribute('onClick');
    respondidos++;
    if(elemento.classList.contains("certo")){
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