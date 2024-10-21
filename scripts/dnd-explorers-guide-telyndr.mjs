import initTableOfContents from "./apps/table-of-contents.mjs"
import TelyndrJournalSheet from "./apps/journal-sheet.mjs"

/* -------------------------------------------- */
/*  Hooks                                       */
/* -------------------------------------------- */

Hooks.once("init", () => {
  
  // Adding module symbols to module namespace
  const module = game.modules.get("dnd-explorers-guide-telyndr")
  module.apps = {}
  module.dataModels = {}

  game.settings.register("dnd-explorers-guide-telyndr", "lastVersion", {
    name: "Latest Version",
    hint: "The last version checked against to determine whether to show the changelog.",
    scope: "world",
    config: false,
    type: String,
    default: "1.0.0"
  })

  CONFIG.EGT = {}

  // Register Journal Sheet
  DocumentSheetConfig.registerSheet(JournalEntry, "dnd-explorers-guide-telyndr", TelyndrJournalSheet, {
    types: [ "base" ],
    label: "Explorer's Guide to Telyndr",
    makeDefault: false
  })

  // initTableOfContents()
});

Hooks.once("ready", async () => {
  const currentVersion = game.modules.get("dnd-explorers-guide-telyndr").version
  const lastVersion = game.settings.get("dnd-explorers-guide-telyndr", "lastVersion")

  if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
    const journal = await fromUuid("Compendium.dnd-explorers-guide-telyndr.egt-content.JournalEntry.egtChangelog0000")
    const page = journal.pages.contents[journal.pages.contents.length - 1]
    journal.sheet.render(true, { pageId: page.id })
    game.settings.get("dnd-explorers-guide-telyndr", "lastVersion", currentVersion)
  }
  
  // TODO: Refactor these. Not all of them need the mergeObject function, assigment works fine
  // TODO: Check how spell referencing works with Tasha's rulebook, for Shadowstrider

  const dnd5e = CONFIG.DND5E;

  foundry.utils.mergeObject(dnd5e.weaponProficienciesMap, {
    advM: "adv",
    advR: "adv",
  })

  foundry.utils.mergeObject(dnd5e.weaponTypeMap, {
    advM: "melee",
    advR: "ranged",
  })

  foundry.utils.mergeObject(dnd5e.weaponTypes, {
    advM: "Advanced Melee",
    advR: "Advanced Ranged",
  })

  foundry.utils.mergeObject(dnd5e.weaponProficiencies, {
    adv: "Advanced Weapons",
  })

  foundry.utils.mergeObject(dnd5e.weaponIds, {
    gunblade: "Compendium.dnd-explorers-guide-telyndr.egt-equipment.Item.egtwpnGunblade00"
  })

  foundry.utils.mergeObject(dnd5e.consumableTypes.ammo.subtypes, {
    gunbladeShell: "Shell, Gunblade",
  })

  dnd5e.itemProperties = Object.assign({}, dnd5e.itemProperties, {
    chamber: {
      label: "Chamber",
    }
  })

  let dnd5eprops = dnd5e.validProperties
  dnd5eprops.weapon.add("chamber")

  dnd5eprops = Object.assign({}, dnd5eprops, {
    weapon: new Set([
      ...dnd5eprops.weapon
    ])
  })

  dnd5e.damageTypes.unholy = {
    icon: "systems/dnd5e/icons/svg/schools/conjuration.svg",
    label: "Unholy",
    reference: "Compendium.dnd-explorers-guide-telyndr.egt-content.JournalEntry.De4u0WBrqJMiGogc.JournalEntryPage.6IFM5uNykfCyNsPI"
  }

  dnd5e.featureTypes.class.subtypes.flourish = "Gunbreaker Flourish"
  dnd5e.featureTypes.class.subtypes.tattoos = "Tattoos"
})

  // dnd5e.weaponProficienciesMap = Object.assign({}, dnd5e.weaponProficienciesMap, {
  //   advM: "adv",
  //   advR: "adv"
  // })
  //
  // dnd5e.weaponTypeMap = Object.assign({}, dnd5e.weaponTypeMap, {
  //   advM: "melee",
  //   advR: "ranged"
  // })
  //
  // dnd5e.weaponTypes = Object.assign({}, dnd5e.weaponTypes, {
  //   advM: "Advanced Melee",
  //   advR: "Advanced Ranged"
  // })
  //
  // dnd5e.weaponProficiencies = Object.assign({}, dnd5e.weaponProficiencies, {
  //   adv: "Advanced Weapons"
  // })
  //
  // /** Base Weapon Types **/
  // dnd5e.weaponIds = Object.assign({}, dnd5e.weaponIds, {
  //   gunblade: "Compendium.dnd-explorers-guide-telyndr.egt-equipment.Item.egtwpnGunblade00"
  // })
  //
  // /** Create our own ammo definition **/
  // dnd5e.consumableTypes.ammo.subtypes = Object.assign({}, dnd5e.consumableTypes.ammo.subtypes, {
  //   gunbladeShell: "Shell, Gunblade"
  // })
  //
  // /** Feature Types **/
  // dnd5e.featureTypes.class.subtypes = Object.assign({}, dnd5e.featureTypes.class.subtypes, {
  //   flourish: "Gunbreaker Flourish"
  // })
  //
  // dnd5e.itemProperties = Object.assign({}, dnd5e.itemProperties, {
  //   chamber: {
  //     label: "Chamber",
  //     isPhysical: true
  //   }
  // })
  // 
  // let dnd5eprops = dnd5e.validProperties
  // dnd5eprops.weapon.add("chamber")
  //
  // dnd5eprops = Object.assign({}, dnd5eprops, {
  //   weapon: Set([
  //     ...dnd5eprops.weapon
  //   ])
  // })
