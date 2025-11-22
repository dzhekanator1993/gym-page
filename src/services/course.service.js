import api from './api';

export const courseService = {
  /**
   * Get all courses
   * @param {object} params - { category, difficulty }
   * @returns {Promise<{success: boolean, data: array}>}
   */
  async getAllCourses(params = {}) {
    const { category, difficulty } = params;
    const queryParams = new URLSearchParams();

    if (category) queryParams.append('category', category);
    if (difficulty) queryParams.append('difficulty', difficulty);

    const response = await api.get(`/courses?${queryParams}`);
    return response.data;
  },

  /**
   * Get single course by ID
   * @param {string} id 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async getCourseById(id) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  /**
   * Create new course (admin only)
   * @param {object} courseData 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async createCourse(courseData) {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  /**
   * Update existing course (admin only)
   * @param {string} id 
   * @param {object} courseData 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async updateCourse(id, courseData) {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  /**
   * Delete course (admin only)
   * @param {string} id 
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async deleteCourse(id) {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  /**
   * Publish/unpublish course (admin only)
   * @param {string} id 
   * @param {boolean} isPublished 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async publishCourse(id, isPublished) {
    const response = await api.patch(`/courses/${id}/publish`, { isPublished });
    return response.data;
  }
};
