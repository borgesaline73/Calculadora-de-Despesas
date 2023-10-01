document.addEventListener("DOMContentLoaded", function(){
const despesas = [];
document.getElementById("adicionarDespesas").addEventListener("click", recebeDespesas);
document.getElementById("calculaTotal").addEventListener("click", function() {CalculaTotal(false)});
document.getElementById("caculaMedia").addEventListener("click", function() {CalculaMedia(false)});
document.getElementById("despesaMaisAlta").addEventListener("click", function() {DespesamaisAlta(false)});
document.getElementById("verDespesas").addEventListener("click", VerDespesas);
document.getElementById("apagarIndividualmente").addEventListener("click", deletarIndice);
document.getElementById("apagarDespesas").addEventListener("click", apagarDespesas);
document.getElementById("sair").addEventListener("click", sair);
document.getElementById("abrirPopup").addEventListener("click", abrirPopup);
document.getElementById("fecharPopup").addEventListener("click", fecharPopup);

// Referência global para o gráfico
let grafico = null;



//Função para adicionar despesas
function recebeDespesas() {
    const vlr = parseFloat(prompt("Digite sua despesa"));

    if (isNaN(vlr) || vlr <= 0) {
        alert("ATENÇÃO: VALOR INVÁLIDO! DIGITE UM VALOR ACIMA VÁLIDO E MAIOR QUE 0!!");
    } else {
        despesas.push(vlr);
        alert("DESPESA ADICIONADA COM SUCESSO");
    }
}

// Função de calculo do total de despesas
function CalculaTotal(is_internal) {
    let total;
    if (despesas.length === 0) {
        if (!is_internal) {
            alert("NENHUMA DESPESSA FOI REGISTRADA");
        }
    } else {
        const soma = despesas.reduce((accumulator, current) => accumulator + current, 0); // Metodo que soma um array passando por parametro a valor anterior e adicionando ao próximo
        total=soma;
        if (!is_internal) {
            alert(`O total das despesas é: R$ ${total.toFixed(2)}`); // Concatena a variavel e fixa o valor em duas casas após a virgula
        }
        return total;
    }

}

// função para encontrar a média das despesas

function CalculaMedia(is_internal) {
    let media;
    if (despesas.length === 0) {
        if (!is_internal) {
            alert("NENHUMA DESPESSA FOI REGISTRADA");
        }
    } else {
        const vlrTotal = despesas.reduce((accumulator, current) => accumulator + current, 0);
        media = vlrTotal / despesas.length;
        if (!is_internal) {
            alert(`A média das despesas é: R$ ${media.toFixed(2)}`);
        }
    }
    return media;
}

//Função para achar a despesa mais alta
function DespesamaisAlta(is_internal) { //variavel is_internal para identificar se a função esta sendo chamada pelo botão do grafico, para não exibir os alertas
    console.log('aqui');
    console.log(is_internal);
    if (despesas.length === 0) {
        if (!is_internal) {
            alert("NENHUMA DESPESSA FOI REGISTRADA");
        }
    } else {
        let maiorValor = despesas[0];

        for (let i = 1; i < despesas.length; i++) {
            if (despesas[i] > maiorValor) {
                maiorValor = despesas[i];
            }
        }
        if (!is_internal) {
            alert(`A despesa mais alta é: R$ ${maiorValor.toFixed(2)}`);
        }

        return maiorValor;
    }
}

// Função para listar as despesas

function VerDespesas() {
    if (despesas.length === 0) {
      alert("NENHUMA DESPESA FOI REGISTRADA");
    } else {
      let listaDespesas = "LISTA DE DESPESAS:\n";
      
      despesas.forEach((vlr, index) => {
        listaDespesas += `${index + 1}. R$ ${vlr.toFixed(2)}\n`;// pega o valor atual do array e o indice. Cria uma numeração sequencial a ser mostrado no alert começando do numnero 1.
      });
      
      alert(listaDespesas); // Lista as despesas
    }
  }

  // Função para apagar despesa pelo indice do array
  function deletarIndice(){
    const apagar = parseInt(prompt("Digite a despesa que deseja apagar:")) - 1; // Pega a despesa que o usuário digito e subtrai por 1 para pegar a posição correta do array
    if (despesas.length === 0) {
        alert("NENHUMA DESPESA FOI REGISTRADA");
      }else if(isNaN(apagar) || apagar < 0 || apagar >= despesas.length) {
        alert("DESPESA INVÁLIDA, DIGITE NOVAMENTE");
      }else{
        despesas.splice(apagar, 1);
        alert("DESPESA APAGADA COM SUCESSO!!") //Remove apenas 1 elemento do array
      }
  }

  // Função para apagar todas as despesas
  function apagarDespesas(){
    mensagemUsuario = confirm("TEM CERTEZA QUE DESEJA APAGAR TODAS AS DESPESAS?");
    if (despesas.length === 0) {
        alert("NENHUMA DESPESA FOI REGISTRADA");
    }else if(mensagemUsuario == true){
        for(let i = despesas.length; i > 0; i--){
            despesas.pop();
        }
        alert("TODAS AS DESPESAS FORA APAGADAS COM SUCESSO")
        
    }
}

    // Função sair
    function sair() {
        sairCalculadora = confirm("DESEJA SAIR DA CALCULADORA DE DESPESAS??");
        if(sairCalculadora){
            alert("CALCULADORA ENCERRADA COM SUCESSO, VOLTE SEMPRE!!");
            window.close();
        } // Essa função encerra a calculadora e fecha a janela do navegaodr

    }

    function abrirPopup() {
        console.log(despesas);
        //Pega o id da DIV do popup
        document.getElementById('meuPopup').style.display = 'block';
        //Verifica se o gráfico já está criado, se sim, destroi.
        if (grafico) {
            grafico.destroy();
        }
        //cria o gráfico
        var ctx = document.getElementById('grafico').getContext('2d');//'getContext('2d'), indica um contexto em 2d que permiti desenhar formas em um plano bidimencional'
            grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total Despesas', 'Média Despesas', 'Maior Despesa'],
                datasets: [{
                    data: [CalculaTotal(true), CalculaMedia(true), DespesamaisAlta(true)],
                    backgroundColor: [
                        'rgba(50, 168, 82, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(50, 168, 82, 0, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }

    function fecharPopup() {
        document.getElementById('meuPopup').style.display = 'none';
    }
})
