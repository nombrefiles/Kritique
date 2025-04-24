var form = document.querySelector('form');
var error = document.querySelector("#info");

form.addEventListener('submit', async e => {
    e.preventDefault();

    var fd = new FormData(form);
    try {
        var response = await fetch('back.php',  {
            method: 'POST',
           body: fd
        }
        );

        if (!response.ok) {
            throw new Error('Erro na requisição.');
        }

        var data = await response.json();
        
        if (data.status == 'error') {
            error.innerHTML = data.mensagem;
        } else {
            error.innerHTML = data.mensagem;
            setTimeout(() => {
                location.href = '../LOGIN/index.html';  
            }, 1500);  
        }
    } catch (err) {
        console.error('Erro:', err);
        error.innerHTML = "Ocorreu um erro na requisição.";
    }
});
