import FormLayout from '../layout/FormLayout'

/**
 * Languages form component
 */
export default function LanguagesForm({
  languages,
  addLanguage,
  updateLanguage,
  removeLanguage
}) {
  const proficiencyLevels = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']

  return (
    <FormLayout title="Languages">
      <div className="space-y-4">
        {languages.map((lang, index) => (
          <div
            key={lang.id || index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Language #{index + 1}
              </h3>
              {languages.length > 1 && (
                <button
                  onClick={() => removeLanguage(index)}
                  className="text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 py-1.5 px-3 rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language *
                </label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                  placeholder="English, Spanish, French..."
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Proficiency Level *
                </label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                  className="input-field"
                  required
                >
                  {proficiencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addLanguage}
          className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Another Language
        </button>
      </div>
    </FormLayout>
  )
}


