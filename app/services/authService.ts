import api from '../lib/api';

export interface LoginData {
  email: string; // used as username
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  is_landlord: boolean;
}

export const authService = {
  // ✅ Login and store JWT
  async login(loginData: LoginData): Promise<boolean> {
    try {
      const response = await api.post('/api/token/', {
        username: loginData.email, // use email as username for JWT
        password: loginData.password,
      });

      const { access, refresh } = response.data;

      // ✅ Save tokens in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);

        // ✅ Set default header for all future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      }

      return true;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      return false;
    }
  },

  // ✅ Register new user
  async register(registerData: RegisterData): Promise<boolean> {
    try {
      await api.post('/auth/register/', registerData);
      return true;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      return false;
    }
  },

  // ✅ Clear tokens on logout
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
    window.location.href = '/'; // redirect to home
  },

  // ✅ Check if access token exists
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access');
  }
};
