class NotesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.loadNotes();
  }

  loadNotes() {
    const container = this.shadowRoot.getElementById("notesContainer");
    container.innerHTML = "";

    if (!window.notesData || window.notesData.length === 0) {
      container.innerHTML = `<p class="empty-message">No notes available.</p>`;
      return;
    }

    window.notesData.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.setAttribute("title", note.title);
      noteItem.setAttribute("body", note.body);
      noteItem.setAttribute("createdat", note.createdAt);
      container.appendChild(noteItem);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .notes-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .empty-message {
          text-align: center;
          color: #888;
          font-style: italic;
          padding: 2rem;
          grid-column: 1 / -1;
        }
      </style>
      
      <div class="notes-list" id="notesContainer"></div>
    `;
  }
}
customElements.define("notes-list", NotesList);
