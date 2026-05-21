document.addEventListener("DOMContentLoaded", function () {

    const calcularBtn = document.getElementById("calcularBtn");

    calcularBtn.addEventListener("click", function () {

      // seleciona as contas e kWhs //
        const contas = document.querySelectorAll(".conta");
        const kwhs = document.querySelectorAll(".kwh");

        // DDD
        const ddd = document.getElementById("ddd").value;

        // validação de DDD //

        if (!ddd) {

            alert("Selecione um DDD.");

            return;
        }

        // variáveis para cálculos //

        let somaValor = 0;
        let somaKwh = 0;
        let mesesPreenchidos = 0;

        // tarifa média
        const tarifa = 0.95;

     // loop para somar valores e kWh //

        contas.forEach((conta, index) => {

            const valor = parseFloat(conta.value);
            const kwh = parseFloat(kwhs[index].value);

            // soma valores
            if (!isNaN(valor) && valor > 0) {

                somaValor += valor;
            }

            // usa kWh informado
            if (!isNaN(kwh) && kwh > 0) {

                somaKwh += kwh;

                mesesPreenchidos++;
            }

            // calcula kWh automaticamente
            else if (!isNaN(valor) && valor > 0) {

                somaKwh += valor / tarifa;

                mesesPreenchidos++;
            }

        });

        // validação de preenchimento //

        if (mesesPreenchidos === 0) {

            alert("Preencha pelo menos uma conta.");

            return;
        }

       // média mensal //
        const mediaMensal = somaValor / mesesPreenchidos;

       // consumo médio mensal //

        const consumo = somaKwh / mesesPreenchidos;

        // geração regional // 

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

        // quantidade de placas //

        const placas = Math.ceil(consumo / geracaoRegional);

       // área necessária //

        const area = placas * 2.3;

       // economia mensal // 
        const economiaMensal = mediaMensal * 0.75;

        const economiaAnual = economiaMensal * 12;

        // custo do sistema //
        const custoSistema = placas * 1500;

        // payback //
        let paybackMeses = 0;

        if (economiaMensal > 0) {

            paybackMeses = custoSistema / economiaMensal;
        }

        const anos = Math.floor(paybackMeses / 12);

        const meses = Math.round(paybackMeses % 12);

        // resultados //

        document.getElementById("mediaConta").textContent 
            `R$ ${mediaMensal.toFixed(2)}`;

        document.getElementById("consumoMedio").textContent =
            `${consumo.toFixed(2)} kWh/mês`;

        document.getElementById("placas").textContent =
            `${placas} placas`;

        document.getElementById("area").textContent =
            `${area.toFixed(1)} m²`;

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