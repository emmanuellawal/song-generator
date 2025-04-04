import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this with your backend URL

export interface SongResult {
  title: string;
  lyrics: string;
  audioUrl?: string;
}

export async function generateSong(theme: string, genre: string): Promise<SongResult> {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`, {
      theme,
      style: genre,
      verses: 3,
      chorus: true,
      model: 'V4'
    });

    return {
      title: response.data.title,
      lyrics: response.data.lyrics,
      audioUrl: response.data.audioUrl
    };
  } catch (error) {
    console.error('Error generating song:', error);
    throw new Error('Failed to generate song');
  }
} 