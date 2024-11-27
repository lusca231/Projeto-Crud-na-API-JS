/********************************************************************
 * Objetivo: Visualizar uma lista de filmes, em formato de CARD, buscando os dados de uma API.
 * Data: 23/11/2024
 * Autor: Lucas Loiola Bezerra // RA: 61818
 * Autor: Rafael Andrade da Silva // RA: 52733
 * ADS.4NB noturno    
 ********************************************************************/



//Função para criar os cards dos filmes no HTML
const setCardItens = function (dadosFilmes) {

    let divCardDados = document.getElementById('cardDados');

    dadosFilmes.filmes.forEach(function (filme) {

        // Criação de um card para cada filme
        let card = document.createElement('div');
        let cardNome = document.createElement('div');
        let cardSinopse = document.createElement('div');
        let cardValor = document.createElement('div');
        let cardImage = document.createElement('img');


        // Atribuir classes para estilização no CSS
        card.setAttribute('class', 'card');
        cardNome.setAttribute('class', 'card_nome');
        cardSinopse.setAttribute('class', 'card_sinopse');
        cardValor.setAttribute('class', 'card_valor');
        cardImage.setAttribute('class', 'card_image');


        //Preenchendo os dados nos cards
        cardNome.innerText = filme.nome;
        cardImage.setAttribute('src', filme.image);
        cardSinopse.innerText = filme.sinopse;
        cardValor.innerText = filme.valor;


        divCardDados.appendChild(card);
        card.appendChild(cardNome);
        card.appendChild(cardImage);
        card.appendChild(cardSinopse);
        card.appendChild(cardValor);

    })

}


//Função para listar todos os filmes
const getFilmes = async function () {

    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/listar/filmes'

    let response = await fetch(url)

    let dados = await response.json()

    setCardItens(dados)
}


//Evento que "espera" todo conteúdo na pagina antes de abrir ela.
window.addEventListener('load', function () {
    getFilmes()
})