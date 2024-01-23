<?php
    include "conexao.php";

    $cat = $_GET["nome"];
    $stmt = $con->query("SELECT * FROM $cat")->fetchAll();

    echo json_encode($stmt);
?>