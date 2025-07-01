import api from '../lib/api';
import { Property, ApiResponse } from '../types';

export const propertyService = {
  // Get all properties (optionally filtered by category and location)
  async getAllProperties(category?: string, location?: string): Promise<Property[]> {
    try {
      let url = '/api/properties/';
      const params = [];
      if (category) params.push(`category=${encodeURIComponent(category)}`);
      if (location) params.push(`location=${encodeURIComponent(location)}`);
      if (params.length > 0) {
        url += '?' + params.join('&');
      }
      const response = await api.get<ApiResponse<Property[]>>(url);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  },

  // Get single property by ID
  async getPropertyById(id: number): Promise<Property | null> {
    try {
      const response = await api.get<ApiResponse<Property>>(`/api/properties/${id}/`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching property:', error);
      return null;
    }
  },

  // Create new property (for landlords)
  async createProperty(propertyData: Partial<Property>): Promise<Property | null> {
    try {
      const response = await api.post<ApiResponse<Property>>('/api/properties/', propertyData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating property:', error);
      return null;
    }
  },

  // Update property (for landlords)
  async updateProperty(id: number, propertyData: Partial<Property>): Promise<Property | null> {
    try {
      const response = await api.put<ApiResponse<Property>>(`/api/properties/${id}/`, propertyData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating property:', error);
      return null;
    }
  },

  // Delete property (for landlords)
  async deleteProperty(id: number): Promise<boolean> {
    try {
      await api.delete(`/api/properties/${id}/`);
      return true;
    } catch (error) {
      console.error('Error deleting property:', error);
      return false;
    }
  }
};