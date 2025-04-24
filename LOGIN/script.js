var form = document.querySelector('#box');
var error = document.querySelector("#info");

form.addEventListener('submit', async e => {
    e.preventDefault();

    var fd = new FormData(form);
    var data = await fetch('back.php', {
        method: 'POST',
        body: fd
    }).then(res => res.json());

    if (data.status == 'error') {
        error.innerHTML = data.mensagem;
    } else {
        error.innerHTML = data.mensagem;
        setTimeout(() => {
            location.href = '../MUSICA/index.html';  
        }, 1500);  
    }
});
