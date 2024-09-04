<?php
  require_once('config.php');

    $Nome = $connessione->real_escape_string($_POST['Nome']);
    $Cognome = $connessione->real_escape_string($_POST['Cognome']);
    $Email = $connessione->real_escape_string($_POST['Email']);

    $sql = 'INSERT INTO persone(nome,cognome,email) VALUE(?,?,?)';

   if($statement = $connessione->prepare($sql))
   {
      $statement->bind_param('sss',$Nome,$Cognome,$Email);
      if($statement->execute()){
        $response = ["status"=>"Success","msg"=>"Record aggiunto con successo"];
        echo json_encode($response);
      } 
      else{
            $error = $statement->error;
          	$response = ["status"=>"Errore","msg"=>"$error"];    
            echo json_encode($response);
      }
      $statement->close();
   }
   else{
    $error = $connessione->error;
    $response = ["status"=>"Errore","msg"=>"$error"];    
    echo json_encode($response);
   }
   
   $connessione->close();
   
?>
