//Variáveis
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const iniciarOuPausatBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
musica.loop = true; //quando a música parar, ela comece a tocar de novo.

const musicaPlay = document.querySelector('#start-pause');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

//DOM
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
}),


longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
   alterarContexto('descanso-longo');
   longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {//foreach usei para percorrer uma lista, para que a fique marcado a opção selecionada e remover as outras
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    //Estrutura de condição
    switch(contexto) {
        case "foco":
            titulo.innerHTML = `
             Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
             Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            default: 
            break;
    }
}

const contagemRegressiva = () => { //usei uma arrow function, criando de forma mais abreviada uma função
    if(tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()  
        zerar()
        return
    }

    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar);

//Funções
function iniciarOuPausar() {
    if(intervaloId) {
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausatBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `./imagens/pause.png`)
    
}

function zerar() {
    clearInterval(intervaloId) // Para o intervalo.
    iniciarOuPausatBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null; // Limpa o identificador do intervalo.
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}` // Insere no HTML.
}

mostrarTempo()