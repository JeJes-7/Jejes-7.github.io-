(() => {
  const notesListEl = document.querySelector("#notesList");
  const noteForm = document.querySelector("#noteForm");
  const titleInput = document.querySelector("#titleInput");
  const bodyInput = document.querySelector("#bodyInput");
  const dateInput = document.querySelector("#dateInput");

  let notesData = window.notesData || [];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const templateNoteItem = (note) => `
    <article tabindex="0" class="note-item">
      <h3 class="note-item__title">${note.title}</h3>
      <p class="note-item__body">${note.body}</p>
      <p class="note-item__date">Created: ${formatDate(note.createdAt)}</p>
    </article>
  `;

  const renderNotes = () => {
    notesListEl.innerHTML = "";
    notesData.forEach((note) => {
      notesListEl.innerHTML += templateNoteItem(note);
    });
  };

  noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newNote = {
      id: `notes-${Date.now()}`,
      title: titleInput.value,
      body: bodyInput.value,
      createdAt: dateInput.value,
      archived: false,
    };

    notesData.push(newNote);
    renderNotes();

    titleInput.value = "";
    bodyInput.value = "";
    dateInput.value = "";
  });

  renderNotes();
})();
