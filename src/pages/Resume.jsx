import { useMemo } from 'react'
import resumeData from '../details/resume.json'

const Resume = () => {
  const resume = useMemo(() => resumeData, [])

  return (
    <div className="resume-container" style={{ willChange: 'transform' }}>
      {/* Header */}
      <div className="resume-header">
        <h1 className="resume-name">{resume.personalInfo.name}</h1>
        <h2 className="resume-title">{resume.personalInfo.title}</h2>
        <div className="resume-contact">
          <span>{resume.personalInfo.email}</span>
          {resume.personalInfo.phone && (
            <>
              <span>•</span>
              <span>{resume.personalInfo.phone}</span>
            </>
          )}
          <span>•</span>
          <span>{resume.personalInfo.location}</span>
        </div>
        {resume.personalInfo.website && (
          <div className="resume-links">
            {resume.personalInfo.website && <a href={resume.personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a>}
            {resume.personalInfo.linkedin && <a href={resume.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            {resume.personalInfo.github && <a href={resume.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="resume-section">
        <h3 className="resume-section-title">Professional Summary</h3>
        <p className="resume-text">{resume.summary}</p>
      </div>

      {/* Experience */}
      <div className="resume-section">
        <h3 className="resume-section-title">Experience</h3>
        {resume.experience.map((exp, index) => (
          <div key={index} className="resume-item">
            <div className="resume-item-header">
              <div>
                <h4 className="resume-item-title">{exp.position}</h4>
                <h5 className="resume-item-company">{exp.company}</h5>
              </div>
              <span className="resume-item-duration">{exp.duration}</span>
            </div>
            <p className="resume-text">{exp.description}</p>
            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="resume-list">
                {exp.achievements.map((achievement, i) => (
                  <li key={`achievement-${index}-${i}`}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="resume-section">
        <h3 className="resume-section-title">Education</h3>
        {resume.education.map((edu, index) => (
          <div key={`edu-${index}`} className="resume-item">
            <div className="resume-item-header">
              <div>
                <h4 className="resume-item-title">{edu.degree}</h4>
                <h5 className="resume-item-company">{edu.institution}</h5>
              </div>
              <span className="resume-item-duration">{edu.duration}</span>
            </div>
            {edu.description && <p className="resume-text">{edu.description}</p>}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="resume-section">
        <h3 className="resume-section-title">Skills</h3>
        <div className="resume-skills">
          {Object.entries(resume.skills).map(([category, skills]) => (
            <div key={`skill-${category}`} className="resume-skill-category">
              <h4 className="resume-skill-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              <div className="resume-skill-tags">
                {skills.map((skill, i) => (
                  <span key={`skill-${category}-${i}`} className="resume-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="resume-section">
          <h3 className="resume-section-title">Certifications</h3>
          {resume.certifications.map((cert, index) => (
            <div key={`cert-${index}`} className="resume-item">
              <h4 className="resume-item-title">{cert.name}</h4>
              <p className="resume-text">{cert.issuer} • {cert.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {resume.achievements && resume.achievements.length > 0 && (
        <div className="resume-section">
          <h3 className="resume-section-title">Achievements</h3>
          {resume.achievements.map((achievement, index) => (
            <div key={`achievement-${index}`} className="resume-item">
              <div className="resume-item-header">
                <div>
                  <h4 className="resume-item-title">{achievement.title}</h4>
                  {achievement.description && (
                    <p className="resume-text">{achievement.description}</p>
                  )}
                </div>
                {achievement.date && (
                  <span className="resume-item-duration">{achievement.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {resume.languages && resume.languages.length > 0 && (
        <div className="resume-section">
          <h3 className="resume-section-title">Languages</h3>
          <div className="resume-languages">
            {resume.languages.map((lang, index) => (
              <div key={`lang-${index}`} className="resume-language-item">
                <span className="resume-language-name">{lang.language}</span>
                <span className="resume-language-proficiency">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Resume

