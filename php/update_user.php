<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    // Obter dados de entrada JSON
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $name = $data['name'];

    // Sanitizar entradas
    $id = $conn->real_escape_string($id);
    $name = $conn->real_escape_string($name);

    $sql = "UPDATE users SET name = '$name' WHERE id = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Usuário atualizado com sucesso.", "name" => $name]);
    } else {
        echo json_encode(["error" => "Erro ao atualizar usuário: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Método de requisição inválido."]);
}
?>
