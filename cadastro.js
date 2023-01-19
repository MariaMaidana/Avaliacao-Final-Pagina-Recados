const listaUsers = buscarDadosLocalStorage('usuarios');

const formularioCadastro = document.getElementById('formulario-cadastro');

formularioCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const emailUser = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('senha-confirma').value;


    if(senha !== confirmaSenha) {

        alert('As senhas devem ser iguais!') 
        return
    }


    const existe = listaUsers.some((valor) => valor.email === emailUser);

    if(existe) {

        alert('Esse e-mail já possui cadastro. Tente novamente!');
        formularioCadastro.reset();
        return
    }

    const novoUser = {
        email: emailUser,
        senha: senha,
        recados: []
    };

    listaUsers.push(novoUser);

    alert('Cadastro realizado com sucesso!');
    window.location.href = './inicio.html'

    guardarLocalStorage('usuarios', listaUsers);

    formularioCadastro.reset();
    
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