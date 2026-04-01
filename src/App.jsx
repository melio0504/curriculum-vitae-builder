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
  const [cvData, setCvData] = useState(initialData)
  const [isExporting, setIsExporting] = useState(false)
  const [optionalSections, setOptionalSections] = useState({
    studyAbroad: true,
    educationEntry3: true,
    organizationEntry: true,
    leadership: true,
    skills: true,
  })
  const previewRef = useRef(null)

  const handleFieldChange = (field, value) => {
    setCvData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (section, index, field, value) => {
    setCvData((prev) => {
      const updatedSection = [...prev[section]]
      updatedSection[index] = { ...updatedSection[index], [field]: value }
      return { ...prev, [section]: updatedSection }
    })
  }

  const handleBulletsChange = (section, index, value) => {
    const bullets = value.split('\n')

    setCvData((prev) => {
      const updatedSection = [...prev[section]]
      updatedSection[index] = { ...updatedSection[index], bullets }
      return { ...prev, [section]: updatedSection }
    })
  }

  const handleSkillsChange = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [field]: value },
    }))
  }

  const handleOptionalSectionToggle = (sectionKey) => {
    setOptionalSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }))
  }

  const exportToPDF = async () => {
    setIsExporting(true)

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pageWidth = 210
      const pageHeight = 297
      const margin = 14
      const contentWidth = pageWidth - margin * 2
      let y = margin

      const ensureSpace = (needed = 6) => {
        if (y + needed <= pageHeight - margin) return
        pdf.addPage()
        y = margin
      }

      const writeCentered = (text, size = 10, weight = 'normal') => {
        ensureSpace(size * 0.5 + 4)
        pdf.setFont('times', weight)
        pdf.setFontSize(size)
        const textWidth = pdf.getTextWidth(text)
        pdf.text(text, (pageWidth - textWidth) / 2, y)
        y += size * 0.45 + 2
      }

      const writeSectionTitle = (title) => {
        ensureSpace(10)
        pdf.setFont('times', 'bold')
        pdf.setFontSize(12)
        pdf.text(title.toUpperCase(), margin, y)
        y += 1.5
        pdf.setLineWidth(0.2)
        pdf.line(margin, y, pageWidth - margin, y)
        y += 4.5
      }

      const writeRow = (left, right, leftWeight = 'normal', rightWeight = 'normal') => {
        ensureSpace(5)
        const safeLeft = left || ''
        const safeRight = right || ''

        pdf.setFont('times', leftWeight)
        pdf.setFontSize(11)
        const leftLines = pdf.splitTextToSize(safeLeft, contentWidth * 0.72)
        pdf.text(leftLines, margin, y)

        pdf.setFont('times', rightWeight)
        const rightWidth = pdf.getTextWidth(safeRight)
        pdf.text(safeRight, pageWidth - margin - rightWidth, y)

        y += Math.max(leftLines.length * 4, 4)
      }

      const writeParagraph = (text, indent = 0) => {
        if (!text) return
        const x = margin + indent
        const maxWidth = contentWidth - indent
        const lines = pdf.splitTextToSize(text, maxWidth)
        ensureSpace(lines.length * 4 + 1)
        pdf.setFont('times', 'normal')
        pdf.setFontSize(11)
        pdf.text(lines, x, y)
        y += lines.length * 4
      }

      const writeBullets = (bullets) => {
        bullets
          .map((bullet) => bullet.trim())
          .filter(Boolean)
          .forEach((bullet) => {
            const bulletLines = pdf.splitTextToSize(bullet, contentWidth - 7)
            ensureSpace(bulletLines.length * 4 + 1)
            pdf.setFont('times', 'normal')
            pdf.setFontSize(11)
            pdf.text('\u2022', margin + 1, y)
            pdf.text(bulletLines, margin + 5, y)
            y += bulletLines.length * 4
          })
      }

      writeCentered(`${cvData.firstName} ${cvData.lastName}`, 17, 'bold')
      writeCentered(`${cvData.address} • ${cvData.cityStateZip} • ${cvData.email} • ${cvData.phone}`, 11)
      y += 1
      pdf.setLineWidth(0.2)
      pdf.line(margin, y, pageWidth - margin, y)
      y += 5

      const educationEntries = cvData.education.filter((_, index) => {
        if (index === 1 && !optionalSections.studyAbroad) return false
        if (index === 2 && !optionalSections.educationEntry3) return false
        return true
      })

      writeSectionTitle('Education')
      educationEntries.forEach((item) => {
        writeRow(item.school, item.location, 'bold')
        writeRow(item.degree, item.graduationDate)
        writeParagraph(item.thesis ? `Thesis: ${item.thesis}` : '')
        writeParagraph(item.coursework ? `Relevant Coursework: ${item.coursework}` : '')
        y += 2
      })

      const experienceEntries = cvData.experience.filter((_, index) => {
        if (index === 1 && !optionalSections.organizationEntry) return false
        return true
      })

      writeSectionTitle('Experience')
      experienceEntries.forEach((item) => {
        writeRow(item.organization, item.location, 'bold')
        writeRow(item.position, item.dates, 'bold')
        writeBullets(item.bullets)
        y += 2
      })

      if (optionalSections.leadership) {
        writeSectionTitle('Leadership & Activities')
        cvData.leadership.forEach((item) => {
          writeRow(item.organization, item.location, 'bold')
          writeRow(item.role, item.dates, 'bold')
          writeBullets(item.bullets)
          y += 2
        })
      }

      if (optionalSections.skills) {
        writeSectionTitle('Skills & Interests')
        writeParagraph(`Technical: ${cvData.skills.technical}`)
        writeParagraph(`Language: ${cvData.skills.language}`)
        writeParagraph(`Laboratory: ${cvData.skills.laboratory}`)
        writeParagraph(`Interests: ${cvData.skills.interests}`)
      }

      pdf.save(`${cvData.firstName}_${cvData.lastName}_CV.pdf`)
    } catch (error) {
      console.error('Failed to export PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

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
