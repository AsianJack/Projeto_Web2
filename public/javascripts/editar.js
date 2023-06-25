async function excluirPedido(id) {
    console.log(id);
    await fetch(`/pedidos/${id}`, { method: "DELETE" })
      .then((response) => {
        window.location.href = "/pedidos/pedidos";
      })
      .catch((error) => {
        console.error(error);
      });
  }