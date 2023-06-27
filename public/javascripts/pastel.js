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
    const tabelaPedidos = document.getElementById("pedidos-table");
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
