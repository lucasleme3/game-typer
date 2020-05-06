$("#botao-placar").click(mostraPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Lucas";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);

    linha.find(".botao-remover").click(removeLinha);
    
    corpoTabela.prepend(linha);
    //corpoTabela.append(linha); //insere uma linha ao final do corpo da tabela
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    },1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    
    var link = $("<a>").addClass("botao-remover").attr("href", "#");

    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    //console.log(linha);
    
    return linha;
}

function removeLinha() {
    event.preventDefault(); //evitar o comportamento padrao do html
    var linha = $(this).parent().parent();
    linha.fadeOut(500); //vai esmaecendo o elemento até sair da tela, mas nao o remove. apenas fica com o display: none
    setTimeout(function() {
        linha.remove();
    }, 500);
}

function mostraPlacar(){
    // $(".placar").toggle();
    $(".placar").stop().slideToggle(1000);
}