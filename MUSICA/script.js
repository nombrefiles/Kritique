let a = [
    {
        title: 'Pure Heroine',
        artist: 'Lorde',
        link: "../PURE HEROINE/index.html"
    },
    {
        title: "Favourite Worst Nightmare",
        artist: 'Arctic Monkeys',
        link: "../FWN/index.html"
    },
    {
        title: 'Lungs',
        artist: 'Florence + The Machine',
        link: "../LUNGS/index.html"
    }
];

var loggedUser = localStorage.getItem('loggedUser');

if (loggedUser) {
    loggedUser = JSON.parse(loggedUser);
} else {
    alert('volta pro login');
    window.location.href = "../SIGNIN/index.html"; // Redireciona para a página de login se não houver usuário logado
}

let input = document.querySelector('input');
let result = document.querySelector('.result');

for (e of a) {
    result.innerHTML += `<span> <a href="${e.link}"> ${e.title} - ${e.artist} </a></span><br><br>`;
}

input.addEventListener('input', () => {
    let searchTerm = input.value.trim().toLowerCase();

    if (searchTerm === '') {
        result.innerHTML = "";
        for (e of a) {
            result.innerHTML += `<span> <a href="${e.link}"> ${e.title} - ${e.artist} </a></span><br><br>`;
        }
        return;
    }

    result.innerHTML = "";
    let encontrados = a.filter(e => e.title.toLowerCase().includes(searchTerm));

    if (encontrados.length > 0) {
        for (let e of encontrados) {
            result.innerHTML += `<span> <a href="${e.link}"> ${e.title} - ${e.artist} </a></span><br><br>`;
        }
    } else {
        result.innerHTML = "Nada encontrado, tente novamente";
    }
});

// LOGOUT 
var pessoal = document.querySelector('#pessoal');
var profile = document.querySelector('#profile');
var buran = document.querySelector('#logout');
var msg = document.querySelector('#msg');
var voltar = document.querySelector('#voltar');

profile.addEventListener('click', () => {
    pessoal.classList.add('active');
    msg.innerHTML = `Bem vindo/a, ${loggedUser.user}!`;
});

voltar.addEventListener('click', () => {
    pessoal.classList.remove('active');
});

buran.addEventListener('click', () => {
    if (localStorage.getItem('loggedUser')) {
        // Correção: Remover a chave correta 'loggedUser'
        localStorage.removeItem('loggedUser');
        console.log('Usuário deslogado com sucesso.');
    } else {
        console.log('Nenhum usuário logado.');
    }
    window.location.href = "../SIGNIN/index.html";
});
