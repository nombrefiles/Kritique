<?php
session_start();
require "../conn.php";

$user = $_POST["user"];
$senha = $_POST["senha"];

$sql = "SELECT * FROM usuarios WHERE user = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$user]);

$usuario = $stmt->fetch();
if (!$usuario) {
    echo json_encode([
        "status" => "error",
        "mensagem" => "Usuário não existe"
    ]);
    exit;
}

if (!password_verify($senha, $usuario["senha"])) {
    echo json_encode([
        "status" => "error",
        "mensagem" => "Senha não confere"
    ]);
    exit;
}

$_SESSION["usuario"] = [
    "user" => $usuario["user"],
    "email" => $usuario["email"],
    "id" => $usuario["id"],
];

echo json_encode([
    "status" => "success",
    "mensagem" => "Usuário logado com sucesso",
    "usuario" => $_SESSION["usuario"]
]);