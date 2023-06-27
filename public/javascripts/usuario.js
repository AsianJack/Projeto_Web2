async function excluirUsuario() {
    await fetch(`/users/`, { method: "DELETE" })
        .then((response) => {
            window.location.href = "/logout";
        })
        .catch((error) => {
            console.error(error);
        });
}