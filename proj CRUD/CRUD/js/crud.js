/********************************************************************
 * Objetivo: Sistema de cadastro, edição, exclusão de filmes em formato de lista
 * Data: 20/11/2024
 * Autor: Lucas Loiola Bezerra // RA: 61818
 * Autor: Rafael Andrade da Silva // RA: 52733
 * ADS.4NB noturno    
 ********************************************************************/



//Botão "Salvar" e "Limpar"
const botaoSalvar = document.getElementById('salvar')
const botaoLimpar = document.getElementById('limpar')


//Recebe os dados do formulario
const getDadosForm = function () {
    let filmeJSON = {}
    let status = true

    let nomeFilme = document.getElementById('nome')
    let sinopseFilme = document.getElementById('sinopse')
    let imageFilme = document.getElementById('image')
    let valorFilme = document.getElementById('valor')

    if (nomeFilme == '' || sinopseFilme == '' || imageFilme == '' || valorFilme == '') {
        alert('Preencha todos os dados.')
        status = false

    } else {
        //Área responsável por criar o objeto JSON com os atributos necessarios.
        filmeJSON.nome = nomeFilme.value
        filmeJSON.sinopse = sinopseFilme.value
        filmeJSON.image = imageFilme.value
        filmeJSON.valor = valorFilme.value
    }

    if (status) {
        return filmeJSON
    } else {
        return false
    }
}


//Função para salvar um filme novo.
const postFilme = async function (dadosFilme) {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/novo/filme'

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosFilme)
    })

    if (response.status == 201) {
        alert('Filme adicionado com sucesso.')
        getFilmes()
    } else {
        alert('Não foi possivel adicionar o filme, verifique as informações.')
    }
}


//Função para editar um filme que já existe.
const putFilme = async function (dadosFilme) {

    let id = sessionStorage.getItem('idFilme')

    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/atualizar/filme/${id}`;

    let response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosFilme)
    })

    if (response.status == 200) {
        alert('Atualizado com sucesso.')
        getFilmes()
    } else {
        alert('Não foi possivel editar o filme, verifique as informações.')
    }
}


//Função para excluir um filme
const deleteFilme = async function (id) {

    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/excluir/filme/${id}`


    let response = await fetch(url, {
        method: 'DELETE'
    })

    if (response.status == 200) {
        alert('Filme excluido com sucesso!')
        getFilmes()
    } else {
        alert('Não foi possivel excluir o filme.')
    }
}


//Função para listar todos os filmes
const getFilmes = async function () {

    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/listar/filmes'

    let response = await fetch(url)

    let dados = await response.json()

    setListItens(dados)
}


//Função para criar a lista de itens no HTML
const setListItens = function (dadosFilmes) {
    //Recebe a principal caixa onde sera criada a lista dos filmes
    let divListDados = document.getElementById('listDados')

    //Limpa a lista de dados antes de carregar novamente
    divListDados.innerText = ''

    dadosFilmes.filmes.forEach(function (filme) {

        //Cria os elementos no HTML
        let divDados = document.createElement('div')
        let divNome = document.createElement('div')
        let divSinopse = document.createElement('div')
        let divValor = document.createElement('div')
        let divOpcoes = document.createElement('div')
        let spanEditar = document.createElement('span')
        let spanExcluir = document.createElement('span')
        let imgEditar = document.createElement('img')
        let imgExcluir = document.createElement('img')


        //Escrevendo os dados do ARRAY de livros nos elementos do HTML
        divNome.innerText = filme.nome
        divSinopse.innerText = filme.sinopse
        divValor.innerText = filme.valor

        divDados.setAttribute('id', 'dados')
        divDados.setAttribute('class', 'linha dados')
        imgEditar.setAttribute('src', 'icones/editar.png')
        imgExcluir.setAttribute('src', 'icones/excluir.png')

        imgEditar.setAttribute('idFilme', filme.id)
        imgExcluir.setAttribute('idFilme', filme.id)

        //Associa um elemento dentro de outro no HTML
        divListDados.appendChild(divDados)
        divDados.appendChild(divNome)
        divDados.appendChild(divSinopse)
        divDados.appendChild(divValor)
        divDados.appendChild(divOpcoes)
        divOpcoes.appendChild(spanEditar)
        divOpcoes.appendChild(spanExcluir)
        spanEditar.appendChild(imgEditar)
        spanExcluir.appendChild(imgExcluir)


        //Evento de *click* para excluir
        imgExcluir.addEventListener('click', function () {
            let id = imgExcluir.getAttribute('idFilme')
            let resposta = confirm('Realmente deseja excluir esse filme da sua lista?')
            if (resposta) {
                deleteFilme(id)
            }
        })

        //Evento de *click* para editar
        imgEditar.addEventListener('click', function () {
            let id = imgEditar.getAttribute('idFilme')
            getBuscarFilme(id)
        })
    })
}


//Função para buscar um filme pelo seu ID
const getBuscarFilme = async function (id) {
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/buscar/filme/${id}`

    let response = await fetch(url)
    let dados = await response.json()

    if (response.status == 200) {
        //Colocando os dados da API nas caixas do formulario
        document.getElementById('nome').value = dados.filme[0].nome
        document.getElementById('sinopse').value = dados.filme[0].sinopse
        document.getElementById('image').value = dados.filme[0].image
        document.getElementById('valor').value = dados.filme[0].valor

        //Altera o texto do botão para a palavra Atualizar
        document.getElementById('salvar').innerText = 'Atualizar'

        sessionStorage.setItem('idFilme', id)
    }
}


//Botão "Salvar"
botaoSalvar.addEventListener('click', function () {
    let dados = getDadosForm()

    if (dados) {
        if (document.getElementById('salvar').innerText == 'Salvar') {
            postFilme(dados)
        } else if (document.getElementById('salvar').innerText == 'Atualizar') {
            putFilme(dados)
        }
    }
})


//Botão "Limpar"
botaoLimpar.addEventListener('click', function () {

    document.getElementById('nome').value = ""
    document.getElementById('sinopse').value = ""
    document.getElementById('image').value = ""
    document.getElementById('valor').value = ""
})

//Evento que "espera" todo conteúdo na pagina antes de abrir ela.
window.addEventListener('load', function () {
    getFilmes()
})