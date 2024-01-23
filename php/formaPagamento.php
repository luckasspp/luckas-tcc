<?php
    include "conexao.php";

    $arr = ["CEP"=>$_POST["CEP_ENTREGA"],
            "FORMAPAGAMENTO"=>$_POST["FORMAPAGAMENTO"]];

    echo json_encode($arr);        
?>