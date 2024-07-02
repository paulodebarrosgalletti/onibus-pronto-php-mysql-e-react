<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $email = $data['email'];
    $password = $data['password'];

    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(["error" => "Todos os campos são obrigatórios."]);
        exit();
    }

    $name = $conn->real_escape_string($name);
    $email = $conn->real_escape_string($email);
    $password = $conn->real_escape_string($password);

    $sql = "INSERT INTO users (name, email, password, balance) VALUES ('$name', '$email', '$password', 0)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["id" => $conn->insert_id, "name" => $name, "email" => $email, "balance" => 0]);
    } else {
        echo json_encode(["error" => "Erro ao registrar usuário: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Método de requisição inválido."]);
}
?>
