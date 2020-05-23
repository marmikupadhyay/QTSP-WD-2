var btn = document.getElementById("add");
btn.addEventListener("click", e => {
  addNote();
});

var notes = [];
var c = 1;
var pagearea = document.querySelector(".col-9");
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
  postNotes();
  c++;
  btn.innerHTML = "Add";
}

function postNotes() {
  pagearea.innerHTML = "";
  notes.sort(function (a, b) {
    return b.pri - a.pri;
  });
  notes.forEach(e => {
    if (e.state) {
      var note = document.createElement("div");
      if (e.pri === "1") note.className = `card bg-danger text-white`;
      else if (e.pri === "2") note.className = `card bg-warning text-white`;
      else if (e.pri === "3") note.className = `card bg-success text-white  `;

      note.innerHTML = `
  <div class="card-body">
  <h2 style="display:none">${e.id}</h2>
  <h3 class="card-title">${e.title}</h3>
  <p class="card-text">${e.content}</p>
  <button class="btn btn-primary float-left edit">Edit</button>
  <button class="btn btn-danger delete">x</button>
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
          postNotes();
        }
      });
    });
  });
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

function sendmsg(msg, msgClass) {
  var message = document.createElement("div");
  message.className = `alert alert-${msgClass} m-2`;
  message.innerHTML = `${msg}`;
  var coll = document.querySelector(".col-3");
  coll.insertBefore(message, document.querySelector(".form-container"));
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}
