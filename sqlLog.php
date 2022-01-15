<?php
session_start();
include("sqlCreds.php");

$target_table = "Results";
$allowed_cols = ["step","dem_gender","dem_eng","dem_age","dem_school","article_choice","consent","political_stance","sentences_choice","words_choice"];
$values = array(time());
$update = "time=concat(time,',',?),";
foreach($_POST as $k => $v){
  if(in_array($k,$allowed_cols)){
    $update .= $k."=?,";
    array_push($values,$v);
  }
}
array_push($values,$_SESSION["pid"]);
$update = substr($update,0,strlen($update)-1);
// Create connection
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
try {
  $conn->prepare("UPDATE $target_table SET $update WHERE pid = ?")->execute($values);
  echo 1;
} catch (PDOException $e) {
  if(!isset($_SESSION["errors"])) $_SESSION["errors"] = array($e);
  else array_push($_SESSION["errors"],$e);
  echo 0;
}

// TODO: DELETE ERROR OUTPUT
