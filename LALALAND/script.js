let data = JSON.parse(localStorage.getItem('data')) || [];
let media = document.querySelector("#media");
let notas = [];
let total = 0;
let btn = document.querySelector('button');
let input = document.querySelector('#nota');
let div = document.querySelector('#trocar');
let flag = false;
let player = document.querySelector('.play');
let flagPlay = false;
let audio = new Audio('./MIDIA/audio.mp3');

var usuarioLogado = localStorage.getItem('loggedUser');

if (usuarioLogado) {
    usuarioLogado = JSON.parse(usuarioLogado);
} else {
    alert('volta pro login');
    window.location.href = "../SIGNIN/index.html";
}

function calculaMedia() {
    notas = [];
    for (let e of data) {
        if (typeof e.lal === 'number' && !isNaN(e.lal)) {
            notas.push(e.lal);
        }
    }

    total = 0;
    for (let i of notas) {
        total += i;
    }

    if (notas.length > 0) {
        media.innerHTML = Math.round(total / notas.length);
    } else {
        media.innerHTML = "N/A";
    }
}

function atualizarNotaUsuarioLogado(nota) {
    let usuarioIndex = data.findIndex(u => u.user === usuarioLogado.user);
    if (usuarioIndex !== -1) {
        data[usuarioIndex].lal = nota;
    }
    localStorage.setItem('data', JSON.stringify(data));
}

if (usuarioLogado && typeof usuarioLogado.lal === 'number' && !isNaN(usuarioLogado.lal)) {
    flag = true;
    input.value = usuarioLogado.lal;
    notas.push(usuarioLogado.lal);
    btn.innerHTML = "Editar";
    calculaMedia();
} else {
    calculaMedia();
}

btn.addEventListener('click', () => {
    if (!flag) {
        let nota = parseInt(input.value);
        if (isNaN(nota) || (nota < 0 || nota > 100)) {
            alert("Por favor, insira uma nota válida.");
            return;
        }
        usuarioLogado.lal = nota;
        localStorage.setItem('loggedUser', JSON.stringify(usuarioLogado));
        atualizarNotaUsuarioLogado(nota);
        notas.push(nota);
        calculaMedia();
        input.value = nota;
        btn.innerHTML = "Editar";
        flag = true;
    } else {
        usuarioLogado.lal = null;
        div.innerHTML = "<input id='nota' type='number'>";
        input = document.querySelector('#nota');
        btn.innerHTML = "Confirmar";
        flag = false;
        localStorage.setItem('loggedUser', JSON.stringify(usuarioLogado));
        atualizarNotaUsuarioLogado(null);
        calculaMedia();
    }
});

var pessoal = document.querySelector('#pessoal');
var profile = document.querySelector('#profile');
var buran = document.querySelector('#logout');
var msg = document.querySelector('#msg');
var voltar = document.querySelector('#voltar');

profile.addEventListener('click', () => {
    pessoal.classList.add('active');
    msg.innerHTML = `Bem vindo/a, ${usuarioLogado.user}!`;
});

voltar.addEventListener('click', () => {
    pessoal.classList.remove('active');
});

buran.addEventListener('click', () => {
    if (localStorage.getItem('loggedUser')) {
        localStorage.removeItem('loggedUser');
        console.log('Usuário deslogado com sucesso.');
    } else {
        console.log('Nenhum usuário logado.');
    }
    window.location.href = "../SIGNIN/index.html";
});
