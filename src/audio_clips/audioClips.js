function sound(src){

 this.sound=document.createElement("audio");
 this.sound.src=src;

 this.sound.setAttribute("preload","auto");
 this.sound.setAttribute("controls","none");
 this.sound.muted="muted";
 this.sound.style.display="none";
 document.body.appendChild(this.sound);

 this.play=function(){
     this.sound.muted=false;
     const playPromise=this.sound.play();
     if(playPromise!==null)
     {
       playPromise.catch(()=>{this.sound.play();})

     }

 }

 this.stop=function(){
     this.sound.pause();
 }

}

let music_sound=new sound("audio_clips/lovepiano.mp3");
let click_sound=new sound("audio_clips/click01.wav");
let endturn_sound=new sound("audio_clips/endturn.wav");
let select_sound=new sound("audio_clips/select01.mp3");
let click02_sound=new sound("audio_clips/click02.wav");