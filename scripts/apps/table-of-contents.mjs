// /**
//  * Compendium that renders pages as a table of contents.
//  */
// class EGTTableOfContents extends dnd5e.applications.journal.TableOfContentsCompendium {
//   /** @inheritdoc */
//   static get defaultOptions() {
//     return foundry.utils.mergeObject(super.defaultOptions, {
//       classes: [ "table-of-contents", "egt" ]
//     })
//   }
// }
//
// /**
//  * Initializes the custom Table of Contents
//  */
// export default function initialize() {
//   Hooks.once("setup", () => {
//     game.packs.get("dnd-explorers-guide-telyndr.egt-content").applicationClass = EGTTableOfContents
//   })
// }

/**
 * Compendium that renders pages as a table of contents.
 */
class EGTTableOfContents extends dnd5e.applications.journal.TableOfContentsCompendium {
	/** @inheritdoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["table-of-contents", "egt"]
		});
	}
}

/**
 * Initializes the custom Table of Contents.
 */
export default function initialize() {
	Hooks.once("setup", () => {
		game.packs.get("dnd-explorers-guide-telyndr.egt-content").applicationClass = EGTTableOfContents;
	});
}
