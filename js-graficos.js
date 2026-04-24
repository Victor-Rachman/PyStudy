async function verificar() {
    const log = await fetch("http://127.0.0.1:5000/status", {
        credentials: "include"
    });

    const log_json = await log.json()

    if(!log_json.logado) {
        window.location.href = "http://127.0.0.1:5500/index.html"
    }
}

function criarGraf(dias, tempo) {
    const ctx = document.getElementById('grap').getContext('2d')

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dias,
            datasets: [{
                label: "Tempo de estudo Matemática",
                data: tempo,
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,  
            maintainAspectRatio: false,
            scales: {
                y:{
                    ticks:{
                        callback: function (value){
                            return value + " min"
                        }
                    }
                }
            }
        }
    })
}

async function tratarDados() {
    const res = await fetch("http://127.0.0.1:5000/mostra-dados", {
        credentials: "include"
    });

    const dados = await res.json()

    console.log(dados)

    const mat = dados.mat || []
    const dias_m = mat.map(item => {
        const d = new Date(item.dia)
        return d.toLocaleDateString('pt-br')
    })
    const tempo_m = mat.map(item => item.tempo)

    console.log(dias_m, tempo_m)

    criarGraf(dias_m, tempo_m)

    document.getElementById('gra').innerText = JSON.stringify(dados)
}

async function iniciar() {
    await verificar()
    await tratarDados()
}

iniciar()