import { useState } from 'react'
import FormLayout from '../layout/FormLayout'
import { enhanceExperience } from '../../utils/aiEnhancement'

/**
 * Experience form component with multiple entries
 * @param {Array} experience - Experience array
 * @param {function} addExperience - Function to add experience
 * @param {function} updateExperience - Function to update experience
 * @param {function} removeExperience - Function to remove experience
 */
export default function ExperienceForm({
  experience,
  addExperience,
  updateExperience,
  removeExperience
}) {
  const [enhancingIndex, setEnhancingIndex] = useState(null)

  const handleEnhance = async (index) => {
    setEnhancingIndex(index)
    try {
      const enhanced = await enhanceExperience(experience[index])
      updateExperience(index, 'description', enhanced.description)
    } catch (error) {
      console.error('Enhancement failed:', error)
    } finally {
      setEnhancingIndex(null)
    }
  }

  return (
    <FormLayout title="Work Experience">
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div
            key={exp.id || index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Experience #{index + 1}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEnhance(index)}
                  disabled={enhancingIndex === index}
                  className="text-sm btn-secondary py-1.5 px-3 text-xs disabled:opacity-50"
                >
                  {enhancingIndex === index ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enhancing...
                    </span>
                  ) : (
                    '✨ Enhance with AI'
                  )}
                </button>
                {experience.length > 1 && (
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 py-1.5 px-3 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  placeholder="Company Name"
                  className="input-field"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Title / Role *
                </label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => updateExperience(index, 'role', e.target.value)}
                  placeholder="Software Engineer"
                  className="input-field"
                  required
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="input-field flex-1 disabled:opacity-50"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                      className="rounded"
                    />
                    Current
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                placeholder="• Led development of new features...&#10;• Collaborated with cross-functional teams...&#10;• Improved system performance by 30%..."
                rows={5}
                className="input-field resize-none"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Use bullet points (•) for better formatting
              </p>
            </div>
          </div>
        ))}

        {/* Add Experience Button */}
        <button
          onClick={addExperience}
          className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Another Experience
        </button>
      </div>
    </FormLayout>
  )
}


