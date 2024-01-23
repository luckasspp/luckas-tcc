<?php
    include "conexao.php";
    $stmt = $con->prepare("INSERT INTO CLIENTE( NOME_CLIENTE,
                                                EMAIL_CLIENTE,
                                                SENHA_CLIENTE,
                                                CPF_CLIENTE,
                                                TELEFONE_CLIENTE,
                                                DTANASC_CLIENTE)
                                                VALUES(?,?,?,?,?,?)");

    $stmt->bindParam(1,$_POST["NOME_CLIENTE"]);
    $stmt->bindParam(2,$_POST["EMAIL_CLIENTE"]);
    $stmt->bindParam(3,$_POST["SENHA_CLIENTE"]);
    $stmt->bindParam(4,$_POST["CPF_CLIENTE"]);
    $stmt->bindParam(5,$_POST["TELEFONE_CLIENTE"]);
    $stmt->bindParam(6,$_POST["DTANASC_CLIENTE"]);
    $stmt->execute();
    
    $arr = ["NOME"=>$_POST["NOME_CLIENTE"],
            "EMAIL"=>$_POST["EMAIL_CLIENTE"],
            "SENHA"=>$_POST["SENHA_CLIENTE"],
            "CPF"=>$_POST["CPF_CLIENTE"],
            "TELEFONE"=>$_POST["TELEFONE_CLIENTE"],
            "DTANASC"=>$_POST["DTANASC_CLIENTE"]];

    echo json_encode($arr);        
?>