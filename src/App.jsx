import { useRef, useState } from 'react'
import jsPDF from 'jspdf'
import CV from './components/CV'
import Form from './components/Form'
import './styles/CV.css'

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
