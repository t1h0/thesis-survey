// General

function rndInt(min, max) {
    /*  
    Compute a random integer between min and max (inclusive).
    @param {int} min - The lower bound.
    @param {int} max - The upper bound.
    */

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function appLoad() {
    /* Blocks the screen and displays a loading animation for 1-3 seconds (randomly chosen). */

    $("#loading-icon").removeClass("d-none");
    $("body").addClass("actionBlock");
    setTimeout(() => {
        procedure.go();
        $("#loading-icon").addClass("d-none");
        $("body").removeClass("actionBlock");
    }, rndInt(1000, 3000));
}

/* Condition preparation */

// Advanced biased sentence detection (sd_s).

function resetSentences() {
    /* Resets the synonymous bar and deactivates any activated sentence. */

    $(".sd-active").removeClass("sd-active");
    $("#sd_s").text("···");
}

function prepareSD_S() {
    /* Prepares advanced biased sentence detection by assigning click event listeners to respective sentences and to reset areas. */

    $(".article-navigator").click(resetSentences);
    $("main").click(resetSentences);
    $(".sd").click(function(e) { // assigning click function to detected words
        e.stopPropagation(); // to prevent immediate automatic click on main

        $(".sd-active").removeClass("sd-active");
        if (!$(this).children(".wd_lr-active").length) resetWords();

        $(this).addClass("sd-active"); // activating clicked sentence (this)
        $("#sd_s").text($(this).attr("sd_s"));
    });
};

/* Discriminative phrase detection (wd_lr) */

function resetWords() {
    /* Resets the left-right slider and deactivates any activated discriminative phrase. */

    // deactivate word
    $(".wd_lr-active").removeClass("wd_lr-active");
    // reset sliders
    if (cond.wd_lr) { // cond is provided by index.php!
        $("#wd_lr").css("margin-left", "calc(50% - 0.5em");
    }
}

function prepareWD_LR() {
    /* Prepares discriminative phrase detection by assigning click event listeners to respective phrases and to reset areas. */

    $(".article-navigator").click(resetWords);
    $("main").click(resetWords);
    $(".wd_lr").click(function(e) { // assigning click function to detected words
        if (cond.sd != 2 || !$(this).parents().first().hasClass("sd")) {
            e.stopPropagation(); // to prevent immediate automatic click on main
        }

        //deactivating potential previous active word or sentence
        $(".wd_lr-active").removeClass("wd_lr-active");
        resetSentences();

        $(this).addClass("wd_lr-active"); // activating clicked word (this)
        if (cond.wd_lr) {
            $("#wd_lr").css("margin-left", "calc(" + $(".wd_lr-active").attr("wd_lr") + "% - 0.5em"); //setting sliders to respective attribute values
        }
    });
};

/* Task 2 */

function prepareTask2() {
    /* Prepares functionality for the second task. Click event listeners are added to phrases and sentences and respective CSS files loaded for correct visualization of selected phrases/sentences. */

    if (!cond.wd) { // CSS Files need to be loaded if not already done earlier because of experimental condition.
        $('head').append('<link rel="stylesheet" href="css/wd.css" type="text/css" />');
        cond.wd = true;
    }
    if (cond.sd == 0) {
        $('head').append('<link rel="stylesheet" href="css/sd.css" type="text/css" />');
        cond.sd = true;
    }
    $(".s").dblclick(function() { // on doubleclick on sentence
        $(this).toggleClass("sd");
        sentence = $(this);
        $(this).find("span").each(function() {
            $(this).removeClass("wd");
            if (sentence.hasClass("sd")) {
                $(this).on("click.active", function() { $(this).toggleClass("wd") });
            } else $(this).off("click.active");
        });
    });
}

// SQL

function logSql(data_raw, callback = () => {}) {
    /*  
    Send AJAX request to the PHP server save data in SQL database.
    @param {data_raw} data_raw - An array-like object, that contains column-value pairs to save into participants' results.
    @param {function} callback - Callback function to execute afterward.
    */
    if (testmode) { // Nothing is logged if test mode is active
        callback();
        return;
    };
    $("#loading-icon").removeClass("d-none"); // displaying loading icon
    $.post("sqlLog.php", data_raw, (response) => { // send AJAX, when finished, hide loading icon again and call callback()
        $("#loading-icon").addClass("d-none");
        callback();
    });
};

// DOM Manipulation


function unblock(target, removeHighlight = true) {
    /*  
    Remove blocks (scroll block, display block, interaction block) from specific element or from all currently blocked elements. Cf. block().
    @param {jQuery Object} target - Element to be unblocked. If unspecified, all currently blocked elements get unblocked.
    @param {boolean} removeHighlight - Also removes any applied highlighting.
    */
    if (!target) target = $(".scrollBlock, .grayBlock, .actionBlock");
    target.add(target.find("*")).removeClass("scrollBlock grayBlock actionBlock");
    if (removeHighlight) $(".app-show-highlight").removeClass("app-show-highlight");

};

function block(except, allowInteract = false, excHighlight = false, allowScroll = false, unblockFirst = true, blockApp = false) {
    /*  
    Block the page (but not "except") by adding a gray overlay to the top elements (in DOM).
    @param {jQuery Object} except - Element to not be blocked.
    @param {boolean} allowInteract - Sets if blocked elements receive an interaction block (no user action takes effect on them).
    @param {boolean} excHighlight - Sets if the unblocked element (except) should be highlighted.
    @param {boolean} allowScroll - Sets, if users should still be able to scroll the page.
    @param {boolean} unblockFirst - Sets, if first all blocked elements should be unblocked before the imminent blocking.
    @param {boolean} blockApp - Sets, if the instructions bar on the bottom should be blocked as well.
    */
    if (unblockFirst) unblock();
    if (!allowScroll) {
        $("body").addClass("scrollBlock");
    };
    keep = $("#loading-icon");
    if (!blockApp) keep = keep.add("#app");
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
    /*  
    Adds additional content in the apps main section and hides task elements (analysis bar, article content) or removes the content and displays task elements.
    @param {string} content - The html content to add. If empty, all additional content gets removed.
    */
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
    /*  
    Adds instruction into the instruction bar on the bottom.
    @param {string} instruction - The html source of the desired instruction.
    */
    $("#app-instructions").html(instruction);
    // Recalculating padding-bottom of article (main)
    $("main").css("padding-bottom", "calc(" + $("#app").outerHeight() + "+2rem");
    $("#loading-icon").css("transform", "translateX(-50%) translateY(calc(-50% - " + $("#app").outerHeight() + "))");
};

function control(text = null, customHTML = null, onClick = () => procedure.go()) {
    /*  
    Changes the instruction bar's control button.
    @param {string} text - The text the button should contain (ignored if customHTML is provided).
    @param {string} customHTML - The HTML to replace the button element with.
    @param {function} onClick - Function to execute when the button is clicked on. By default next state in procedure.
    */
    $("#app-controls").empty();
    if (!text) {
        $("#app-controls").html(customHTML);
    } else {
        $("#app-controls").append($("<button id='app-button'></button>").addClass("btn button").text(text).click(() => onClick()));
    };
};

// Procedure

class Procedure {
    /*  
    Handles the app's procedure.
    @param {Map} proc - Map containing state name - function pairs
    */
    constructor(proc = new Map()) {
        this.proc = proc;
        this.keys = [...this.proc.keys()];
    };

    go(toState, controlReset = true) {
        /*  
    Goes to the next or a specified procedure state.
    @param {string/number} toState - State name or index to go to.
    @param {boolean} controlReset - Sets weather the control should be reset to the default "Continue" button before going to the next/specified state.
    */
        if (controlReset) control("Continue");
        $("main").css("padding-bottom", "calc(" + $("#app").outerHeight() + "+2rem"); // Recalculate height of instruction bar.
        switch (typeof(toState)) {
            case "number": // Go to specified state index.
                this.state = toState;
                this.proc.get(this.keys[toState])();
                break;
            case "string": // Go to specified state string.
                if (!isNaN(parseInt(toState))) {
                    this.state = parseInt(toState);
                    this.proc.get(this.keys[this.state])();
                } else {
                    this.state = this.keys.indexOf(toState);
                    this.proc.get(toState)();
                }
                break;
            default: // Go to next state index.
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
        /* Welcome screen */
        instr();
        adContent("<div class='col'><h2>Welcome!</h2><p class='mt-3'>Welcome to this study, which takes most people about 15-20 minutes to complete.</p><p>After conscientious completion of this survey, you will receive 2.25 £ as compensation for your efforts. Therefore, please only continue if you can expect to answer questions for 15-20 minutes without interruptions.</p></div>");
    }],
    ["consent", function() {
        /* Declaration of consent */
        adContent("<div class='col'><h2>Study Information</h2><p>You are invited to participate in a research study that is being conducted by a research team at the University of Konstanz, Germany. The purpose of this study is to elicit your personal impression of different news coverage. We also ask you some demographic questions.</p><p>Participating in the research is not anticipated to cause you any disadvantages or discomfort. The potential physical and/or psychological harm or distress will be the same as any experience in everyday life.</p><p>The University of Konstanz is the sponsor for this study. We will use the information that you provide in order to undertake this study and will act as the data controller for this study. This means that we are responsible for looking after your information and using it properly.</p><p>The data that you provide will be only connected to your Prolific ID and anonymised at the earliest point in time. That is, after completion and compensation, the ID will be deleted from the dataset used for scientific analyses. Your anonymised data will only be associated with the demographic information you provided in the beginning of the questionnaire. Access to your anonymized data might be given to other researchers, including researchers from outside the University of Konstanz. Once the study is published, the anonymised data might be made available on a public data repository. Your rights to access, change or move your information are limited, as we need to manage your information in specific ways for the research to be reliable and accurate. Once anonymised, we will not be able to delete your data.</p><p>Participation in the study is voluntary and you can end your participation at any time by closing the survey window. You will only receive compensation for full, conscientious participation.</p><p>If you have any questions or concerns you can contact the head researcher Timo Spinde (timo.spinde@uni-konstanz.de). Please also contact Timo Spinde, in case you wish to complain about any aspect of the way in which you have been approached or treated during the course of this study.</p></div>");
        instr(`
        <p class='fw-bolder'>Declaration of Consent</p>
        <form id='consent_declaration' action="">
            <div class="form-check">
            <input class="form-check-input form-check-lg" type="checkbox" value=1 id="consent" required>
            <label class="form-check-label" for="consent">
                I have read and I agree with the above information and declare my consent. I also confirm that I am 18 years old or older.
            </label>
            </div>
        </form>`);
        control(undefined, `<input type="submit" form="consent_declaration" class="button btn" value="Continue"/>`);
        $("#consent_declaration").submit(function() { // Log on submit
            logSql({
                "consent": "1",
            }, () => procedure.go());
            return false;
        });
    }],
    ["demographics", function() {
        /* Demographics */
        logSql({ "step": "demographics" }); // Checkpoint
        adContent(`
        <div class="col"><h2>Demographics</h2>
        <form action="" class="row g-4 mt-3" id="demographics">
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
                <select class="form-select form-select-lg mt-4" id="eng" required>
                    <option selected disabled value="">Please select..</option>
                    <option value=0>Native speaker</option>
                    <option value=1>Non-native speaker</option>
                </select>
            </div>
            <div class="col-12">
                <h4>What is your age?</h4>
                <input class="col-12 form-control form-control-lg mt-4" type="number" step=1 id="age" min=18 placeholder="Please state your age.." required>
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
        </form>
        </div>`);
        control(undefined, `<input type="submit" form="demographics" class="button btn" value="Continue"/>`);
        $("#demographics").submit(function() { // Log on submit
            logSql({
                "dem_gender": $("#gender").val(),
                "dem_eng": $("#eng").val(),
                "dem_age": $("#age").val(),
                "dem_school": $("#school").val(),
            }, () => procedure.go());
            return false;
        });
        instr("Please answer all the questions above.");
    }],
    ["political_stance", function() {
        logSql({ "step": "political_stance" }); // Checkpoint
        adContent(`
        <div class="col"><h2>Political stance</h2>
        <form action="" class="row g-4 mt-3" id="form_political_stance">
            <div class="col">
                <h4>Do you consider yourself to be liberal, conservative, or somewhere in between?</h4>
                <div class="d-flex justify-content-center mt-5">
                <div class="" style="width:312px">
                <label for="political_stance" class="form-label float-start">Very liberal</label>
                <label for="" class="form-label float-end">Very conservative</label>
                <input type="range" class="form-range" id="political_stance" required>
                </div>
                </div>
            </div>
        </form>
        </div>`);
        control(undefined, `<input id="submit" type="submit" form="form_political_stance" class="button btn" value="Continue" disabled/>`);
        $("#political_stance").one("click", () => $("#submit").prop("disabled", false)); // enable "Continue" button as soon as a political stance decision was done
        $("#form_political_stance").submit(function() { // Log on submit
            logSql({
                "political_stance": $("#political_stance").val(),
            }, () => procedure.go());
            return false;
        });
        instr("Please answer the question above.");
    }],
    ["task1_instructions", function() {
        logSql({ "step": "task1_instructions" }); // Checkpoint
        $(".carousel-item").each(function(index) {
            $(this).load("articles/tut1.php", { "index": index }, () => {
                if (cond.sd == 2) prepareSD_S();
                if (cond.wd_lr) prepareWD_LR();
                $(".sd, .wd, .wd_lr").addClass("wdsd-hidden"); // Hide all annotations
            });
        });
        adContent(`<div class='col'><h2>First Task</h2><p class="mt-3">We now ask you to take over the duties of a newspaper's chief editor. As such, you have to decide which articles will be published. As your newspaper focusses on neutral news coverage, you will have to read articles and decide upon their level of bias.</p><p>Bias in the context of news refers to the usage of non-neutral and unacceptable language resulting in untrustworthy and partisan news reporting. This bias is therefore independent of how true or fake the content actually is. It is merely a form of intentional or unintentional influence of the reader's opinion and attitude towards the content through the use of biased language by the author.</p>` + (cond.wd_lr ? `<p>You will also encounter the concept of <span class='fst-italic'>feature phrases</span>. A feature phrase is a phrase, that in the context of the article's topic is distinctively used by newspapers all sharing the same or a similar political stance. For a specific topic, all newspapers sharing a similar political stance therefore repeatedly use the same feature words in their reports about that topic.</p>` : "") + `<p>You will read the the articles in an app, that we specifically designed for news desks. To get familiar with the app, you will first learn how to use it.</p><p class="fw-bold">From now on, you will get instructions at the bottom of the page.</p></div>`);
        instr("Please fully read the instructions above.");
        control("Continue", null, appLoad);
    }],
    ["tut1_start", function() {
        adContent(null); // Show the experiment ..
        block(); // .. and block it
        instr("You are now going to learn about the functionality of this app before you will actually use it.");
    }],
    ["tut1_main", function() {
        block($("main")); // Block except main section
        instr("You see the currently selected article in the app's main section.");
    }],
    ["tut1_sdwd", function() {
        if (cond.sd > 0 || cond.wd || cond.wd_lr) { // Biased or discriminative phrase or sentence detection active?
            instr("The app includes a helper system which provides support in detecting bias in news articles.")
        } else procedure.go();
    }],
    ["tut1_sd", function() {
        if (cond.sd > 0) { // Biases sentence detection active?
            $(".sd").removeClass("wdsd-hidden"); // Unhide sentence annotations
            instr("<p>Our system highlights sentences with a <span class='sd'>gray background</span>, if it detects them as biased. Remember: a biased sentence is a sentence, that intentionally or unintentionally influences the reader's opinion and attitude towards the content through the use of biased language by the author.</p>");
        } else procedure.go();
    }],
    ["tut1_wd", function() {
        if (cond.wd) { // Biased phrase detection active?
            if (cond.wd_lr) $(".wd").not(".wd_lr").removeClass("wdsd-hidden"); // Unhide biased phrase but not discriminative phrase annotations
            else $(".wd").removeClass("wdsd-hidden"); // Unhide biased phrase annotations
            instr("<p>Our system highlights phrases with a <span class='wd'>solid</span> underline, if it detects them as biased. Remember: a biased phrase is a phrase, that intentionally or unintentionally influences the reader's opinion and attitude towards the content through the use of biased language by the author.</p>");
        } else procedure.go();
    }],
    ["tut1_wdlre", function() {
        if (cond.wd_lr) { // Discriminative phrase detection active?
            if (cond.wd) $(".wd_lr").not(".wd").removeClass("wdsd-hidden"); // Unhide discriminative phrase annotations but not biased phrase annotations
            else $(".wd_lr").removeClass("wdsd-hidden"); // Unhide discriminative phrase annotations
            instr("<p>Our system highlights phrases with a <span class='wd_lr'>dotted</span> underline, if it detects them to be <span class='fst-italic'>feature phrases</span>. Remember: a feature phrase is a phrase, that in the context of the article's topic is distinctive for reports by newspapers sharing a certain political stance.</p>");
        } else procedure.go();
    }],
    ["tut1_wd_and_lre", function() {
        if (cond.wd_lr && cond.wd) { // Biased and discriminative phrase detection active?
            $(".wd.wd_lr").removeClass("wdsd-hidden"); // Unhide discriminative and biased phrase annotations
            instr("<p>If a feature phrase is also detected to be a biased phrase, it will be highlighted with a <span class='wd wd_lr'>dashed</span> underline.</p>");
        } else procedure.go();
    }],
    ["tut1_controlBar", function() {
        block($("#reader-control"));
        instr("On top you see the app's control bar.");
    }],
    ["tut1_articleSwitch", function() {
        control();
        unblock($("main"), false);
        $("#reader-control").removeClass("actionBlock");
        $(".article-navigator").on("click.temp", () => { // Attention check. Buttons have to be clicked to proceed.
            $(".article-navigator").off("click.temp");
            control("Continue");
            instr("Very good!");
        });
        instr("<p>To switch between two articles, click / tap on the arrow buttons in the top left and top right corner.</p><p>Try it!</p>");
    }],
    ["tut1_analysisBar", function() {
        if (cond.wd_lr || cond.sd == 2) { // Discriminative phrase or advanced biased sentence detection active?
            block($("header"));
            instr("Below the reader controls you see the helper system's analysis bar. It provides you with helpful information about how biased the current article's language is.");
        } else procedure.go("tut1_scroll");
    }],
    ["tut1_clickOnSentence", function() {
        if (cond.sd == 2) { // Advanced biased sentence detection active?
            block($("body"), true);
            $(".sd").on("click.temp", () => { // Attention check. A sentence has to be clicked to proceed.
                block($("main,header"));
                $(".sd").off("click.temp");
                control("Continue");
                instr("Very good!");
            });
            instr("<p>If you click / tap on a biased sentence (highlighted with a gray background), the helper system will provide you with additional information about the sentence.</p><p>Try it!</p>");
            control();
        } else procedure.go("tut1_clickOnPhrase");
    }],
    ["tut1_sd_s", function() {
        instr("<p>The <span class='fst-italic'>Synonyms Field</span> shows you an alternative sentence with the same meaning as the selected sentence but neutral in its nature.</p>")
        $("#sd_s-component").addClass("app-show-highlight"); // Highlight the synonyms field
    }],
    ["tut1_clickOnPhrase", function() {
        $(".app-show-highlight").removeClass("app-show-highlight");
        if (cond.wd_lr) {
            block($("body"), true);
            $(".wd_lr").on("click.temp", () => { // Attention check. A feature phrase has to be clicked to proceed.
                $(".wd_lr").off("click.temp");
                block($("main, header"));
                control("Continue");
                instr("Very good!");
            });
            instr("<p>If you click / tap on a feature phrase (highlighted with a <span class='wd_lr'>dotted</span> " + (cond.wd ? "or <span class='wd wd_lr'>dashed</span>" : "") + " underline), the helper system will provide you with additional information about the phrase.</p><p>Try it!</p>");
            control();
        } else procedure.go("tut1_clickAnywhere");
    }],
    ["tut1_wd_lr", function() {
        if (cond.wd_lr) {
            instr("<p>The <span class='fst-italic'>Left-Right Stance</span> gives information about the overall political stance of newspapers, that distinctively use the selected feature phrase in articles about the current topic. It ranges from politically left (L) to politically right (R).</p>")
            $("#wd_lr-component").addClass("app-show-highlight");
        } else procedure.go();
    }],
    ["tut1_clickAnywhere", function() {
        $(".app-show-highlight").removeClass("app-show-highlight");
        block($("body"), true);
        $("main").on("click.temp", () => { // Attention check. Participants have to click anywhere proceed.
            $("main").off("click.temp");
            control("Continue");
            instr("<p>Very good!</p><p>The analysis bar will also reset each time you switch between articles.</p>");
        });
        instr("<p>Click / tap anywhere besides on a " + (cond.sd == 2 ? (cond.wd_lr ? "biased sentence or a feature word" : "biased sentence") : "feature word") + " and the analysis bar will reset.</p><p>Try it!</p>");
        control();
    }],
    ["tut1_scroll", function() {
        unblock();
        control();
        instr("<p>Finally, to continue reading and see the full article, scroll up and down on your device.</p><p>Try it!</p>");
        $(window).one("scroll", () => { // Attention check. Page has to be scrolled to proceed.
            control("Continue");
            instr("Very good!");
        });
    }],
    ["tut1_end", function() {
        instr("<p>Please take some time now to get familiar with the app. Once you're finished, press Start to begin your duty as chief-editor.");
        control("Start", null, appLoad);
    }],
    ["task1_start", function() {
        $(".carousel-item").each(function(index) {
            $(this).load("articles/task1.php", { "index": index }, () => {
                if (cond.sd == 2) prepareSD_S();
                if (cond.wd_lr) prepareWD_LR();
            });
        });
        instr("<p>Article A and article B are now two articles, written by reporters of your newspaper about the <span class='fst-italic'>Kyle Rittenhouse</span> trial.</p>");
    }],
    ["task1_read", function() {
        // Instructions with respective reminder of the features.
        instr(`<p>Please read both articles. Afterward you will choose, which article uses the most neutral language.</p>` + ((cond.wd || cond.sd > 0 || cond.wd_lr) ? (`<p>Remember: ` + (cond.sd > 0 ? `<span class="sd me-2">Biased Sentence</span>` : "") + (cond.wd ? `<span class="wd me-2">Biased Word</span>` : "") + (cond.wd_lr ? `<span class="wd_lr me-2">Feature Word</span>` : "") + ((cond.wd_lr && cond.wd) ? `<span class="wd wd_lr me-2">Biased Feature Word</span>` : "")) : ``));
        $("#app-button").prop("disabled", true);
        $(".article-navigator").on("click.temp", () => { // Attention check. Participants must have switched at least once to the other article to proceed.
            $(".article-navigator").off("click.temp");
            $("#app-button").prop("disabled", false);
        });
    }],
    ["task1_decide", function() {
        instr(`<p>For your judgment of bias, you are free to follow or not follow the system's indication of bias based on your own understanding of the articles.</p><p>Out of these two articles, the most neutral article is:</p>
        <form action="" id="article_choice" class="text-start">
            <div class="form-check form-check-lg">
                <input class="form-check-input" type="radio" name="article" id="articleA" value=0 required>
                <label class="form-check-label" for="articleA">
                    Article A
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="article" id="articleB" value=1>
                <label class="form-check-label" for="articleB">
                    Article B
                </label>
            </div>
        </form>`);
        control(undefined, `<input id="submitbtn" type="submit" form="article_choice" class="button btn" value="Submit"/>`);
        $("#article_choice").submit(function() { // Log on submit.
            logSql({
                "article_choice": $("input:radio[name=article]:checked").val()
            }, () => procedure.go());
            return false;
        });
    }],
    ["task2_instructions", function() {
        logSql({ "step": "task2_instructions" }); // Checkpoint
        adContent(`<div class='col'><h2>Second Task</h2><p class="mt-3">We now ask you to go a step further and annotate, which sentences and phrases you perceive to be biased. To do so, you will again first learn how to annotate in the app. Afterward, you will read and annotate another article by one of your reporters about a different topic.</div>`);
        $("#article-column").empty();
        $("#article-column").load("articles/tut2.html", () => { // Load tutorial article.
            prepareTask2();
        });
        $("header").empty(); // Empty analysis bar and app control bar.
        $("header").css({ "height": "0.5rem" });
        instr("Please read the full instructions above.");
        control("Continue", null, appLoad);
    }],
    ["tut2_start", function() {
        adContent(null);
        block($("main, header"));
        instr("This time, the app only contains one article. It is therefore missing a control bar on top.");
    }],
    ["tut2_clickSentence", function() {
        unblock();
        instr("<p>To annotate a sentence as biased, double click / double tap any sentence.</p><p>Try it!</p>");
        control();
        $(".s").one("dblclick.temp", () => { // Attention check. Sentence has to be double clicked to proceed.
            $(".s").off("dblclick.temp").off("dblclick");
            block($("main, header"));
            control("Continue");
            instr("Very good!");
        });
    }],
    ["tut2_clickPhrase", function() {
        unblock();
        instr("<p>After having annotated a sentence as biased, you can annotate specific words within the same sentence as biased with a simple click / tap.</p><p>Try it!</p>");
        control();
        $(".sd").children().on("click.temp", () => { // Attention check. Phrase has to b clicked to proceed.
            $(".sd").children().off("click.temp");
            control("Continue");
            instr("Very good!");
        });
    }],
    ["tut2_phraseInfo", function() {
        instr("<p>If a phrase you deem biased contains more than one word, simply click / tap all words contained in the phrase.</p>");
    }],
    ["tut2_removeAnnotation", function() {
        unblock();
        instr("<p>To remove an annotation, repeat the prior action. I.e., click / tap a word again or double click / double tap a sentence again. If you remove the annotation of a biased sentence, any annotations for words contained in that sentence will be removed as well.</p><p>Try to remove an annotation now!</p>");
        control();
        prepareTask2();
        // Attention check. Sentence or phrase has to be freed from annotation to proceed.
        $(".sd").one("dblclick.temp", () => {
            $(".sd").off("dblclick.temp");
            $(".wd").off("click.temp");
            control("Continue");
            instr("Very good!");
        });
        $(".wd").one("click.temp", () => {
            $(".sd").off("dblclick.temp");
            $(".wd").off("click.temp");
            control("Continue");
            instr("Very good!");
        });
    }],
    ["tut2_end", function() {
        instr("<p>Please take some time now to get familiar with annotating inside the app. Once you're finished, press Start to continue your duty as chief-editor.");
        control("Start", null, appLoad);
    }],
    ["task2_start", function() {
        $("#article-column").empty();
        $("#article-column").load("articles/task2.html", () => { // load second article and then prepare.
            prepareTask2();
        });
        instr("<p>This article was written by one of your reporters about the <span class='fst-italic'>James Webb Space Telescope</span>.</p>");
    }],
    ["task2_choice", function() {
        instr(`<p>Please read the article and annotate any sentences and phrases you perceive to be biased like trained before. Once you're finished, click / tap the button below to submit your annotations.</p>`);
        control("Submit", undefined, () => { // Log on submit.
            sentences = "";
            words = "";
            if (!$(".sd").length) sentences = "0,";
            else $(".sd").each(function() { sentences += $(this).attr("sdid") + "," }); // find annotated sentences
            if (!$(".wd").length) words = "0,";
            else $(".wd").each(function() { words += $(this).attr("wdid") + "," }); // find annotated words
            logSql({
                "sentences_choice": sentences.slice(0, -1),
                "words_choice": words.slice(0, -1),
                "step": "survey_end"
            }, () => window.location.href = "surveyEnd.php");
        })
    }],
]));

$(document).ready(function() {
    // Start the experiment (go to first state)
    procedure.go(step_start);
});