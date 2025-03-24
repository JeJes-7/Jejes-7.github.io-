class NotesApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: Arial, sans-serif;
            background-color: #EBE8DB;
            min-height: 100vh;
          }
          
          header {
            background-color: #D76C82;
            color: white;
            padding: 1rem;
            text-align: center;
          }
          
          .brand-name {
            font-size: 2rem;
            margin: 0;
          }
          
          main {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .add-notes-section {
            margin: 2rem 0;
          }
          
          .add-notes-title {
            color: #B03052;
            margin-bottom: 1rem;
          }
          
          .add-note-form {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .form-group {
            margin-bottom: 1rem;
          }
          
          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
          }
          
          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
          }
          
          .form-group textarea {
            min-height: 100px;
            resize: vertical;
          }
          
          button[type="submit"] {
            background-color: #D76C82;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s;
          }
          
          button[type="submit"]:hover {
            background-color: #B03052;
          }
          
          footer {
            background-color: #D76C82;
            color: white;
            text-align: center;
            padding: 1rem;
            margin-top: 2rem;
          }
        </style>
        
        <header>
          <h1 class="brand-name">Notes App</h1>
        </header>
        
        <main>
          <notes-list></notes-list>
          
          <div class="add-notes-section">
            <h2 class="add-notes-title">Add Notes</h2>
            <div class="add-note-form">
              <form id="noteForm">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" id="title" required>
                </div>
                <div class="form-group">
                  <label for="body">Content</label>
                  <textarea id="body" required></textarea>
                </div>
                <div class="form-group">
                  <label for="date">Date</label>
                  <input type="date" id="date" required>
                </div>
                <button type="submit">Add Note</button>
              </form>
            </div>
          </div>
        </main>
        
        <footer>
          <p>Jesika Yudiani Putri ❤️ @CodingCamp 2025</p>
        </footer>
      `;
  }

  setupEventListeners() {
    const form = this.shadowRoot.getElementById("noteForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addNewNote();
    });
  }

  addNewNote() {
    const titleInput = this.shadowRoot.getElementById("title");
    const bodyInput = this.shadowRoot.getElementById("body");
    const dateInput = this.shadowRoot.getElementById("date");

    if (!titleInput.value.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    const newNote = {
      id: "note-" + Math.random().toString(36).substr(2, 9),
      title: titleInput.value,
      body: bodyInput.value,
      createdAt: dateInput.value
        ? new Date(dateInput.value).toISOString()
        : new Date().toISOString(),
      archived: false,
    };

    if (!window.notesData) window.notesData = [];
    window.notesData.unshift(newNote); // Add to beginning of array

    const notesList = this.shadowRoot.querySelector("notes-list");
    if (notesList) notesList.loadNotes();

    // Reset form
    titleInput.value = "";
    bodyInput.value = "";
    dateInput.value = "";
  }
}

customElements.define("notes-app", NotesApp);
