import FormLayout from '../layout/FormLayout'

/**
 * Awards form component
 */
export default function AwardsForm({
  awards,
  addAward,
  updateAward,
  removeAward
}) {
  return (
    <FormLayout title="Awards & Achievements">
      <div className="space-y-4">
        {awards.map((award, index) => (
          <div
            key={award.id || index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Award #{index + 1}
              </h3>
              {awards.length > 1 && (
                <button
                  onClick={() => removeAward(index)}
                  className="text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 py-1.5 px-3 rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Award Title *
                </label>
                <input
                  type="text"
                  value={award.title}
                  onChange={(e) => updateAward(index, 'title', e.target.value)}
                  placeholder="Employee of the Year"
                  className="input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={award.issuer}
                    onChange={(e) => updateAward(index, 'issuer', e.target.value)}
                    placeholder="Company Name"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Received
                  </label>
                  <input
                    type="month"
                    value={award.date}
                    onChange={(e) => updateAward(index, 'date', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={award.description}
                  onChange={(e) => updateAward(index, 'description', e.target.value)}
                  placeholder="Brief description of the award..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addAward}
          className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Another Award
        </button>
      </div>
    </FormLayout>
  )
}


