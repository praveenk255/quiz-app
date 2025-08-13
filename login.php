<?php
session_start();
require "db.php";
$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        header("Location: index.php");
        exit;
    } else {
        $msg = "Invalid credentials";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Login</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
<div class="bg-white p-6 rounded shadow w-80">
<h2 class="text-xl font-bold mb-4">Login</h2>
<form method="post" class="space-y-4">
<input type="text" name="username" placeholder="Username" required class="w-full border p-2 rounded">
<input type="password" name="password" placeholder="Password" required class="w-full border p-2 rounded">
<button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Login</button>
<?php if($msg) echo "<p class='text-red-500 mt-2'>$msg</p>"; ?>
<p class="text-sm mt-2">No account? <a href="register.php" class="text-blue-500">Register</a></p>
</form>
</div>
</body>
</html>
