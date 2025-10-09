const entrar = document.querySelector('#entrar');

entrar.addEventListener('click', async function (event) {
  event.preventDefault(); // impede recarregar a página

  const nome = document.querySelector('#nome').value;
  const email = document.querySelector('#email').value;
  const senha = document.querySelector('#senha').value;

  if (nome === "" || email === "" || senha === "") {
    alert("Por favor, preencha todos os campos");
    console.log("preencha");
    return;
  }

  try {
    const resposta = await fetch("http://192.168.1.5:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome,
        senha: senha,
        email: email
      })
    });

    if (resposta.status === 201) {
      const dados = await resposta.json();
      alert("Cadastrado com sucesso!");

      console.log("Usuário cadastrado:", dados);

      // salva o ID e nome do usuário no localStorage
      localStorage.setItem("idUsuario", dados.id);
      localStorage.setItem("nomeUsuario", dados.nome);
      localStorage.setItem("emailUsuario", dados.email);

      // redireciona para a página de perfil
      window.location.href = "../Login/index.html";
    } else {
      alert("Erro ao cadastrar");
      console.log("Erro no cadastro");
    }
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    alert("Erro ao conectar com o servidor.");
  }
});
