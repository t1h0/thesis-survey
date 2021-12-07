$(document).ready(function () {
    active = null; // contains active (clicked) word
    $(".article-navigator").click(function () { // article is changed
        if (active != null) { // word is active
            // deactivate word
            active.removeClass("wd-active");
            active = null;
            // reset sliders
            ["wdlr", "wde"].forEach(function (i) {
                if (s[i]) { // s contains the php variables and is provided by index.php!
                    $("#" + i).css("margin-left", "calc(50% - 0.5em");
                }
            });
            if (s.wds) { // sentence detection active?
                $("#wds").text("···");
            };
        };
    });
    $(".wd").click(function () { // assigning click function to detected words
            if (active != null) { //deactivating previous active word
                active.removeClass("wd-active");
            }
            $(this).addClass("wd-active"); // activating clicked word (this)
            active = $(this);
            ["wdlr", "wde"].forEach((i) => {
                if (s[i]) {
                    $("#"+i).css("margin-left", "calc(" + active.attr(i) + "% - 0.5em"); //setting sliders to respective attribute values
                }
            });
            if (s.wds) { // sentence detection active?
                $("#wds").text($(this).attr("wds"));
            }
        });
});