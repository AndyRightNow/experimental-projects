module.exports = class TableTreeNode {
  constructor(table, parent) {
    this._table = table || {};
    this.parent = parent || null;
  }

  _checkKey(key) {
    return key && typeof key === "string";
  }

  insert(key, val) {
    if (!this._checkKey(key) || !val) return;

    if (!this._table.hasOwnProperty(key)) {
      this._table[key] = {
        val: val,
        next: new TableTreeNode({}, this)
      };
    }
  }

  exists(key) {
    if (!this._checkKey(key)) return false;

    return !!this._table[key];
  }

  next(key) {
    if (!this._checkKey(key) || !this._table.hasOwnProperty(key)) return null;

    return this._table[key].next;
  }

  remove(key) {
    if (!this._checkKey(key)) return;

    delete this._table[key];
  }
}