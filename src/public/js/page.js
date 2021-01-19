window.onload = function(){
    document.getElementById("txtGameID").value = "";
    document.getElementById("txtLoadID").value = "";
    // localStorage.clear();
    storageList();

    let canvas = document.getElementById('logo');
    if (canvas && canvas.getContext) {
        let text = canvas.getContext('2d');
        if (text) {
            text.shadowOffsetX = 8;
            text.shadowOffsetY = 8;
            text.shadowBlur = 6;
            text.shadowColor = 'rgba(0, 9, 59, 0.5)';

            text.font = 'bold 50px Verdana';
            text.fillStyle = "#AB4642";
            text.fillText('HTML5 CHESS', 0, 50);
        }
    }
}

function copy() {
    let toCopy = document.getElementById("inputID");

    toCopy.select();

    document.execCommand("copy");

    alert("Game ID copied!");
}


function storageList() {

    let nav = document.createElement('nav');
    let list = document.createElement('ol');

    for (let i = 0; i < localStorage.length; i++) {
        let item = document.createElement('li');

        item.appendChild(document.createTextNode(localStorage.key(i)));

        list.appendChild(item);
    }

    nav.appendChild(list);
    document.getElementById("storage").appendChild(nav);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", localStorage.key(Math.floor(Math.random() * localStorage.length)));
    document.getElementById("txtLoadID").value = "";
}

function drop(ev) {
    ev.preventDefault();

    ev.target.value = ev.dataTransfer.getData("Text");

}