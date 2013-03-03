<?php

function db_connect()
{
   $result = new mysqli('localhost', 'whiteBoard', 'whiteBoard', 'whiteBoard'); 
   if (!$result)
     throw new Exception('Could not connect to database server');
   else
     return $result;
}

?>
