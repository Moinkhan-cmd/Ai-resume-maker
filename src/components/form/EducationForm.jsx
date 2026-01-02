import FormLayout from '../layout/FormLayout'

/**
 * Education form component with multiple entries
 * @param {Array} education - Education array
 * @param {function} addEducation - Function to add education
 * @param {function} updateEducation - Function to update education
 * @param {function} removeEducation - Function to remove education
 */
export default function EducationForm({
  education,
  addEducation,
  updateEducation,
  removeEducation
}) {
  return (
    <FormLayout title="Education">
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div
            key={edu.id || index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Education #{index + 1}
              </h3>
              {education.length > 1 && (
                <button
                  onClick={() => removeEducation(index)}
                  className="text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 py-1.5 px-3 rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Degree / Qualification *
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="input-field"
                  required
                />
              </div>

              {/* Institute */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  value={edu.institute}
                  onChange={(e) => updateEducation(index, 'institute', e.target.value)}
                  placeholder="University Name"
                  className="input-field"
                  required
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Graduation Year *
                </label>
                <input
                  type="number"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  placeholder="2023"
                  min="1950"
                  max="2100"
                  className="input-field"
                  required
                />
              </div>

              {/* GPA (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  placeholder="3.8 / 4.0"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Education Button */}
        <button
          onClick={addEducation}
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
          Add Another Education
        </button>
      </div>
    </FormLayout>
  )
}


