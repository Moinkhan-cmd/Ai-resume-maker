import { useMemo } from 'react'

/**
 * Keyword Density Analyzer Component
 * Analyzes keyword frequency in resume for ATS optimization
 */
export default function KeywordAnalyzer({ resumeData }) {
  const analysis = useMemo(() => analyzeKeywords(resumeData), [resumeData])

  const getCategoryColor = (category) => {
    const colors = {
      'Technical Skills': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      'Soft Skills': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      'Action Verbs': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      'Industry Terms': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
    }
    return colors[category] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
  }

  return (
    <div className="section-card">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Keyword Analysis
      </h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {analysis.totalKeywords}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Keywords</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {analysis.uniqueKeywords}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Unique Keywords</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {analysis.actionVerbCount}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Action Verbs</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {analysis.densityScore}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Density Score</div>
        </div>
      </div>

      {/* Top Keywords by Category */}
      {Object.entries(analysis.byCategory).map(([category, keywords]) => (
        keywords.length > 0 && (
          <div key={category} className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords.slice(0, 10).map((kw, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(category)}`}
                >
                  {kw.word}
                  {kw.count > 1 && (
                    <span className="ml-1 text-xs opacity-75">×{kw.count}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )
      ))}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Optimization Tips
          </h3>
          <ul className="space-y-1">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-yellow-700 dark:text-yellow-400 flex items-start gap-2">
                <span className="text-yellow-500">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/**
 * Analyze keywords in resume data
 */
function analyzeKeywords(resumeData) {
  const allText = getResumeText(resumeData)
  const words = allText.toLowerCase().match(/\b[a-z]{3,}\b/g) || []
  
  // Action verbs commonly used in resumes
  const actionVerbs = new Set([
    'achieved', 'accomplished', 'analyzed', 'built', 'collaborated', 'created',
    'delivered', 'designed', 'developed', 'drove', 'enhanced', 'established',
    'executed', 'generated', 'implemented', 'improved', 'increased', 'initiated',
    'launched', 'led', 'managed', 'optimized', 'orchestrated', 'organized',
    'planned', 'produced', 'reduced', 'resolved', 'spearheaded', 'streamlined',
    'supervised', 'transformed', 'utilized'
  ])

  // Technical skill keywords
  const technicalTerms = new Set([
    'javascript', 'typescript', 'python', 'java', 'react', 'angular', 'vue',
    'node', 'express', 'django', 'flask', 'spring', 'sql', 'mongodb', 'postgresql',
    'aws', 'azure', 'docker', 'kubernetes', 'git', 'api', 'rest', 'graphql',
    'agile', 'scrum', 'devops', 'cicd', 'testing', 'debugging'
  ])

  // Soft skill keywords
  const softSkills = new Set([
    'leadership', 'communication', 'teamwork', 'collaboration', 'problem',
    'analytical', 'creative', 'innovative', 'strategic', 'organized',
    'adaptable', 'flexible', 'motivated', 'dedicated', 'detail'
  ])

  // Count keywords
  const wordCounts = {}
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1
  })

  // Categorize keywords
  const byCategory = {
    'Technical Skills': [],
    'Soft Skills': [],
    'Action Verbs': [],
    'Industry Terms': []
  }

  const usedActionVerbs = []
  
  Object.entries(wordCounts).forEach(([word, count]) => {
    if (actionVerbs.has(word)) {
      byCategory['Action Verbs'].push({ word, count })
      usedActionVerbs.push(word)
    } else if (technicalTerms.has(word)) {
      byCategory['Technical Skills'].push({ word, count })
    } else if (softSkills.has(word)) {
      byCategory['Soft Skills'].push({ word, count })
    }
  })

  // Add skills from skills array
  resumeData.skills?.forEach(skill => {
    const skillLower = skill.toLowerCase()
    if (!byCategory['Technical Skills'].some(k => k.word === skillLower)) {
      byCategory['Technical Skills'].push({ word: skill, count: 1 })
    }
  })

  // Sort by count
  Object.keys(byCategory).forEach(key => {
    byCategory[key].sort((a, b) => b.count - a.count)
  })

  // Calculate density score
  const totalKeywords = Object.values(byCategory).flat().reduce((sum, k) => sum + k.count, 0)
  const totalWords = words.length
  const densityScore = totalWords > 0 ? Math.min(Math.round((totalKeywords / totalWords) * 100), 100) : 0

  // Generate recommendations
  const recommendations = []
  
  if (byCategory['Action Verbs'].length < 5) {
    recommendations.push('Add more action verbs to your experience descriptions (e.g., "Led", "Developed", "Achieved")')
  }
  
  if (byCategory['Technical Skills'].length < 5) {
    recommendations.push('Include more technical skills relevant to your target role')
  }
  
  if (densityScore < 10) {
    recommendations.push('Your keyword density is low. Add more industry-specific terms')
  }
  
  if (densityScore > 30) {
    recommendations.push('Keyword density is high. Ensure content reads naturally')
  }

  // Check for repetition
  const overused = Object.entries(wordCounts)
    .filter(([, count]) => count > 5)
    .map(([word]) => word)
  
  if (overused.length > 0) {
    recommendations.push(`Consider varying vocabulary - "${overused.slice(0, 3).join('", "')}" appear frequently`)
  }

  return {
    totalKeywords,
    uniqueKeywords: Object.keys(wordCounts).length,
    actionVerbCount: byCategory['Action Verbs'].length,
    densityScore,
    byCategory,
    recommendations
  }
}

/**
 * Get all text content from resume
 */
function getResumeText(resumeData) {
  const parts = [
    resumeData.personalInfo?.summary || '',
    resumeData.personalInfo?.fullName || '',
    ...resumeData.skills || [],
    ...(resumeData.experience || []).map(e => `${e.role} ${e.company} ${e.description}`),
    ...(resumeData.education || []).map(e => `${e.degree} ${e.institute}`),
    ...(resumeData.projects || []).map(p => `${p.title} ${p.description} ${p.techStack}`),
    ...(resumeData.certifications || []).map(c => c.name || ''),
    ...(resumeData.awards || []).map(a => `${a.title} ${a.description}`)
  ]
  return parts.join(' ')
}
