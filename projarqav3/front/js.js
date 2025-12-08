// A porta correta para o servidor Spring Boot é 8080, conforme configurado no application.properties
const API_BASE_URL = "http://localhost:8080/livros";

function cadastrar() {
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const ano = document.getElementById("ano").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const quantidadeTotal = document.getElementById("quantidadeTotal").value.trim();
    const quantidadeDisponivel = document.getElementById("quantidadeDisponivel").value.trim();

    if (!titulo || !autor || !ano || !genero || !quantidadeTotal || !quantidadeDisponivel) {
        document.getElementById("msg").innerHTML = "Preencha todos os campos!";
        document.getElementById("msg").style.color = "red";
        return;
    }

    const livro = {
        titulo,
        autor,
        ano: parseInt(ano),
        genero,
        quantidadeTotal: parseInt(quantidadeTotal),
        quantidadeDisponivel: parseInt(quantidadeDisponivel)
    };

    // CORREÇÃO: Porta alterada de 8081 para 8080
    fetch(API_BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(livro)
    })
    .then(res => {
        if (res.ok) return res.json();
        // Lidar com erros de servidor (ex: 500)
        throw new Error('Erro ao cadastrar livro no servidor: ' + res.status);
    })
    .then(data => {
        document.getElementById("msg").innerHTML = "Livro cadastrado com sucesso!";
        document.getElementById("msg").style.color = "green";
        listar();
    })
    .catch(err => {
        document.getElementById("msg").innerHTML = "Erro ao cadastrar livro!";
        document.getElementById("msg").style.color = "red";
        console.error("Erro na função cadastrar:", err);
    });
}

function listar() {
    // CORREÇÃO: Porta alterada de 8081 para 8080
    fetch(API_BASE_URL)
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
        })
        .catch(err => {
            console.error("Erro ao listar livros:", err);
            document.getElementById("listaLivros").innerHTML = "Erro ao carregar lista de livros.";
        });
}

function atualizar(id) {
    // CORREÇÃO: Porta alterada de 8081 para 8080
    fetch(`${API_BASE_URL}/${id}`)
        .then(res => res.json())
        .then(livro => {

            const novoTitulo = prompt("Novo título:", livro.titulo);
            if (novoTitulo === null) return;

            const novoAutor = prompt("Novo autor:", livro.autor);
            if (novoAutor === null) return;

            // Certifique-se de que os valores são válidos antes de converter
            const novoAnoStr = prompt("Novo ano:", livro.ano);
            const novoAno = novoAnoStr !== null ? parseInt(novoAnoStr) : null;
            if (novoAno === null || isNaN(novoAno)) return;

            const novoGenero = prompt("Novo gênero:", livro.genero);
            if (novoGenero === null) return;

            const novaQtdTotalStr = prompt("Quantidade total:", livro.quantidadeTotal);
            const novaQtdTotal = novaQtdTotalStr !== null ? parseInt(novaQtdTotalStr) : null;
            if (novaQtdTotal === null || isNaN(novaQtdTotal)) return;

            const novaQtdDispStr = prompt("Quantidade disponível:", livro.quantidadeDisponivel);
            const novaQtdDisp = novaQtdDispStr !== null ? parseInt(novaQtdDispStr) : null;
            if (novaQtdDisp === null || isNaN(novaQtdDisp)) return;

            const livroAtualizado = {
                titulo: novoTitulo,
                autor: novoAutor,
                ano: novoAno,
                genero: novoGenero,
                quantidadeTotal: novaQtdTotal,
                quantidadeDisponivel: novaQtdDisp
            };

            // CORREÇÃO: Porta alterada de 8081 para 8080
            fetch(`${API_BASE_URL}/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(livroAtualizado)
            })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Erro ao atualizar no servidor: ' + res.status);
            })
            .then(data => {
                alert("Livro atualizado com sucesso!");
                listar();
            })
            .catch(err => {
                 alert("Erro ao atualizar livro. Verifique o console.");
                 console.error("Erro na função atualizar (PUT):", err);
            });
        })
        .catch(err => {
            alert("Erro ao buscar livro para edição. Verifique o console.");
            console.error("Erro na função atualizar (GET):", err);
        });
}

function deleteLivro(id) {
    if (!confirm("Tem certeza que deseja deletar este livro?")) return;

    // CORREÇÃO: Porta alterada de 8081 para 8080
    fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (res.ok) {
            alert("Livro deletado!");
            listar();
        } else {
            // Se a exclusão falhar no servidor
            alert("Erro ao deletar livro. Status: " + res.status);
        }
    })
    .catch(err => {
        alert("Erro ao conectar ao servidor.");
        console.error("Erro na função deleteLivro:", err);
    });
}