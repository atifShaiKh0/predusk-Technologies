const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET /api/profile
router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/profile (Initialize)
router.post('/profile', async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) return res.status(400).json({ message: 'Profile already exists' });
    
    const profile = new Profile(req.body);
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/profile
router.put('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/projects?skill=...
router.get('/projects', async (req, res) => {
  const { skill } = req.query;
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    
    let filteredProjects = profile.projects;
    if (skill) {
      // Filter projects that might be associated with this skill
      // For simplicity, we search if the skill name is in project description or title
      // Or we could have a specific 'skills' field in ProjectSchema. 
      // Let's assume we search description for now or add skill field if needed.
      filteredProjects = profile.projects.filter(p => 
        p.description.toLowerCase().includes(skill.toLowerCase()) ||
        p.title.toLowerCase().includes(skill.toLowerCase())
      );
    }
    res.json(filteredProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/skills/top
router.get('/skills/top', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    // Return first 5 skills as "top" for now
    res.json(profile.skills.slice(0, 5));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/search?q=...
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Search query required' });
  
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    
    const results = {
      projects: profile.projects.filter(p => 
        p.title.toLowerCase().includes(q.toLowerCase()) || 
        p.description.toLowerCase().includes(q.toLowerCase())
      ),
      skills: profile.skills.filter(s => s.toLowerCase().includes(q.toLowerCase()))
    };
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
