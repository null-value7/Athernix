// Mock DB of users in memory for demonstration purposes
const users = [
  { username: 'demo@future.com', password: '123456', name: 'Demo User' }
];

export default class User {
  /**
   * Authenticate a user by username and password.
   * @param {string} username 
   * @param {string} password 
   * @returns {object} Auth result
   */
  static authenticate(username, password) {
    if (!username || !password) {
      return { success: false, error: 'Usuario y contraseña son requeridos' };
    }
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (user && user.password === password) {
      return { success: true, user: { username: user.username, name: user.name } };
    }
    return { success: false, error: 'Usuario o contraseña incorrectos' };
  }

  /**
   * Register/create a new user.
   * @param {object} userData 
   * @returns {object} Registration result
   */
  static create({ username, password, name }) {
    if (!username || !password) {
      return { success: false, error: 'Usuario y contraseña son requeridos' };
    }
    const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) {
      return { success: false, error: 'El usuario ya existe' };
    }
    const newUser = { username, password, name: name || 'Explorador Athernix' };
    users.push(newUser);
    return { success: true, user: { username: newUser.username, name: newUser.name } };
  }
}
