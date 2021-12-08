<!doctype html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
  <link rel="stylesheet" href="css/style.css">
  <?php
  $s = [];
  foreach (["wdlr", "wde", "wds", "sd"] as $i) { // validating get variables
    $s[$i] = isset($_GET[$i]) && $_GET[$i] == 1; // tranforming into local array
    if ($s[$i]) echo '<link rel="stylesheet" href="css/' . $i . '.css">
    '; // including respective css-files
  }
  $s["wd"] = ($s["wdlr"] || $s["wde"] || $s["wds"]); // adding general wd css
  if ($s["wd"]) echo '<link rel="stylesheet" href="css/wd.css">
  ';
  ?>
  <title></title>
</head>

<body>
  <header class="container-fluid text-center sticky-top" id="ui">
    <div class="row justify-content-between">
      <div class="col-3 p-0">
        <a id="prev" class="btn w-100 h-100 d-flex justify-content-center align-items-center article-navigator disabled" href="#article-container" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon align-middle" aria-hidden="true"></span>
          <span class="sr-only align-middle">Previous</span>
        </a>
      </div>
      <div class="col d-flex justify-content-center align-items-center">
        <p class="m-0" id="heading">Article <span id="articleId">A</span></p>
      </div>
      <div class="col-3 p-0">
        <a id="next" class="btn w-100 h-100 d-flex justify-content-center align-items-center article-navigator" href="#article-container" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <?php
    if ($s["wd"]) {
      echo '<div class="row justify-content-around mt-2">
          ';
      foreach (["wdlr", "wde", "wds"] as $i) {
        if ($s[$i] == 1) {
          include("s/" . $i . ".html");
        }
      };
      echo "</div>
          ";
    }
    ?>
  </header>
  <div class="container-fluid" role="main">
    <div class="container">
      <div class="row py-2" id="article">
        <div class="col py-1 px-3">
          <div id="article-container" class="carousel slide" data-bs-touch="false" data-ride="carousel" data-interval="false">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <p><span class="sd"><span class="wd" wdlr="100" wde=25 wds="ipsum">Lorem</span> <span class="wd" wdlr=50 wde=70 wds="lorem">ipsum</span> dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                    ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. <span class="sd">Lorem ipsum dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wdlr=34 wde=60 wds="et">accusam</span> et justo duo dolores et
                    ea rebum.</span> Lorem ipsum dolor sit
                  amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                  kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

                <p><span class="sd">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
                    dolore eu feugiat nulla facilisis at vero <span class="wd" wdlr=20 wde=14 wds="quos">eros</span> et accumsan et iusto odio dignissim qui blandit praesent
                    luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</span> Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat.</p>

                <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
                  ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                  consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
                  qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>

                <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat
                  facer possim assum. <span class="sd"><span class="wd" wdlr=100 wde=25 wds="ipsum">Lorem</span> <span class="wd" wdlr=50 wde=70 wds="lorem">ipsum</span> dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                    ea rebum.</span> Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>

                <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
                  dolore eu feugiat nulla facilisis.</p>

                <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                  sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam
                  diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet
                  clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum
                  dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>

                <p><span class="sd"><span class="wd" wdlr=100 wde=25 wds="ipsum">Lorem</span> <span class="wd" wdlr=50 wde=70 wds="lorem">ipsum</span> dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                    ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. <span class="sd">Lorem ipsum dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wdlr=34 wde=60 wds="et">accusam</span> et justo duo dolores et
                    ea rebum.</span> Lorem ipsum dolor sit
                  amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                  kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

                <p><span class="sd">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
                    dolore eu feugiat nulla facilisis at vero <span class="wd" wdlr=20 wde=14 wds="quos">eros</span> et accumsan et iusto odio dignissim qui blandit praesent
                    luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</span> Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat.</p>

                <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
                  ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                  consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
                  qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>

                <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat
                  facer possim assum. <span class="sd"><span class="wd" wdlr=100 wde=25 wds="ipsum">Lorem</span> <span class="wd" wdlr=50 wde=70 wds="lorem">ipsum</span> dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                    ea rebum.</span> Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>

                <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
                  dolore eu feugiat nulla facilisis.</p>

                <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                  sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam
                  diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet
                  clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum
                  dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>
              </div>
              <div class="carousel-item">
                <p><span class="sd"><span class="wd" wdlr=100 wde=25 wds="ipsum">Lorem</span> <span class="wd" wdlr=50 wde=70 wds="lorem">ipsum</span> dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                    ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. <span class="sd">Lorem ipsum dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wdlr=34 wde=60 wds="et">accusam</span> et justo duo dolores et
                    ea rebum.</span> Lorem ipsum dolor sit
                  amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                  kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

                <p><span class="sd">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
                    dolore eu feugiat nulla facilisis at vero <span class="wd" wdlr=20 wde=14 wds="quos">eros</span> et accumsan et iusto odio dignissim qui blandit praesent
                    luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</span> Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat.</p>

                <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
                  ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                  consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
                  qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>

                <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat
                  facer possim assum. <span class="sd"><span class="wd" wdlr=100 wde=25 wds="ipsum">Lorem</span> <span class="wd" wdlr=50 wde=70 wds="lorem">ipsum</span> dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                    ea rebum.</span> Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>

                <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
                  dolore eu feugiat nulla facilisis.</p>

                <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                  sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam
                  diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet
                  clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum
                  dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>

                <p><span class="sd"><span class="wd" wdlr=100 wde=25 wds="ipsum">Lorem</span> <span class="wd" wdlr=50 wde=70 wds="lorem">ipsum</span> dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                    ea rebum.</span> Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. <span class="sd">Lorem ipsum dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et <span class="wd" wdlr=34 wde=60 wds="et">accusam</span> et justo duo dolores et
                    ea rebum.</span> Lorem ipsum dolor sit
                  amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                  kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

                <p><span class="sd">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
                    dolore eu feugiat nulla facilisis at vero <span class="wd" wdlr=20 wde=14 wds="quos">eros</span> et accumsan et iusto odio dignissim qui blandit praesent
                    luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</span> Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat.</p>

                <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
                  ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                  consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
                  qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>

                <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat
                  facer possim assum. <span class="sd"><span class="wd" wdlr=100 wde=25 wds="ipsum">Lorem</span> <span class="wd" wdlr=50 wde=70 wds="lorem">ipsum</span> dolor sit
                    amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                    ea rebum.</span> Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>

                <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
                  dolore eu feugiat nulla facilisis.</p>

                <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                  sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam
                  diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet
                  clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum
                  dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"></script>
  <script src="js/ui.js"></script>
  <script type="text/javascript">
    s = {
      <?php foreach (["wdlr", "wde", "wds"] as $i) {
        echo $i . ": " . json_encode($s[$i]) . ",";
      }; ?>};
  </script>
  <?php if ($s["wd"]) echo '<script src="js/wd.js"></script>' ?>
</body>

</html>