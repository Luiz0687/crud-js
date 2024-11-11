<?php

require_once "conexao.php";
$conexao = conectar();

$carro = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO carro 
        (nome, kilometragem, ano)
        VALUES 
        ('$carro->nome', 
        '$carro->kilometragem', 
        '$carro->ano')";

executarSQL($conexao, $sql);

$carro->id_carro = mysqli_insert_id($conexao);
echo json_encode($carro);
