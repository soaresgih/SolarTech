document.addEventListener("DOMContentLoaded", function () {

    const calcularBtn = document.getElementById("calcularBtn");

    calcularBtn.addEventListener("click", function () {

        // inputs
        const contas = document.querySelectorAll(".conta");
        const kwhs = document.querySelectorAll(".kwh");

        // DDD
        const ddd = document.getElementById("ddd").value;

        // variáveis para cálculos
        let somaValor = 0;
        let somaKwh = 0;
        let mesesPreenchidos = 0;

        // tarifa média para cálculo de kWh quando não informado (R$ 0,95 por kWh)
        const tarifa = 0.95;

        // LOOP
        contas.forEach((conta, index) => {

            const valor = parseFloat(conta.value);
            const kwh = parseFloat(kwhs[index].value);

            // soma valores informados
            if (!isNaN(valor) && valor > 0) {
                somaValor += valor;
            }

            // usa kWh informado ou calcula a partir do valor e tarifa
            if (!isNaN(kwh) && kwh > 0) {

                somaKwh += kwh;
                mesesPreenchidos++;

            }

            // se não informou kWh, mas informou valor, calcula o kWh a partir do valor e tarifa
            else if (!isNaN(valor) && valor > 0) {

                somaKwh += valor / tarifa;
                mesesPreenchidos++;

            }

        });

        // valida se o usuário preencheu pelo menos uma conta
        if (mesesPreenchidos === 0) {

            alert("Preencha pelo menos uma conta.");

            return;
        }

        // média mensal
        const mediaMensal = somaValor / mesesPreenchidos;

        // consumo médio mensal em kWh
        const consumo = somaKwh / mesesPreenchidos;

        // geração regional média por placa (kWh/mês) - valores aproximados para o estado de São Paulo
        let geracaoRegional = 35;

        if (ddd === "11") {
            geracaoRegional = 35;
        }

        else if (ddd === "12") {
            geracaoRegional = 36;
        }

        else if (ddd === "13") {
            geracaoRegional = 35;
        }

        else if (ddd === "14") {
            geracaoRegional = 34;
        }

        else if (ddd === "15") {
            geracaoRegional = 34;
        }

        else if (ddd === "16") {
            geracaoRegional = 36;
        }

        else if (ddd === "17") {
            geracaoRegional = 35;
        }

        else if (ddd === "18") {
            geracaoRegional = 34;
        }

        else if (ddd === "19") {
            geracaoRegional = 36;
        }

        // placas necessárias
        const placas = Math.ceil(consumo / geracaoRegional);

        // área necessária (considerando 2 m² por placa)
        const area = placas * 2;

        // economia mensal (considerando que o sistema gera 90% do consumo)
        const economiaMensal = mediaMensal * 0.9;

        const economiaAnual = economiaMensal * 12;

        // custo do sistema (considerando R$ 2500 por placa)
        const custoSistema = placas * 2500;

        // PAYBACK
        const paybackMeses = custoSistema / economiaMensal;

        const anos = Math.floor(paybackMeses / 12);

        const meses = Math.round(paybackMeses % 12);

        // resultados
        document.getElementById("mediaConta").textContent =
            `R$ ${mediaMensal.toFixed(2)}`;

        document.getElementById("consumoMedio").textContent =
            `${consumo.toFixed(2)} kWh/mês`;

        document.getElementById("placas").textContent =
            `${placas} placas`;

        document.getElementById("area").textContent =
            `${area} m²`;

        document.getElementById("economiaMensal").textContent =
            `R$ ${economiaMensal.toFixed(2)}`;

        document.getElementById("economiaAnual").textContent =
            `R$ ${economiaAnual.toFixed(2)}`;

        document.getElementById("custoSistema").textContent =
            `R$ ${custoSistema.toFixed(2)}`;

        document.getElementById("payback").textContent =
            `${anos} anos e ${meses} meses`;

    });

});