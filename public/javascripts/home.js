const editar = (id) => {
    window.location.href = `/pedidos/editarPedido/${id}`;
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
  
  
