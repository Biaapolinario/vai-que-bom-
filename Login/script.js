const entrar = document.querySelector('#entrar');

entrar.addEventListener('click', async function (event) {
  event.preventDefault();

  const nome = document.querySelector('#d1').value;
  const senha = document.querySelector('#d2').value;

  if (nome === "" || senha === "") {
    alert("Por favor, preencha todos os campos");
    return;
  }

  try {
    const resposta = await fetch(`http://192.168.1.5:3000/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, senha })
    });

    const usuario = await resposta.json();
    console.log(usuario)
    alert('');
    if (resposta.status == 200) {
      // salva os dados do usuário
      localStorage.setItem("idUsuario", usuario.id_usuario);
      localStorage.setItem("nome", usuario.nome_usuario);
      localStorage.setItem("email", usuario.email);
      localStorage.setItem("descricao", usuario.descricao || "");
      
      // redireciona conforme a função
      if (usuario.funcao === "admin") {
        window.location.href = "../Homepege/index.html";
      } else {
        window.location.href = "../Homepage/index.html";
      }
    } else {
      alert("Usuário ou senha incorretos!");
    }

  } catch (erro) {
    console.error("Erro no login:", erro);
    alert("Erro ao tentar fazer login");
  }
});
