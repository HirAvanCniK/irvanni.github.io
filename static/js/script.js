window.addEventListener("scroll", function() {
    let navbar = document.getElementsByClassName("navbar")[0];
    if(document.documentElement.scrollTop < 300) {
        if(navbar.classList.contains("show")){
            navbar.classList.remove("show");
            navbar.classList.add("hide");
        }
    }else{
        if(!navbar.classList.contains("show")){
            navbar.classList.remove("hide");
            navbar.classList.add("show");
        }
    }
});