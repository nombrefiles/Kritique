<?php
require "../conn.php";

$pesquisa = $_GET["pesquisa"] ?? '';

$pesquisa = '%' . $pesquisa . '%';

$sql = "SELECT * FROM albuns WHERE nome LIKE ? OR artista LIKE ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$pesquisa, $pesquisa]);
$resultado = $stmt->fetchAll();

echo json_encode([
    "resultado" => $resultado,
]);
?>
