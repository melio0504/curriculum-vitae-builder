import '../styles/CV.css'

export default function CV({
  cvData,
  previewRef,
  onExport,
  isExporting,
  optionalSections,
}) {
  return (
    <section className="cv-preview-panel">
      <article className="cv-paper" ref={previewRef}>
        <header className="cv-header">
          <h1>
            {cvData.firstName} {cvData.lastName}
          </h1>
          <p>
            {cvData.address} • {cvData.cityStateZip} • {cvData.email} • {cvData.phone}
          </p>
        </header>

        <section className="cv-block">
          <h2>Education</h2>
          {cvData.education.map((item, index) => {
            if (index === 1 && !optionalSections.studyAbroad) {
              return null
            }

            if (index === 2 && !optionalSections.educationEntry3) {
              return null
            }

            return (
            <div className="cv-entry" key={`preview-education-${index}`}>
              <div className="cv-row">
                <strong>{item.school}</strong>
                <span>{item.location}</span>
              </div>
              <div className="cv-row">
                <span>{item.degree}</span>
                <span>{item.graduationDate}</span>
              </div>
              {item.thesis && <p>Thesis: {item.thesis}</p>}
              {item.coursework && <p>Relevant Coursework: {item.coursework}</p>}
            </div>
            )
          })}
        </section>

        <section className="cv-block">
          <h2>Experience</h2>
          {cvData.experience.map((item, index) => {
            if (index === 1 && !optionalSections.organizationEntry) {
              return null
            }

            return (
            <div className="cv-entry" key={`preview-experience-${index}`}>
              <div className="cv-row">
                <strong>{item.organization}</strong>
                <span>{item.location}</span>
              </div>
              <div className="cv-row">
                <strong>{item.position}</strong>
                <span>{item.dates}</span>
              </div>
              <ul>
                {item.bullets.map((bullet, bulletIndex) => (
                  <li key={`experience-${index}-bullet-${bulletIndex}`}>{bullet}</li>
                ))}
              </ul>
            </div>
            )
          })}
        </section>

        {optionalSections.leadership && (
          <section className="cv-block">
            <h2>Leadership & Activities</h2>
            {cvData.leadership.map((item, index) => (
              <div className="cv-entry" key={`preview-leadership-${index}`}>
                <div className="cv-row">
                  <strong>{item.organization}</strong>
                  <span>{item.location}</span>
                </div>
                <div className="cv-row">
                  <strong>{item.role}</strong>
                  <span>{item.dates}</span>
                </div>
                <ul>
                  {item.bullets.map((bullet, bulletIndex) => (
                    <li key={`leadership-${index}-bullet-${bulletIndex}`}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {optionalSections.skills && (
          <section className="cv-block">
            <h2>Skills & Interests</h2>
            <p>
              <strong>Technical:</strong> {cvData.skills.technical}
            </p>
            <p>
              <strong>Language:</strong> {cvData.skills.language}
            </p>
            <p>
              <strong>Laboratory:</strong> {cvData.skills.laboratory}
            </p>
            <p>
              <strong>Interests:</strong> {cvData.skills.interests}
            </p>
          </section>
        )}
      </article>

      <div className="preview-export-bar">
        <button type="button" onClick={onExport} disabled={isExporting}>
          {isExporting ? 'Exporting PDF...' : 'Export CV to PDF'}
        </button>
      </div>
    </section>
  )
}
