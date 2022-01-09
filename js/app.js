console.log('welcome to notes app');
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTxt2 = document.getElementById("addTxt2");

    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (title == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(title);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";

    titleObj.push(addTxt2.value);
    localStorage.setItem("title", JSON.stringify(titleObj));
    addTxt2.value = "";
    //console.log(notesObj);
    showNotes();
});
function showNotes() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    if (title == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(title);
    }
    // let otherDate = new Date();
    // let year = otherDate.getYear();
    // let date = otherDate.getDate();
    // let month = otherDate.getMonth();
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
              <div class="noteCard my-2 mx-2 card" style="width: 20rem;">
                      <div class="card-body">
                          <h5 class="card-title">${titleObj[index]}</h5>
                          <p class="card-text"> ${element}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" style='float:left;' class="btn btn-primary">Delete Note</button>
                      </div>
                  </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index) {
    // console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(title);
    }
    titleObj.splice(index, 1);
    localStorage.setItem("title", JSON.stringify(titleObj));
    showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    // console.log('input event fired') ;
    let inputVal = search.value.toLowerCase();
    let inputVal2 = search.value.toUpperCase();

    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let titleTxt = element.getElementsByTagName("h5")[0].innerText;

        if (cardTxt.includes(inputVal) || titleTxt.includes(inputVal) || cardTxt.includes(inputVal2) || titleTxt.includes(inputVal2)) {
            element.style.display = "block";
           // element.style.marginBottom = "10px";

        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})