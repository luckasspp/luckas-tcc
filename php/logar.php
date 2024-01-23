<?php
    include "conexao.php";

    $stmt = $con->prepare("SELECT*FROM CLIENTE WHERE EMAIL_CLIENTE=? AND SENHA_CLIENTE=?");

    $stmt->bindParam(1,$_POST["EMAIL_CLIENTE"]);
    $stmt->bindParam(2,$_POST["SENHA_CLIENTE"]);
    $stmt->execute();

    if($stmt->rowCount() > 0)
    {
        echo json_encode("Logado!!");
    }
    else 
    {
        echo json_encode("nao achou!");
    }
?>