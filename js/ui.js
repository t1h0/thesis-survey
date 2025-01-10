$(document).ready(function() {
    $(".article-navigator").click(function() {
        /* Deactivates the opposite article switch and changes article denotation accordingly (A/B) */
        $(".article-navigator").toggleClass("disabled");
        $(".articleId").each(function() {
            $(this).text(($(this).text() == "A") ? "B" : "A");
        });
    });
});