<?php
    $host = "localhost";
    $port = "3306";
    $dbname = "SCHMIDT";
    $user = "root";
    $senha = "";

    try
    {
        $con = new PDO("mysql:host=$host;port=$port;dbname=$dbname",$user,$senha);

        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
        echo $e-> getMessage();
    }
?>