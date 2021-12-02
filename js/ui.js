function changeStyle(dest, prop, val, prio = "") {
    document.getElementById(dest).style.setProperty(prop, val, prio);
}
a = ["next", "prev"];
a.forEach(function (item) {
    document.getElementById(item).addEventListener("click", function () {
        this.className += " disabled";
        other = document.getElementById(a.filter(function(v) {return v != item})[0]);
        other.className = other.className.replace(/(?:^|\s)disabled(?!\S)/g, '');
        articleId = document.getElementById("articleId");
        articleId.textContent = ["A", "B"].filter(function (v) { return v != articleId.textContent })[0];
    });
});