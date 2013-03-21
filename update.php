<?php
	session_start();
	$s = $_POST['s'];
	require_once('db_fns.php');
	try {
		$conn = db_connect();
		$x = array();
		$y = array();
		$clicking = array();
		$uid = array();
		$user = $_SESSION['canvasuser'];
		if($s>0)
			$update = $conn->query('select * from wb where uid > '.$s.' and user!=\''.$user.'\'');
		else $update = $conn->query('select * from wb order by user, uid');
		if(!$update) throw new Exception('Error in updating from database.');
		for($i=0; $i<$update->num_rows; $i++)
		{
			$row = mysqli_fetch_array($update);
			if($row['x']==-1 && $row['user']==$user) continue;
			$x[]=$row['x'];
			$y[]=$row['y'];
			$clicking[]=$row['clicking'];
			$uid[]=$row['uid'];
		}
		$log['x'] = $x;
		$log['y'] = $y;
		$log['clicking'] = $clicking;
		$log['s'] = $update->num_rows+$s;//+$row['uid']-$s-$update->num_rows;
	//	$log['s'] = $row['uid'];
		$log['uid'] = $uid;
		echo json_encode($log);
	}
	catch(Exception $e) { echo $e->getMessage(); }
?>