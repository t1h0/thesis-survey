
active = null;
target = {};
for (i in s) { //s provided by index.php!
    if (s[i]) target[i] = document.getElementById(i);
};
document.querySelectorAll(".article-navigator").forEach(function (item) {
    item.addEventListener("click", function () {
        if (active != null) {
            active.className = active.className.replace(/(?:^|\s)wd-active(?!\S)/g, "");
            active = null;
            ["wdlr", "wde"].forEach(function (i) {
                if (s[i]) {
                    target[i].style.setProperty("margin-left", "calc(50% - 0.5em");
                }
            });
            if (s.wds) {
                target.wds.textContent = "···";
            };
        };
    })
});
document.querySelectorAll(".wd").forEach(function (item) {
    item.addEventListener("click", function () {
        if (active != null) {
            active.className = active.className.replace(/(?:^|\s)wd-active(?!\S)/g, "");
        }
        this.className += " wd-active";
        active = this;
        ["wdlr", "wde"].forEach(function (i) {
            if (s[i]) {
                target[i].style.setProperty("margin-left", "calc(" + item.getAttribute(i) + "% - 0.5em");
            }
        });
        if (s.wds) {
            target.wds.textContent = this.getAttribute("wds");
        }
    });
});