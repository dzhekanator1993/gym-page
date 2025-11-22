import api from './api';

export const lessonService = {
  /**
   * Get lesson by ID
   * @param {string} id 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async getLessonById(id) {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },

  /**
   * Create new lesson (admin only)
   * @param {object} lessonData 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async createLesson(lessonData) {
    const response = await api.post('/lessons', lessonData);
    return response.data;
  },

  /**
   * Update existing lesson (admin only)
   * @param {string} id 
   * @param {object} lessonData 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async updateLesson(id, lessonData) {
    const response = await api.put(`/lessons/${id}`, lessonData);
    return response.data;
  },

  /**
   * Delete lesson (admin only)
   * @param {string} id 
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async deleteLesson(id) {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  }
};
