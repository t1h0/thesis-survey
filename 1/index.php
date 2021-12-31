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
    foreach (["wd","sd","wdsd"] as $i) {
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
    <main class="container-fluid" role="main">
        <div class="container">
            <div class="m-3" id="additional-content"></div>
            <div class="row py-2 system" id="article">
                <div class="col py-1 px-3">
                    <div id="article-container" class="carousel slide" data-bs-touch="false" data-ride="carousel" data-interval="false">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <p>!<span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
                                    <p><span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
                                    <p><span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
                                    <p><span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
                                    <p><span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
                            </div>
                            <div class="carousel-item">
                            <p><span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
                                    <p><span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
                                    <p><span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
                                    <p><span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
                                    <p><span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."><span class="wd" wd_lr="100" wd_e=25 >Lorem</span> <span class="wd" wd_lr=50 wd_e=70>ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <span class="sd" sd_s="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wd_lr=34 wd_e=60>accusam</span> et justo duo dolores et ea rebum.</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                                    sit amet.</p>
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
        cond = {
            <?php foreach ($_SESSION["cond"] as $k => $v) {
                echo $k . ": " . json_encode($v) . ",";
            }; ?>};
    </script>
    <?php if ($_SESSION["cond"]["wdsd"]) echo '<script src="js/wdsd.js"></script>' ?>
    <script src="js/app.js"></script>
</body>

</html>
<!-- TODO:
  * Add failsafe (save intermediate steps) -->