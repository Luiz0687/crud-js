
<?php
require_once "conexao.php";
$conexao = conectar();

// Consulta ao banco de dados
$sql = "SELECT * FROM carro";
$resultado = mysqli_query($conexao, $sql);

if (!$resultado) {
    // Em caso de erro na consulta, retorna uma mensagem de erro em JSON
    echo json_encode(["erro" => "Erro ao executar a consulta: " . mysqli_error($conexao)]);
} else {
    // Converte o resultado em um array associativo
    $carros = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    
    // Define o cabeçalho da resposta como JSON
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($carros);
}

// Fecha a conexão com o banco de dados
mysqli_close($conexao);
