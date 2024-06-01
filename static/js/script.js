function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomChar(){
    const alph = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ";
    return alph[getRandomInt(0, alph.length)];
}

const typingEffect = async () => {
    const username = "IRVANNI";
    const nameH1 = document.getElementById("name");
    let displayText = '';

    function revealCharacter(pos, count) {
        if (count < 10) {
            displayText = displayText.slice(0, pos) + getRandomChar() + displayText.slice(pos + 1);
            nameH1.innerHTML = displayText;
            setTimeout(() => revealCharacter(pos, count + 1), 50);
        } else {
            displayText = displayText.slice(0, pos) + username[pos] + displayText.slice(pos + 1);
            nameH1.innerHTML = displayText;
            if (pos + 1 < username.length) {
                setTimeout(() => revealCharacter(pos + 1, 0), 50);
            }
        }
    }

    // Initialize displayText with spaces or any placeholder
    displayText = ' '.repeat(username.length);
    nameH1.innerHTML = displayText;

    // Start revealing the first character
    revealCharacter(0, 0);
}


typingEffect();

function toggleDescription(e){
    let d = e.parentNode.getElementsByTagName("div")[0];
    d.parentNode.classList.toggle("opened");
    if(d.hidden){
        d.hidden = false;
    }else{
        d.hidden = true;
    }
    let icon = e.parentNode.getElementsByTagName("i")[0];
    icon.classList.toggle("fa-angle-right");
    icon.classList.toggle("fa-angle-down");
}

let slidesIndexes = {};

function showSlides(slides, slideIndex) {
    slides.forEach(slide => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
}

function getSlideIndex(e){
    let slideIndex;
    if(e.id in slidesIndexes){
        slideIndex = slidesIndexes[e.id];
    } else {
        slideIndex = 0;
        slidesIndexes[e.id] = slideIndex;
    }
    return slideIndex;
}

function slideLeft(e) {
    let slideIndex = getSlideIndex(e.parentNode);
    let slides = e.parentNode.querySelectorAll(".slide");
    if (slideIndex > 0) {
        slideIndex--;
    } else {
        slideIndex = slides.length - 1;
    }
    slidesIndexes[e.parentNode.id] = slideIndex;
    showSlides(slides, slideIndex);
}

function slideRight(e) {
    let slideIndex = getSlideIndex(e.parentNode);
    let slides = e.parentNode.querySelectorAll(".slide");
    if (slideIndex < slides.length - 1) {
        slideIndex++;
    } else {
        slideIndex = 0;
    }
    slidesIndexes[e.parentNode.id] = slideIndex;
    showSlides(slides, slideIndex);
}
