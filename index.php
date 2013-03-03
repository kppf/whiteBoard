<?php
	session_start();
	echo $_SESSION['canvasuser'];
	if(!isset($_SESSION['canvasuser']))
	{
?>
	Please enter a username.
	<form action='setuser.php' method='post'>
		<input type='text' name='user'/>
		<input type='submit'/>
	</form>
<?php
	}
	else 
	{
?><!DOCTYPE html >
<html>
<head>
    <title>whiteBoard</title>
    <script type="text/javascript" src="js/jquery.js" > </script>
    <script type="text/javascript" src='js/main.js'></script>
	<style type='text/css'>
		body { margin:0px; }
		canvas { width:1000px; height:500px; border: 1px solid black; }
	</style>
</head>

<body>
    <canvas id="A" width="1000" height="500"> Your browser doesn't support HTML5. Please upgrade your browser for using the App </canvas></body>

</html>
<?php } ?>
