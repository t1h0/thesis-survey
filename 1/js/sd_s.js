function resetSentences() {
    // deactivate sentence
    $(".sd-active").removeClass("sd-active");
    $("#sd_s").text("···");
}
$(document).ready(function() {
    $(".article-navigator").click(resetSentences);
    $(".sd").click(function(e) { // assigning click function to detected words
        e.stopPropagation(); // to prevent immediate automatic click on main

        $(".sd-active").removeClass("sd-active");

        $(this).addClass("sd-active"); // activating clicked sentence (this)
        $("#sd_s").text($(this).attr("sd_s"));
    });
    $("main").click(resetSentences);
});