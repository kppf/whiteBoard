<?php
	session_start();
	if(isset($_SESSION['canvasuser']) || !isset($_POST['user'])) {}
	else $_SESSION['canvasuser'] = $_POST['user']; 
	header('Location: index.php');
?>