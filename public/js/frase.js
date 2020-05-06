$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases", trocaFraseAleatoria);
}

function trocaFraseAleatoria(data){
    var frase = $(".frase");
    var numAleatorio = Math.floor(Math.random() * data.length); //numero de 1 até o tamanho do array
    frase.text(data[numAleatorio].texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo); //parametro que vai ser passado para a função
}

