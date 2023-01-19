const meuModalEditar = new bootstrap.Modal('#modal-editar')

const usuarioLogado = buscarDadosLocalStorage('usuarioLogado');

document.addEventListener('DOMContentLoaded', () => {
    if(!usuarioLogado.email) {
        window.location.href = './inicio.html'
    } else {
        montarRegistrosNoHTML()
    }
})  


const formularioRecados = document.getElementById('formulario-recados');

const tbody = document.getElementById('registros');

formularioRecados.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const detalhamento = document.getElementById('detalhamento').value;

    usuarioLogado.recados.push({
        descricao: descricao,
        detalhamento: detalhamento,
    });


    guardarLocalStorage('usuarioLogado', usuarioLogado)

    formularioRecados.reset()

    montarRegistrosNoHTML()
})


function montarRegistrosNoHTML() {
     
    tbody.innerHTML = ''


    usuarioLogado.recados.forEach((valor, index) => {
        tbody.innerHTML += `
            <tr id="${index}">
                <td>${index + 1}</td>
                <td>${valor.descricao}</td>
                <td>${valor.detalhamento}</td>
                <td>
                    <button id="botao-apagar" onclick="excluirRecado(${index})">Apagar</button>
                    <button id="botao-editar" onclick="prepararEdicao(${index})" type="button"  data-bs-toggle="modal" data-bs-target="#modal-editar">Editar</button>
                </td>
            </tr>
        `
    })
}



function guardarLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor);

    localStorage.setItem(chave, valorJSON);

}

function buscarDadosLocalStorage(chave) {

    const dadoJSON = localStorage.getItem(chave)

    if(dadoJSON) {
        const listaDados = JSON.parse(dadoJSON);
        return listaDados
    } else {
        return {}
    }
}

function excluirRecado(indice) {

    const confirma = window.confirm('Você tem certeza que deseja excluir esse recado?');

    if(confirma) {
        usuarioLogado.recados.splice(indice, 1)

        guardarLocalStorage('usuarioLogado', usuarioLogado)
    
        const trRemover = document.getElementById(indice)
        trRemover.remove()
        window.location.reload()
    }
}

function prepararEdicao(indice) {

    const inputEditarDescricao = document.getElementById("editar-descricao");
    const inputEditarDetalhamento = document.getElementById("editar-detalhamento");

    inputEditarDescricao.value = usuarioLogado.recados[indice].descricao
    inputEditarDetalhamento.value = usuarioLogado.recados[indice].detalhamento

    const formularioEditar = document.getElementById('formulario-editar-recados');
    formularioEditar.addEventListener('submit', (event) => {
        event.preventDefault()

        usuarioLogado.recados[indice].descricao =         inputEditarDescricao.value
        usuarioLogado.recados[indice].detalhamento = inputEditarDetalhamento.value
        

        guardarLocalStorage('usuarioLogado', usuarioLogado)


        montarRegistrosNoHTML()

        meuModalEditar.hide()

    })
}


function sairDaConta() {
    salvarRecados()
    localStorage.removeItem("usuarioLogado")
    window.location.href = './inicio.html'
}

function salvarRecados() {
    const listaUsers = buscarDadosLocalStorage('usuarios')

    const acharUser = listaUsers.findIndex((valor) => valor.email === usuarioLogado.email)

    listaUsers[acharUser].recados = usuarioLogado.recados

    guardarLocalStorage('usuarios', listaUsers)

}