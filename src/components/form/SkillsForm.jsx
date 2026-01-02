import { useState } from 'react'
import FormLayout from '../layout/FormLayout'

/**
 * Skills form component with dynamic add/remove
 * @param {Array<string>} skills - Skills array
 * @param {function} addSkill - Function to add a skill
 * @param {function} removeSkill - Function to remove a skill
 */
export default function SkillsForm({ skills, addSkill, removeSkill }) {
  const [skillInput, setSkillInput] = useState('')

  const handleAddSkill = (e) => {
    e.preventDefault()
    if (skillInput.trim()) {
      addSkill(skillInput)
      setSkillInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill(e)
    }
  }

  return (
    <FormLayout title="Skills">
      <div className="space-y-4">
        {/* Add Skill Input */}
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a skill (e.g., JavaScript, React, Python)"
            className="input-field flex-1"
          />
          <button
            type="submit"
            className="btn-primary whitespace-nowrap"
          >
            Add Skill
          </button>
        </form>

        {/* Skills List */}
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-lg flex items-center gap-2 group"
              >
                <span className="font-medium">{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            No skills added yet. Add your first skill above.
          </p>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400">
          💡 Tip: Add at least 5-10 relevant skills for better ATS optimization.
        </p>
      </div>
    </FormLayout>
  )
}


