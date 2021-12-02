if(wdlr){
    lrInd = document.getElementById("lrInd");
};
if(wde){
    eInd = document.getElementById("eInd");
};
if(wds){
    syn = document.getElementById("syn");
};
active = null;
document.querySelectorAll(".wd").forEach(function (item) {
    item.addEventListener("click", function () {
        if (active != null) {
            active.className = active.className.replace(/(?:^|\s)wd-active(?!\S)/g, "");
        }
        this.className += " wd-active";
        active = this;
        if(wdlr){
            lrInd.style.setProperty("margin-left","calc("+this.getAttribute("lr")+"% - 0.5em");
        }
        if(wde){
            eInd.style.setProperty("margin-left","calc("+this.getAttribute("e")+"% - 0.5em");
        }
        if(wds){
            syn.textContent = item.getAttribute("syn");
            syn.className = syn.className.replace(/(?:^|\s)text-secondary(?!\S)/g, "");
        }
    });
});