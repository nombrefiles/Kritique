document.addEventListener("DOMContentLoaded", async () => {
    const session = await fetch('../LOGIN/session.php').then(res => res.json());

    if (session.status === "error") {
        alert('Você deve logar antes de usar nosso site!');
        location.href = "../LOGIN/index.html";
    }

    let input = document.querySelector('#nota');
    let mediaSpan = document.querySelector("#media");
    let btn = document.querySelector('button');

    async function fetchNotas() {
        const response = await fetch('back.php');
        const data = await response.json();
        return data;
    }

    async function iniciaPagina() {
        const data = await fetchNotas();

        if (data.status === "success") {
            if (data.notaUser !== null) {
                input.value = data.notaUser;
                btn.innerHTML = "Editar";
            }
            mediaSpan.innerHTML = data.media;
        } else {
            alert(data.message);
        }
    }

    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        let nota = parseInt(input.value);

        const formData = new FormData();
        formData.append('nota', nota);

        const response = await fetch('back.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.status === "success") {
            alert(data.message);
            await iniciaPagina(); 
        } else {
            alert(data.message);
        }
    });

    await iniciaPagina();

    let player = document.querySelector('.play');
    let flagPlay = false;
    let audio = new Audio('./MIDIA/audio.mp3');
    player.addEventListener('click', () => {
        if (!flagPlay) {
            audio.play();
            player.innerHTML = "A melhor do álbum tocando...";
            flagPlay = true;
        } else {
            audio.pause();
            player.innerHTML = '<img class="playicon" src="./MIDIA/play.svg" alt="">Tocar prévia';
            flagPlay = false;
        }
    });
});

var logout = document.querySelector('.profile');
profile.addEventListener('click', () => {
    fetch('../LOGIN/logout.php');
    location.href = '../LOGIN/index.html';
});