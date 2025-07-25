const display = document.querySelector('.display');
let ePositivo = true

function getCookie() {
    let csrfToken = null;

    if(document.cookie && document.cookie != '') {
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            if(cookie.includes('csrftoken')) {
                csrfToken = cookie.split('=')[1]
            }
        }
    }

    return csrfToken
}

function salvarOperacao(parametros, resultado) {
    fetch('/calculadora/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie()
        },
        body: JSON.stringify({parametros, resultado})
    }).then(
        window.location.href = `/calculadora/resultado`
    ).catch(e => console.log(e))
}



document.querySelector(".buttons").addEventListener("click", function (event) {
    verificarTecla(event.target.value);
})

document.addEventListener('keydown', function (event) {
    verificarTecla(event.key);
})

function verificarTecla(tecla) {
    console.log('Tecla pressionada:', tecla);
    let numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    let teclasOperadores = ['+', '-', '*', '/', '%'];
    let teclaIgual = '=';

    if (tecla == 'c') {
        window.location.href = '/calculadora'
        return
    }

    if (tecla === '±') {
        let conteudo = display.innerText
        if (ePositivo) {
            ePositivo = false
            display.innerText = `-${conteudo}`
        } else {
            ePositivo = true
            display.innerText = conteudo.slice(1, conteudo.length)
        }
        return
    }

    if (tecla === 'Backspace') {
        display.innerText = display.innerText.slice(0, -1);
        return
    }

    if (tecla === teclaIgual || tecla === 'Enter') {
        let expressao = display.innerText.replace(/ /g, '')
        display.innerText = eval(expressao)
        salvarOperacao(parametros=expressao, resultado=display.innerText)
        return;
    }

    if (!numeros.includes(tecla) && !teclasOperadores.includes(tecla) && tecla !== teclaIgual) {
        console.log('Tecla inválida: ' + tecla);
        return;
    }

    adicionaTecla(tecla);

}

function adicionaTecla(tecla) {
    display.innerText += ` ${tecla} `;
}