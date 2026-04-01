import { useRef, useState } from 'react'
import jsPDF from 'jspdf'
import CV from './components/CV'
import Form from './components/Form'
import './styles/CV.css'

const initialData = {
  firstName: 'FirstName',
  lastName: 'LastName',
  address: 'Home or Campus Street Address',
  cityStateZip: 'City, State Zip',
  email: 'youremail@college.harvard.edu',
  phone: 'phone number',
  education: [
    {
      school: 'Harvard University',
      location: 'Cambridge, MA',
      degree: 'Degree, Concentration. GPA [Optional]',
      graduationDate: 'Graduation Date',
      thesis: 'Thesis [Optional]',
      coursework: 'Relevant Coursework / Awards / Honors [Optional]',
    },
    {
      school: 'Study Abroad [If Applicable]',
      location: 'City, Country',
      degree: 'Study abroad coursework in',
      graduationDate: 'Month Year - Month Year',
      thesis: '',
      coursework: '',
    },
    {
      school: 'High School Name',
      location: 'City, State',
      degree: 'GPA / SAT / ACT / academic honors [Optional]',
      graduationDate: 'Graduation Date',
      thesis: '',
      coursework: '',
    },
  ],
  experience: [
    {
      organization: 'Organization',
      position: 'Position Title',
      location: 'City, State (or remote)',
      dates: 'Month Year - Month Year',
      bullets: [
        'Beginning with most recent position, describe your experience and outcomes in bullet form.',
        'Begin each line with an action verb and quantify where possible.',
      ],
    },
    {
      organization: 'Organization',
      position: 'Position Title',
      location: 'City, State',
      dates: 'Month Year - Month Year',
      bullets: [
        'With next-most recent position, describe your experience and outcomes in bullet form.',
        'Do not use personal pronouns; keep each line concise and impact-driven.',
      ],
    },
  ],
  leadership: [
    {
      organization: 'Organization',
      role: 'Role',
      location: 'City, State',
      dates: 'Month Year - Month Year',
      bullets: [
        'This section can be formatted similarly to Experience or kept concise.',
        'If this section is most relevant, move it above Experience.',
      ],
    },
  ],
  skills: {
    technical: 'List software and programming languages with fluency level',
    language: 'List foreign languages with fluency level',
    laboratory: 'List scientific / research lab techniques or tools [If Applicable]',
    interests: 'List activities that may spark interview conversation',
  },
}

export default function App() {
  return (
    <main className="cv-builder-layout">
      <Form
        cvData={cvData}
        onFieldChange={handleFieldChange}
        onNestedChange={handleNestedChange}
        onBulletsChange={handleBulletsChange}
        onSkillsChange={handleSkillsChange}
        optionalSections={optionalSections}
        onToggleOptionalSection={handleOptionalSectionToggle}
      />
      <CV
        cvData={cvData}
        previewRef={previewRef}
        onExport={exportToPDF}
        isExporting={isExporting}
        optionalSections={optionalSections}
      />
    </main>
  )
}
