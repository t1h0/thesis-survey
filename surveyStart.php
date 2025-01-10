<?php
// This script starts the experiment and sets respective values etc.

function getArticles()
{
        /*  
    Gets a random selection of left, center or right articles. Guarantees that one article is less biased than the other.
    @return {array} - Array containing two arrays containing bias and bias degree for article A and B, respectively.
    */
    $pol = ["left", "center", "right", "left_alt", "center_alt", "right_alt"];
    $bias = ["l", "m", "h"];

    // Choosing article stance at random (0&3 left,1&4 center,2&5 right)
    $articleA_polInd = random_int(0, 2);
    $articleB_polInd = random_int(0, 2);
    if ($articleA_polInd == $articleB_polInd) { // will both articles have the same political stance?
        if (random_int(0, 1) == 0) { //randomly change one of the articles to alternative article
            $articleA_polInd += 3;
        } else {
            $articleB_polInd += 3;
        }
    }

    // define bias level for each article at random
    $articleA_biasInd = random_int(0, 2);
    while (($articleB_biasInd = random_int(0, 2)) == $articleA_biasInd);

    // convert to actual article characteristics
    return array(array($pol[$articleA_polInd], $bias[$articleA_biasInd]), array($pol[$articleB_polInd], $bias[$articleB_biasInd]));
}


include("sqlCreds.php");
session_start();
$_SESSION["pid"] = $_GET["pid"]; // Prolific Participant ID
$_SESSION["studyid"] = $_GET["studyid"]; // Prolific Study ID
$_SESSION["sessionid"] = $_GET["sessionid"]; // Prolific Session ID

// if (isset($_GET["test"]) || (isset($_GET["preview"]) && $_GET["preview"])) { // Test/Preview mode active?
    $_SESSION["test"] = true;
    if (isset($_GET["t"]) && (int) $_GET["t"] >= 1 && (int) $_GET["t"] <= 12) { // Test condition submitted?
        /*

        Conditions are assigned according this scheme:

        +-----------------------------------------+-----------------------------------------------------------------+
        |                                         |                   Biased Phrase Detection (wd)                  |
        +-----------------------------------------+--------------------------------+--------------------------------+
        |                                         |             Absent             |             Present            |
        +-----------------------------------------+--------------------------------+--------------------------------+
        |                                         | Biased Sentence Detection (sd) | Biased Sentence Detection (sd) |
        +-----------------------------------------+----------+---------+-----------+----------+---------+-----------+
        | Discriminative Phrase Detection (wd_lr) |  Absent  |  Simple |  Advanced |  Absent  |  Simple |  Advanced |
        +-----------------------------------------+----------+---------+-----------+----------+---------+-----------+
        | Absent                                  |     1    |    2    |     3     |     4    |    5    |     6     |
        +-----------------------------------------+----------+---------+-----------+----------+---------+-----------+
        | Present                                 |     7    |    8    |     9     |    10    |    11   |     12    |
        +-----------------------------------------+----------+---------+-----------+----------+---------+-----------+


        */
        $_SESSION["cond"] = [
            "wd_lr" => (int) $_GET["t"] >= 7,
            "wd" => ((int) $_GET["t"] >= 4 && (int) $_GET["t"] <= 6) || ((int) $_GET["t"] >= 10 && (int) $_GET["t"] <= 12),
            "wd" => in_array((int) $_GET["t"], [1, 7, 4, 10]) ? 0 : (in_array((int) $_GET["t"], [2, 8, 5, 11]) ? 1 : 2),
        ];
    } else {
        $_SESSION["cond"] = [ // setting default test condition
            "wd_lr" => true,
            "wd" => true,
            "sd" => 2
        ];
    }
    $_SESSION["step"] = 0;
    $_SESSION["articles"] = getArticles();
// } else { // No Test/Preview mode --> Experiment Mode!
//     $_SESSION["test"] = false;

//     try { // See if participant already participated and maybe can go back to where they left off
//         $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password, array(PDO::ATTR_PERSISTENT => true));
//         // set the PDO error mode to exception
//         $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//         // Check if subject already in database
//         $sql = $conn->prepare("SELECT * from Results where pid = ?");
//         $sql->execute(array($_SESSION["pid"]));
//         if ($sql->rowCount() > 0) {
//             $result = $sql->fetch();
//             if ($result["step"] == "survey_end") { // Already ended survey
//                 echo "You have already participated in this survey.";
//                 die();
//             }
//             // Participant didn't finish, restart at checkpoint
//             $cond = $result["cond"];
//             $_SESSION["step"] = $result["step"];
//             $_SESSION["articles"] = array([$result["articleA_pol"], $result["articleA_bias"]], [$result["articleB_pol"], $result["articleB_bias"]]);
//         } else {
//             // Randomly selecting articles
//             $_SESSION["articles"] = getArticles();

//             $conn->beginTransaction(); // Transaction to prevent bad reads
//             $conn->prepare("UPDATE Manager SET latest_cond = CASE WHEN (latest_cond < 12) THEN latest_cond + 1 ELSE 1 END")->execute(); // Get next available condition
//             $sql = $conn->prepare("SELECT * FROM Manager");
//             $sql->execute();
//             $cond = $sql->fetch()["latest_cond"];
//             $sql = $conn->prepare("INSERT INTO Results (cond,`time`,pid,studyid,sessionid,step,articleA_pol,articleA_bias,articleB_pol,articleB_bias) VALUES ($cond,0,?,?,?,?,?,?,?,?)"); // Save experimental settings for the participant
//             $values = array_merge(array($_SESSION["pid"], $_SESSION["studyid"], $_SESSION["sessionid"], 0), $_SESSION["articles"][0], $_SESSION["articles"][1]);
//             $sql->execute($values);
//             $conn->commit();
//             $_SESSION["step"] = 0;
//         }
//         $_SESSION["cond"] = [

//         /*
        
//         Conditions are assigned according this scheme:

//         +-----------------------------------------+-----------------------------------------------------------------+
//         |                                         |                   Biased Phrase Detection (wd)                  |
//         +-----------------------------------------+--------------------------------+--------------------------------+
//         |                                         |             Absent             |             Present            |
//         +-----------------------------------------+--------------------------------+--------------------------------+
//         |                                         | Biased Sentence Detection (sd) | Biased Sentence Detection (sd) |
//         +-----------------------------------------+----------+---------+-----------+----------+---------+-----------+
//         | Discriminative Phrase Detection (wd_lr) |  Absent  |  Simple |  Advanced |  Absent  |  Simple |  Advanced |
//         +-----------------------------------------+----------+---------+-----------+----------+---------+-----------+
//         | Absent                                  |     1    |    2    |     3     |     4    |    5    |     6     |
//         +-----------------------------------------+----------+---------+-----------+----------+---------+-----------+
//         | Present                                 |     7    |    8    |     9     |    10    |    11   |     12    |
//         +-----------------------------------------+----------+---------+-----------+----------+---------+-----------+


//         */

//             "wd_lr" => $cond >= 7,
//             "wd" => ($cond >= 4 && $cond <= 6) || ($cond >= 10 && $cond <= 12),
//             "wd" => in_array($cond, [1, 7, 4, 10]) ? 0 : (in_array($cond, [2, 8, 5, 11]) ? 1 : 2),
//         ];
//     } catch (PDOException $e) {
//         echo ("Something went wrong! Please reload this page.");
//         die();
//         // echo "Error: $e";
//     }
// }
