const { readFile, writeFile } = require("fs");

const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.FILE_NAME = "heroes.json";
  }

  async getData() {
    const arquivo = await readFileAsync(this.FILE_NAME, "utf8");

    return JSON.parse(arquivo.toString());
  }

  async writeData(data) {
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data));

    return true;
  }

  async addHero(hero) {
    const data = await this.getData();
    const id = hero.id <= 2 ? hero.id : Date.now();
    const fullHero = {
      id,
      ...hero,
    };
    const finalData = [...data, fullHero];

    const result = await this.writeData(finalData);

    return result;
  }

  async list(id) {
    const data = await this.getData();
    const filteredData = data.filter((item) => (id ? item.id === id : true));

    return filteredData;
  }

  async editHero(editId, edit) {
    const data = await this.getData();
    const index = data.findIndex((item) => (item.id === parseInt(editId)))

    if (index === -1) {
      throw Error("This hero doesn't exist yet")
    }
    const actual = data[index];
    const editedData = {
      ...actual,
      ...edit
    }

    data.splice(index, 1);

    return await this.writeData([...data, editedData])
  }

  async removeHero(id) {
    if (!id) {
      return await this.writeFile([]);
    }

    const data = await this.getData();
    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw Error("User not found");
    }
    data.splice(index, 1);
    return await this.writeData(data);
  }
}

module.exports = new Database();
