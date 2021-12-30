<?php
include("sqlCreds.php");
session_start();
$_SESSION["pid"] = $_GET["pid"];
$_SESSION["studyid"] = $_GET["studyid"];
$_SESSION["sessionid"] = $_GET["sessionid"];

try {
    $conn = new PDO("mysql:host=$servername;dbname=mb", $username, $password, array(PDO::ATTR_PERSISTENT => true));
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->beginTransaction();
    $conn->prepare("UPDATE Manager SET latest_cond = CASE WHEN (latest_cond < 20) THEN latest_cond + 1 ELSE 1 END")->execute();
    $sql = $conn->prepare("SELECT * FROM Manager");
    $sql->execute();
    $cond = $sql->fetch(PDO::FETCH_ASSOC)["latest_cond"];
    if(!isset($_GET["test"])){
        $sql = $conn->prepare("INSERT INTO Results (pid,studyid,sessionid,cond) VALUES (?,?,?,$cond)");
        $sql->execute(array($_SESSION["pid"], $_SESSION["studyid"], $_SESSION["sessionid"]));
    }
    $conn->commit();
    $_SESSION["cond"] = [
        "wdlr" => ($cond + 2) % 5 == 0 || $cond % 5 == 0,
        "wde" => ($cond + 1) % 5 == 0 || $cond % 5 == 0,
        "wds" => $cond >= 1 && $cond <= 10,
        "wd" => ($cond + 4) % 5 != 0,
        "sd" => ($cond >= 1 && $cond <= 5) || ($cond >= 11 && $cond <= 15),
    ];
} catch (PDOException $e) {
    echo "Error. Please try again.";
}
