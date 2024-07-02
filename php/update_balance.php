<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    // Obter dados de entrada JSON
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $balance = $data['balance'];

    // Sanitizar entradas
    $id = $conn->real_escape_string($id);
    $balance = $conn->real_escape_string($balance);

    $sql = "UPDATE users SET balance = '$balance' WHERE id = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Saldo atualizado com sucesso.", "balance" => $balance]);
    } else {
        echo json_encode(["error" => "Erro ao atualizar saldo: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Método de requisição inválido."]);
}
?>
