<?php
echo "This survey is not available anymore.";
die();
include("surveyStart.php");
?>
<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <?php
    // including respective css-files
    if ($_SESSION["cond"]["wd_lr"] || $_SESSION["cond"]["wd_e"] || $_SESSION["cond"]["sd_s"]) {
        echo '<link rel="stylesheet" href="css/analysis-bar.css">';
    }
    if ($_SESSION["cond"]["wd"]) echo '<link rel="stylesheet" href="css/wd.css">';
    if ($_SESSION["cond"]["wd_lr"]) echo '<link rel="stylesheet" href="css/wd_lr.css">';
    if ($_SESSION["cond"]["wd_lr"] && $_SESSION["cond"]["wd"]) echo '<link rel="stylesheet" href="css/wd_and_lr.css">';
    if ($_SESSION["cond"]["sd"] > 0) {
        echo '<link rel="stylesheet" href="css/sd.css">';
        if ($_SESSION["cond"]["sd"] == 2) echo '<link rel="stylesheet" href="css/sd_s.css">';
    }
    ?>
    <title></title>
</head>

<body>
    <img id="loading-icon" class="d-none" src="img/loading.svg">
    <header class="container-fluid text-center sticky-top system d-none" id="ui">
        <div class="row justify-content-between" id="reader-control">
            <div class="col-3 p-0">
                <a id="prev" class="btn w-100 h-100 d-flex justify-content-center align-items-center article-navigator button disabled" href="#article-container" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon align-middle" aria-bs-hidden="true"></span>
                    <span class="sr-only align-middle">Previous</span>
                </a>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <p class="m-0 fw-bolder" id="heading">Article <span class="articleId">A</span></p>
            </div>
            <div class="col-3 p-0">
                <a id="next" class="btn w-100 h-100 d-flex justify-content-center align-items-center article-navigator button" href="#article-container" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-bs-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
        <?php
        if ($_SESSION["cond"]["wd_lr"] || $_SESSION["cond"]["sd"] == 2) {
            echo '<div class="row justify-content-around mt-0 ui" id="analysis-bar">
          ';
            if ($_SESSION["cond"]["wd_lr"] == true) {
                include("s/wd_lr.html");
            };
            if ($_SESSION["cond"]["sd"] == 2) include("s/sd_s.html");
            echo "</div>
          ";
        }
        ?>
    </header>
    <main role="main">
        <div class="container position-relative h-100">
            <div class="row mt-5" id="additional-content"></div>
            <div class="row py-2 system d-none" id="article">
                <div class="col py-1 px-3" id="article-column">
                    <div id="article-container" class="carousel slide" data-bs-touch="false" data-bs-ride="carousel" data-bs-interval="false">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                            </div>
                            <div class="carousel-item">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer class="container-fluid text-center d-flex flex-column" id="app">
        <div class="row text-center h-100" id="app-instructions-row">
            <div class="col d-flex flex-column align-items-center" id="app-instructions"></div>
        </div>
        <div class="row mt-auto pb-3 pt-1">
            <div class="col d-flex align-items-center justify-content-center d-relative" id="app-controls">
            </div>
        </div>
    </footer>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/ui.js"></script>
    <script type="text/javascript">
        cond = <?php echo json_encode($_SESSION["cond"]); ?>;
        testmode = <?php echo json_encode($_SESSION["test"]) ?>;
        step_start = <?php echo json_encode($_SESSION["step"]) ?>;
    </script>
    <script src="js/app.js"></script>
</body>

</html>
<!-- TODO:
  * Add failsafe (save intermediate steps) -->