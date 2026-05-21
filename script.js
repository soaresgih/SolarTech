<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {

    const calcularBtn = document.getElementById("calcularBtn");

    calcularBtn.addEventListener("click", function () {

        // INPUTS
        const contas = document.querySelectorAll(".conta");
        const kwhs = document.querySelectorAll(".kwh");

        // DDD
        const ddd = document.getElementById("ddd").value;

        // VARIÁVEIS
        let somaValor = 0;
        let somaKwh = 0;
        let mesesPreenchidos = 0;

        // TARIFA MÉDIA
        const tarifa = 0.95;

        // LOOP
        contas.forEach((conta, index) => {

            const valor = parseFloat(conta.value);
            const kwh = parseFloat(kwhs[index].value);

            // SOMA VALORES
            if (!isNaN(valor) && valor > 0) {
                somaValor += valor;
            }

            // USA KWH INFORMADO
            if (!isNaN(kwh) && kwh > 0) {

                somaKwh += kwh;
                mesesPreenchidos++;

            }

            // SE NÃO INFORMAR KWH
            else if (!isNaN(valor) && valor > 0) {

                somaKwh += valor / tarifa;
                mesesPreenchidos++;

            }

        });

        // VALIDAÇÃO
        if (mesesPreenchidos === 0) {

            alert("Preencha pelo menos uma conta.");

            return;
        }

        // MÉDIA MENSAL
        const mediaMensal = somaValor / mesesPreenchidos;

        // CONSUMO MÉDIO
        const consumo = somaKwh / mesesPreenchidos;

        // GERAÇÃO REGIONAL
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

        // PLACAS
        const placas = Math.ceil(consumo / geracaoRegional);

        // ÁREA
        const area = placas * 2;

        // ECONOMIA
        const economiaMensal = mediaMensal * 0.9;

        const economiaAnual = economiaMensal * 12;

        // CUSTO SISTEMA
        const custoSistema = placas * 2500;

        // PAYBACK
        const paybackMeses = custoSistema / economiaMensal;

        const anos = Math.floor(paybackMeses / 12);

        const meses = Math.round(paybackMeses % 12);

        // RESULTADOS
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

=======
document.addEventListener("DOMContentLoaded", function () {

 // botão de calcular
  const calcularBtn = document.getElementById("calcularBtn");

  calcularBtn.addEventListener("click", function () {

    // coleta dos valores dos campos de conta
    const contas = document.querySelectorAll(".contaMes");

    let soma = 0;
    let mesesPreenchidos = 0;

    contas.forEach(function (campo) {

      const valor = parseFloat(campo.value);

      if (!isNaN(valor) && valor > 0) {
        soma += valor;
        mesesPreenchidos++;
      }

    });

   // validação para garantir que pelo menos um mês foi preenchido e a região selecionada
    const regiao = document.getElementById("regiao").value;

    if (mesesPreenchidos === 0 || !regiao) {
      alert("Preencha ao menos uma conta e selecione a região.");
      return;
    }

    // média mensal
    const mediaMensal = soma / mesesPreenchidos;

// tarifa de energia
    const tarifa = 0.95;

// consumo mensal
    const consumo = mediaMensal / tarifa;

   // geração regional
    const geracaoRegional = parseFloat(regiao);

    // quantidade de placas
    const placas = Math.ceil(consumo / geracaoRegional);

    // area necessária
    const area = placas * 2;

   
    // economia mensal
    const economiaMensal = mediaMensal * 0.9;

    const economiaAnual = economiaMensal * 12;

   // custo do sistema
    const custoSistema = placas * 2500;

   // payback
    const paybackMeses = custoSistema / economiaMensal;

    const anos = Math.floor(paybackMeses / 12);

    const meses = Math.round(paybackMeses % 12);

    // resultados
    document.getElementById("mediaResultado").textContent =
      `R$ ${mediaMensal.toFixed(2)}`;

    document.getElementById("consumoResultado").textContent =
      `${consumo.toFixed(0)} kWh/mês`;

    document.getElementById("placasResultado").textContent =
      `${placas} placas`;

    document.getElementById("areaResultado").textContent =
      `${area} m²`;

    document.getElementById("economiaResultado").textContent =
      `R$ ${economiaMensal.toFixed(2)}`;

    document.getElementById("economiaAnualResultado").textContent =
      `R$ ${economiaAnual.toFixed(2)}`;

    document.getElementById("custoResultado").textContent =
      `R$ ${custoSistema.toFixed(2)}`;

    document.getElementById("paybackResultado").textContent =
      `${anos} anos e ${meses} meses`;

    // viabilidade
    const statusResultado = document.getElementById("statusResultado");

    if (paybackMeses <= 60) {

      statusResultado.style.background = "#dcfce7";
      statusResultado.style.color = "#166534";

      statusResultado.textContent =
        "Alta viabilidade para energia solar";

    }

    else if (paybackMeses <= 96) {

      statusResultado.style.background = "#fef9c3";
      statusResultado.style.color = "#854d0e";

      statusResultado.textContent =
        "Viabilidade moderada";

    }

    else {

      statusResultado.style.background = "#fee2e2";
      statusResultado.style.color = "#991b1b";

      statusResultado.textContent =
        "Retorno financeiro mais longo";

    }

  });

>>>>>>> d23ee81a3e30ab89121dc3c51b2b766b1839b992
});