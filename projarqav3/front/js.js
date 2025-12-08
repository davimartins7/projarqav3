function cadastrar() {
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const ano = document.getElementById("ano").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const quantidadeTotal = document.getElementById("quantidadeTotal").value.trim();
    const quantidadeDisponivel = document.getElementById("quantidadeDisponivel").value.trim();

    // --- VALIDAÇÃO ---
    if (!titulo || !autor || !ano || !genero || !quantidadeTotal || !quantidadeDisponivel) {
        document.getElementById("msg").innerHTML = "Preencha todos os campos!";
        document.getElementById("msg").style.color = "red";
        return; // impede o cadastro
    }

    // --- MANTÉM SEU CÓDIGO ORIGINAL ABAIXO ---
    const livro = {
        titulo,
        autor,
        ano: parseInt(ano),
        genero,
        quantidadeTotal: parseInt(quantidadeTotal),
        quantidadeDisponivel: parseInt(quantidadeDisponivel)
    };

    fetch("http://localhost:8081/livros", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(livro)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("msg").innerHTML = "Livro cadastrado com sucesso!";
        document.getElementById("msg").style.color = "green";
    })
    .catch(err => {
        document.getElementById("msg").innerHTML = "Erro ao cadastrar livro!";
        document.getElementById("msg").style.color = "red";
        console.error(err);
    });
}
function listar() {
    fetch("http://localhost:8081/livros")
        .then(res => res.json())
        .then(livros => {
            const lista = document.getElementById("listaLivros");
            lista.innerHTML = "<h3>Livros Cadastrados</h3>";

            livros.forEach(livro => {
                lista.innerHTML += `
                    <div class="itemLivro">
                        <div>
                            <strong>ID:</strong> ${livro.id} |
                            Título: ${livro.titulo} - Autor: ${livro.autor} - Ano: (${livro.ano}) - Gênero: ${livro.genero} - Disponível: ${livro.quantidadeDisponivel}/${livro.quantidadeTotal}
                        </div>

                        <div>
                            <button class="btnAtualizar" onclick="atualizar(${livro.id})">Atualizar</button>
                            <button class="btnDeletar" onclick="deleteLivro(${livro.id})">Deletar</button>
                        </div>
                    </div>
                `;
            });
        });
}

function atualizar(id) {
    fetch("http://localhost:8081/livros/" + id)
        .then(res => res.json())
        .then(livro => {

            const novoTitulo = prompt("Novo título:", livro.titulo);
            if (novoTitulo === null) return;

            const novoAutor = prompt("Novo autor:", livro.autor);
            if (novoAutor === null) return;

            const novoAno = prompt("Novo ano:", livro.ano);
            if (novoAno === null) return;

            const novoGenero = prompt("Novo gênero:", livro.genero);
            if (novoGenero === null) return;

            const novaQtdTotal = prompt("Quantidade total:", livro.quantidadeTotal);
            if (novaQtdTotal === null) return;

            const novaQtdDisp = prompt("Quantidade disponível:", livro.quantidadeDisponivel);
            if (novaQtdDisp === null) return;

            const livroAtualizado = {
                titulo: novoTitulo,
                autor: novoAutor,
                ano: parseInt(novoAno),
                genero: novoGenero,
                quantidadeTotal: parseInt(novaQtdTotal),
                quantidadeDisponivel: parseInt(novaQtdDisp)
            };

            fetch("http://localhost:8081/livros/" + id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(livroAtualizado)
            })
            .then(res => res.json())
            .then(data => {
                alert("Livro atualizado com sucesso!");
                listar();
            });
        });
}

function deleteLivro(id) {
    if (!confirm("Tem certeza que deseja deletar este livro?")) return;

    fetch("http://localhost:8081/livros/" + id, {
        method: "DELETE"
    })
    .then(res => {
        if (res.ok) {
            alert("Livro deletado!");
            listar();
        } else {
            alert("Erro ao deletar livro.");
        }
    })
    .catch(err => {
        alert("Erro ao conectar ao servidor.");
        console.error(err);
    });
}
