<?php
include("sqlCreds.php");
session_start();
$_SESSION["pid"] = $_GET["pid"];
$_SESSION["studyid"] = $_GET["studyid"];
$_SESSION["sessionid"] = $_GET["sessionid"];

if (isset($_GET["test"])) {
    // selecting articles

    // define the folder (therefore political stance) for each article (0+3 left,1+4 center,2+5 right)
    $articleA_dir = random_int(0, 2);
    $articleB_dir = random_int(0, 2);
    if ($articleA_dir == $articleB_dir) { // will both articles have the same political stance?
        if (random_int(0, 1) == 0) { //randomly change on of the articles
            $articleA_dir += 3;
        } else {
            $articleB_dir += 3;
        }
    }

    // define the file (therefore bias level) for each article
    $articleA_file = random_int(0, 2);
    while (($articleB_file = random_int(0, 2)) == $articleA_file);

    // convert to actual article characteristics
    $articleA_pol = ["left", "center", "right", "left alt", "center alt", "right alt"][$articleA_dir];
    $articleB_pol = ["left", "center", "right", "left alt", "center alt", "right alt"][$articleB_dir];
    $articleA_bias = ["low", "middle", "high"][$articleA_file];
    $articleB_bias = ["low", "middle", "high"][$articleB_file];
    $_SESSION["articles"] = ["articles/$articleA_dir/$articleA_file.html", "articles/$articleB_dir/$articleB_file.html"];
    $_SESSION["cond"] = [
        "wd_lr" => true,
        "wd_e" => false,
        "wd" => true,
        "sd" => true,
        "sd_s" => true,
        "wdsd" => true,
    ];
    $_SESSION["step"] = 0;
} else {

    try {
        $conn = new PDO("mysql:host=$servername;dbname=mb", $username, $password, array(PDO::ATTR_PERSISTENT => true));
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Check if subject already in database
        $sql->prepare("SELECT step from Results where pid = ?");
        $sql->execute(array($_SESSION["pid"]));
        if ($sql->rowCount() > 0) {
            $result = $sql->fetch();
            if ($result["step"] == "survey_end") {
                echo "You have already participated in this survey";
                die();
            }
            $cond = $result["cond"];
            $_SESSION["articles"] = ["articles/" . $result["article1_dir"] . "/" . $result["article1_file"] . ".html", "articles/" . $result["article2_dir"] . "/" . $result["article2_file"] . ".html"];
            $_SESSION["step"] = $result["step"];
        } else {
            // selecting articles

            // define the folder (therefore political stance) for each article (0+3 left,1+4 center,2+5 right)
            $articleA_dir = random_int(0, 2);
            $articleB_dir = random_int(0, 2);
            if ($articleA_dir == $articleB_dir) { // will both articles have the same political stance?
                if (random_int(0, 1) == 0) { //randomly change on of the articles
                    $articleA_dir += 3;
                } else {
                    $articleB_dir += 3;
                }
            }

            // define the file (therefore bias level) for each article
            $articleA_file = random_int(0, 2);
            while (($articleB_file = random_int(0, 2)) == $articleA_file);

            // convert to actual article characteristics
            $articleA_pol = ["left", "center", "right", "left alt", "center alt", "right alt"][$articleA_dir];
            $articleB_pol = ["left", "center", "right", "left alt", "center alt", "right alt"][$articleB_dir];
            $articleA_bias = ["low", "middle", "high"][$articleA_file];
            $articleB_bias = ["low", "middle", "high"][$articleB_file];
            $_SESSION["articles"] = ["articles/$articleA_dir/$articleA_file.html", "articles/$articleB_dir/$articleB_file.html"];
            
            $conn->beginTransaction();
            $conn->prepare("UPDATE Manager SET latest_cond = CASE WHEN (latest_cond < 20) THEN latest_cond + 1 ELSE 1 END")->execute();
            $sql = $conn->prepare("SELECT * FROM Manager");
            $sql->execute();
            $cond = $sql->fetch()["latest_cond"];
            $sql = $conn->prepare("INSERT INTO Results (pid,studyid,sessionid,cond,article1_dir,article1_file,article2_dir,article2_file,article1_pol,article1_bias,article2_pol,article2_bias,step) VALUES (?,?,?,$cond,?,?,?,?)");
            $sql->execute(array($_SESSION["pid"], $_SESSION["studyid"], $_SESSION["sessionid"], $article1_dir, $article1_file, $article2_dir, $article2_file, $article1_pol, $article1_bias, $article2_pol, $article2_bias, 0));
            $conn->commit();
            $_SESSION["step"] = 0;
        }
        $_SESSION["cond"] = [
            "wd_lr" => ($cond + 2) % 5 == 0 || $cond % 5 == 0,
            "wd_e" => ($cond + 1) % 5 == 0 || $cond % 5 == 0,
            "wd" => ($cond + 4) % 5 != 0,
            "sd" => $cond >= 6 && $cond <= 15,
            "sd_s" => $cond >= 11 && $cond <= 15,
        ];
        $_SESSION["cond"]["wdsd"] = $_SESSION["cond"]["wd_lr"] || $_SESSION["cond"]["wd_e"] || $_SESSION["cond"]["sd_s"];
    } catch (PDOException $e) {
        echo "Error. Please try again.";
    }
}
