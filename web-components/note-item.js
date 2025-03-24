class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["title", "body", "createdat"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  render() {
    const title = this.getAttribute("title") || "Untitled Note";
    const body = this.getAttribute("body") || "";
    const createdAt = this.getAttribute("createdat");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .note-item {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          background-color: white;
          height: 100%;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .note-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .note-title {
          font-size: 1.25rem;
          margin: 0 0 1rem 0;
          color: #B03052;
          word-break: break-word;
        }
        
        .note-body {
          color: #555;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          word-break: break-word;
          white-space: pre-line;
        }
        
        .note-date {
          font-size: 0.85rem;
          color: #888;
          margin: 0;
        }
      </style>
      
      <article class="note-item" tabindex="0">
        <h3 class="note-title">${title}</h3>
        <p class="note-body">${body}</p>
        ${
          createdAt
            ? `<p class="note-date">Created: ${this.formatDate(createdAt)}</p>`
            : ""
        }
      </article>
    `;
  }
}

customElements.define("note-item", NoteItem);
