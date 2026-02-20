const form = document.getElementById("formChamado");
const lista = document.getElementById("listaChamados");

let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

function salvarLocalStorage() {
  localStorage.setItem("chamados", JSON.stringify(chamados));
}

function renderizarChamados() {
  lista.innerHTML = "";
  chamados.forEach((chamado, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${chamado.nome}</strong> - ${chamado.tipo}<br>
      ${chamado.descricao}
      <br>
      <button onclick="removerChamado(${index})">Resolver</button>
    `;
    lista.appendChild(li);
  });
}

function removerChamado(index) {
  chamados.splice(index, 1);
  salvarLocalStorage();
  renderizarChamados();
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const tipo = document.getElementById("tipo").value;
  const descricao = document.getElementById("descricao").value;

  chamados.push({ nome, tipo, descricao });
  salvarLocalStorage();
  renderizarChamados();

  form.reset();
});

renderizarChamados();
