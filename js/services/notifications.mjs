export const NotificationService = {
  /**
   * Shows an alert with the given message.
   * @param {string} title - The title of the alert.
   * @param {string} message - The message to show.
   */
  warning(title, message){
    return alert(`${title}: ${message}`)
  },

  /**
   * Shows an alert with the given message.
   * @param {string} title - The title of the alert.
   * @param {string} message - The message to show.
   */
  error(title, message){
    return alert(`${title}: ${message}`)
  }
}