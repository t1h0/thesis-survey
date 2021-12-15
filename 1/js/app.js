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
            instr("You will now learn how to use this app. Afterwards, you will decide on which articles are the most neutral ones.");
            break;
        case 2:
            unblock();
            block($("main"));
            instr("The app's main section shows you the currently selected article.");
            break;
        case 3:
            unblock();
            if (s["sd"]) { //sentence detection active?
                block($(".sd"));
                instr("Our system highlights sentences with a gray background, if it detects them as biased.");
                break;
            }
            state++;
        case 4:
            unblock();
            if (s["wd"]) { //word detection active?
                block($(".wd"), false, true);
                instr("Our system highlights phrases with a dotted underline, if it detects them as biased.");
                break;
            }
            state++;
        case 5:
            $("body").prepend(
                $("#reader-control").clone(true).addClass("app-show-temp")
            );
            unblock();
            block($(".app-show-temp"));
            instr("On top you see the app's control bar.");
            break;
        case 6:
            control(null);
            block($("main")); // transparentBlock still active from case 5!
            $(".app-show-temp").attr("style", "z-index: 4500 !important"); // put temp on top of all blocks
            $(".article-navigator").on("click.temp", go);
            instr("<p>If you click on the arrow buttons to the left and to the right, you can switch between two articles.</p><p>Try it!</p>");
            break;
        case 7:
            $(".article-navigator").off("click.temp");
            instr("Very good!");
            control();
            break;
        case 8:
            $(".app-show-temp").remove();
            $("#prev").click();
            $("#articleId").text("A");
            unblock();
            if (s["wdlr"] || s["wde"] || s["wds"]) {
                block($("header"), true);
                instr("At last, you see the analysis bar below the reader controls. It provides you with useful information about how neutral the current article is written.");
                break;
            }
            go(16);
            break;
        case 9:
            unblock();
            $(".wd").on("click.temp", go);
            instr("<p>If you click on a biased phrase (highlighted with a dotted underline), you will be provided with additional information about the phrase.</p><p>Try it!</p>");
            control(null);
            break;
        case 10:
            block($("header, main"));
            $(".wd").off("click.temp");
            instr("Very good!");
            control();
            break;
        case 11:
            if (s["wdlr"]) {
                instr("The Left-Right Stance shows you, if the phrase is typically used by newspapers, that are politically left (L) or right (R). The more the indicator (▲) leans towards a political direction, the more left or right are the newspapers in average, that characteristically use this phrase in articles about this topic.")
                $("#wd-component-lr").addClass("app-show-highlight");
                break;
            }
            state++;
        case 12:
            $("#wd-component-lr").removeClass("app-show-highlight");
            if (s["wde"]) {
                instr("The Establishment Stance shows you, if the phrase is typically used by newspapers, that are contra (-) or pro (+) establishment. The more the indicator (▲) leans towards a direction, the more contra or pro establishment are the newspapers in average, that characteristically use this phrase in articles about this topic.")
                $("#wd-component-e").addClass("app-show-highlight");
                break;
            }
            state++;
        case 13:
            $("#wd-component-e").removeClass("app-show-highlight");
            if (s["wds"]) {
                instr("The Synonyms Area shows you alternative phrases with the same meaning but neutral in nature.")
                $("#wd-component-s").addClass("app-show-highlight");
                break;
            }
            state++;
        case 14:
            $("#wd-component-s").removeClass("app-show-highlight");
            unblock();
            $(".article-navigator, main").on("click.temp", go);
            instr("<p>Click anywhere on the article besides a biased phrase or switch to the other article and the analysis bar will reset.</p><p>Try it!</p>");
            control(null);
            break;
        case 15:
            $(".article-navigator, main").off("click.temp");
            instr("Very good!");
            control();
            break;
        case 16:
            instr("Finally, to continue reading and see the full article, scroll up and down on your device.");
            break;
        case 17:
            instr("<p>Please take some time now to make yourself familiar with the app. Once you're finished, press Start to begin your duty as chief-editor.");
            control("Start");
            break;
    }
}
$(document).ready(function() {
    control();
    state = 0;
    go();
});