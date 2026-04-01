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
  )
}
