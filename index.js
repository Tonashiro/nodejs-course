const Commander = require("commander");
const Database = require("./database");
const Hero = require("./hero");

async function main() {
  Commander.version("v1")
    .option("-n, --name [value]", "Hero name")
    .option("-p, --power [value]", "Hero power")
    .option("-i --id [value]", "Hero id")
    .option("-a, --add", "Add a new hero")
    .option("-l, --list", "List all heroes")
    .option("-e, --edit [value]", "Edit a hero by id")
    .option("-r, --remove [value]", "Remove hero by ID")
    .parse(process.argv);

  const hero = new Hero(Commander._optionValues);
  const option = Commander.opts();

  try {
    if (option.add) {
      delete hero.id
      const result = await Database.addHero(hero);
      if (!result) {
        console.error("Hero not added!");
        return;
      }

      console.log("Hero successfully added!");
    }

    if (option.list) {
      const result = await Database.list();
      console.log(result);
      return;
    }

    if (option.remove) {
      const result = await Database.removeHero(hero.id);

      if (!result) {
        console.error("Couldn't remove the hero!");
        return;
      }

      console.log("Hero successfully removed!");
    }

    if (option.edit) {
      const editId = parseInt(Commander._optionValues.edit)
      const data = JSON.stringify(hero)
      const editedHero = JSON.parse(data)
      
      const result = await Database.editHero(editId, editedHero)
       
      if(!result) {
        console.error("Couldn't edit the hero!");
        return;
      }

      console.log("Hero successfully edited!");
    }

  } catch (error) {
    console.error(error);
  }
}

main();
