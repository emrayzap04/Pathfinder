<?php
<<<<<<< HEAD
session_start();
header('Content-Type: application/json');

include 'Connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Missing credentials']);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    if (!$stmt) {
        echo json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if ($password === $user['password']) {
            $_SESSION['username'] = $user['username'];
            $_SESSION['logged_in'] = true;
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Incorrect password.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User not found.']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

=======
$conn = new mysqli("localhost", "root", "", "user_database");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare("INSERT INTO login (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Connected!!";
} else {
    echo "Connecting Failed.";
}

$stmt->close();
>>>>>>> 8137f02a8c8b12c4531b23badca1927ae7b5eb13
$conn->close();
?>
