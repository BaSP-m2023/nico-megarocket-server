const fs = require('fs');

class Class {
  constructor(filename) {
    this.filename = filename;
  }

  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename, 'utf8'));
  }

  async getById(id) {
    const allItems = await this.getAll();
    return allItems.find((item) => item.id === id);
  }

  async create(newItem) {
    const allItems = await this.getAll();
    allItems.push(newItem);
    await fs.promises.writeFile(this.filename, JSON.stringify(allItems));
  }

  async delete(id) {
    const allItems = await this.getAll();
    const updatedItems = allItems.filter((item) => item.id !== id);
    await fs.promises.writeFile(this.filename, JSON.stringify(updatedItems));
  }
}

module.exports = Class;
