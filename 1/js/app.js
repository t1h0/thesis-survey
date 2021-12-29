function logSql(data_raw, run = 1) {
    if (run <= 3) {
        $.post("sqlLog.php", data_raw, (response) => {
            if (response == 0) {
                logSql(data_raw, ++run);
            }
        });
    };
}

function block(keep, allowInteract = false, keepHighlight = false, allowScroll = false) {
    if (!$("#grayBlocker").length) {
        $("body").append('<div id="grayBlocker" class="blocker"></div>');
        $("#grayBlocker").css("opacity", "0.3");
    }
    if (!allowScroll) {
        $("body").addClass("scrollBlock");
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
    $(".scrollBlock").removeClass("scrollBlock");
    $(".app-show").removeClass("app-show app-show-highlight");

}

function addContent(content) {
    if (content) {
        $(".system").addClass("d-none");
        $("#additional-content").removeClass("d-none");
        $("#additional-content").html(content);
    } else {
        $(".system").removeClass("d-none");
        $("#additional-content").addClass("d-none");
    }
    $("main").css("padding-bottom", $("#app").outerHeight());
}

function instr(instruction) {
    $("#app-instructions").html(instruction);
    // Recalculating padding-bottom of article (main)
    $("main").css("padding-bottom", $("#app").outerHeight());
}

function control(text = "Continue") {
    if (!$("#app-button").length) {
        $("#app-controls").append($("<button id='app-button'></button>").addClass("btn button").text(text).click(() => { procedure.go() }));
    } else if (!text) {
        $("#app-button").remove();
    } else {
        $("#app-button").text(text);
    }
}

function go(toState) {
    if (typeof(toState) == "string") {
        state = toCase;
    } else if (typeof(window.nextState) == "undefined") {
        state = "start";
    } else {
        state = window.nextState;
    }
    logSql({ "state": state });
}

// Procedure

class Procedure {
    constructor(procedure = new Map()) {
        this.procedure = procedure;
        this.keys = [...this.procedure.keys()];
    }

    go(toState, insert = false) {
        switch (typeof(toState)) {
            case "number":
                this.procedure.get(this.keys[toState])();
                if (!insert) this.state = toState;
                break;
            case "string":
                this.procedure.get(toState)();
                this.state = this.keys.find((key) => {
                    return key == toState;
                })
                break;
            default:
                if (typeof(this.state) !== "undefined") this.state++;
                else {
                    this.state = 0;
                }
                this.procedure.get(this.keys[this.state])();
        }
    }

}

procedure = new Procedure(new Map([
    ["start", function() {
        control();
        instr();
        addContent("<p>Welcome!</p><p>Welcome to this study, which takes most people about 5-15 minutes to complete.</p><p>After conscientious completion of this survey, you will receive 1.50 £ as compensation for your efforts. Therefore, please only continue if you can expect to answer questions for 5-15 minutes without interruptions.</p>");
    }],
    ["consent", function() {
        addContent("<p><strong>Study Information</strong></p><p class='text-left'>You are invited to participate in a research study that is being conducted by a research team at the University of Konstanz, Germany. The purpose of this study is to elicit your personal impression of different news coverage. We also ask you some demographic questions.</p><p class='text-left'>Participating in the research is not anticipated to cause you any disadvantages or discomfort. The potential physical and/or psychological harm or distress will be the same as any experienced in everyday life.</p><p class='text-left'>The University of Konstanz is the sponsor for this study. We will use the information that you provide in order to undertake this study and will act as the data controller for this study. This means that we are responsible for looking after your information and using it properly.</p><p class='text-left'>The data that you provide will be only connected to your Prolific ID and anonymised at the earliest point in time. That is, after completion and compensation, the ID will be deleted from the dataset used for scientific analyses. Your anonymised data will only be associated with the demographic information you provided in the beginning of the questionnaire. Access to your anonymized data might be given to other researchers, including researchers from outside the University of Konstanz. Once the study is published, the anonymised data might be made available on a public data repository. Your rights to access, change or move your information are limited, as we need to manage your information in specific ways for the research to be reliable and accurate. Once anonymised, we will not be able to delete your data.</p><p class='text-left'>Participation in the study is voluntary and you can end your participation at any time by closing the survey window. You will only receive compensation for full, conscientious participation.</p><p class='text-left'>If you have any questions or concerns you can contact the head researcher Timo Spinde (timo.spinde@uni-konstanz.de). Please also contact Timo Spinde, in case you wish to complain about any aspect of the way in which you have been approached or teated during the course of this study.</p>");
        instr("<p class='font-weight-bold'>Declaration of Consent</p><form id='consent_declaration'><input type='checkbox' class='form-check-input' id='consent' name='consent_confirmation' value='confirm'> <label for='consent'>I have read and I agree with the above information and declare my consent. I also confirm I am 18 years old or older.</label></form>");
    }],
    ["tut1_start", function() {
        block();
        instr("You are now going to learn about the functionality of this app before you will actually use it.");
    }],
    ["tut1_main", function() {
        unblock();
        block($("main"));
        instr("You see the currently selected article in the app's main section.");
    }],
    ["tut1_sdwd", function() {
        if (s["sd"] | s["wd"]) {
            instr("The app includes a helper system which provides support in detecting bias in news articles.")
            return;
        }
        procedure.go();
    }],
    ["tut1_sd", function() {
        unblock();
        if (s["sd"]) { //sentence detection active?
            block($(".sd"));
            instr("Our system highlights sentences with a gray background, if it detects them as biased.");
            return;
        }
        procedure.go();
    }],
    ["tut1_wd", function() {
        unblock();
        if (s["wd"]) { //word detection active?
            block($(".wd"), false, true);
            instr("Our system highlights phrases with a dotted underline, if it detects them as biased.");
            return;
        }
        procedure.go();
    }],
    ["tut1_controlBar", function() {
        $("body").prepend(
            $("#reader-control").clone(true).addClass("app-show-temp")
        );
        unblock();
        block($(".app-show-temp"));
        instr("On top you see the app's control bar.");
    }],
    ["tut1_articleSwitch", function() {
        control(null);
        block($("main")); // transparentBlock still active from tut1_controlBar!
        $(".app-show-temp").attr("style", "z-index: 4500 !important"); // put temp on top of all blocks
        $(".article-navigator").on("click.temp", go);
        instr("<p>To switch between two articles, click on the arrow buttons in the top left and top right corner.</p><p>Try it!</p>");
    }],
    ["tut1_articleSwitch_success", function() {
        $(".article-navigator").off("click.temp");
        instr("Very good!");
        control();
    }],
    ["tut1_analysisBar", function() {
        $(".app-show-temp").remove();
        $("#articleId").text("A");
        unblock();
        if (s["wdlr"] || s["wde"] || s["wds"]) {
            block($("header"), true);
            instr("Below the reader controls you see the helper system's analysis bar. It provides you with helpful information about how biaed or neutral the current article is written.");
            return;
        }
        go("tut1_scroll");
    }],
    ["tut1_clickOnPhrase", function() {
        unblock();
        block($("header, main"), true);
        $(".wd").on("click.temp", go);
        instr("<p>If you click on a biased phrase (highlighted with a dotted underline), the helper system will provide you with additional information about the phrase.</p><p>Try it!</p>");
        control(null);
    }],
    ["tut1_clickOnPhrase_success", function() {
        block($("header, main"));
        $(".wd").off("click.temp");
        instr("Very good!");
        control();
    }],
    ["tut1_wdlr", function() {
        if (s["wdlr"]) {
            instr("The <span class='font-italic'>Left-Right Stance</span> indicates the average political stance of newspapers, that characteristically use this phrase in articles about the current topic. It ranges from politically left (L) to politically right (R).")
            $("#wd-component-lr").addClass("app-show-highlight-sb");
            return;
        }
        procedure.go();
    }],
    ["tut1_wde", function() {
        $("#wd-component-lr").removeClass("app-show-highlight-sb");
        if (s["wde"]) {
            instr("The <span class='font-italic'>Establishment Stance</span> indicates the average stance towards the establishment of newspapers, that characteristically use this phrase in articles about the current topic. It ranges from contra (-) to pro (+) establishment.")
            $("#wd-component-e").addClass("app-show-highlight-sb");
            return;
        }
        procedure.go();
    }],
    ["tut1_wds", function() {
        $("#wd-component-e").removeClass("app-show-highlight-sb");
        if (s["wds"]) {
            instr("The <span class='font-italic'>Synonyms Box</span> shows you an alternative phrase with the same meaning as the selected phrase but neutral in its nature.")
            $("#wd-component-s").addClass("app-show-highlight-sb");
            return;
        }
        procedure.go();
    }],
    ["tut1_clickAnywhere", function() {
        $("#wd-component-s").removeClass("app-show-highlight-sb");
        unblock();
        block($("header, main"), true);
        $(".article-navigator, main").on("click.temp", go);
        instr("<p>Click anywhere on the article besides a biased phrase or switch to the other article and the analysis bar will reset.</p><p>Try it!</p>");
        control(null);
    }],
    ["tut1_clickAnywhere_success", function() {
        $(".article-navigator, main").off("click.temp");
        instr("Very good!");
        control();
    }],
    ["tut1_scroll", function() {
        unblock();
        control(null);
        instr("<p>Finally, to continue reading and see the full article, scroll up and down on your device.</p><p>Try it!</p>");
        $(window).on("scroll.temp", go);
    }],
    ["tut1_scroll_success", function() {
        instr("Very good!");
        $(window).off("scroll.temp");
        control();
    }],
    ["tut1_end", function() {
        instr("<p>Please take some time now to make yourself familiar with the app. Once you're finished, press Start to begin your duty as chief-editor.");
        control("Start");
    }],
    ["task1_start", function() {
        // TO DO: load articles
        instr("<p>Article A and article B are now two articles, that reporters of the your newspaper wrote about the <span class='font-italic'>Kyle Rittenhouse</span> trial.");
        control();
    }],
    ["task1_decide", function() {
        instr("Please read both articles and then choose, which article uses the most neutral language:</p><form id='article_choice'><input type='radio' id='a' name='article_choice' value='A'> <label for='a'>Article A</label><br><input type='radio' id='b' name='article_choice' value='B'> <label for='b'>Article B</label></form>");
        control(null);
        $(".article-navigator").on("click.temp", go);
    }],
    ["task1_activateSubmit", function() {
        control();
        $(".article-navigator").off("click.temp");
    }],
]));

$(document).ready(function() {
    procedure.go();
});