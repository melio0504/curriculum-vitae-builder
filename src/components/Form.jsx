import { Eye, EyeOff } from 'lucide-react'
import '../styles/Form.css'

function PreviewToggleButton({ isVisible, onClick, label }) {
  return (
    <button
      type="button"
      className="optional-toggle-btn"
      onClick={onClick}
      aria-pressed={!isVisible}
      aria-label={isVisible ? `Hide ${label} in preview` : `Show ${label} in preview`}
      title={isVisible ? `Hide ${label} in preview` : `Show ${label} in preview`}
    >
      {isVisible ? <Eye size={16} strokeWidth={2} /> : <EyeOff size={16} strokeWidth={2} />}
    </button>
  )
}

export default function Form({
  cvData,
  onFieldChange,
  onNestedChange,
  onBulletsChange,
  onSkillsChange,
  optionalSections,
  onToggleOptionalSection,
}) {
  return (
    <section className="cv-form-panel">
      <header className="panel-header">
        <p className="eyebrow">CV Builder</p>
        <h1>Harvard Resume Template</h1>
        <p>Edit on the left, preview on the right, then export to PDF.</p>
      </header>

      <div className="form-section">
        <h2>Personal Information</h2>
        <div className="field-grid two-col">
          <label>
            First Name
            <input
              type="text"
              value={cvData.firstName}
              onChange={(e) => onFieldChange('firstName', e.target.value)}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              value={cvData.lastName}
              onChange={(e) => onFieldChange('lastName', e.target.value)}
            />
          </label>
        </div>
        <label>
          Street Address
          <input
            type="text"
            value={cvData.address}
            onChange={(e) => onFieldChange('address', e.target.value)}
          />
        </label>
        <div className="field-grid two-col">
          <label>
            City, State Zip
            <input
              type="text"
              value={cvData.cityStateZip}
              onChange={(e) => onFieldChange('cityStateZip', e.target.value)}
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              value={cvData.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
            />
          </label>
        </div>
        <label>
          Email
          <input
            type="email"
            value={cvData.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
          />
        </label>
      </div>

      <div className="form-section">
        <h2>Education</h2>
        {cvData.education.map((item, index) => (
          <article className="entry-card" key={`education-${index}`}>
            <div className="section-title-row">
              <h3>Education Entry {index + 1}</h3>
              {index === 1 && (
                <PreviewToggleButton
                  isVisible={optionalSections.studyAbroad}
                  onClick={() => onToggleOptionalSection('studyAbroad')}
                  label="Study Abroad"
                />
              )}
              {index === 2 && (
                <PreviewToggleButton
                  isVisible={optionalSections.educationEntry3}
                  onClick={() => onToggleOptionalSection('educationEntry3')}
                  label="Education Entry 3"
                />
              )}
            </div>
            <div className="field-grid two-col">
              <label>
                School
                <input
                  type="text"
                  value={item.school}
                  onChange={(e) => onNestedChange('education', index, 'school', e.target.value)}
                />
              </label>
              <label>
                Location
                <input
                  type="text"
                  value={item.location}
                  onChange={(e) => onNestedChange('education', index, 'location', e.target.value)}
                />
              </label>
            </div>
            <label>
              Degree / Description
              <input
                type="text"
                value={item.degree}
                onChange={(e) => onNestedChange('education', index, 'degree', e.target.value)}
              />
            </label>
            <label>
              Graduation / Timeline
              <input
                type="text"
                value={item.graduationDate}
                onChange={(e) => onNestedChange('education', index, 'graduationDate', e.target.value)}
              />
            </label>
            <label>
              Thesis (Optional)
              <input
                type="text"
                value={item.thesis}
                onChange={(e) => onNestedChange('education', index, 'thesis', e.target.value)}
              />
            </label>
            <label>
              Coursework / Honors (Optional)
              <input
                type="text"
                value={item.coursework}
                onChange={(e) => onNestedChange('education', index, 'coursework', e.target.value)}
              />
            </label>
          </article>
        ))}
      </div>

      <div className="form-section">
        <h2>Experience</h2>
        {cvData.experience.map((item, index) => (
          <article className="entry-card" key={`experience-${index}`}>
            <div className="section-title-row">
              <h3>Experience Entry {index + 1}</h3>
              {index === 1 && (
                <PreviewToggleButton
                  isVisible={optionalSections.organizationEntry}
                  onClick={() => onToggleOptionalSection('organizationEntry')}
                  label="Organization Entry"
                />
              )}
            </div>
            <div className="field-grid two-col">
              <label>
                Organization
                <input
                  type="text"
                  value={item.organization}
                  onChange={(e) => onNestedChange('experience', index, 'organization', e.target.value)}
                />
              </label>
              <label>
                Position Title
                <input
                  type="text"
                  value={item.position}
                  onChange={(e) => onNestedChange('experience', index, 'position', e.target.value)}
                />
              </label>
            </div>
            <div className="field-grid two-col">
              <label>
                Location
                <input
                  type="text"
                  value={item.location}
                  onChange={(e) => onNestedChange('experience', index, 'location', e.target.value)}
                />
              </label>
              <label>
                Dates
                <input
                  type="text"
                  value={item.dates}
                  onChange={(e) => onNestedChange('experience', index, 'dates', e.target.value)}
                />
              </label>
            </div>
            <label>
              Bullet Points (one per line)
              <textarea
                rows="4"
                value={item.bullets.join('\n')}
                onChange={(e) => onBulletsChange('experience', index, e.target.value)}
              />
            </label>
          </article>
        ))}
      </div>

      <div className="form-section">
        <div className="section-title-row">
          <h2>Leadership & Activities</h2>
          <PreviewToggleButton
            isVisible={optionalSections.leadership}
            onClick={() => onToggleOptionalSection('leadership')}
            label="Leadership and Activities"
          />
        </div>
        {cvData.leadership.map((item, index) => (
          <article className="entry-card" key={`leadership-${index}`}>
            <h3>Leadership Entry {index + 1}</h3>
            <div className="field-grid two-col">
              <label>
                Organization
                <input
                  type="text"
                  value={item.organization}
                  onChange={(e) => onNestedChange('leadership', index, 'organization', e.target.value)}
                />
              </label>
              <label>
                Role
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => onNestedChange('leadership', index, 'role', e.target.value)}
                />
              </label>
            </div>
            <div className="field-grid two-col">
              <label>
                Location
                <input
                  type="text"
                  value={item.location}
                  onChange={(e) => onNestedChange('leadership', index, 'location', e.target.value)}
                />
              </label>
              <label>
                Dates
                <input
                  type="text"
                  value={item.dates}
                  onChange={(e) => onNestedChange('leadership', index, 'dates', e.target.value)}
                />
              </label>
            </div>
            <label>
              Bullet Points (one per line)
              <textarea
                rows="3"
                value={item.bullets.join('\n')}
                onChange={(e) => onBulletsChange('leadership', index, e.target.value)}
              />
            </label>
          </article>
        ))}
      </div>

      <div className="form-section">
        <div className="section-title-row">
          <h2>Skills & Interests (Optional)</h2>
          <PreviewToggleButton
            isVisible={optionalSections.skills}
            onClick={() => onToggleOptionalSection('skills')}
            label="Skills and Interests"
          />
        </div>
        <label>
          Technical
          <input
            type="text"
            value={cvData.skills.technical}
            onChange={(e) => onSkillsChange('technical', e.target.value)}
          />
        </label>
        <label>
          Language
          <input
            type="text"
            value={cvData.skills.language}
            onChange={(e) => onSkillsChange('language', e.target.value)}
          />
        </label>
        <label>
          Laboratory
          <input
            type="text"
            value={cvData.skills.laboratory}
            onChange={(e) => onSkillsChange('laboratory', e.target.value)}
          />
        </label>
        <label>
          Interests
          <input
            type="text"
            value={cvData.skills.interests}
            onChange={(e) => onSkillsChange('interests', e.target.value)}
          />
        </label>
      </div>
    </section>
  )
}
