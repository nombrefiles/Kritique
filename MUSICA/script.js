let input = document.querySelector('#box input');
let result = document.querySelector('.result');
let pessoal = document.querySelector('#pessoal');
let profile = document.querySelector('#profile');
let msg = document.querySelector('#msg');
let voltar = document.querySelector('#voltar');
let logout = document.querySelector('#logout');

async function logado() {
    let data = await fetch('../LOGIN/session.php').then(res => res.json());
    if (data.status === "error") {
        location.href = "../LOGIN/index.html";
    }
}
logado();

input.addEventListener('input', async (e) => {
    e.preventDefault();

    let pesquisa = e.target.value.trim();
    if (pesquisa === "") {
        result.innerHTML = "";
        return;
    }

    try {
        let params = new URLSearchParams({ pesquisa });
        let url = `back.php?${params.toString()}`;
        let response = await fetch(url);
        let data = await response.json();

        console.log("Dados recebidos:", data);
        result.innerHTML = "";

        if (data.resultado && data.resultado.length > 0) {
            for (let item of data.resultado) {
                result.innerHTML += `<span><a href="${item.link}">${item.nome} - ${item.artista}</a></span><br><br>`;
            }
        } else {
            result.innerHTML = "Nada encontrado, tente novamente.";
        }
    } catch (err) {
        console.error("Erro ao buscar dados:", err);
        result.innerHTML = "Ocorreu um erro ao realizar a busca.";
    }
});

profile.addEventListener('click', async () => {
    pessoal.classList.add('active');
    let data = await fetch('../LOGIN/session.php').then(res => res.json());
    msg.innerHTML = `Bem vindo/a, ${data.user.name}!`;
});


voltar.addEventListener('click', () => {
    pessoal.classList.remove('active');
});


logout.addEventListener('click', () => {
    fetch('../LOGIN/logout.php', { method: 'POST' })
        .then(() => {
            localStorage.removeItem('loggedUser');
            location.href = "../LOGIN/login.html";
        })
        .catch(err => console.error("Erro ao deslogar:", err));
});
