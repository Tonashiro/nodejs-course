const { deepEqual, ok } = require("assert");

const database = require("./database");
const DEFAULT_ITEM_ADD = { name: "Flash", power: "Speed", id: 1 };
const DEFAULT_ITEM_EDIT = { name: "Lanterna Verde", power: "Ring Energy", id: 2}

describe("Hero manipulation suite", () => {
  before(async () => {
    await database.addHero(DEFAULT_ITEM_ADD);
  });
  it("Should search for a hero using files", async () => {
    const expected = DEFAULT_ITEM_ADD;
    const [result] = await database.list(expected.id);

    deepEqual(result, expected);
  });

  it("Should add a hero, using files", async () => {
    const expected = DEFAULT_ITEM_ADD;
    const result = await database.addHero(DEFAULT_ITEM_ADD);
    const [actual] = await database.list(DEFAULT_ITEM_ADD.id);

    deepEqual(actual, expected);
  });

  it.only("Should edit a hero by id", async () => {
    const expected = {
      ...DEFAULT_ITEM_EDIT,
      name: "Batman",
      power: "Money"
    }
    const newData = {
      name: "Batman",
      power: "Money"
    }
    await database.editHero(DEFAULT_ITEM_EDIT.id, newData)
    const [result] = await database.list(DEFAULT_ITEM_EDIT.id)

    deepEqual(result, expected);
  }) 

  it("Should delete a hero by id", async () => {
    const expected = true;
    const result = await database.removeHero(DEFAULT_ITEM_ADD.id);

    deepEqual(result, expected);
  });
});
