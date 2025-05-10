<?php
<<<<<<< HEAD
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "student";

$conn = new mysqli($servername, $username, $password, $dbname);
=======
// DB Connection
$conn = new mysqli("localhost", "root", "", "user_database");
>>>>>>> 8137f02a8c8b12c4531b23badca1927ae7b5eb13

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
<<<<<<< HEAD
?>
=======

// Validate POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Check inputs
    if (empty($username) || empty($password)) {
        echo "<script>alert('Please fill in both fields.'); window.location.href='Login_Form.html';</script>";
        exit();
    }

    // Prepare statement
    $stmt = $conn->prepare("SELECT password FROM login WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    // Check user
    if ($stmt->num_rows === 1) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            header("Location: StudentDashboard.html");
            exit();
        } else {
            echo "<script>alert('Invalid password.'); window.location.href='Login_Form.html';</script>";
        }
    } else {
        echo "<script>alert('User not found.'); window.location.href='Login_Form.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
>>>>>>> 8137f02a8c8b12c4531b23badca1927ae7b5eb13
