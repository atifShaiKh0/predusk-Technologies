require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./models/Profile');
const myData = {
  name: "Mohd Aatif",
  email: "maatif881@gmail.com",
  phone: "+91 9870785231",
  education: [
    "Bachelor of Technology in Computer Science", 
    "Uttarakhand Technical University"
  ],
  skills: [
    "Java", "C", "JavaScript", "TypeScript", "SQL", 
    "Next.js", "React", "Node.js", "Express.js", "Spring Boot", 
    "Tailwind CSS", "Shadcn UI", "MongoDB", "PostgreSQL", 
    "Prisma", "Mongoose", "Redis", "Clerk", "Docker", 
    "Jest", "Git", "GitHub", "Postman", "Cloudinary"
  ],
  work: [
    {
      company: "Ducktale IT",
      position: "SDE Intern",
      duration: "Sep 2025 – Nov 2025",
      description: "Developed and optimized RESTful APIs for MongoDB; Integrated RevenueCat for cross-platform subscriptions; Built dynamic form-handling utilities; Engineered custom middleware for validation and security.",
      technologies: ["Node.js", "Express.js", "MongoDB", "RevenueCat", "JavaScript"]
    }
  ],
  projects: [
    {
      title: "E-commerce Platform (Supernal Science)",
      description: "Full-featured e-commerce platform with an admin panel for CRUD operations on products/categories. Features secure Clerk authentication and Cloudinary image management.",
      links: ["https://supernal-e-commerce.vercel.app"], // Update with actual project link
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Mongoose", "Clerk", "Shadcn UI", "Cloudinary"]
    },
    {
      title: "Social Media App (X-Clone)",
      description: "Twitter-like app with posts, comments, and notifications. Features a RESTful backend and a React Native mobile frontend with Clerk-based auth.",
      links: ["https://github.com/atifShaiKh0/x-clone-rn"], // Update with actual project link
      technologies: ["Express.js", "React Native", "Tailwind CSS", "JavaScript", "Mongoose", "Clerk"]
    },
    {
      title: "CRM Backend",
      description: "A specialized backend system for Customer Relationship Management (In-Progress) focusing on lead tracking and client data management.",
      links: ["https://github.com/atifShaiKh0/crm-backend"], // Update with actual project link
      technologies: ["Express.js", "Node.js", "MongoDB", "JavaScript"]
    }
  ],
  links: {
    github: "https://github.com/atifShaiKh0",
    linkedin: "https://www.linkedin.com/in/mohd-aatif-33636224b/",
    portfolio: "https://candidate.me" // Replace with your live URL once deployed
  }
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected for seeding...');
    
    await Profile.deleteMany({});
    const profile = new Profile(myData);
    await profile.save();
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
