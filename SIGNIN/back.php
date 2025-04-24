<?php

require "../conn.php";

function darResposta($conn, $user, $email, $senha, $confirma) {
    $response = [];
    $response["status"] = "error";

    if (empty($user) || empty($email) || empty($senha)) {
        $response["mensagem"] = "Todos os campos são obrigatórios.";
    } elseif (strlen($senha) < 6) {
        $response["mensagem"] = "A senha deve ter no mínimo 6 caracteres.";
    } elseif ($senha !== $confirma) {
        $response["mensagem"] = "As senhas não coincidem.";
    } else {
        $sql = "SELECT user, email FROM usuarios WHERE user = ? OR email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$user, $email]);
        $verificacao = $stmt->fetch();

        if ($verificacao) {
            if ($verificacao["user"] === $user) {
                $response["mensagem"] = "Username já existente.";
            } elseif ($verificacao["email"] === $email) {
                $response["mensagem"] = "E-mail já existente.";
            }
        } else {
            $response["status"] = "success"; 
        }
    }

    return $response;
}

$user = $_POST["user"];
$email = $_POST["email"];
$senha = $_POST["senha"];
$confirma = $_POST["confirma"];

$mensagem = darResposta($conn, $user, $email, $senha, $confirma);
if ($mensagem["status"] === "error") {
    echo json_encode($mensagem);
    exit;
}

$sql = "INSERT INTO usuarios(user, email, senha) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $user, 
    $email,
    password_hash($senha, PASSWORD_DEFAULT)
]);

$mensagem["mensagem"] = "Usuário cadastrado";
$mensagem["user"] = [
    "user" => $user,
    "email" => $email
];

echo json_encode($mensagem);
?>
