<?php
  require_once('config.php');

    $id = intval($connessione->real_escape_string($_POST['id_persona']));
    $nome = $connessione->real_escape_string($_POST['nome']);
    $cognome = $connessione->real_escape_string($_POST['cognome']);
    $email = $connessione->real_escape_string($_POST['email']);

    $sql = "UPDATE persone SET nome=?, cognome=?, email=? WHERE id_persona = ?";

   if($statement = $connessione->prepare($sql))
   {
      $statement->bind_param('sssi',$nome,$cognome,$email,$id);
      if($statement->execute()){
        $response = ["status"=>"Success","msg"=>"Record modificato con successo!"];
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
