<?php

require_once "conexao.php";
$conexao = conectar();

$carro = json_decode(file_get_contents("php://input"));
$sql = "UPDATE carro SET
        nome='$carro->nome', 
        kilometragem='$carro->kilometragem', 
        ano='$carro->ano'
        WHERE id_carro=$carro->id_carro";

executarSQL($conexao, $sql);

echo json_encode($carro);
