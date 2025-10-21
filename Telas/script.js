const ip = '192.168.1.27'

async function carregarLugares() {
  try {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const cidade = urlParams.get('cidade')

    // Faz a requisição para a API
    const response = await fetch(`http://${ip}:3000/cidades/${cidade}`); 
    if (!response.ok) {
    return('Erro ao buscar os lugares');
    }
    const lugares = await response.json();
    const container = document.getElementById('container-lugares');
    
    container.innerHTML = ""; // limpa antes de renderizar

    // Percorre os lugares e cria os cards
    lugares.forEach(lugar => {
      const box = document.createElement('div');
      box.classList.add('box');

      box.innerHTML = `
        <img
        src=${lugar.imagem}
        alt="Vai que é bom"
        class="logo-img"
      />
        <h2>${lugar.nome_local}</h2>
         <h3>${lugar.categoria}</h3>
      `;

      const link = document.createElement('a'); // corrigido
      link.classList.add('todoslugares');
      link.addEventListener('click', ()=>{
        window.location.href = `../detalhesLocal/detalhes.html?id=${lugar.id_local}`;
      })
      
      link.appendChild(box);
      container.appendChild(link);

    });


  } catch (error) {
    console.error("Erro ao carregar os lugares:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarLugares);