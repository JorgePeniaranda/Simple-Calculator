export class LocalStorage {
  /**
   * Get item from local storage
   * @param {string} key
   * @returns {string}
   */
  getItem(key) {
    return localStorage.getItem(key);
  }

  /**
   * Set item in local storage
   * @param {string} key
   * @param {string} value
   */
  setItem(key, value) {
    return localStorage.setItem(key, value);
  }

  /**
   * Remove item from local storage
   * @param {string} key
   */
  removeItem(key) {
    return localStorage.removeItem(key);
  }
}