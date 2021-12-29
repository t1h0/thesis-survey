<?php
include("sqlCreds.php");

$target_table = "Results";
$allowed_cols = [];
$values = array();
$update = "";
foreach($_POST as $k => $v){
  if(in_array($k,$allowed_cols)){
    $update .= $k."=?,";
    array_push($values,$v);
  }
}
$cols = substr($cols,0,strlen($cols)-1);
// Create connection
$conn = new PDO("mysql:host=$servername;dbname=mb", $username, $password);
try {
  $conn->prepare("UPDATE $target_table SET $update WHERE id = '".$_SESSION["pid"]."'")->execute($values);
  echo 1;
} catch (PDOException $e) {
  echo 0;
}
