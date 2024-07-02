<?php
$servername = "localhost";
$username = "u271476192_123";
$password = "Onibus123@";
$dbname = "u271476192_my_bus_db";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
