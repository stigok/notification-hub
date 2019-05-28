const store = [];

// Top notch memory storage
module.exports = {
  add(obj) {
    store.push(obj);
  },
  next() {
    return store.shift();
  }
};
