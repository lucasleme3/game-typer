var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
    
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
});

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() {
    var frase = $(".frase").text(); //Pegando o conteudo da frase com a função text();
    var numPalavras = frase.split(" ").length; //Quebrando a frase nos espaços com a função split() para saber o numero de palavras da frase. e então usando a função .length para saber o tamanho do array retornado, ou seja o numero de palavras
    //console.log(numPalavras);
    var tamanhoFrase = $("#tamanho-frase"); 
    tamanhoFrase.text(numPalavras); //atribuindo o numero de palavras para o conteudo no HTML
    // console.log(tamanhoFrase);
}


function inicializaContadores() {
    campo.on("input", function(){ //evento de input no textarea
    //console.log("cliquei no campo");
    var conteudo = campo.val(); //para acessar o conteudo que está no input
    var qtdPalavras = conteudo.split(/\S+/).length - 1; //quebrar o conteudo do input. expressão regular S+ será responsável por buscar qualquer caractere, exceto espaço vazio
    //console.log(qtdPalavras);
    $("#contador-palavras").text(qtdPalavras); //troca o span do html que está com o id contador-palavras para o numero de palavras encontradas

    var qtdCaracteres = conteudo.length; //conta o tamanho da string, ou seja quantos caracteres essa string tem
    $("#contador-caracteres").text(qtdCaracteres);
});
}

function inicializaCronometro(){
    campo.one("focus", function(){
    var tempoRestante = $("#tempo-digitacao").text(); //pegando o conteudo do span com id tempo-digitacao no html
    cronometroID = setInterval(function(){ //funcao para decrescer o tempo restante a cada 1000 milisegundos = 1 segundo.
    tempoRestante--;
    //console.log(tempoRestante);
        $("#tempo-digitacao").text(tempoRestante); //decrescendo 1 a cada segundo e colocando no html
        if(tempoRestante < 1){
            clearInterval(cronometroID); //quando o tempo chegar a 0, o setInterval para de funcionar
            finalizaJogo();
        }
    }, 1000); 
});
}

function inicializaMarcadores(){
    campo.on("input", function(){
    var frase = $(".frase").text();
    var digitado = campo.val(); //o quanto o usuario já escreveu
    var comparavel = frase.substr(0, digitado.length); //um pedaço da frase uma substring da posição 0 até o quanto eu já digitei(digitado.length)
    //console.log("Digitado: " + digitado);
    //console.log("Frase Comp. " + comparavel);

    if(digitado == comparavel){
        //console.log("Está certo");
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    }else{
        //console.log("Está errado");
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }   
});
}

function finalizaJogo() {
    // campo.css("background-color","lightgray"); // quando o cronometro zerar o campo fica cinza
    campo.attr("disabled", true); //quando o tempo chegar a 0, o atributo disabled é adicionado no campo de digitação
    campo.toggleClass("campo-desativado");
    //campo.addClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo() {
    
        //console.log("Botão clicado");
        campo.attr("disabled", false); //libera o campo de texto para ser digitado
        campo.val("");
        $("#contador-palavras").text("0"); //zerando as variaveis ao reiniciar
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        campo.toggleClass("campo-desativado");
        //campo.removeClass("campo-desativado");
        campo.removeClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }

