<?php
require "../conn.php";

$pesquisa = $_GET["pesquisa"] ?? '';

$pesquisa = '%' . $pesquisa . '%';

$sql = "SELECT * FROM filmes WHERE nome LIKE ? OR diretor LIKE ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$pesquisa, $pesquisa]);
$resultado = $stmt->fetchAll();

echo json_encode([
    "resultado" => $resultado,
]);
?>
