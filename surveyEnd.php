<!-- This script ends the experiment and sends the participant back to Prolific if everything was ok. -->

<?php
include("sqlCreds.php");
session_start();
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
// set the PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sql = $conn->prepare("SELECT * from Results where pid = ?");
$sql->execute(array($_SESSION["pid"]));
$result = $sql->fetch(PDO::FETCH_ASSOC);
foreach (["pid", "studyid", "sessionid", "cond", "articleA_pol", "articleA_bias", "articleB_pol", "articleB_bias", "step", "dem_gender", "dem_eng", "dem_age", "dem_school", "article_choice", "consent", "political_stance", "time", "sentences_choice", "words_choice"] as $i) { // Check if participant went through all the stages 
    if (!isset($result[$i])) {
        echo "<h1>We are sorry!</h1><p>Apparently, you did not complete the survey or something went wrong. We therefore could not process your submission. We will not make use of your provided data and will delete it.</p>";
        die();
    }
}
header('Location: https://app.prolific.co/submissions/complete?cc=22034F8D');
echo "<h1>Thank you!</h1><p>You will now be redirected back to prolific. If that does not work, please click here: <a href='https://app.prolific.co/submissions/complete?cc=22034F8D'>https://app.prolific.co/submissions/complete?cc=22034F8D</a></p>";
die();
