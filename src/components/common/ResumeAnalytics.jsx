import { getResumeStats, getResumeSuggestions } from '../../utils/resumeAnalytics'

/**
 * Resume Analytics Dashboard Component
 * Shows ATS score, statistics, and suggestions
 */
export default function ResumeAnalytics({ resumeData }) {
  const stats = getResumeStats(resumeData)
  const suggestions = getResumeSuggestions(resumeData)

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30'
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30'
    return 'bg-red-100 dark:bg-red-900/30'
  }

  return (
    <div className="section-card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-primary-200 dark:border-primary-800">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Resume Analytics
      </h2>

      {/* ATS Score */}
      <div className="mb-6">
        <div className={`rounded-xl p-6 ${getScoreBgColor(stats.atsScore)} border-2 border-current ${getScoreColor(stats.atsScore)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold uppercase tracking-wide">ATS Score</span>
            <span className={`text-3xl font-bold ${getScoreColor(stats.atsScore)}`}>
              {stats.atsScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${stats.atsScore >= 80 ? 'bg-green-600' : stats.atsScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
              style={{ width: `${stats.atsScore}%` }}
            />
          </div>
          <p className="text-xs mt-2 opacity-75">
            {stats.atsScore >= 80 ? 'Excellent! Your resume is well-optimized for ATS systems.' :
             stats.atsScore >= 60 ? 'Good! Consider adding more details to improve your score.' :
             'Needs improvement. Complete missing sections to boost your ATS score.'}
          </p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.skillsCount}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Skills</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.experienceCount}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Experience</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.educationCount}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Education</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.projectsCount}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Projects</div>
        </div>
      </div>

      {/* Word Count */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Total Words</span>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{stats.wordCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Suggestions
          </h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  suggestion.type === 'warning'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                }`}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


