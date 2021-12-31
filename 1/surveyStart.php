<?php
include("sqlCreds.php");
session_start();
$_SESSION["pid"] = $_GET["pid"];
$_SESSION["studyid"] = $_GET["studyid"];
$_SESSION["sessionid"] = $_GET["sessionid"];

if (isset($_GET["test"])) {
    $_SESSION["cond"] = [
        "wd_lr" => true,
        "wd_e" => true,
        "wd" => true,
        "sd" => true,
        "sd_s" => true,
        "wdsd" => true,
    ];
} else {

    try {
        $conn = new PDO("mysql:host=$servername;dbname=mb", $username, $password, array(PDO::ATTR_PERSISTENT => true));
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->beginTransaction();
        $conn->prepare("UPDATE Manager SET latest_cond = CASE WHEN (latest_cond < 20) THEN latest_cond + 1 ELSE 1 END")->execute();
        $sql = $conn->prepare("SELECT * FROM Manager");
        $sql->execute();
        $cond = $sql->fetch(PDO::FETCH_ASSOC)["latest_cond"];
        $sql = $conn->prepare("INSERT INTO Results (pid,studyid,sessionid,cond) VALUES (?,?,?,$cond)");
        $sql->execute(array($_SESSION["pid"], $_SESSION["studyid"], $_SESSION["sessionid"]));
        $conn->commit();
        $_SESSION["cond"] = [
            "wd_lr" => ($cond + 2) % 5 == 0 || $cond % 5 == 0,
            "wd_e" => ($cond + 1) % 5 == 0 || $cond % 5 == 0,
            "wd" => ($cond + 4) % 5 != 0,
            "sd" => ($cond >= 1 && $cond <= 5) || ($cond >= 11 && $cond <= 15),
            "sd_s" => $cond >= 1 && $cond <= 10,
        ];
        $_SESSION["cond"]["wdsd"] = $_SESSION["cond"]["wd_lr"] || $_SESSION["cond"]["wd_e"] || $_SESSION["cond"]["sd_s"];
    } catch (PDOException $e) {
        echo "Error. Please try again.";
    }
}
