<?php
  require_once('config.php');

    $id = intval($connessione->real_escape_string($_POST['id_persona']));

    $sql = 'DELETE FROM persone WHERE id_persona = ?';

   if($statement = $connessione->prepare($sql))
   {
      $statement->bind_param('i',$id);
      if($statement->execute()){
        $response = ["status"=>"Success","msg"=>"Record eliminato con successo!"];
        echo json_encode($response);
      } 
      else{
            $error = $statement->error;
          	$response = ["status"=>"Error","msg"=>"$error"];    
            echo json_encode($response);
      }
      $statement->close();
   }
   else{
    $error = $connessione->error;
    $response = ["status"=>"Error","msg"=>"$error"];    
    echo json_encode($response);
   }
   
   $connessione->close();
   
?>
