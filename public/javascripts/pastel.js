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
