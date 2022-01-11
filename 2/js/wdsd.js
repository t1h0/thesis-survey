function unsurroundWords() {
    $(".wd").not(".wd-active").each(function() {
        $(this).html($(this).text);
    })
}

function detectWords(text, clickable = 1) {
    // detect Words in text and surround each by span
    function surroundWords(word) {
        return "<span class='w' wdid=" + ++wdcount + ">" + word + "</span>";
    };
    return text.replace(/\w+[\-|∀|\w|']*|[\-|∀|\w|*]*\w+/gm, surroundWords);
}

// function detectSentences(text) {
//     function surroundSentences(sentence) {
//         return "<span class='s' sdid=" + ++sdcount + ">" + sentence + "</span>";
//     };
//     return text.replace(/[^\s][^.!?]*[.!?]/g, surroundSentences);
// }

$(document).ready(function() {
    sdcount = 0;
    wdcount = 0;
    $("#article-container p").each(function() {
        $(this).html(
            $(this).text().replace(/[^\s][^.!?]*[.!?]/g, function(x) {
                // surround sentences and words
                return "<span class='s' sdid=" + ++sdcount + ">" + detectWords(x) + "</span>";
            })
        );
    });
    $(".sd").dblclick(function(sentence) { // on doubleclick on sentence
        $(this).toggleClass("sd-active");
        $(this).find("span").each(function() {
            $(this).removeClass("wd-active");
            if (sentence.hasClass("sd-active")) $(this).on("click.active", function() { $(this).toggleClass("wd-active") });
            else $(this).off("click.active");
        });
    });
});