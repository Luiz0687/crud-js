<!DOCTYPE html>
<html lang="pt_BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>crud js</title>
</head>

<body>
    <form onsubmit="return salvarCarro(event);">
        <label>ID: <input type="number" name="id_carro"></label><br>
        <label>Nome: <input type="text" name="nome"></label><br>
        <label>kilometragem: <input type="number" name="kilometragem"></label><br>
        <label>ano: <input type="number" name="ano"></label><br>
        <input type="submit" value="Salvar Vendas">
    </form>
    <br>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Kilometragem</th>
                <th>Ano</th>
                <th colspan="2">Opções</th>
            </tr>
        </thead>
        <tbody id="carro"></tbody>
    </table>

    <script src="script.js"></script>
</body>

</html>