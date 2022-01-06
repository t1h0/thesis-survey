// sd_s

function resetSentences() {
    // deactivate sentence
    $(".sd-active").removeClass("sd-active");
    $("#sd_s").text("···");
}

function prepareSD_S() {
    $(".article-navigator").click(resetSentences);
    $(".sd").click(function(e) { // assigning click function to detected words
        e.stopPropagation(); // to prevent immediate automatic click on main

        $(".sd-active").removeClass("sd-active");

        $(this).addClass("sd-active"); // activating clicked sentence (this)
        $("#sd_s").text($(this).attr("sd_s"));
    });
    $("main").click(resetSentences);
};

// wd_lr + wd_e

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

function prepareWD_LRE() {
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
};

// General

function logSql(data_raw, run = 1) {
    $("#loading-icon").removeClass("d-none");
    if (run <= 3) {
        $.post("sqlLog.php", data_raw, (response) => {
            if (response == 0) {
                logSql(data_raw, ++run);
            };
        });
    };
    $("#loading-icon").addClass("d-none");
};


function unblock(target, removeHighlight = true) {
    if (!target) target = $(".scrollBlock, .grayBlock, .actionBlock");
    target.add(target.find("*")).removeClass("scrollBlock grayBlock actionBlock");
    if (removeHighlight) $(".app-show-highlight").removeClass("app-show-highlight");

};

function block(except, allowInteract = false, excHighlight = false, allowScroll = false, unblockFirst = true) {
    if (unblockFirst) unblock();
    if (!allowScroll) {
        $("body").addClass("scrollBlock");
    };
    keep = $("#app, #loading-icon");
    if (except) {
        keep = keep.add(except);
        if (!allowInteract) except.addClass("actionBlock");
        if (excHighlight) except.addClass("app-show-highlight-sb");
    }
    keepExt = $("body *").has(keep).add(keep.find("*")).add(keep);
    dontKeep = $("body *").not(keepExt);
    topLevelDontKeep = dontKeep.not(dontKeep.children()).not("script");
    topLevelDontKeep.addClass("grayBlock actionBlock");
};

function adContent(content) {
    if (content) {
        $(".system").addClass("d-none");
        $("#additional-content").html(content);
        $("#additional-content").removeClass("d-none");
    } else {
        $(".system").removeClass("d-none");
        $("#additional-content").addClass("d-none");
    };
};

function instr(instruction) {
    $("#app-instructions").html(instruction);
    // Recalculating padding-bottom of article (main)
    $("main").css("padding-bottom", $("#app").outerHeight());
    $("#loading-icon").css("transform", "translateX(-50%) translateY(calc(-50% - " + $("#app").outerHeight() + "))");
};

function control(text = null, customHTML = null) {
    $("#app-controls").empty();
    if (!text) {
        $("#app-controls").html(customHTML);
    } else {
        $("#app-controls").append($("<button id='app-button'></button>").addClass("btn button").text(text).click(function() {
            procedure.go()
        }));
    };
};

// function go(toState) {
//     if (typeof(toState) == "string") {
//         state = toCase;
//     } else if (typeof(window.nextState) == "undefined") {
//         state = "start";
//     } else {
//         state = window.nextState;
//     }
//     logSql({ "state": state });
// }

// Procedure

class Procedure {
    constructor(proc = new Map()) {
        this.proc = proc;
        this.keys = [...this.proc.keys()];
    };

    go(toState, insert = false) {
        control("Continue");
        switch (typeof(toState)) {
            case "number":
                if (!insert) this.state = toState;
                this.proc.get(this.keys[toState])();
                break;
            case "string":
                this.state = this.keys.indexOf(toState);
                this.proc.get(toState)();
                break;
            default:
                if (typeof(this.state) !== "undefined") this.state++;
                else {
                    this.state = 0;
                };
                this.proc.get(this.keys[this.state])();
        };
    };

}

procedure = new Procedure(new Map([
    ["survey_start", function() {
        instr();
        adContent("<div class='col'><h2>Welcome!</h2><p>Welcome to this study, which takes most people about 5-15 minutes to complete.</p><p>After conscientious completion of this survey, you will receive 1.50 £ as compensation for your efforts. Therefore, please only continue if you can expect to answer questions for 5-15 minutes without interruptions.</p></div>");
    }],
    ["consent", function() {
        $("#app-button").prop("disabled", true);
        adContent("<div class='col'><h2>Study Information</h2><p>You are invited to participate in a research study that is being conducted by a research team at the University of Konstanz, Germany. The purpose of this study is to elicit your personal impression of different news coverage. We also ask you some demographic questions.</p><p>Participating in the research is not anticipated to cause you any disadvantages or discomfort. The potential physical and/or psychological harm or distress will be the same as any experienced in everyday life.</p><p>The University of Konstanz is the sponsor for this study. We will use the information that you provide in order to undertake this study and will act as the data controller for this study. This means that we are responsible for looking after your information and using it properly.</p><p>The data that you provide will be only connected to your Prolific ID and anonymised at the earliest point in time. That is, after completion and compensation, the ID will be deleted from the dataset used for scientific analyses. Your anonymised data will only be associated with the demographic information you provided in the beginning of the questionnaire. Access to your anonymized data might be given to other researchers, including researchers from outside the University of Konstanz. Once the study is published, the anonymised data might be made available on a public data repository. Your rights to access, change or move your information are limited, as we need to manage your information in specific ways for the research to be reliable and accurate. Once anonymised, we will not be able to delete your data.</p><p>Participation in the study is voluntary and you can end your participation at any time by closing the survey window. You will only receive compensation for full, conscientious participation.</p><p>If you have any questions or concerns you can contact the head researcher Timo Spinde (timo.spinde@uni-konstanz.de). Please also contact Timo Spinde, in case you wish to complain about any aspect of the way in which you have been approached or teated during the course of this study.</p></div>");
        instr(`
        <p class='fw-bolder'>Declaration of Consent</p>
        <form id='consent_declaration' action="">
            <div class="form-check">
            <input class="form-check-input form-check-lg" type="checkbox" value=1 id="consent" required>
            <label class="form-check-label" for="consent">
                I have read and I agree with the above information and declare my consent. I also confirm I am 18 years old or older.
            </label>
            </div>
        </form>`);
        control(undefined, `<input type="submit" form="consent_declaration" class="button btn" value="Continue"/>`);
        $("#consent_declaration").submit(function() {
            logSql({
                "consent": "1",
            });
            procedure.go();
            return false;
        });
    }],
    ["demographics", function() {
        adContent(`
        <h2 class="col-12"><h2>Demographics</h3>
        <form action="" class="row g-4" id="demographics">
            <div class="col-12">
                <h4>What is your gender?</h4>
                <select class="form-select form-select-lg mt-4" id="gender" required>
                    <option selected disabled value="">Please select..</option>
                    <option value=0>Female</option>
                    <option value=1>Male</option>
                    <option value=2>Other</option>
                    <option value=3>I don't wish to respond</option>
                </select>
            </div>
            <div class="col-12">
                <h4>What is your level of English proficiency?</h4>
                <select class="form-select form-select-lg mt-4" id="english" required>
                    <option selected disabled value="">Please select..</option>
                    <option value=0>Native speaker</option>
                    <option value=1>Non-native speaker</option>
                </select>
            </div>
            <div class="col-12">
                <h4>What is your age?</h4>
                <input class="col-12 form-control form-control-lg mt-4" type="number" step=1 id="age" placeholder="Please state your age.." required>
            </div>
            <div class="col-12">
                <h4>What is the highest level of schooling you have completed?</h4>
                <select class="form-select form-select-lg mt-4" id="school" required>
                    <option selected disabled value="">Please select..</option>
                    <option value=0>8th grade</option>
                    <option value=1>Some high school</option>
                    <option value=2>High school graduate</option>
                    <option value=3>Vocational or technical school</option>
                    <option value=4>Some college</option>
                    <option value=5>Associate degree</option>
                    <option value=6>Bachelor's degree</option>
                    <option value=7>Graduate work</option>
                </select>
            </div>
        </form>`);
        control(undefined, `<input type="submit" form="demographics" class="button btn" value="Continue"/>`);
        $("#demographics").submit(function() {
            logSql({
                "dem_gender": $("#gender").val(),
                "dem_eng": $("#eng").val(),
                "dem_age": $("#age").val(),
                "dem_school": $("#school").val(),
            });
            procedure.go();
            return false;
        });
        instr("Please answer all the questions above.");
    }],
    ["political_stance", function() {
        adContent(`
        <h2 class="col-12"><h2>Political stance</h3>
        <form action="" class="row g-4" id="form_political_stance">
            <div class="col-12">
                <h4>Do you consider yourself to be liberal, conservative, or somewhere in between?</h4>
                <div class="d-flex justify-content-center mt-5">
                <div class="" style="width:312px">
                <label for="political_stance" class="form-label float-start">Very liberal</label>
                <label for="" class="form-label float-end">Very conservative</label>
                <input type="range" class="form-range" id="political_stance" required>
                </div>
                </div>
            </div>
        </form>`);
        control(undefined, `<input type="submit" form="form_political_stance" class="button btn" value="Submit"/>`);
        $("#form_political_stance").submit(function() {
            logSql({
                "political_stance": $("#political_stance").val(),
            });
            procedure.go();
            return false;
        });
        instr("Please answer all the questions above.");
    }],
    ["tut1_start", function() {
        tut1_articles = ["articles/tut1/1.html", "articles/tut1/1.html"];
        $(".carousel-item").each(function(index) {
            $(this).load(tut1_articles[index], () => {
                if (cond.sd_s) {
                    prepareSD_S();
                }
                if (cond.wd_lr || cond.wd_e) {
                    prepareWD_LRE();
                }
                $(".sd, .wd").addClass("wdsd-hidden");
            });
        });
        adContent(null);
        block();
        instr("You are now going to learn about the functionality of this app before you will actually use it.");
    }],
    ["tut1_main", function() {
        block($("main"));
        instr("You see the currently selected article in the app's main section.");
    }],
    ["tut1_sdwd", function() {
        if (cond["sd"] || cond["wd"]) {
            instr("The app includes a helper system which provides support in detecting bias in news articles.")
            return;
        }
        procedure.go();
    }],
    ["tut1_sd", function() {
        if (cond["sd"]) { //sentence detection active?
            block($(".sd"));
            $(".sd").removeClass("wdsd-hidden")
            instr("Our system highlights sentences with a gray background, if it detects them as biased.");
            return;
        }
        procedure.go();
    }],
    ["tut1_wd", function() {
        if (cond["wd"]) { //word detection active?
            block($(".wd"));
            $(".wd").removeClass("wdsd-hidden")
            instr("Our system highlights phrases with a dotted underline, if it detects them as biased.");
            return;
        }
        procedure.go();
    }],
    ["tut1_controlBar", function() {
        block($("#reader-control"));
        instr("On top you see the app's control bar.");
    }],
    ["tut1_articleSwitch", function() {
        control();
        unblock($("main"), false);
        $("#reader-control").removeClass("actionBlock");
        $(".article-navigator").on("click.temp", () => { procedure.go() });
        instr("<p>To switch between two articles, click on the arrow buttons in the top left and top right corner.</p><p>Try it!</p>");
    }],
    ["tut1_articleSwitch_success", function() {
        $(".article-navigator").off("click.temp");
        instr("Very good!");
    }],
    ["tut1_analysisBar", function() {
        if (cond["wdsd"]) {
            block($("header"));
            instr("Below the reader controls you see the helper system's analysis bar. It provides you with helpful information about how biased or neutral the current article is written.");
        } else {
            procedure.go("tut1_scroll");
        }
    }],
    ["tut1_clickOnSentence", function() {
        if (cond.sd_s) {
            unblock();
            $(".sd").on("click.temp", () => { procedure.go() });
            instr("<p>If you click on a biased sentence (highlighted with a gray background), the helper system will provide you with additional information about the sentence.</p><p>Try it!</p>");
            control();
        } else procedure.go("tut1_clickOnPhrase");
    }],
    ["tut1_clickOnSentence_success", function() {
        $(".sd").off("click.temp");
        instr("Very good!");
    }],
    ["tut1_sd_s", function() {
        instr("<p>The <span class='font-italic'>Synonyms Box</span> shows you an alternative sentence with the same meaning as the selected sentence but neutral in its nature.</p>")
        $("#sd_s-component").addClass("app-show-highlight");
    }],
    ["tut1_clickOnPhrase", function() {
        $(".app-show-highlight").removeClass("app-show-highlight");
        if (cond.wd_lr || cond.wd_e) {
            unblock();
            $(".wd").on("click.temp", () => { procedure.go() });
            instr("<p>If you click on a biased phrase (highlighted with a dotted underline), the helper system will provide you with additional information about the phrase.</p><p>Try it!</p>");
            control();
        } else procedure.go("tut1_clickAnywhere");
    }],
    ["tut1_clickOnPhrase_success", function() {
        $(".wd").off("click.temp");
        instr("Very good!");
    }],
    ["tut1_wd_lr", function() {
        if (cond.wd_lr) {
            instr("<p>The <span class='font-italic'>Left-Right Stance</span> indicates the average political stance of newspapers, that characteristically use the selected phrase in articles about the current topic. It ranges from politically left (L) to politically right (R).</p>")
            $("#wd_lr-component").addClass("app-show-highlight");
        } else procedure.go();
    }],
    ["tut1_wd_e", function() {
        $(".app-show-highlight").removeClass("app-show-highlight");
        if (cond.wd_e) {
            instr("<p>The <span class='font-italic'>Establishment Stance</span> indicates the average stance towards the establishment of newspapers, that characteristically use the selected phrase in articles about the current topic. It ranges from contra (-) to pro (+) establishment.</p>")
            $("#wd_e-component").addClass("app-show-highlight");
        } else procedure.go();
    }],
    ["tut1_clickAnywhere", function() {
        $(".app-show-highlight").removeClass("app-show-highlight");
        unblock();
        $(".article-navigator, main").on("click.temp", () => { procedure.go() });
        senphrase = [];
        if (cond.sd_s) senphrase.push("sentence");
        if (cond.wd_lr || cond.wd_e) senphrase.push("phrase");
        senphrase = senphrase.join(" / ");
        instr("<p>Click anywhere on the article besides a biased " + senphrase + " or switch to the other article and the analysis bar will reset.</p><p>Try it!</p>");
        control();
    }],
    ["tut1_clickAnywhere_success", function() {
        $(".article-navigator, main").off("click.temp");
        instr("Very good!");
    }],
    ["tut1_scroll", function() {
        unblock();
        control();
        instr("<p>Finally, to continue reading and see the full article, scroll up and down on your device.</p><p>Try it!</p>");
        $(window).on("scroll.temp", () => { procedure.go() });
    }],
    ["tut1_scroll_success", function() {
        instr("Very good!");
        $(window).off("scroll.temp");
    }],
    ["tut1_end", function() {
        instr("<p>Please take some time now to get familiar with the app. Once you're finished, press Start to begin your duty as chief-editor.");
        control("Start");
    }],
    ["task1_start", function() {
        $(".carousel-item").each(function(index) {
            $(this).load(articles[index]);
        });
        instr("<p>Article A and article B are now two articles, written by reporters of your newspaper about the <span class='font-italic'>Kyle Rittenhouse</span> trial.");
    }],
    ["task1_decide", function() {
        instr(`<p>Please read both articles and then choose, which article uses the most neutral language:</p>
        <form action="" id="article_choice" class="text-start">
            <div class="form-check form-check-lg">
                <input class="form-check-input" type="radio" name="article" id="artilceA" value=1 required>
                <label class="form-check-label" for="articleA">
                    Article A
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="article" id="articleB" value=0>
                <label class="form-check-label" for="articleB">
                    Article B
                </label>
            </div>
        </form>`);
        control(undefined, `<input type="submit" form="article_choice" class="button btn" value="Continue"/>`);
        $("#article_choice").submit(function() {
            // logSql({
            //     "article_choice": $("input:radio[name=article]:checked").val(),
            // });
            return false;
        });
        $(".article-navigator").on("click.temp", () => { procedure.go() });
    }],
    ["task1_activateSubmit", function() {
        $(".article-navigator").off("click.temp");
    }],
    ["survey_end", function() {
        return;
    }]
]));

$(document).ready(function() {
    procedure.go(step_start);
    // procedure.go("task1_decide");
});