<?php

function getArticles(){
    $dirs = ["left", "center", "right", "left alt", "center alt", "right alt"];
    $files = ["low", "middle", "high"];

    // choosing article stance at random (0+3 left,1+4 center,2+5 right)
    $articleA_ind = random_int(0, 2);
    $articleB_ind = random_int(0, 2);
    if ($articleA_ind == $articleB_ind) { // will both articles have the same political stance?
        if (random_int(0, 1) == 0) { //randomly change one of the articles to alternative article
            $articleA_ind += 3;
        } else {
            $articleB_ind += 3;
        }
    }

    // define bias level for each article at random
    $articleA_file = random_int(0, 2);
    while (($articleB_file = random_int(0, 2)) == $articleA_file);

    // convert to actual article characteristics
    return array(array($dirs[$articleA_ind],$files[$articleA_file]),array($dirs[$articleB_ind],$files[$articleB_file]));
}


include("sqlCreds.php");
session_start();
$_SESSION["pid"] = $_GET["pid"];
$_SESSION["studyid"] = $_GET["studyid"];
$_SESSION["sessionid"] = $_GET["sessionid"];

if (isset($_GET["test"])) {
    $_SESSION["test"] = true;
    $_SESSION["cond"] = [
        "wd_lr" => ($temp = true),
        "wd_e" => ($temp2 = true),
        "wd_lre" => $temp || $temp2,
        "wd" => true,
        "sd" => 2
    ];
    $_SESSION["step"] = 0;
    $_SESSION["articles"] = getArticles();
}
else {
    $_SESSION["test"] = false;

    try {
        $conn = new PDO("mysql:host=$servername;dbname=mb", $username, $password, array(PDO::ATTR_PERSISTENT => true));
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Check if subject already in database
        $sql = $conn->prepare("SELECT * from Results where pid = ?");
        $sql->execute(array($_SESSION["pid"]));
        if ($sql->rowCount() > 0) {
            $result = $sql->fetch();
            if ($result["step"] == "survey_end") {
                echo "You have already participated in this survey";
                die();
            }
            $cond = $result["cond"];
            $_SESSION["step"] = $result["step"];
            $_SESSION["articles"] = array([$result["articleA_pol"],$result["articleA_bias"]],[$result["articleB_pol"],$result["articleB_bias"]]);
        } else {
            // selecting articles
            $_SESSION["articles"] = getArticles();
            
            $conn->beginTransaction();
            $conn->prepare("UPDATE Manager SET latest_cond = CASE WHEN (latest_cond < 24) THEN latest_cond + 1 ELSE 1 END")->execute();
            $sql = $conn->prepare("SELECT * FROM Manager");
            $sql->execute();
            $cond = $sql->fetch()["latest_cond"];
            $sql = $conn->prepare("INSERT INTO Results (pid,studyid,sessionid,cond,step,articleA_pol,articleA_bias,articleB_pol,articleB_bias) VALUES (?,?,?,$cond,?,?,?,?,?)");
            $values = array_merge(array($_SESSION["pid"], $_SESSION["studyid"], $_SESSION["sessionid"],0),$_SESSION["articles"][0],$_SESSION["articles"][1]);
            $sql->execute($values);
            $conn->commit();
            $_SESSION["step"] = 0;
        }
        $_SESSION["cond"] = [
            "wd_lr" => $cond >= 13,
            "wd_e" => $cond % 2 == 0,
            "wd_lre" => $cond >= 13 && $cond % 2 == 0,
            "wd" => ($cond >= 7 && $cond <= 12) || ($cond >= 19 && $cond <= 24),
            "sd" => in_array($cond,[1,2,7,8,13,14,19,20]) ? 0 : (in_array($cond,[3,4,9,10,15,16,21,22]) ? 1 : 2),
        ];
    } catch (PDOException $e) {
        echo "Error: $e";
    }
}
// TODO: Change "survey_end" check to either INT or change databse and step logging