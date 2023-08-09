// ALL MAIN ELEMENT
const addBtn = document.getElementById("add");
const mainCon = document.getElementById("main-container");
const mainHead = document.getElementById("main-header");
const editor = document.getElementById("editor");
const viewer = document.getElementById("viewer");
const footNav = document.getElementById("foot-nav");
const listBox = document.getElementsByClassName("list-box");
const mainApp = document.getElementById("random");
const edit = document.getElementById("edit");
const view = document.getElementById("view");
const inputHT = document.getElementById("input-head-text");
const inputBT = document.getElementById("input-body-text");
const colorPicker = document.getElementById("color-picker");
const outputHT = document.getElementById("output-head-text");
const outputBT = document.getElementById("output-body-text");
const viewTC = document.getElementById("view-top-con");
// END

// OPEN EDITOR
addBtn.addEventListener("click", addNewNote);
function addNewNote() {
    editor.style.display = "block";
    footNav.style.filter = "blur(3px)";
    mainCon.style.filter = "blur(3px)";
    mainHead.style.filter = "blur(3px)";
    inputHT.autofocus = true;
}
// END

// CURRENT STATE OF APP
let host = {
    editClicked: false,
    viewClicked: false,
    editorEmpty: true,
    contentAlreadySaved: false,
    viewCurrentItem: undefined
};
// END

/*
** GET'S ALL SAVED LIST FROM LOCAL STORAGE ON LOAD
** AND ADD TO ALL NOTE ARRAY
** ALSO MAKE ALL LIST ITEM CLICKABLE
*/
this.onload = () => {
    if (localStorage.getItem("allNote") !== null) {
        getFromLocalStorage();
        showNoteFromStorage();
    }
    addEvent();
};
// END

// MAKE NOTE ITEMS CLICKABLE
function addEvent() {
    if (listBox.length) {
        for (let x = 0; x < listBox.length; x++) {
            listBox[x].addEventListener("click", previewCurrent);
        }
    }
}
// END

// ADDS GIVEN VALUE TO APP INTERFACE
function addNote(value) {
    mainApp.innerHTML = value;
}
// END

// ALL NOTE LIST ARRAY
let allNoteList = [];
// END

// DISPLAY ALL NOTE LIST ARRAY IN APP
function showNoteFromStorage() {
    let txt = "";
    for (let x = 0; x < allNoteList.length; x++) {
        txt += "<div class='list-box' id='" + allNoteList[x].listId + "'><div class='color-keeper'></div><div class='box-head'>" + allNoteList[x].headtext + "</div><div class='box-sample-text'>" + allNoteList[x].sampleText + "</div><div class='box-date'>" + allNoteList[x].dateText + "</div></div>";
    }
    addNote(txt);
    // color adder
    for ( let x = 0; x < allNoteList.length; x++) {
        document.querySelector("#id" + x + " .color-keeper").style.backgroundColor = allNoteList[x].color;
    }
}
// END


// GET ALL NOTE FROM LOCAL STORAGE
function getFromLocalStorage() {
    allNoteList = JSON.parse(localStorage.getItem("allNote"));
}
// END

// SAVE ALL NOTE TO LOCAL STORAGE
function saveToLocalStorage() {
    let stringList = JSON.stringify(allNoteList);
    localStorage.setItem("allNote", stringList);
}
// END

/*
** CLOSE EDITOR OR VIEWER
** WHEN YOU CLICK OUTSIDE THEM
*/
edit.addEventListener("click", () => {
    host.editClicked = true;
});
editor.addEventListener("click", () => {
    if (host.editClicked) {
        host.editClicked = false;
    } else {
        editor.style.display = "none";
        footNav.style.filter = "none";
        mainCon.style.filter = "none";
        mainHead.style.filter = "none";
        host.contentAlreadySaved = false;
        inputHT.value = "";
        inputBT.value = "";
    }
});

view.addEventListener("click", () => {
    host.viewClicked = true;
});
viewer.addEventListener("click", () => {
    if (host.viewClicked) {
        host.viewClicked = false;
    } else {
        viewer.style.display = "none";
        footNav.style.filter = "none";
        mainCon.style.filter = "none";
        mainHead.style.filter = "none";
        outputBT.innerHTML = "";
        outputHT.innerHTML = "";
        host.viewCurrentItem = undefined;
    }
});
// END

/*
** SAVES NOTES TO ALLNOTELIST ARRAY && LOCALSTORAGE
** UPDATES NOTE ON APP DISPLAY
*/
function addNewOne() {
    try {
        // triggers if the text is already saved and being edited
        if (host.contentAlreadySaved) {
            host.contentAlreadySaved = false;
            throw "saved";
            // trigger if the editor is empty
        } else if (Number(inputHT.value) == 0 && Number(inputBT.value) == 0 ) {
            throw "empty value";
            // triggers if the editor is no empty
        } else {
            throw "valid value";
        }
    } catch (value) {
        if (value === "saved") {
            try {
                if (Number(inputHT.value) === 0 && Number(inputBT.value) === 0 ) {
                    throw "empty value";
                } else {
                    throw "valid value";
                }
            } catch (msg) {
                if (msg === "empty value") {
                    alert("please input some text");
                } else {
                    let date = new Date();
                    let id = host.viewCurrentItem;
                    host.viewCurrentItem = undefined;
                    let i = inputHT.value;
                    i = i.replace(i[0], i[0].toUpperCase());
                    let k = inputBT.value;
                    k = k.replace(k[0], k[0].toUpperCase());
                    let c = colorPicker.value;
                    allNoteList[id].headtext = i;
                    allNoteList[id].sampleText = k;
                    allNoteList[id].dateText = date;
                    allNoteList[id].color = c;
                    inputHT.value = "";
                    inputBT.value = "";
                    colorPicker.value = "#FF0000";
                    showNoteFromStorage();
                    addEvent();
                    editor.style.display = "none";
                    footNav.style.filter = "none";
                    mainCon.style.filter = "none";
                    mainHead.style.filter = "none";
                    saveToLocalStorage();
                }
            }
        } else if (value === "empty value") {
            alert("please input some text");
        } else {
            let date = new Date();
            let x = allNoteList.length;
            x = "id" + x;
            let i = inputHT.value;
            i = i.replace(i[0], i[0].toUpperCase());
            let k = inputBT.value;
            k = k.replace(k[0], k[0].toUpperCase());
            let c = colorPicker.value;
            let obj =  {
                headtext: i,
                sampleText: k,
                dateText: date,
                listId: x,
                color: c
            };
            allNoteList.push(obj);
            inputHT.value = "";
            inputBT.value = "";
            colorPicker.value = "#FF0000";
            showNoteFromStorage();
            addEvent();
            editor.style.display = "none";
            footNav.style.filter = "none";
            mainCon.style.filter = "none";
            mainHead.style.filter = "none";
            saveToLocalStorage();
        }
    };
}
// END

// TEST CASES

const binBtn = document.getElementById("bin");

// GET VIEWER AND INPUT DATA INTO IT
function previewCurrent() {
    viewer.style.display = "block";
    footNav.style.filter = "blur(3px)";
    mainCon.style.filter = "blur(3px)";
    mainHead.style.filter = "blur(3px)";
    let id = this.id;
    id = id.replace("id", "");
    id = Number(id);
    host.viewCurrentItem = id;
    viewTC.style.backgroundColor = allNoteList[id].color;
    let x = allNoteList[id].headtext;
    let i = allNoteList[id].sampleText;
    outputHT.innerHTML = x;
    outputBT.innerHTML = i;
}
// END

// EDIT ALREADY SAVED NOTE
function editSaved() {
    addNewNote();
    viewer.style.display = "none";
    host.contentAlreadySaved = true;
    let id = host.viewCurrentItem;
    let x = allNoteList[id].headtext;
    let i = allNoteList[id].sampleText;
    let j = allNoteList[id].color;
    inputHT.value = x;
    inputBT.value = i;
    colorPicker.value = j;
}
// END

function removeNewOne() {
    window.localStorage.setItem("allNote", "[]");
    getFromLocalStorage();
    showNoteFromStorage();
}