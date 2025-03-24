(() => {
  const notesListEl = document.querySelector("#notesList");

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

  notesListEl.innerHTML = "";
  notesData.forEach((note) => {
    notesListEl.innerHTML += templateNoteItem(note);
  });
})();
