<?php

session_start();  

if (!isset($_SESSION["usuario"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuário não logado"
    ]);
    exit;  
}

echo json_encode([
    "status" => "success",
    "message" => "Usuário logado",
    "usuario" => $_SESSION["usuario"]  
]);
