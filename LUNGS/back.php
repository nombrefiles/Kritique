<?php
session_start();
require "../conn.php";

if (!isset($_SESSION['usuario'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuário não logado",
    ]);
    exit;
}

$albumId = 1;
$notaUser = null;

$usuarioLogado = $_SESSION['usuario'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST["nota"])) {
        echo json_encode([
            "status" => "error",
            "message" => "Nota inválida ou ausente",
        ]);
        exit;
    }

    $input = (int) $_POST["nota"];

    if ($input < 0 || $input > 100) {
        echo json_encode([
            "status" => "error",
            "message" => "A nota deve ser um número entre 0 e 100",
        ]);
        exit;
    }

    $sql = "SELECT * FROM notas_albuns WHERE album_id = ? AND usuario_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$albumId, $usuarioLogado["id"]]);
    $notaUser = $stmt->fetch();

    if ($notaUser) {
        $sql = "UPDATE notas_albuns SET nota = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$input, $notaUser['id']]);
        $message = "Nota atualizada com sucesso";
    } else {
        $sql = "INSERT INTO notas_albuns (album_id, usuario_id, nota) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$albumId, $usuarioLogado["id"], $input]);
        $message = "Nota adicionada com sucesso";
    }
}

$sql = "SELECT nota FROM notas_albuns WHERE album_id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$albumId]);
$notasAtualizadas = $stmt->fetchAll(PDO::FETCH_COLUMN);

$sum = array_sum($notasAtualizadas);
$media = count($notasAtualizadas) > 0 ? $sum / count($notasAtualizadas) : 0;

$sql = "SELECT nota FROM notas_albuns WHERE album_id = ? AND usuario_id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$albumId, $usuarioLogado["id"]]);
$notaUser = $stmt->fetchColumn();

echo json_encode([
    "status" => "success",
    "message" => $message ?? "",
    "notas" => $notasAtualizadas,
    "media" => round($media),
    "notaUser" => $notaUser !== false ? (int) $notaUser : null,
]);
