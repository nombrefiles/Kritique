let user = document.querySelector('#user');
let senha = document.querySelector('#pass');
let email = document.querySelector('#email');
let button = document.querySelector('button');
let rslt = document.querySelectorAll('p');
let confsenha = document.querySelector('#confirm');

var ss = sessionStorage.getItem('autosave');
if (ss) {
    ss = JSON.parse(ss)
    user.value = ss.user;
    email.value = ss.email;
    senha.value = ss.senha;
    phr = ss.phr;
    lun = ss.lun;
    fwn = ss.fwn;
    mmm = ss.mmm;
    lal = ss.lal;
    bef = ss.bef;
}
let data = JSON.parse(localStorage.getItem('data')) || [
    {
        user: 'luiisa',
        senha: 'toddy128',
        email: 'luisa@gmail.com',
        phr: 80,
        lun: 95,
        fwn: 89,
        mmm: 95,
        lal: 90,
        bef: 100
    },
    {
        user: 'filees',
        senha: 'pedro2016',
        email: 'files@gmail.com',
        phr: 100,
        lun: 90,
        fwn: 85,
        mmm: 100,
        lal: 80,
        bef: 76
    },
    {
        user: 'sorpablo',
        senha: 'senha123',
        email: 'sorpablo@gmail.com',
        phr: null,
        lun: null,
        fwn: 100,
        mmm: null,
        lal: null,
        bef: null
    }
];

console.log(data);

function limpa() {
    for (let i = 0; i < rslt.length; i++) {
        rslt[i].innerHTML = '';
    }
}

button.addEventListener('click', () => {
    let cadastrado = true;
    limpa();
    for (let i = 0; i < data.length; i++) {
        if (user.value == data[i].user) {
            rslt[0].innerHTML = "Usuário existente";
            cadastrado = false;
        }
    }
    if (senha.value != confsenha.value) {
        rslt[3].innerHTML = "AS SENHAS NÃO COINCIDEM";
        cadastrado = false;
    }

    if (cadastrado) {
        data.push({
            user: user.value,
            senha: senha.value,
            email: email.value,
            phr: null,
            lun: null,
            fwn: null,
            mmm: null,
            lal: null,
            bef: null
        });
        localStorage.setItem('data', JSON.stringify(data));
        sessionStorage.removeItem('autosave');
        window.open("../LOGIN/index.html", "_self");
    }
    console.log(data);
});

user.addEventListener('input', salvar);
email.addEventListener('input', salvar);
senha.addEventListener('input', salvar);


function salvar() {
    var usuario = {
        user: user.value,
        senha: senha.value,
        email: email.value,
        phr: null,
        lun: null,
        fwn: null,
        mmm: null,
        lal: null,
        bef: null
    }
    sessionStorage.setItem('autosave', JSON.stringify(usuario));

}


