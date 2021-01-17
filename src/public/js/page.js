window.onload = function(){
    document.getElementById("txtGameID").value = "";
    storageList();
}

function copy() {
    let copyText = document.getElementById("inputID");

    copyText.select();

    document.execCommand("copy");

    alert("Game ID copied! ");
}

function getStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log({key, value})
    }

    Object.keys(localStorage).forEach(key => console.log(localStorage[key]));
}


function storageList() {

    let nav = document.createElement('nav');
    let list = document.createElement('ul');

    for (let i = 0; i < localStorage.length; i++) {
        let item = document.createElement('li');

        item.appendChild(document.createTextNode(localStorage.key(i)));

        list.appendChild(item);
    }

    nav.appendChild(list);
    document.getElementById("storage").appendChild(nav);
}

