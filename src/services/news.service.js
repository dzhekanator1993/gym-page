import api from './api';

export const newsService = {
  /**
   * Get all published news with pagination
   * @param {object} params - { category, page, limit }
   * @returns {Promise<{success: boolean, data: array, pagination: object}>}
   */
  async getAllNews(params = {}) {
    const { category, page = 1, limit = 10 } = params;
    const queryParams = new URLSearchParams({ page: page.toString(), limit: limit.toString() });

    if (category) {
      queryParams.append('category', category);
    }

    const response = await api.get(`/news?${queryParams}`);
    return response.data;
  },

  /**
   * Get single news by ID
   * @param {string} id 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async getNewsById(id) {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  /**
   * Create new news (admin only)
   * @param {object} newsData - { title, content, imageUrl, category, tags, isPublished }
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async createNews(newsData) {
    const response = await api.post('/news', newsData);
    return response.data;
  },

  /**
   * Update existing news (admin only)
   * @param {string} id 
   * @param {object} newsData 
   * @returns {Promise<{success: boolean, data: object}>}
   */
  async updateNews(id, newsData) {
    const response = await api.put(`/news/${id}`, newsData);
    return response.data;
  },

  /**
   * Delete news (admin only)
   * @param {string} id 
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async deleteNews(id) {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
};
