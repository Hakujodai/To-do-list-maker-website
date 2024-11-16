let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add('active');
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.remove('active');
          span.classList.add('fade');
        }, (idx + 1) * 50);
      });
    }, 2000);

    setTimeout(() => {
      intro.style.top = '-100vh';
    }, 2300);
  });
});

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(note => {
    createNoteElement(note.title, note.todos);
  });
}

function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note").forEach(note => {
    const title = note.querySelector(".note-header").textContent;
    const todos = [];
    note.querySelectorAll("li").forEach(todo => {
      todos.push({
        text: todo.textContent.replace("\u00D7", "").trim(),
        checked: todo.classList.contains("checked"),
      });
    });
    notes.push({ title, todos });
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote() {
  const noteTitle = document.getElementById("noteTitle").value.trim();
  if (noteTitle === '') {
    alert("Please enter a note title!");
    return;
  }
  createNoteElement(noteTitle);
  saveNotes();
  document.getElementById("noteTitle").value = "";
}

function createNoteElement(title, todos = []) {
  const note = document.createElement("div");
  note.classList.add("note");

  const noteHeader = document.createElement("div");
  noteHeader.className = "note-header";
  noteHeader.textContent = title;
  note.appendChild(noteHeader);

  const closeNote = document.createElement("span");
  closeNote.className = "close-note";
  closeNote.textContent = "\u00D7";
  closeNote.onclick = () => {
    note.remove();
    saveNotes();
  };
  note.appendChild(closeNote);

  const ul = document.createElement("ul");
  note.appendChild(ul);

  todos.forEach(todo => addTodoElement(ul, todo.text, todo.checked));

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add a task...";
  input.onkeypress = function (e) {
    if (e.key === 'Enter') {
      const inputValue = input.value.trim();
      if (inputValue === '') {
        alert("Please write something!");
        return;
      }
      addTodoElement(ul, inputValue);
      saveNotes();
      input.value = "";
    }
  };
  note.appendChild(input);

  document.getElementById("notesContainer").appendChild(note);
}

function addTodoElement(ul, text, checked = false) {
  const li = document.createElement("li");
  const t = document.createTextNode(text);
  li.appendChild(t);
  if (checked) li.classList.add("checked");
  ul.appendChild(li);

  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  span.onclick = function () {
    li.remove();
    saveNotes();
  };

  li.onclick = function () {
    li.classList.toggle("checked");
    saveNotes();
  };
}

window.onload = loadNotes;
