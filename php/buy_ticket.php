<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    // Obter dados de entrada JSON
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $new_balance = $data['new_balance'];

    // Sanitizar entradas
    $id = $conn->real_escape_string($id);
    $new_balance = $conn->real_escape_string($new_balance);

    $sql = "UPDATE users SET balance = '$new_balance' WHERE id = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Compra realizada com sucesso.", "balance" => $new_balance]);
    } else {
        echo json_encode(["error" => "Erro ao processar compra: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Método de requisição inválido."]);
}
?>
