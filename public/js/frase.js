$("#botao-frase").click(fraseAleatoria);

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

