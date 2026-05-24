document.addEventListener("DOMContentLoaded", function () {

    // botão calcular

    const calcularBtn =
        document.getElementById("calcularBtn");

    // resultado

    const resultadoBox =
        document.getElementById("resultadoBox");

    // inputs

    const contas =
        document.querySelectorAll(".conta");

    const kwhs =
        document.querySelectorAll(".kwh");

    // ddd

    const dddSelect =
        document.getElementById("ddd");

    // gráfico

    const ctx =
        document.getElementById("graficoConsumo");

    // criar gráfico

    const grafico =
        new Chart(ctx, {

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

                    // consumo

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

                    // sistema ideal

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

                    // valor conta

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

                    // eixo x

                    x: {

                        ticks: {

                            color: "#d1d5db"

                        },

                        grid: {

                            color:
                                "rgba(255,255,255,0.05)"

                        }

                    },

                    // eixo consumo

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

                    // eixo valor

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

    // função principal

    function calcularSimulacao() {

        // variáveis

        let somaValor = 0;

        let somaKwh = 0;

        let mesesPreenchidos = 0;

        let consumoMensal = [];

        let valoresMensais = [];

        // tarifa média

        const tarifa = 0.95;

        // ddd

        const ddd =
            dddSelect.value;

        // loop inputs

        contas.forEach((conta, index) => {

            const valor =
                parseFloat(conta.value);

            const kwh =
                parseFloat(kwhs[index].value);

            // valor conta

            if (!isNaN(valor) && valor > 0) {

                somaValor += valor;

                valoresMensais.push(valor);

            }

            else {

                valoresMensais.push(0);

            }

            // consumo kwh

            if (!isNaN(kwh) && kwh > 0) {

                somaKwh += kwh;

                consumoMensal.push(kwh);

                mesesPreenchidos++;

            }

            // calcular consumo pela tarifa

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

        // validar preenchimento

        if (mesesPreenchidos === 0) {

            resultadoBox.style.display =
                "none";

            grafico.data.datasets[0].data = [];

            grafico.data.datasets[1].data = [];

            grafico.data.datasets[2].data = [];

            grafico.update();

            return;

        }

        // média mensal

        const mediaMensal =
            somaValor / mesesPreenchidos;

        // consumo médio

        const consumo =
            somaKwh / mesesPreenchidos;

        // geração regional

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

        // placas

        const placas =
            Math.ceil(
                consumo / geracaoRegional
            );

        // área

        const area =
            placas * 2;

        // economia mensal

        const economiaMensal =
            mediaMensal * 0.9;

        // economia anual

        const economiaAnual =
            economiaMensal * 12;

        // custo sistema

        const custoSistema =
            placas * 2500;

        // payback

        const paybackMeses =
            custoSistema / economiaMensal;

        const anos =
            Math.floor(paybackMeses / 12);

        const meses =
            Math.round(paybackMeses % 12);

        // formatar moeda

        const formatarMoeda =
            (valor) => {

                return valor.toLocaleString(
                    "pt-BR",
                    {

                        minimumFractionDigits: 2,

                        maximumFractionDigits: 2

                    }
                );

            };

        // resultados

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

        // mostrar resultados

        resultadoBox.style.display =
            "block";

        // linha sistema ideal

        const sistemaIdeal =
            Array(12).fill(consumo);

        // atualizar gráfico

        grafico.data.datasets[0].data =
            consumoMensal;

        grafico.data.datasets[1].data =
            sistemaIdeal;

        grafico.data.datasets[2].data =
            valoresMensais;

        grafico.update();

    }

    // botão calcular

    calcularBtn.addEventListener(
        "click",
        calcularSimulacao
    );

    // atualização dinâmica inputs conta

    contas.forEach((input) => {

        input.addEventListener(
            "input",
            calcularSimulacao
        );

    });

    // atualização dinâmica inputs kwh

    kwhs.forEach((input) => {

        input.addEventListener(
            "input",
            calcularSimulacao
        );

    });

    // atualização dinâmica ddd

    dddSelect.addEventListener(
        "change",
        calcularSimulacao
    );

});