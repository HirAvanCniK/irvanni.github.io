linksBtn.addEventListener("click", () => {
    document.querySelector("#navbar .right").classList.toggle("open");
    document.querySelector("#linksBtn").classList.toggle("fa-bars");
    document.querySelector("#linksBtn").classList.toggle("fa-xmark");
});

for(let element of document.querySelector("#navbar .right").getElementsByClassName("link")){
    element.addEventListener("click", () => {
        if(document.querySelector("#navbar .right").classList.contains("open")){
            document.querySelector("#navbar .right").classList.toggle("open");
            document.querySelector("#linksBtn").classList.toggle("fa-bars");
            document.querySelector("#linksBtn").classList.toggle("fa-xmark");
        }
    });
}
