$(document).ready(function () {
    $(".article-navigator").click(function () {
        $(".article-navigator").toggleClass("disabled");
        $("#articleId").text(($("#articleId").text() == "A") ? "B":"A");
    });
});