<?php

$id_carro = $_GET['id_carro'];

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT id_carro, nome, kilometragem, ano FROM carro 
        WHERE id_carro = $id_carro";
$resultado = executarSQL($conexao, $sql);
$carro = mysqli_fetch_assoc($resultado);
echo json_encode($carro);
