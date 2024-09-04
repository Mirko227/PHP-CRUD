<?php

$host = "127.0.0.1";
$user = "root";
$password = ""; 
$database = "db_corso";


// Create connection
$connessione = new mysqli($host, $user, $password, $database);

// Check connection
if ($connessione->connect_error) {
  die("Connection failed: " . $connessione->connect_error);
}

?>