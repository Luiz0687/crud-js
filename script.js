document.addEventListener("DOMContentLoaded", () => {
    listarTodos();
});

function listarTodos() {
    fetch("listar.php", {
        method: "GET",
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(carros => inserirTodosCarros(carros))  // Alterado para chamar inserirTodosCarros
    .catch(error => console.log(error));
}

function inserirTodosCarros(carros) {  // Alterado o nome da função para inserirTodosCarros
    for (const carro of carros) {
        inserirCarro(carro);
    }
}

function inserirCarro(carro) {
    let tbody = document.getElementById('carros');
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.innerHTML = carro.id_carro;

    let tdNome = document.createElement('td');
    tdNome.innerHTML = carro.nome;

    let tdkilometragem = document.createElement('td');
    tdkilometragem.innerHTML = carro.kilometragem;

    let tdAno = document.createElement('td');
    tdAno.innerHTML = carro.ano;

    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscaCarro, false);
    btnAlterar.id_carro = carro.id_carro;
    tdAlterar.appendChild(btnAlterar);

    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false);
    btnExcluir.id_carro = carro.id_carro;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdkilometragem);
    tr.appendChild(tdAno);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    tbody.appendChild(tr);
}

function excluir(evt) {
    let id_carro = evt.currentTarget.id_carro;
    let excluir = confirm("Você tem certeza que deseja excluir este usuário?");
    if (excluir == true) {
        fetch('excluir.php?id_carro=' + id_carro, {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(retorno => excluirCarro(retorno, id_carro))
        .catch(error => console.log(error));
    }
}

function excluirCarro(retorno, id_carro) {
    if (retorno == true) {
        let tbody = document.getElementById('carros');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_carro) {
                tbody.removeChild(tr);
            }
        }
    }
}

function alterarCarro(carro) {
    let tbody = document.getElementById('carros');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == carro.id_carro) {
            tr.children[1].innerHTML = carro.nome;
            tr.children[2].innerHTML = carro.kilometragem;
            tr.children[3].innerHTML = carro.ano;
        }
    }
}

function buscaCarro(evt) {
    let id_carro = evt.currentTarget.id_carro;
    fetch('buscaCarro.php?id_carro=' + id_carro, {
        method: "GET",
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(carro => preencheForm(carro))
    .catch(error => console.log(error));
}

function preencheForm(carro) {
    let inputIDcarro = document.getElementsByName("id_carro")[0];
    inputIDcarro.value = carro.id_carro;
    let inputNome = document.getElementsByName("nome")[0];
    inputNome.value = carro.nome;
    let inputkilometragem = document.getElementsByName("kilometragem")[0];
    inputkilometragem.value = carro.kilometragem;
    let inputAno = document.getElementsByName("ano")[0];
    inputAno.value = carro.ano;
}

function salvarcarro(event) {
    event.preventDefault();
    let inputIDcarro = document.getElementsByName("id_carro")[0];
    let id_carro = inputIDcarro.value;
    let inputNome = document.getElementsByName("nome")[0];
    let nome = inputNome.value;
    let inputkilometragem = document.getElementsByName("kilometragem")[0];
    let kilometragem = inputkilometragem.value;
    let inputAno = document.getElementsByName("ano")[0];
    let ano = inputAno.value;

    if (id_carro == "") {
        cadastrar(nome, kilometragem, ano);  // Corrigido para não enviar id_carro vazio
    } else {
        alterar(id_carro, nome, kilometragem, ano);
    }
    document.getElementsByTagName('form')[0].reset();
}

function cadastrar(nome, kilometragem, ano) {
    fetch('inserir.php', {
        method: 'POST',
        body: JSON.stringify({
            nome: nome,
            kilometragem: kilometragem,
            ano: ano
        }),
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(carro => inserirCarro(carro))
    .catch(error => console.log(error));
}

function alterar(id_carro, nome, kilometragem, ano) {
    fetch('alterar.php', {
        method: 'POST',
        body: JSON.stringify({
            id_carro: id_carro,
            nome: nome,
            kilometragem: kilometragem,
            ano: ano
        }),
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(carro => alterarCarro(carro))
    .catch(error => console.log(error));
}
