import axios from 'axios';
import { create } from 'zustand';

export interface meme {
  id: string;
  userId: string;
  fileUrl: string;
  fileType: string;
  caption: string;
  createdAt: string;
  tags: string[];
  likes: number;
  user?: string;
  isSaved: boolean;
}

interface memeStore {
  memes: meme[];
  setMemes: (meme: meme[]) => void;
  fetchMemes: () => Promise<void>;
}

interface searchedMemeStore {
  searchedMemes: meme[]; 
  setSearchedMemes: (meme: meme[]) => void;

}

export const useMemeStore = create<memeStore>((set) => ({
    memes: [],
  setMemes: (memes) => set(() => ({ memes: memes })),
  fetchMemes: async () => {
    try {
      const res = await axios.get("/api/memes");
      set({ memes: res.data.memes}); 
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  }
}));

export const useSearchedMemes = create<searchedMemeStore>((set) => ({
  searchedMemes: [],
  setSearchedMemes: (memes) => set(() => ({ searchedMemes: memes })),
}));

