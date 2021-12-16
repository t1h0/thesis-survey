function block(keep, allowInteract = false, keepHighlight = false, allowScroll = false) {
    if (!$("#grayBlocker").length) {
        $("body").append('<div id="grayBlocker" class="blocker"></div>');
        $("#grayBlocker").css("opacity", "0.3");
    }
    if (!allowScroll) {
        $("body").css("overflow", "hidden");
    }
    if (keep) {
        if (!allowInteract) {
            if (!$("#transparentBlocker").length) {
                $("body").append('<div id="transparentBlocker" class="blocker"></div>');
            }
        }
        keep.addClass("app-show");
        if (keepHighlight) keep.addClass("app-show-highlight");
    }
}

function unblock() {
    // Undo older blocking
    if ($(".blocker").length) {
        $(".blocker").remove();
    }
    $("body").css("overflow", "visible");
    $(".app-show").removeClass("app-show app-show-highlight");

}

function instr(instruction) {
    $("#app-instructions").html(instruction);
    // Recalculating padding-bottom of article (main)
    $("main").css("padding-bottom", $("#app").outerHeight());
}

function control(text = "Continue") {
    if (!$("#app-button").length) {
        $("#app-controls").append(
            $("<button id='app-button'></button>").addClass("btn button").text(text).click(go)
        );
    } else if (!text) {
        $("#app-button").remove();
    } else {
        $("#app-button").text(text);
    }
}

function go(toCase) {
    if (typeof(toCase) == "number") {
        state = toCase;
    } else {
        state++;
    }
    switch (state) {
        case 1:
            block();
            instr("You are now going to learn about the functionality of this app before you will actually use it.");
            break;
        case 2:
            unblock();
            block($("main"));
            instr("You see the currently selected article in the app's main section.");
            break;
        case 3:
            if (s["sd"] | s["wd"]) {
                instr("The app includes a helper system which provides support in detecting bias in news articles.")
                break;
            }
            state++;
        case 4:
            unblock();
            if (s["sd"]) { //sentence detection active?
                block($(".sd"));
                instr("Our system highlights sentences with a gray background, if it detects them as biased.");
                break;
            }
            state++;
        case 5:
            unblock();
            if (s["wd"]) { //word detection active?
                block($(".wd"), false, true);
                instr("Our system highlights phrases with a dotted underline, if it detects them as biased.");
                break;
            }
            state++;
        case 6:
            $("body").prepend(
                $("#reader-control").clone(true).addClass("app-show-temp")
            );
            unblock();
            block($(".app-show-temp"));
            instr("On top you see the app's control bar.");
            break;
        case 7:
            control(null);
            block($("main")); // transparentBlock still active from case 5!
            $(".app-show-temp").attr("style", "z-index: 4500 !important"); // put temp on top of all blocks
            $(".article-navigator").on("click.temp", go);
            instr("<p>To switch between two articles, click on the arrow buttons in the top left and top right corner.</p><p>Try it!</p>");
            break;
        case 8:
            $(".article-navigator").off("click.temp");
            instr("Very good!");
            control();
            break;
        case 9:
            $(".app-show-temp").remove();
            $("#articleId").text("A");
            unblock();
            if (s["wdlr"] || s["wde"] || s["wds"]) {
                block($("header"), true);
                instr("Below the reader controls you see the helper system's analysis bar. It provides you with helpful information about how biaed or neutral the current article is written.");
                break;
            }
            go(17);
            break;
        case 10:
            unblock();
            block($("header, main"), true);
            $(".wd").on("click.temp", go);
            instr("<p>If you click on a biased phrase (highlighted with a dotted underline), the helper system will provide you with additional information about the phrase.</p><p>Try it!</p>");
            control(null);
            break;
        case 11:
            block($("header, main"));
            $(".wd").off("click.temp");
            instr("Very good!");
            control();
            break;
        case 12:
            if (s["wdlr"]) {
                instr("The <span class='font-italic'>Left-Right Stance</span> indicates the average political stance of newspapers, that characteristically use this phrase in articles about the current topic. It ranges from politically left (L) to politically right (R).")
                $("#wd-component-lr").addClass("app-show-highlight-sb");
                break;
            }
            state++;
        case 13:
            $("#wd-component-lr").removeClass("app-show-highlight-sb");
            if (s["wde"]) {
                instr("The <span class='font-italic'>Establishment Stance</span> indicates the average stance towards the establishment of newspapers, that characteristically use this phrase in articles about the current topic. It ranges from contra (-) to pro (+) establishment.")
                $("#wd-component-e").addClass("app-show-highlight-sb");
                break;
            }
            state++;
        case 14:
            $("#wd-component-e").removeClass("app-show-highlight-sb");
            if (s["wds"]) {
                instr("The Synonyms Box shows you an alternative phrase with the same meaning as the selected phrase but neutral in its nature.")
                $("#wd-component-s").addClass("app-show-highlight-sb");
                break;
            }
            state++;
        case 15:
            $("#wd-component-s").removeClass("app-show-highlight-sb");
            unblock();
            block($("header, main"), true);
            $(".article-navigator, main").on("click.temp", go);
            instr("<p>Click anywhere on the article besides a biased phrase or switch to the other article and the analysis bar will reset.</p><p>Try it!</p>");
            control(null);
            break;
        case 16:
            $(".article-navigator, main").off("click.temp");
            instr("Very good!");
            control();
            break;
        case 17:
            unblock();
            control(null);
            instr("<p>Finally, to continue reading and see the full article, scroll up and down on your device.</p><p>Try it!</p>");
            $(window).on("scroll.temp", go);
            break;
        case 18:
            instr("Very good!");
            $(window).off("scroll.temp");
            control();
            break;
        case 19:
            instr("<p>Please take some time now to make yourself familiar with the app. Once you're finished, press Start to begin your duty as chief-editor.");
            control("Start");
            break;
    }
}
$(document).ready(function() {
    control();
    state = 17;
    go();
});