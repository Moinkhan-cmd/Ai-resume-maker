import FormLayout from '../layout/FormLayout'
import CharacterCounter from '../common/CharacterCounter'

/**
 * Personal information form component
 * @param {object} personalInfo - Personal info data
 * @param {function} updatePersonalInfo - Function to update personal info
 */
export default function PersonalInfoForm({ personalInfo, updatePersonalInfo }) {
  const MAX_SUMMARY_LENGTH = 500

  return (
    <FormLayout title="Personal Information">
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            placeholder="John Doe"
            className="input-field"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="john.doe@example.com"
            className="input-field"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="input-field"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location *
          </label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            placeholder="City, State / City, Country"
            className="input-field"
            required
          />
        </div>

        {/* Professional Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Professional Summary *
          </label>
          <textarea
            value={personalInfo.summary}
            onChange={(e) => {
              const value = e.target.value
              if (value.length <= MAX_SUMMARY_LENGTH) {
                updatePersonalInfo('summary', value)
              }
            }}
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
            rows={5}
            className="input-field resize-none"
            maxLength={MAX_SUMMARY_LENGTH}
            required
          />
          <CharacterCounter
            current={personalInfo.summary.length}
            max={MAX_SUMMARY_LENGTH}
          />
        </div>

        {/* Social Links Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Social Links & Portfolio
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website/Portfolio URL
              </label>
              <input
                type="url"
                value={personalInfo.website || ''}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={personalInfo.linkedin || ''}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  value={personalInfo.github || ''}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="https://github.com/yourusername"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Twitter/X Profile
              </label>
              <input
                type="url"
                value={personalInfo.twitter || ''}
                onChange={(e) => updatePersonalInfo('twitter', e.target.value)}
                placeholder="https://twitter.com/yourusername"
                className="input-field"
              />
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  )
}


