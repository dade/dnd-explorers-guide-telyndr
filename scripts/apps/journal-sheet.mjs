/**
 * Custom journal sheet for displaying navigation between pages
 */
export default class TelyndrJournalSheet extends dnd5e.applications.journal.JournalSheet5e {

  constructor(doc, options) {
    super(doc, options)
    this.options.classes.push("egt")
  }

  /**
   * Rendering
   */

  /** @inheritdoc **/
  async _render(...args) {
		await super._render(...args);
		const [html] = this._element;
		const header = html.querySelector(".journal-entry-content .journal-header");

		// Insert navigation
		const nav = this.document.getFlag("dnd-tashas-cauldron", "navigation");
		if ( nav ) {
			const getDocument = id => {
				if ( !this.document.pack ) return game.journal.get(id);
				return game.packs.get(this.document.pack).getDocument(id);
			};
			const previous = nav.previous ? await getDocument(nav.previous) : null;
			const up = nav.up ? await getDocument(nav.up) : null;
			const next = nav.next ? await getDocument(nav.next) : null;
			header.insertAdjacentHTML("afterend", `
				<nav class="book-navigation">
					<ul>
						<li>${previous ? `<a class="content-link" data-uuid="${previous.uuid}" rel="prev"
							data-tooltip="Previous" data-tooltip-direction="Left">${previous.name}</a>` : ""}</li>
						<li>${up ? `<a class="content-link parent" data-uuid="${up.uuid}"
							data-tooltip="Up">${up.name}</a>` : ""}</li>
						<li>${next ? `<a class="content-link" data-uuid="${next.uuid}" rel="next"
							data-tooltip="Next" data-tooltip-direction="Right">${next.name}</a>` : ""}</li>
					</ul>
				</nav>
			`);
		}
	}
}

