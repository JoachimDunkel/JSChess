let checkMusic=document.querySelector('input[value="mute"]');
checkMusic.addEventListener('change',()=>{
    if(checkMusic.checked)
    {
        music_sound.stop();
    }
    else
    {
        music_sound.play();
    }
});
document.getElementById("newGameBtn").onclick=
    function (){
        if(click_sound.mute!==true) {
            click_sound.play();
        }
    }

document.getElementById("btnJoin").onclick=
    function () {
        if(!click_sound.mute) {
            click_sound.play();
        }
    }

document.getElementById("btnLoad").onclick=
    function () {
        if(!click_sound.mute) {
            click_sound.play();
        }
    }
let checkSoundEffects=document.querySelector('input[value="mute_all"]');
checkSoundEffects.addEventListener('change',()=> {
    if (checkSoundEffects.checked) {
        click_sound.mute = true;
        select_sound.mute = true;
    }
    else{
        click_sound.mute = false;
        select_sound.mute = false;
    }
});