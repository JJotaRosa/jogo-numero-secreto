let listaDeNumerosSorteados = []; // Array para armazenar os números já sorteados para não repetir
let numeroLimite = 100; // Define o limite máximo para o número secreto

// Função para exibir texto em um elemento HTML específico
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag); // Seleciona o elemento HTML pela tag
    campo.innerHTML = texto; // Define o texto dentro do elemento
}

// Função para definir os textos iniciais do jogo
function textoInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}.`);
}

// Chama a função para exibir o texto inicial quando a página carrega
textoInicial();

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 1 e o limite
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Se todos os números possíveis já foram sorteados, limpa a lista
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    // Verifica se o número escolhido já está na lista de números sorteados
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio(); // Se já estiver, gera um novo número aleatório (recursão)
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número escolhido à lista
        console.log(listaDeNumerosSorteados); // Para acompanhamento no console
        return numeroEscolhido; // Retorna o número aleatório gerado
    }
}

// Função para limpar o campo de input do chute
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = ''; // Define o valor do input para vazio
}

let numeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto inicial
let tentativas = 1; // Inicializa o contador de tentativas

// Função para verificar o chute do usuário
function verificarChute(){
    let chute = document.querySelector('input').value; // Obtém o valor digitado no input

    // Verifica se o chute é igual ao número secreto
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
    } else {
        // Se o chute for maior que o número secreto
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            // Se o chute for menor que o número secreto
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        tentativas++; // Incrementa o número de tentativas
        limparCampo(); // Limpa o campo de input para o próximo chute
    }
}

// Função para reiniciar o jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de input
    tentativas = 1; // Reseta o contador de tentativas
    textoInicial(); // Exibe a mensagem inicial novamente
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar novamente
}