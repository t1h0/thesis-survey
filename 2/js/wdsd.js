wd = true;
sd = true;

function detectWords(text, clickable = 1) {
    function surroundWords(word) {
        return "<span class='wd' clickable=" + clickable + ">" + word + "</span>";
    };
    return text.replace(/\w+/g, surroundWords);
}

function detectSentences(text) {
    function surroundSentences(sentence) {
        return "<span class='sd'>" + sentence + "</span>";
    };
    return text.replace(/[^\s][^.!?]*[.!?]/g, surroundSentences);
}

$(document).ready(function() {
    if (sd) { //sentence detection active?
        $("#article-container p").each(function() {
            if (wd) { // also word detection active?
                $(this).html($(this).text().replace(/[^\s][^.!?]*[.!?]/g, function(x) { // surround sentences and words
                    return "<span class='sd'>" + detectWords(x, 0) + "</span>";
                }));
            } else {
                $(this).html(detectSentences($(this).text())); // only surround sentences
            }
        });
        $(".sd").dblclick(function() { // on rightclick on sentence
            $(this).toggleClass("sd-active");
            if (wd) { // word detection active?
                $(this).find("span").each(function() {
                    $(this).removeClass("wd-active").attr("clickable", ($(this).attr("clickable") == 1 ? 0 : 1)); //make words inside of sentence clickable
                });
            }
        });
    } else { // only word detection active?
        $("#article-container p").each(function() {
            $(this).html(detectWords($(this).text())); // surround words
        });
    }
    if (wd) { // word detection active?
        $(".wd").click(function() {
            if ($(this).attr("clickable") == 1) $(this).toggleClass("wd-active"); // activate word if allowed
        });
    }
});