const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  portfolio: String
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  links: [String] // Array of link strings or could be objects
});

const WorkSchema = new mongoose.Schema({
  company: String,
  position: String,
  duration: String,
  description: String
});

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: [String],
  skills: [String],
  projects: [ProjectSchema],
  work: [WorkSchema],
  links: LinkSchema
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
