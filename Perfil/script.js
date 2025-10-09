document.addEventListener("DOMContentLoaded", async () => {
  // === PEGAR DADOS DO USUÁRIO SALVO NO LOGIN ===
  const id = localStorage.getItem("idUsuario");
  const nomeLocal = localStorage.getItem("nome");
  const emailLocal = localStorage.getItem("email");

console.log(id, nomeLocal,emailLocal)
  const perfilDiv = document.getElementById("profile");
  perfilDiv.classList.add("infor");

  // === EXIBIR DADOS DO PERFIL ===
  try {
    const resposta = await fetch(`http://192.168.1.5:3000/usuario/${id}`);
    const dados = await resposta.json();

    perfilDiv.innerHTML = `
      <div class="perfil-topo">
        <img src="../img/avatar.png" class="avatar" alt="foto de perfil">
        <div class="dados">
          <h2>${dados.nome}</h2>
          <p>${dados.email}</p>
        </div>
      </div>
    `;
  } catch (erro) {
    console.warn("Erro ao buscar dados da API, usando localStorage:", erro);
    perfilDiv.innerHTML = `
      <div class="perfil-topo">
        <img src="../img/avatar.png" class="avatar" alt="foto de perfil">
        <div class="dados">
          <h2>${nomeLocal}</h2>
          <p>${emailLocal}</p>
        </div>
      </div>
    `;
  }

  // === SEÇÃO DE LUGARES ===
  const container = document.querySelector(".lugares-container");
  if (!container) return;

  const lugaresSalvos = JSON.parse(localStorage.getItem("lugares")) || [];

  // Se o usuário não tiver lugares salvos
  if (lugaresSalvos.length === 0) {
    container.innerHTML = `
      <div class="sem-lugares">
        <h2>🗺️ Meus Lugares</h2>
        <p>Você ainda não adicionou nenhum lugar</p>
        <div class="adicionar-lugar" id="btnAdicionar">
          <p>Clique aqui <span class="plus">+</span> para adicionar</p>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `<h2>🗺️ Meus Lugares</h2>`;
    lugaresSalvos.forEach(lugar => {
      const div = document.createElement("div");
      div.classList.add("lugar");
      div.innerHTML = `
        <div class="thumbnail">
          <h3>${lugar.nome}</h3>
          <p>${lugar.descricao}</p>
        </div>
      `;
      container.appendChild(div);
    });
    const addDiv = document.querySelector('#adicionar-lugar')
  
    addDiv.innerHTML = `<p>Clique aqui <span class="plus">+</span> para adicionar</p>`;
    container.appendChild(addDiv);
  }

  // === BOTÃO PARA ADICIONAR LUGAR ===
  const btnAdicionar = document.getElementById("btnAdicionar");
  if (btnAdicionar) {
    btnAdicionar.addEventListener("click", () => {
      window.location.href = "../Inserir/index.html";
    });
  }
});
