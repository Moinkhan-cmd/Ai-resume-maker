import FormLayout from '../layout/FormLayout'

/**
 * References form component
 */
export default function ReferencesForm({
  references,
  addReference,
  updateReference,
  removeReference
}) {
  return (
    <FormLayout title="References">
      <div className="space-y-4">
        {references.map((ref, index) => (
          <div
            key={ref.id || index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Reference #{index + 1}
              </h3>
              {references.length > 1 && (
                <button
                  onClick={() => removeReference(index)}
                  className="text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 py-1.5 px-3 rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={ref.name}
                  onChange={(e) => updateReference(index, 'name', e.target.value)}
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position/Title
                  </label>
                  <input
                    type="text"
                    value={ref.position}
                    onChange={(e) => updateReference(index, 'position', e.target.value)}
                    placeholder="Senior Manager"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={ref.company}
                    onChange={(e) => updateReference(index, 'company', e.target.value)}
                    placeholder="Company Name"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={ref.email}
                    onChange={(e) => updateReference(index, 'email', e.target.value)}
                    placeholder="john.doe@example.com"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={ref.phone}
                    onChange={(e) => updateReference(index, 'phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addReference}
          className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Another Reference
        </button>
      </div>
    </FormLayout>
  )
}


