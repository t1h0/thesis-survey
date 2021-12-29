<?php
include("sqlCreds.php");
session_start();
$_SESSION["pid"] = $_GET["pid"];
$_SESSION["studyid"] = $_GET["studyid"];
$_SESSION["sessionid"] = $_GET["sessionid"];

try {
    $conn = new PDO("mysql:host=$servername;dbname=mb", $username, $password,array(PDO::ATTR_PERSISTENT => true));
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->beginTransaction();
    $conn->prepare("UPDATE Manager SET latest_cond = CASE WHEN (latest_cond < 20) THEN latest_cond + 1 ELSE 1 END")->execute();
    $sql = $conn->prepare("SELECT * FROM Manager");
    $sql->execute();
    $_SESSION["cond"] = $sql->fetch(PDO::FETCH_ASSOC)["latest_cond"];
    $sql = $conn->prepare("INSERT INTO Results (pid,studyid,sessionid,cond) VALUES (?,?,?,".$_SESSION["cond"].")");
    $sql->execute(array($_SESSION["pid"],$_SESSION["studyid"],$_SESSION["sessionid"]));
    $conn->commit();
} catch (PDOException $e) {
    echo "Error. Please try again.";
}
