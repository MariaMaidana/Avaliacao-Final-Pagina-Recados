const listaUsers = buscarDadosLocalStorage('usuarios');

const formularioEntrar = document.getElementById('formulario-entrar');


formularioEntrar.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarioEncontrado = listaUsers.find((valor) => valor.email === email && valor.senha === senha);

    if(!usuarioEncontrado) {
        alert('Email e senha estão incorretos ou não existem. Tente novamente!');
        return
    } else {
        guardarLocalStorage('usuarioLogado', usuarioEncontrado);
        window.location.href = './recados.html'
    }
})




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
        return []
    }
}