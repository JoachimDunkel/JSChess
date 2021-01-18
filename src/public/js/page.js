window.onload = function(){
    document.getElementById("txtGameID").value = "";
    document.getElementById("txtLoadID").value = "";
    // localStorage.clear();
    storageList();
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

