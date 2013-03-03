<?php
	session_start();
	require_once('db_fns.php');
	$x = $_POST['x'];
	$y = $_POST['y'];
	$user = $_SESSION['user'];
	try {
		$conn = db_connect();
		$update = $conn->query("insert into wb values(NULL, '$user', $x, $y)");
		if(!$update) throw new Exception('Could not insert data in database');
		echo $conn->insert_id;
	}
	catch(Exception $e) { echo $e->getMessage(); }
?>
