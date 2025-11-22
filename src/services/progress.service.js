import api from './api';

export const progressService = {
  /**
   * Get student progress for a course
   * @param {string} courseId 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async getProgress(courseId) {
    const response = await api.get(`/progress/${courseId}`);
    return response.data;
  },

  /**
   * Mark lesson as completed
   * @param {string} courseId 
   * @param {string} lessonId 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async completeLesson(courseId, lessonId) {
    const response = await api.post(`/progress/${courseId}/complete`, { lessonId });
    return response.data;
  },

  /**
   * Get all students (admin only)
   * @returns {Promise<{success: boolean, data: array}>}
   */
  async getAllStudents() {
    const response = await api.get('/progress/admin/students');
    return response.data;
  },

  /**
   * Get student progress (admin only)
   * @param {string} userId 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async getStudentProgress(userId) {
    const response = await api.get(`/progress/admin/student/${userId}`);
    return response.data;
  }
};
