const app = document.getElementById("app");

let pontos = 0;
let fase = 0;

const cientistas = [
    {
        nome: "ADA LOVELACE",
        imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Ada_Lovelace_portrait.jpg",

        historia:
            "ARQUIVO 01 - O PRIMEIRO ALGORITMO\n\n" +
            "Um documento antigo foi encontrado no laboratório!\n\n" +
            "Ada Lovelace estudou uma máquina projetada por Charles Babbage e escreveu um algoritmo para ela no século XIX.\n\n" +
            "Qual foi sua importante contribuição?",

        opcoes: [
            "Criou a internet",
            "Escreveu um algoritmo para uma máquina",
            "Inventou o primeiro celular"
        ],

        correta: 1,

        fato:
            "Ada Lovelace é reconhecida como pioneira da programação. Seu trabalho envolveu a Máquina Analítica."
    },

    {
        nome: "KATHERINE JOHNSON",
        imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Katherine_Johnson_at_NASA%2C_in_1966.jpg",

        historia:
            "ARQUIVO 02 - A MISSÃO ESPACIAL\n\n" +
            "ALERTA! O sistema de navegação espacial apresentou uma falha!\n\n" +
            "Katherine Johnson foi uma matemática da NASA que ajudou a calcular trajetórias de voos espaciais.\n\n" +
            "Qual habilidade foi essencial em seu trabalho?",

        opcoes: [
            "Cálculos matemáticos precisos",
            "Criação de redes sociais",
            "Montagem de celulares"
        ],

        correta: 0,

        fato:
            "Katherine Johnson realizou cálculos fundamentais para importantes missões espaciais."
    },

    {
        nome: "GRACE HOPPER",
        imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Grace_hopper.jpg",

        historia:
            "ARQUIVO 03 - O ERRO NO SISTEMA\n\n" +
            "ATENÇÃO! Um programa parou de funcionar!\n\n" +
            "Grace Hopper foi uma pioneira da computação e contribuiu para o desenvolvimento de linguagens de programação.\n\n" +
            "O que devemos fazer quando um código apresenta um erro?",

        opcoes: [
            "Apagar todo o computador",
            "Ignorar o erro",
            "Investigar e corrigir o código"
        ],

        correta: 2,

        fato:
            "Grace Hopper contribuiu para tornar a programação mais acessível e para o desenvolvimento de linguagens como COBOL."
    },

    {
        nome: "HEDY LAMARR",
        imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Hedy_Lamarr_1939_crop.jpg",

        historia:
            "ARQUIVO 04 - O SINAL MISTERIOSO\n\n" +
            "Um sinal desconhecido bloqueou as comunicações do laboratório!\n\n" +
            "Hedy Lamarr foi uma inventora que, junto com George Antheil, desenvolveu uma técnica de salto de frequência.\n\n" +
            "Essa técnica estava relacionada a qual área?",

        opcoes: [
            "Comunicação sem fio",
            "Impressão de livros",
            "Fotografia digital"
        ],

        correta: 0,

        fato:
            "A técnica de salto de frequência desenvolvida por Hedy Lamarr e George Antheil contribuiu para a história das comunicações sem fio."
    }
];

// TELA INICIAL
function inicio() {

    app.innerHTML = `
        <div class="subtitle">
            ACESSO RESTRITO - ARQUIVOS CONFIDENCIAIS
        </div>

        <h1>O CÓDIGO<br>SECRETO</h1>

        <h2>MULHERES NA TECNOLOGIA</h2>

        <p class="story">
            Quatro arquivos foram bloqueados.

            Histórias de mulheres que transformaram
            a ciência e a tecnologia estão escondidas
            neste laboratório.

            Investigue os documentos, resolva os
            enigmas e descubra os segredos.

            Você aceita a missão?
        </p>

        <button class="primary" id="iniciar">
            INICIAR INVESTIGAÇÃO
        </button>
    `;

    document.getElementById("iniciar").onclick = comecar;
}

// COMEÇAR O JOGO
function comecar() {

    pontos = 0;
    fase = 0;

    mostrarPergunta();
}

// MOSTRAR AS PERGUNTAS
function mostrarPergunta() {

    if (fase >= cientistas.length) {
        mostrarFinal();
        return;
    }

    const pessoa = cientistas[fase];

    const progresso = (fase / cientistas.length) * 100;

    app.innerHTML = `
        <div class="progress">
            ARQUIVO ${fase + 1} DE ${cientistas.length}
        </div>

        <div class="bar">
            <div class="bar-fill"
                 style="width:${progresso}%">
            </div>
        </div>

        <h2>${pessoa.nome}</h2>

        <img
            class="scientist-photo"
            src="${pessoa.imagem}"
            alt="Retrato de ${pessoa.nome}"
        >

        <p class="story">${pessoa.historia}</p>

        <div id="opcoes"></div>

        <p class="score">
            PONTUAÇÃO: ${pontos}
        </p>
    `;

    const area = document.getElementById("opcoes");

    pessoa.opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.textContent = `${indice + 1}. ${opcao}`;

        botao.onclick = function() {
            verificarResposta(indice);
        };

        area.appendChild(botao);
    });
}

// VERIFICAR RESPOSTA
function verificarResposta(escolha) {

    const pessoa = cientistas[fase];

    const acertou = escolha === pessoa.correta;

    if (acertou) {
        pontos++;
    }

    const titulo = acertou
        ? "ARQUIVO DESBLOQUEADO!"
        : "PISTA ENCONTRADA!";

    const classe = acertou ? "success" : "error";

    const mensagem = acertou
        ? "Parabéns! Você acertou o desafio."
        : "Não foi dessa vez! A resposta correta era: " +
          pessoa.opcoes[pessoa.correta] + ".";

    app.innerHTML = `
        <h2 class="${classe}">${titulo}</h2>

        <div class="feedback">
            ${mensagem}
        </div>

        <p class="story">
            ${pessoa.fato}
        </p>

        <p class="score">
            PONTUAÇÃO: ${pontos} DE 4
        </p>

        <button class="primary" id="continuar">
            ${fase === 3 ? "REVELAR O FINAL" : "PRÓXIMA FASE"}
        </button>
    `;

    document.getElementById("continuar").onclick = function() {
        fase++;
        mostrarPergunta();
    };
}

// FINAIS DO JOGO
function mostrarFinal() {

    const venceu = pontos >= 3;

    const titulo = venceu
        ? "FINAL 1 - GUARDIÃ DO CONHECIMENTO"
        : "FINAL 2 - O MISTÉRIO CONTINUA";

    const historia = venceu
        ? "Parabéns, investigadora!\n\n" +
          "Você recuperou os arquivos secretos e preservou " +
          "a história dessas mulheres.\n\n" +
          "O conhecimento está salvo para as próximas gerações!"
        : "Você conseguiu recuperar parte dos arquivos, " +
          "mas alguns segredos continuam ocultos.\n\n" +
          "Continue estudando e tente novamente para " +
          "descobrir todo o conhecimento do laboratório!";

    const cor = venceu ? "success" : "error";

    app.innerHTML = `
        <div class="subtitle">
            INVESTIGAÇÃO CONCLUÍDA
        </div>

        <h2 class="${cor}">
            ${titulo}
        </h2>

        <p class="story">${historia}</p>

        <p class="score">
            PONTUAÇÃO FINAL: ${pontos} DE 4
        </p>

        <button class="primary" id="jogar">
            JOGAR NOVAMENTE
        </button>
    `;

    document.getElementById("jogar").onclick = inicio;
}

// EXECUTAR O JOGO
inicio();
