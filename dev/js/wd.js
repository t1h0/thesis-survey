$(document).ready(function() {
    $("#article-container p").each(function() {
        $(this).html($(this).text().replace(/\w+/g, function(x) { return "<span class='wd'>" + x + "</span>"; }));

    });
    $(".wd").click(function() {
        $(this).toggleClass("wd-active");
    });
});