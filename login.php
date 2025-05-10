<?php
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
$conn->close();
?>
