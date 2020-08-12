//for the sticky navbar hiding on scroll, find a way later to implement this on react

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollpos = window.pageYOffset;
    if(prevScrollpos > currentScrollpos && currentScrollpos > 300) {
        document.getElementById("stickyNavbar").style.top = "0";
    }
    else {
        document.getElementById("stickyNavbar").style.top = "-80px";
    }
    prevScrollpos = currentScrollpos;
    console.log(currentScrollpos);
}