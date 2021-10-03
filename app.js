const textArea = document.getElementById("note");
const addBtn = document.getElementById("add-button");
const noteList = document.getElementById("output");
const modal = document.getElementById("modal");
const close = document.getElementById("close");
const modalHeader = document.getElementById("modal-header");

addBtn.addEventListener("click", addNote);

function addNote() {
  let note = document.createElement("li");

  let noteHeader = document.createElement("span");
  noteHeader.innerHTML = "Click to rename note";
  noteHeader.style.cursor = "pointer";
  noteHeader.style.color = "#277ce5";

  noteHeader.addEventListener("click", (e) => {
    var span, input, text;
    span = e.target;

    if (span && span.tagName.toUpperCase() === "SPAN") {
      span.style.display = "none";
      text = span.innerHTML;
      input = document.createElement("input");
      input.type = "text";
      input.value = text;
      input.size = Math.max((text.length / 4) * 4, 8);
      input.style.padding = "5px";
      input.style.fontSize = "0.8em";
      input.style.borderRadius = "10px";
      span.parentNode.insertBefore(input, span);

      input.focus();
      input.onblur = function () {
        span.parentNode.removeChild(input);
        span.innerHTML = input.value == "" ? "&nbsp;" : input.value;
        span.style.display = "";
      };
    }
  });

  let noteContent = document.createElement("p");
  noteContent.textContent = textArea.value;

  let viewBtn = document.createElement("button");
  let delBtn = document.createElement("button");
  let btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";

  viewBtn.classList.add("view-button");
  delBtn.classList.add("delete-button");
  viewBtn.textContent = "View Note";
  delBtn.textContent = "Delete Note";

  //show modal
  viewBtn.addEventListener("click", () => {
    modal.classList.add("show-modal");
    modalHeader.innerText = noteHeader.innerText;

    document.getElementById("note-content-expand").innerText =
      noteContent.innerText;
  });

  //delete note
  delBtn.addEventListener("click", () => note.remove());

  //hide modal
  close.addEventListener("click", () => {
    modal.classList.remove("show-modal");
  });

  note.appendChild(noteHeader);
  note.appendChild(noteContent);
  btnContainer.appendChild(viewBtn);
  btnContainer.appendChild(delBtn);
  note.appendChild(btnContainer);
  noteList.appendChild(note);
  textArea.value = "";
}

// hide modal on outside click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
