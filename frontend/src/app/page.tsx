"use client";

import { useEffect, useState } from "react";
import { fetchProfile, searchProjects } from "@/lib/api";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ projects: any[]; skills: string[] }>({ projects: [], skills: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile()
      .then(data => {
        setProfile(data);
        setSearchResults({ projects: data.projects, skills: data.skills });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim() === "") {
      if (profile) setSearchResults({ projects: profile.projects, skills: profile.skills });
      return;
    }

    try {
      const data = await searchProjects(q);
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="container">Loading playground...</div>;
  if (!profile) return <div className="container">Error: Backend not reachable or profile not found.</div>;

  return (
    <main className="container">
      {/* <header className="glass" style={{ padding: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>{profile.name}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>{profile.email}</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href={profile.links.github} className="btn" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.links.linkedin} className="btn" style={{ background: 'var(--accent-secondary)' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

        <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Education</h3>
            <ul style={{ listStyle: 'none' }}>
              {profile.education.map((edu: string) => (
                <li key={edu} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>• {edu}</li>
              ))}
            </ul>
          </div>
      </header> */}

      <header className="glass" style={{ padding: '2rem', marginBottom: '3rem' }}>
  {/* Flex Wrapper Container */}
  <div style={{ 
    display: 'flex', 
    gap: '2rem', 
    alignItems: 'center', 
    textAlign: 'left',
    flexWrap: 'wrap' // Ensures it stacks on mobile
  }}>
    
    {/* Left Side: Name and Links */}
    <div style={{ flex: '1', minWidth: '300px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
        {profile.name}
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>{profile.email}</p>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
  {[
    { label: 'GitHub', url: profile.links.github, color: 'var(--accent-primary)' },
    { label: 'LinkedIn', url: profile.links.linkedin, color: 'var(--accent-secondary)' }
  ].map((link) => (
    <a
      key={link.label}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: '500',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        border: `1px solid ${link.color}`,
        background: 'transparent',
        color: link.color,
        // For a subtle "glow" add this to your CSS class:
        // boxShadow: `0 0 10px ${link.color}22` 
      }}
      // Suggested: Add a CSS class that changes background on hover
    >
      <span style={{ marginRight: '8px' }}>{link.label === 'GitHub' ? '🔗' : '👔'}</span>
      {link.label}
    </a>
  ))}
</div>
    </div>

    {/* Right Side: Education Box */}
    <div className="glass" style={{ 
      flex: '1', 
      minWidth: '300px', 
      padding: '1.5rem', 
      background: 'rgba(255, 255, 255, 0.05)' // Subtle distinction
    }}>
      <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        Education
      </h3>
      <ul style={{ listStyle: 'none' }}>
        {profile.education.map((edu: string) => (
          <li key={edu} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>• {edu}</li>
        ))}
      </ul>
    </div>

  </div>
</header>

      <section>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search projects or skills (e.g. 'React', 'Weather')..." 
          value={searchQuery}
          onChange={handleSearch}
        />
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <aside>
          <div className="glass" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {searchResults.skills.map(skill => (
                <span key={skill} style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  padding: '0.3rem 0.8rem', 
                  borderRadius: '20px',
                  fontSize: '0.85rem'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          
        </aside>

        <section>
          <h2 style={{ marginBottom: '1.5rem' }}>Projects ({searchResults.projects.length})</h2>
<div style={{ display: 'grid', gap: '1.5rem' }}>
  {searchResults.projects.map((project: any) => (
    <div key={project.title} className="glass" style={{ padding: '1.5rem' }}>
      <h3 style={{ color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>{project.title}</h3>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', marginBottom: '1rem' }}>{project.description}</p>
      
      {/* Tech Stack Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem' }}>
        {project.technologies?.map((tech: string) => (
          <span key={tech} style={{
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid var(--border-color)',
            color: 'var(--accent-primary)'
          }}>
            {tech}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        {project.links.map((link: string, idx: number) => (
          <a 
            key={idx} 
            href={link.startsWith('http') ? link : `https://${link}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              fontSize: '0.85rem', 
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            {/* If you only have one link, maybe call it "View Project" instead of Link 1 */}
            {project.links.length === 1 ? 'View Project ↗' : `Link ${idx + 1} ↗`}
          </a>
        ))}
      </div>
    </div>
  ))}
</div>
        </section>
      </div>
    </main>
  );
}
