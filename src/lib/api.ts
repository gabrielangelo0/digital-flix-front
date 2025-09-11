import axios from 'axios';

export interface Movie {
  id?: number;
  title: string;
  genre: string;
  rating: number;
  image: string;
  featured: boolean;
  description?: string;
  year?: number;
  trailerUrl?: string;
  videoUrl?: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const movieApi = {
  // Get all movies
  getMovies: () => api.get<Movie[]>('/movies'),
  
  // Get movie by ID
  getMovie: (id: number) => api.get<Movie>(`/movies/${id}`),
  
  // Create new movie
  createMovie: (movie: Omit<Movie, 'id'>) => api.post<Movie>('/movies', movie),
  
  // Update movie
  updateMovie: (id: number, movie: Partial<Movie>) => api.put<Movie>(`/movies/${id}`, movie),
  
  // Delete movie
  deleteMovie: (id: number) => api.delete(`/movies/${id}`),
};

export default api;