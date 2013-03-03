<?php
	require_once('db_fns.php');
	$conn = db_connect();
	$conn->query('truncate table wb');
	header('Location: index.php');
?>