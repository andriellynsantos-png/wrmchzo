document.addEventListener("DOMContentLoaded", function () {
  const views = document.getElementById("views");

  if (views) {
    let numeroAtual = parseInt(localStorage.getItem("viewsWrmLink")) || 248;
    numeroAtual++;
    views.textContent = numeroAtual;
    localStorage.setItem("viewsWrmLink", numeroAtual);
  }

  const temaSalvo = localStorage.getItem("temaWrmLink");

  if (temaSalvo) {
    aplicarTema(temaSalvo);
  }

  const inputFoto = document.getElementById("inputFoto");
  const fotoPerfil = document.getElementById("fotoPerfil");

  if (inputFoto && fotoPerfil) {
    const fotoSalva = localStorage.getItem("fotoPerfil");

    if (fotoSalva) {
      fotoPerfil.src = fotoSalva;
    }

    inputFoto.addEventListener("change", function (event) {
      const arquivo = event.target.files[0];

      if (arquivo) {
        const leitor = new FileReader();

        leitor.onload = function (e) {
          fotoPerfil.src = e.target.result;
          localStorage.setItem("fotoPerfil", e.target.result);
        };

        leitor.readAsDataURL(arquivo);
      }
    });
  }
});

function trocarTema(tema) {
  localStorage.setItem("temaWrmLink", tema);
  aplicarTema(tema);
}

function aplicarTema(tema) {
  const banner = document.querySelector(".perfil-banner");
  const body = document.body;

  if (!banner) return;

  if (tema === "rosa") {
    banner.style.background = "linear-gradient(135deg, #ec4899, #f472b6, #fb7185)";
    body.style.background = "linear-gradient(135deg, #4a044e, #831843)";
  } else if (tema === "verde") {
    banner.style.background = "linear-gradient(135deg, #10b981, #22c55e, #65a30d)";
    body.style.background = "linear-gradient(135deg, #052e16, #14532d)";
  } else if (tema === "roxo") {
    banner.style.background = "linear-gradient(135deg, #7c3aed, #8b5cf6, #a855f7)";
    body.style.background = "linear-gradient(135deg, #1e1b4b, #312e81)";
  } else {
    banner.style.background = "linear-gradient(135deg, #020617, #0f172a, #1e3a8a, #2563eb)";
    body.style.background = "linear-gradient(135deg, #0f172a, #1e1b4b)";
  }
}

function filtrarAlunos() {
  const pesquisaInput = document.getElementById("pesquisa");
  const filtroTurmaInput = document.getElementById("filtroTurma");
  const filtroAnoInput = document.getElementById("filtroAno");
  const alunos = document.querySelectorAll(".aluno-card");

  if (!pesquisaInput || !filtroTurmaInput || !filtroAnoInput) return;

  const pesquisa = pesquisaInput.value.toLowerCase();
  const turma = filtroTurmaInput.value;
  const ano = filtroAnoInput.value;

  alunos.forEach(aluno => {
    const nomeAluno = aluno.dataset.nome.toLowerCase();
    const turmaAluno = aluno.dataset.turma;
    const anoAluno = aluno.dataset.ano;

    const combinaNome = nomeAluno.includes(pesquisa);
    const combinaTurma = turma === "" || turmaAluno === turma;
    const combinaAno = ano === "" || anoAluno === ano;

    if (combinaNome && combinaTurma && combinaAno) {
      aluno.style.display = "block";
    } else {
      aluno.style.display = "none";
    }
  });
}

function curtirPost(botao) {
  let texto = botao.innerText;
  let numero = parseInt(texto.split(" ")[1]);

  numero++;

  botao.innerText = `❤ ${numero}`;
}

function mostrarComentarios(botao) {
  const comentarios = botao.parentElement.nextElementSibling;

  if (comentarios.style.display === "none") {
    comentarios.style.display = "block";
  } else {
    comentarios.style.display = "none";
  }
}

function comentarPost(botao) {
  const container = botao.parentElement;
  const input = container.querySelector(".input-comentario");
  const lista = container.querySelector(".lista-comentarios");

  if (input.value.trim() === "") return;

  const novoComentario = document.createElement("p");
  novoComentario.innerText = input.value;

  lista.appendChild(novoComentario);

  input.value = "";
}

function criarPostagem() {
  const texto = document.getElementById("textoPostagem").value.trim();
  const imagemInput = document.getElementById("imagemPostagem");
  const lista = document.getElementById("listaPostagens");

  if (texto === "" && imagemInput.files.length === 0) {
    alert("Escreva algo ou escolha uma imagem para publicar.");
    return;
  }

  const novoPost = document.createElement("div");
  novoPost.className = "post-card";

  let imagemHTML = "";

  if (imagemInput.files.length > 0) {
    const arquivo = imagemInput.files[0];
    const imagemURL = URL.createObjectURL(arquivo);
    imagemHTML = `<img src="${imagemURL}" alt="Imagem da postagem" class="post-imagem">`;
  }

  novoPost.innerHTML = `
    <div class="post-topo-card">
      <img src="img/minhafoto.jpg" alt="Foto do usuário">
      <div>
        <h3>Andriellyn</h3>
        <span>2º Ano • DS</span>
      </div>
    </div>

    <p class="post-texto">${texto}</p>
    ${imagemHTML}

    <div class="post-acoes">
      <button onclick="curtirPost(this)">❤ 0</button>
      <button onclick="mostrarComentarios(this)">💬 Comentários</button>
    </div>

    <div class="comentarios" style="display: none;">
      <div class="lista-comentarios"></div>
      <input type="text" placeholder="Escreva um comentário..." class="input-comentario">
      <button onclick="comentarPost(this)">Enviar</button>
    </div>
  `;

  lista.prepend(novoPost);

  document.getElementById("textoPostagem").value = "";
  imagemInput.value = "";
}