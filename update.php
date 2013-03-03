<?php
	$s = $_POST['s'];
	require_once('db_fns.php');
	try {
		$conn = db_connect();
		$x = array();
		$y = array();
		$update = $conn->query('select * from wb where uid > '.$s);
		if(!$update) throw new Exception('Error in updating from database.');
		for($i=0; $i<$update->num_rows; $i++)
		{
			$row = mysqli_fetch_array($update);
			$x[]=$row['x'];
			$y[]=$row['y'];
		}
		$log['x'] = $x;
		$log['y'] = $y;
		$log['s'] = $update->num_rows+$s;
		echo json_encode($log);
	}
	catch(Exception $e) { echo $e->getMessage(); }
?>