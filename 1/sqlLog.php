<?php
session_start();
include("sqlCreds.php");

$target_table = "Results";
$allowed_cols = ["state","dem_gender","dem_eng","dem_age","dem_school","article_choice","consent"];
$values = array();
$update = "";
foreach($_POST as $k => $v){
  if(in_array($k,$allowed_cols)){
    $update .= $k."=?,";
    array_push($values,$v);
  }
}
array_push($values,$_SESSION["pid"]);
$update = substr($update,0,strlen($update)-1);
// Create connection
$conn = new PDO("mysql:host=$servername;dbname=mb", $username, $password);
try {
  $conn->prepare("UPDATE $target_table SET $update WHERE pid = ?")->execute($values);
  echo 1;
} catch (PDOException $e) {
  echo $e;
}

// TODO: DELETE ERROR OUTPUT
