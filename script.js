document.addEventListener("DOMContentLoaded", function () {

    // ELEMENTOS
    const calcularBtn =
        document.getElementById("calcularBtn");

    const resultadoBox =
        document.getElementById("resultadoBox");

    const contas =
        document.querySelectorAll(".conta");

    const kwhs =
        document.querySelectorAll(".kwh");

    const dddSelect =
        document.getElementById("ddd");

    // GRÁFICO
    const ctx =
        document.getElementById("graficoConsumo");

    let grafico = new Chart(ctx, {

        type: "line",

        data: {

            labels: [

                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez"

            ],

            datasets: [

                {

                    label: "Consumo (kWh)",

                    data: [],

                    borderColor: "#f4b400",

                    backgroundColor:
                        "rgba(244,180,0,0.12)",

                    borderWidth: 3,

                    tension: 0.4,

                    fill: true,

                    pointRadius: 4,

                    pointBackgroundColor:
                        "#f4b400",

                    yAxisID: "y"

                },

                {

                    label: "Sistema Ideal",

                    data: [],

                    borderColor: "#ffffff",

                    borderWidth: 2,

                    borderDash: [8, 6],

                    tension: 0.3,

                    fill: false,

                    pointRadius: 0,

                    yAxisID: "y"

                },

                {

                    label: "Valor da Conta (R$)",

                    data: [],

                    borderColor: "#38bdf8",

                    backgroundColor:
                        "rgba(56,189,248,0.10)",

                    borderWidth: 3,

                    tension: 0.4,

                    fill: false,

                    pointRadius: 4,

                    pointBackgroundColor:
                        "#38bdf8",

                    yAxisID: "y1"

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {

                mode: "index",

                intersect: false

            },

            plugins: {

                legend: {

                    position: "top",

                    labels: {

                        color: "#ffffff",

                        usePointStyle: true,

                        padding: 24,

                        font: {

                            family: "Inter",

                            size: 13,

                            weight: "600"

                        }

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#d1d5db"

                    },

                    grid: {

                        color:
                            "rgba(255,255,255,0.05)"

                    }

                },

                y: {

                    type: "linear",

                    position: "left",

                    beginAtZero: true,

                    ticks: {

                        color: "#f4b400"

                    },

                    grid: {

                        color:
                            "rgba(255,255,255,0.05)"

                    },

                    title: {

                        display: true,

                        text: "Consumo (kWh)",

                        color: "#f4b400"

                    }

                },

                y1: {

                    type: "linear",

                    position: "right",

                    beginAtZero: true,

                    ticks: {

                        color: "#38bdf8"

                    },

                    grid: {

                        drawOnChartArea: false

                    },

                    title: {

                        display: true,

                        text: "Valor da Conta (R$)",

                        color: "#38bdf8"

                    }

                }

            }

        }

    });

    // =================================================
    // FUNÇÃO PRINCIPAL
    // =================================================

    function calcularSimulacao() {

        let somaValor = 0;

        let somaKwh = 0;

        let mesesPreenchidos = 0;

        let consumoMensal = [];

        let valoresMensais = [];

        // tarifa média
        const tarifa = 0.95;

        // região
        const ddd =
            dddSelect.value;

        // LEITURA DOS INPUTS
        contas.forEach((conta, index) => {

            const valor =
                parseFloat(conta.value);

            const kwh =
                parseFloat(kwhs[index].value);

            // VALORES
            if (!isNaN(valor) && valor > 0) {

                somaValor += valor;

                valoresMensais.push(valor);

            }

            else {

                valoresMensais.push(0);

            }

            // KWH
            if (!isNaN(kwh) && kwh > 0) {

                somaKwh += kwh;

                consumoMensal.push(kwh);

                mesesPreenchidos++;

            }

            else if (!isNaN(valor) && valor > 0) {

                const consumoCalculado =
                    valor / tarifa;

                somaKwh += consumoCalculado;

                consumoMensal.push(consumoCalculado);

                mesesPreenchidos++;

            }

            else {

                consumoMensal.push(0);

            }

        });

        // VALIDAÇÃO
        if (mesesPreenchidos === 0) {

            resultadoBox.style.display =
                "none";

            grafico.data.datasets[0].data = [];

            grafico.data.datasets[1].data = [];

            grafico.data.datasets[2].data = [];

            grafico.update();

            return;
        }

        // MÉDIAS
        const mediaMensal =
            somaValor / mesesPreenchidos;

        const consumo =
            somaKwh / mesesPreenchidos;

        // GERAÇÃO REGIONAL
        let geracaoRegional = 55;

        if (ddd === "11") {

            geracaoRegional = 55;
        }

        else if (ddd === "12") {

            geracaoRegional = 56;
        }

        else if (ddd === "13") {

            geracaoRegional = 57;
        }

        else if (ddd === "14") {

            geracaoRegional = 54;
        }

        else if (ddd === "15") {

            geracaoRegional = 55;
        }

        else if (ddd === "16") {

            geracaoRegional = 56;
        }

        else if (ddd === "17") {

            geracaoRegional = 55;
        }

        else if (ddd === "18") {

            geracaoRegional = 54;
        }

        else if (ddd === "19") {

            geracaoRegional = 56;
        }

        // CÁLCULOS
        const placas =
            Math.ceil(
                consumo / geracaoRegional
            );

        const area =
            placas * 2;

        const economiaMensal =
            mediaMensal * 0.9;

        const economiaAnual =
            economiaMensal * 12;

        const custoSistema =
            placas * 2500;

        const paybackMeses =
            custoSistema / economiaMensal;

        const anos =
            Math.floor(paybackMeses / 12);

        const meses =
            Math.round(paybackMeses % 12);

        // FORMATAÇÃO BR
        const formatarMoeda = (valor) => {

            return valor.toLocaleString(
                "pt-BR",
                {

                    minimumFractionDigits: 2,

                    maximumFractionDigits: 2

                }
            );

        };

        // RESULTADOS
        document.getElementById("mediaConta")
            .textContent =
            `R$ ${formatarMoeda(mediaMensal)}`;

        document.getElementById("consumoMedio")
            .textContent =
            `${consumo.toFixed(2)} kWh`;

        document.getElementById("placas")
            .textContent =
            `${placas} placas`;

        document.getElementById("area")
            .textContent =
            `${area} m²`;

        document.getElementById("economiaMensal")
            .textContent =
            `R$ ${formatarMoeda(economiaMensal)}`;

        document.getElementById("economiaAnual")
            .textContent =
            `R$ ${formatarMoeda(economiaAnual)}`;

        document.getElementById("custoSistema")
            .textContent =
            `R$ ${formatarMoeda(custoSistema)}`;

        document.getElementById("payback")
            .textContent =
            `${anos} anos e ${meses} meses`;

        // MOSTRAR RESULTADOS
        resultadoBox.style.display =
            "block";

        // LINHA SISTEMA IDEAL
        const sistemaIdeal =
            Array(12).fill(consumo);

        // ATUALIZA GRÁFICO
        grafico.data.datasets[0].data =
            consumoMensal;

        grafico.data.datasets[1].data =
            sistemaIdeal;

        grafico.data.datasets[2].data =
            valoresMensais;

        grafico.update();

    }

    // BOTÃO
    calcularBtn.addEventListener(
        "click",
        calcularSimulacao
    );

    // INPUTS DINÂMICOS
    contas.forEach((input) => {

        input.addEventListener(
            "input",
            calcularSimulacao
        );

    });

    kwhs.forEach((input) => {

        input.addEventListener(
            "input",
            calcularSimulacao
        );

    });

    dddSelect.addEventListener(
        "change",
        calcularSimulacao
    );

});