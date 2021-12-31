function resetWords() {
    // deactivate word
    $(".wd-active").removeClass("wd-active");
    // reset sliders
    ["wd_lr", "wd_e"].forEach(function(i) {
        if (cond[i]) { // cond contains the php variables and is provided by index.php!
            $("#" + i).css("margin-left", "calc(50% - 0.5em");
        }
    });
}
$(document).ready(function() {
    $(".article-navigator").click(resetWords);
    $(".wd").click(function(e) { // assigning click function to detected words
        if (!cond.sd_s) {
            e.stopPropagation(); // to prevent immediate automatic click on main
        }

        //deactivating potential previous active word or sentence
        $(".wd-active").removeClass("wd-active");

        $(this).addClass("wd-active"); // activating clicked word (this)
        ["wd_lr", "wd_e"].forEach((i) => {
            if (cond[i]) {
                $("#" + i).css("margin-left", "calc(" + $(".wd-active").attr(i) + "% - 0.5em"); //setting sliders to respective attribute values
            }
        });
    });
    $("main").click(resetWords);
});