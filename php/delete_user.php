<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Obter dados de entrada JSON
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];

    // Sanitizar entrada
    $id = $conn->real_escape_string($id);

    $sql = "DELETE FROM users WHERE id = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Usuário excluído com sucesso."]);
    } else {
        echo json_encode(["error" => "Erro ao excluir usuário: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Método de requisição inválido."]);
}
?>
