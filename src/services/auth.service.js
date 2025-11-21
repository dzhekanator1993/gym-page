import api from './api';

export const authService = {
  /**
   * Login user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });

    if (response.data.token) {
      // Store user data with token
      localStorage.setItem('user', JSON.stringify(response.data));
      // Trigger event for navbar update
      window.dispatchEvent(new Event('userChanged'));
    }

    return response.data;
  },

  /**
   * Register new user
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{message: string}>}
   */
  async register(username, email, password) {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  /**
   * Logout current user
   */
  logout() {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChanged'));
  },

  /**
   * Get current logged in user
   * @returns {object|null}
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  },

  /**
   * Check if current user is admin
   * @returns {boolean}
   */
  isAdmin() {
    const userData = this.getCurrentUser();
    return userData?.user?.role === 'admin';
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const userData = this.getCurrentUser();
    return !!userData?.token;
  },
};
