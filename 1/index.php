<?php
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
    foreach (["wd","sd","wdsd","sd_s"] as $i) {
        if ($_SESSION["cond"][$i]) echo '<link rel="stylesheet" href="css/' . $i . '.css">
    ';
    };
    ?>
    <title></title>
</head>

<body>
    <header class="container-fluid text-center sticky-top system ui" id="ui">
        <div class="row justify-content-between ui" id="reader-control">
            <div class="col-3 p-0">
                <a id="prev" class="btn w-100 h-100 d-flex justify-content-center align-items-center article-navigator button disabled" href="#article-container" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon align-middle" aria-hidden="true"></span>
                    <span class="sr-only align-middle">Previous</span>
                </a>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <p class="m-0 font-weight-bolder" id="heading">Article <span class="articleId">A</span></p>
            </div>
            <div class="col-3 p-0">
                <a id="next" class="btn w-100 h-100 d-flex justify-content-center align-items-center article-navigator button" href="#article-container" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
        <?php
        if ($_SESSION["cond"]["wdsd"]) {
            echo '<div class="row justify-content-around mt-2 ui" id="analysis-bar">
          ';
            foreach (["wd_lr", "wd_e", "sd_s"] as $i) {
                if ($_SESSION["cond"][$i] == 1) {
                    include("s/" . $i . ".html");
                }
            };
            echo "</div>
          ";
        }
        ?>
    </header>
    <main role="main">
        <div class="container position-relative h-100">
        <div class="mt-5" id="additional-content"></div>
            <div class="row py-2 system" id="article">
                <div class="col py-1 px-3">
                    <div id="article-container" class="carousel slide" data-bs-touch="false" data-ride="carousel" data-interval="false">
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
            <div class="col align-self-center" id="app-instructions"></div>
        </div>
        <div class="row mt-auto pb-3 pt-1">
            <div class="col d-flex align-items-center justify-content-center" id="app-controls">
            </div>
        </div>
    </footer>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/ui.js"></script>
    <script type="text/javascript">
        cond = <?php echo json_encode($_SESSION["cond"]);?>;
        articles = <?php echo json_encode($_SESSION["articles"]);?>;
        step_start = <?php echo json_encode($_SESSION["step"]) ?>;
    </script>
    <?php if ($_SESSION["cond"]["wd_lr"] | $_SESSION["cond"]["wd_e"]) echo '<script src="js/wd.js"></script>';
     if ($_SESSION["cond"]["sd_s"]) echo '<script src="js/sd_s.js"></script>';?>
    <script src="js/app.js"></script>
</body>

</html>
<!-- TODO:
  * Add failsafe (save intermediate steps) -->