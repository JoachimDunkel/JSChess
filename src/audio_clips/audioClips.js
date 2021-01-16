class Sound {
    constructor(src){
        this.src = src;
        this.sound=document.createElement("audio");
        this.sound.src=src;

        this.sound.setAttribute("preload","auto");
        this.sound.setAttribute("controls","none");
        this.sound.muted="muted";
        this.sound.style.display="none";
        document.body.appendChild(this.sound);
    }

    play(){
        this.sound.muted=false;
        const playPromise=this.sound.play();
        if(playPromise!==null){
            playPromise.catch(()=>{this.sound.play();})
        }
    }

    stop(){
        this.sound.pause();
    }
}

let music_sound=new Sound("audio_clips/lovepiano.mp3");
let click_sound=new Sound("audio_clips/click01.wav");
let select_sound=new Sound("audio_clips/select01.mp3");
