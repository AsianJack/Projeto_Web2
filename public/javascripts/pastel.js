
const editar = (id) => {
    window.location.href = `/pastel/editarPastel/${id}`;
}

async function excluirPastel(id, nome) {
    await fetch(`/pastel/${id}/${nome}`, { method: "DELETE" })
        .then((response) => {
            window.location.href = "/pastel/pastel";
        })
        .catch((error) => {
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const buscarInput = document.getElementById("buscar");
    const tabelaPedidos = document.getElementById("pedidos");
    const rows = tabelaPedidos.getElementsByTagName("tr");

    buscarInput.addEventListener("input", function () {
        const searchString = this.value.toLowerCase();

        for (const row of rows) {
            const pastel = row.querySelector(".pastel").textContent.toLowerCase();

            if (
                pastel.includes(searchString)
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    });

});

function exportToPdf() {
    const tabelaPedidos = document.getElementById("myTable");
    const rows = tabelaPedidos.getElementsByTagName("tr");
    const doc = new window.jspdf.jsPDF();
    let y = 20;
    const tableData = [];
    for (const row of rows) {
        const cells = row.getElementsByTagName("td");
        let includeCell = true;
        const rowData = [];
        if(cells.length!==0){
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const cellText = cell.textContent.trim();
                rowData.push(cellText);
            }

            if (includeCell) {
                tableData.push(rowData);
            }
        }
    }

    const columnWidths = [55, 40, 55, 35];

    doc.autoTable({
        startY: y,
        head: [["Número Pedido", "Pastel", "descricao", "Preço"]],
        body: tableData,
        columnStyles: {
            0: { cellWidth: columnWidths[0] },
            1: { cellWidth: columnWidths[1] },
            2: { cellWidth: columnWidths[2] },
            3: { cellWidth: columnWidths[3] },
        },
        didDrawPage: function (data) {
            doc.setPage(data.pageCount);
            y = data.cursor.y + 10;
        }
    });

    doc.save("Pastel.pdf");
}

// function exportToPdf() {
//     var ctx = document.getElementById('chartCanvas').getContext('2d');
//     var chart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
//             datasets: [{
//                 label: 'Vendas',
//                 data: [120, 150, 180, 90, 200],
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });

//     // Aguardar um atraso antes de converter o gráfico em uma imagem
//     setTimeout(function () {
//         // Convertendo o gráfico em uma imagem usando html2canvas
//         html2canvas(ctx.canvas).then(function (canvas) {
//             var imgData = canvas.toDataURL('image/png');

//             // Gerando o PDF com o gráfico usando jsPDF
//             const doc = new window.jspdf.jsPDF();
//             doc.addImage(imgData, 'PNG', 10, 10, 190, 100);
//             doc.save('grafico.pdf');
//         });
//     }, 1000);

// }

// function exportToPdf() {
//     const canvas = document.getElementById('pizzaChart');
//     const ctx = canvas.getContext('2d');
//     // Dados da tabela (porcentagem de cada fatia)
//     const data = {
//         labels: ['Fatia 1', 'Fatia 2', 'Fatia 3', 'Fatia 4'],
//         datasets: [{
//             data: [30, 20, 25, 25],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2']
//         }]
//     };

//     // Criação do gráfico
//     new Chart(ctx, {
//         type: 'pie',
//         data: data,
//         options: {
//             plugins: {
//                 legend: {
//                     labels: {
//                         font: {
//                             size: 26
//                         }
//                     }
//                 }
//             }
//         }
//     });

//     // Criação do PDF
//     html2canvas(ctx.canvas).then(function (canvas) {
//         const pdf = new window.jspdf.jsPDF();
//         const imgData = canvas.toDataURL('image/jpeg', 1.0);
//         pdf.addImage(imgData, 'JPEG', 10, 10, 100, 100); // Posição e tamanho da imagem no PDF
//         pdf.save('pizza_chart.pdf');
//     });
// }
