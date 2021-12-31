function resetWords() {
    // deactivate word
    $(".wd-active").removeClass("wd-active");
    $(".sd-active").removeClass("sd-active");
    // reset sliders
    ["wd_lr", "wd_e"].forEach(function(i) {
        if (cond[i]) { // cond contains the php variables and is provided by index.php!
            $("#" + i).css("margin-left", "calc(50% - 0.5em");
        }
    });
    if (cond.sd_s) { // synonym detection active?
        $("#sd_s").text("···");
    };
}
$(document).ready(function() {
    // switch (cond["wd_lr"] + cond["wd_e"] + cond["sd_s"]) { // setting system header layout according to number of system components
    //     case 3:
    //         $(".wd-component-wrapper-s").addClass("col-xl-4");
    //         $(".wd-component-wrapper-lre").addClass("col-xl-4 col-lg-6");
    //         break;
    //     case 2:
    //         $(".wd-component-wrapper-s,.wd-component-wrapper-lre").addClass("col-lg-6");
    //         break;
    //     case 1:
    //         $(".wd-component-wrapper-s,.wd-component-wrapper-lre").addClass("col-12");
    //         break;
    // }
    $(".article-navigator").click(resetWords);
    $(".wd").click(function(e) { // assigning click function to detected words
        // e.stopPropagation(); // to prevent immediate automatic click on main

        //deactivating potential previous active word or sentence
        $(".wd-active").removeClass("wd-active");
        // $(".sd-active").removeClass("sd-active");

        $(this).addClass("wd-active"); // activating clicked word (this)
        // $(this).parent("span.sd").addClass("sd-active"); // activating sentence containing this
        ["wd_lr", "wd_e"].forEach((i) => {
            if (cond[i]) {
                $("#" + i).css("margin-left", "calc(" + $(".wd-active").attr(i) + "% - 0.5em"); //setting sliders to respective attribute values
            }
        });
        // if (cond.sd_s) { // sentence detection active?
        //     $("#sd_s").text($(this).parent("span.sd").attr("sd_s"));
        // }
    });
    $(".sd").click(function(e) { // assigning click function to detected words
        e.stopPropagation(); // to prevent immediate automatic click on main

        //deactivating potential previous active word or sentence
        // $(".wd-active").removeClass("wd-active");
        $(".sd-active").removeClass("sd-active");

        $(this).addClass("sd-active"); // activating clicked sentence (this)
        if (cond.sd_s) { // sentence detection active?
            $("#sd_s").text($(this).attr("sd_s"));
        }
    });
    $("main").click(function() {
        resetWords();
    });
});