let data = JSON.parse(localStorage.getItem('data')) || [];
const user = document.querySelector('#user');
const pass = document.querySelector('#pass');
const rslt = document.querySelector('p');
const btn = document.querySelector('button');

let usuarioLogado = null;
let flag = false;
let code = null;

var logado = sessionStorage.getItem('autosave');

if (logado) {
    logado = JSON.parse(logado);
    user.value = logado.user;
    pass.value = logado.senha;
}

function verifica() {
    for (let i = 0; i < data.length; i++) {
        if (user.value == data[i].user || user.value == data[i].email) {
            code = i;
            break;
        }
    }

    if (code != null && pass.value == data[code].senha) {
        flag = true;
    } else if (!flag) {
        rslt.innerHTML = "Usuário ou senha inválidos.";
    }
}

function reinicia() {
    rslt.innerHTML = "";
    flag = false;
}

btn.addEventListener("click", () => {
    reinicia();
    verifica();

    if (flag) {
        usuarioLogado = data[code];
        // Correção: Usar a chave correta 'loggedUser' para armazenar o usuário logado
        localStorage.setItem('loggedUser', JSON.stringify(usuarioLogado));
        sessionStorage.removeItem('autosave');
        rslt.innerHTML = "Logado com sucesso!";
        window.open("../MUSICA/index.html", "_self"); // Redireciona para a página de música
    }

    console.log(usuarioLogado);
});

user.addEventListener('input', salvar);
pass.addEventListener('input', salvar);

function salvar() {
    var usuario = {
        user: user.value,
        senha: pass.value
    };
    sessionStorage.setItem('autosave', JSON.stringify(usuario));
}
