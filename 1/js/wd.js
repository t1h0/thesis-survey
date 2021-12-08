function resetWords(){
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
        if (s.wds) { // synonym detection active?
            $("#wds").text("···");
        };
    };
}
$(document).ready(function () {
    switch(s["wdlr"]+s["wde"]+s["wds"]){ // setting system header layout according to number of system components
        case 3:
            $(".wd-component-wrapper-s").addClass("col-xl-4");
            $(".wd-component-wrapper-lre").addClass("col-xl-4 col-lg-6");
            break;
        case 2:
            $(".wd-component-wrapper-s,.wd-component-wrapper-lre").addClass("col-lg-6");
            break;
        case 1:
            $(".wd-component-wrapper-s,.wd-component-wrapper-lre").addClass("col-12");
            break;
    }
    active = null; // contains active (clicked) word
    $(".article-navigator").click(resetWords);
    $(".wd").click(function (e) { // assigning click function to detected words
            e.stopPropagation();
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
    $("div[role='main']").click(function () { 
        resetWords();
    }); 
});