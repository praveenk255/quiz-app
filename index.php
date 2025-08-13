<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Quiz App</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
<div class="max-w-xl mx-auto py-6">
<h1 class="text-2xl font-bold mb-4">Multi Quiz App</h1>

<label for="sheetSelector">Select Quiz:</label>
<select id="sheetSelector" class="border p-2 mb-4 w-full">
    <option value="https://docs.google.com/spreadsheets/d/CSV_URL_1/export?format=csv">Quiz 1</option>
    <option value="https://docs.google.com/spreadsheets/d/CSV_URL_2/export?format=csv">Quiz 2</option>
</select>

<div id="quizContainer"></div>

<button id="submitBtn" class="mt-4 bg-green-500 text-white p-2 rounded">Submit Quiz</button>

<div id="statsContainer" class="mt-4"></div>
</div>

<script src="js/quiz.js"></script>
</body>
</html>
