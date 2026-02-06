const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchProfile = async () => {
  const res = await fetch(`${API_BASE_URL}/profile`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

export const searchProjects = async (query: string) => {
  const res = await fetch(`${API_BASE_URL}/search?q=${query}`);
  if (!res.ok) throw new Error('Failed to search');
  return res.json();
};

export const fetchTopSkills = async () => {
  const res = await fetch(`${API_BASE_URL}/skills/top`);
  if (!res.ok) throw new Error('Failed to fetch top skills');
  return res.json();
};
