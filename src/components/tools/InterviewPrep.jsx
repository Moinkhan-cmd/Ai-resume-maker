import { useState, useMemo } from 'react'
import { generateInterviewQuestions, getInterviewTips, generateSTARTemplate } from '../../utils/interviewPrep'

/**
 * Interview Preparation Component
 * Provides interview questions and tips based on resume content
 */
export default function InterviewPrep({ resumeData }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showTips, setShowTips] = useState(false)
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const questions = useMemo(() => generateInterviewQuestions(resumeData), [resumeData])
  const tips = useMemo(() => getInterviewTips(resumeData), [resumeData])

  const categories = [
    { id: 'all', label: 'All Questions', icon: '📋' },
    { id: 'behavioral', label: 'Behavioral', icon: '🎭' },
    { id: 'technical', label: 'Technical', icon: '💻' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'situational', label: 'Situational', icon: '🎯' },
    { id: 'general', label: 'General', icon: '❓' }
  ]

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') {
      return Object.entries(questions).flatMap(([category, qs]) => 
        qs.map(q => ({ ...q, categoryKey: category }))
      )
    }
    return (questions[selectedCategory] || []).map(q => ({ ...q, categoryKey: selectedCategory }))
  }, [questions, selectedCategory])

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index)
  }

  return (
    <div className="section-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Interview Preparation
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredQuestions.length} questions
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4 animate-fade-in">
          {/* Tips Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowTips(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                !showTips
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => setShowTips(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                showTips
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Interview Tips
            </button>
          </div>

          {!showTips ? (
            <>
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                      selectedCategory === cat.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Questions List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredQuestions.map((q, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full p-4 text-left flex items-start justify-between gap-2"
                    >
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase">
                          {q.category}
                        </span>
                        <p className="text-gray-800 dark:text-gray-200 font-medium mt-1">
                          {q.question}
                        </p>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 transform transition-transform flex-shrink-0 ${
                          expandedQuestion === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {expandedQuestion === index && (
                      <div className="px-4 pb-4 animate-fade-in">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-500">
                          <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <div>
                              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Tip</p>
                              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">{q.tip}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* STAR Method Template for behavioral questions */}
                        {q.categoryKey === 'behavioral' && (
                          <div className="mt-3 bg-gray-100 dark:bg-gray-900 rounded-lg p-3">
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                              STAR Method Framework
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-white dark:bg-gray-800 p-2 rounded">
                                <span className="font-bold text-primary-600">S</span>ituation
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-2 rounded">
                                <span className="font-bold text-primary-600">T</span>ask
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-2 rounded">
                                <span className="font-bold text-primary-600">A</span>ction
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-2 rounded">
                                <span className="font-bold text-primary-600">R</span>esult
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Interview Tips Section */
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {tips.map((section, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {section.category}
                  </h3>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li
                        key={tipIndex}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
