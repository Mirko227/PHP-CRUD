<?php
require_once('config.php');

$data = [];
$sql = 'SELECT * FROM persone';
if($result = $connessione->query($sql))
{
  if($result->num_rows > 0)
  {
     
     while($row = $result->fetch_array(MYSQLI_ASSOC)){
        array_push($data, $row);
     }   
    
  }
        echo json_encode($response = ["status"=>"Success","data"=>$data]);
}
else{
    echo json_encode($response = ["status"=>"Error","data"=>"errore nell'esecuzione di $sql. " . $connessione->error]);
}

$connessione->close();

?>