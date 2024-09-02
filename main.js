const vsHumanButton = document.querySelector("#vs-human");
const vsAiButton = document.querySelector("#vs-ai");
const clickAudio = new Audio();
clickAudio.src = "./click.mp3";

vsHumanButton.addEventListener('click', () => {
    navigateTo("./vsHuman/vs_human.html")
});

vsAiButton.addEventListener('click', () =>{
    navigateTo("./vsAi/vs_ai.html")
});




function navigateTo(url){
    playAudio(clickAudio);
    window.location.href = url;
}

function playAudio(audio){
    audio.currentTime = 0;
    audio.play();
}

