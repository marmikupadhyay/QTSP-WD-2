var btn = document.getElementById("add");
btn.addEventListener("click", e => {
  addNote();
});
var c = 0;
var notes = [];
bringNotes();
postNotes();

//Function To Add Notes

function addNote() {
  var form = document.getElementById("note-form");
  var title = document.getElementById("title").value;
  var content = document.getElementById("contentbody").value;
  var pri = document.getElementById("priority").value;
  if (title !== "" && content !== "") {
    notes.push({
      title: `${title}`,
      content: `${content}`,
      pri: pri,
      id: c,
      state: 1
    });
    sendmsg("Note Added", "success");
  } else {
    sendmsg("Fill all Fields", "danger");
  }
  document.getElementById("title").value = "";
  document.getElementById("contentbody").value = "";
  c++;
  saveNotes();
  postNotes();
  btn.innerHTML = "Add";
}

// Function to Save Notes to Local Storage

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("notesLength", c);
}

//Function to Bring Notes from Local Storage

function bringNotes() {
  if (localStorage.getItem("notes") != null) {
    notes = JSON.parse(localStorage.getItem("notes"));
  } else {
    notes = [];
  }
  console.log(notes.length);
  if (localStorage.getItem("notesLength") != null)
    c = parseInt(localStorage.getItem("notesLength"));
  console.log(c);
  console.log(notes);
}

//Function To show notes on the Page

function postNotes() {
  var pagearea = document.querySelector(".note-box");
  pagearea.innerHTML = "";
  notes.sort(function (a, b) {
    return b.pri - a.pri;
  });
  notes.forEach(e => {
    if (e.state) {
      var note = document.createElement("div");
      note.style.transform = `rotate(${randomInteger(-15, 15)}deg)`;
      if (e.pri === "1") note.className = `card red accent-3 text-white`;
      else if (e.pri === "2") note.className = `card yellow accent-1`;
      else if (e.pri === "3") note.className = `card light-green accent-3`;
      note.className += " hoverable z-depth-1";
      note.innerHTML = `
  <div class="card-body">
  <h2 style="display:none">${e.id}</h2>
  <h3 class="card-title">${e.title}</h3>
  <p class="card-text">${e.content}</p>
  <button class="btn btn-primary float-left edit">Edit</button>
  <button class="btn btn-danger delete"><i class="material-icons">close</i></button>
  </div>
  `;
      pagearea.appendChild(note);
    }
  });
  var x = document.querySelectorAll(".delete");
  x.forEach(element => {
    element.addEventListener("click", e => {
      notes.forEach((note, i) => {
        if (note.id == element.parentElement.firstElementChild.innerHTML) {
          note.state = 0;
          sendmsg("Note Removed", "warning");
          deleteNote();
          postNotes();
        }
      });
    });
  });

  //Update The Note

  var edits = document.querySelectorAll(".edit");
  edits.forEach(element => {
    element.addEventListener("click", e => {
      notes.forEach((note, i) => {
        if (note.id == element.parentElement.firstElementChild.innerHTML) {
          note.state = 0;
          document.getElementById("title").value = note.title;
          document.getElementById("contentbody").value = note.content;
          btn.innerHTML = "Apply Changes";
        }
      });
    });
  });
}

//Function For Deleting

function deleteNote() {
  notes = notes.filter(note => {
    return note.state;
  });
  console.log(notes);
  saveNotes();
}

//Function for Handling Messages

function sendmsg(msg, msgClass) {
  var message = document.createElement("div");
  message.className = `alert alert-${msgClass} m-2`;
  message.innerHTML = `${msg}`;
  var coll = document.querySelector(".addnote");
  coll.insertBefore(message, document.querySelector(".form-container"));
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}

//function to generate random number

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
