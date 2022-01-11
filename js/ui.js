$(document).ready(function() {
    $(".article-navigator").click(function() {
        $(".article-navigator").toggleClass("disabled");
        $(".articleId").each(function() {
            $(this).text(($(this).text() == "A") ? "B" : "A");
        });
    });
});