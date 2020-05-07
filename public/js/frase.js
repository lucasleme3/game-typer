$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);


function fraseAleatoria() {
    $("#spinner").toggle(); //exibe o spinner

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){ //se algo der erado, essa função é executada
        $("#erro").toggle();
        
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);  
    })
    .always(function(){ //sempre será executada
        $("#spinner").toggle(); //esconde o spinner
    });
}

function trocaFraseAleatoria(data){
    var frase = $(".frase");
    var numAleatorio = Math.floor(Math.random() * data.length); //numero de 1 até o tamanho do array
    frase.text(data[numAleatorio].texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo); //parametro que vai ser passado para a função
}

function buscaFrase() {
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    var dados = { id: fraseId}; //objeto js
    $.get("http://localhost:3000/frases", dados, trocaFrase) //aceita um objeto como parametro para enviar junto com a requisição
    .fail(function(){ 
        $("#erro").toggle();
        
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);  
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {
    //console.log(data);
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

