let acertos=0;
let respondidos=0;
const numeroDePerguntas=3;


function selecionarAlternativa(elemento) {
    const filtroBranco = elemento.parentNode.firstChild.nextSibling;
    elemento.classList.add('upZindex');
    elemento.parentNode.classList.remove('cor');
    filtroBranco.classList.remove('hiden');
    elemento.removeAttribute('onClick');
    if(elemento.classList.contains("certo")){
        acertos++;
    }
    respondidos++;
    if (respondidos === numeroDePerguntas) {
       setTimeout(mostrarResultado,2000);
    }
}


function mostrarResultado() {
   const resultadot2= document.querySelector('.tela-2 .resultado');
   resultadot2.classList.remove('hiden');
   resultadot2.scrollIntoView()
    
}