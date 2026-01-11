import { useState, useRef, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import { exportToPDF } from '../../utils/pdfExport'
import { exportToJSON, exportToTXT, copyToClipboard, generateShareLink } from '../../utils/exportUtils'

/**
 * Header component with navigation, theme toggle, and export button
 * @param {string} theme - Current theme
 * @param {function} toggleTheme - Function to toggle theme
 * @param {number} selectedTemplate - Currently selected template
 * @param {function} setTemplate - Function to change template
 * @param {object} resumeData - Resume data object
 */
export default function Header({ theme, toggleTheme, selectedTemplate, setTemplate, resumeData }) {
  const [isExporting, setIsExporting] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [hoveredTemplate, setHoveredTemplate] = useState(null)
  const [copied, setCopied] = useState(false)
  const templateSelectorRef = useRef(null)

  const handleExportPDF = async () => {
    setIsExporting(true)
    setShowExportMenu(false)
    try {
      await exportToPDF('resume-preview', 'resume.pdf')
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setTimeout(() => setIsExporting(false), 1000)
    }
  }

  const handleExportJSON = () => {
    exportToJSON(resumeData, 'resume-data.json')
    setShowExportMenu(false)
  }

  const handleExportTXT = () => {
    exportToTXT(resumeData, 'resume.txt')
    setShowExportMenu(false)
  }

  const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(resumeData)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    setShowShareMenu(false)
  }

  const handleGenerateShareLink = () => {
    const shareLink = generateShareLink(resumeData)
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
    setShowShareMenu(false)
  }

  // Close menus when clicking outside
  useState(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.export-menu') && !event.target.closest('.share-menu')) {
        setShowExportMenu(false)
        setShowShareMenu(false)
      }
    }
    if (showExportMenu || showShareMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  })

  const templateNames = {
    1: 'Modern Minimal',
    2: 'Two-Column Classic',
    3: 'Creative Modern',
    4: 'Professional Sidebar',
    5: 'Color Accents',
    6: 'Minimalist Clean'
  }

  // Template metadata with colors and descriptions
  const templateData = {
    1: {
      name: 'Modern Minimal',
      description: 'Clean and simple design perfect for any industry',
      color: 'from-blue-500 to-blue-600',
      icon: '📄',
      tags: ['Clean', 'Professional']
    },
    2: {
      name: 'Two-Column Classic',
      description: 'Traditional layout with organized sections',
      color: 'from-emerald-500 to-emerald-600',
      icon: '📑',
      tags: ['Traditional', 'Organized']
    },
    3: {
      name: 'Creative Modern',
      description: 'Bold design for creative professionals',
      color: 'from-purple-500 to-purple-600',
      icon: '🎨',
      tags: ['Creative', 'Bold']
    },
    4: {
      name: 'Professional Sidebar',
      description: 'Executive style with sidebar layout',
      color: 'from-slate-600 to-slate-700',
      icon: '💼',
      tags: ['Executive', 'Formal']
    },
    5: {
      name: 'Color Accents',
      description: 'Modern design with vibrant color highlights',
      color: 'from-rose-500 to-orange-500',
      icon: '✨',
      tags: ['Vibrant', 'Modern']
    },
    6: {
      name: 'Minimalist Clean',
      description: 'Ultra-clean design with maximum readability',
      color: 'from-gray-500 to-gray-600',
      icon: '⚡',
      tags: ['Minimal', 'Readable']
    }
  }

  // Close template selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (templateSelectorRef.current && !templateSelectorRef.current.contains(event.target)) {
        setShowTemplateSelector(false)
      }
    }
    if (showTemplateSelector) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTemplateSelector])

  const handleTemplateSelect = (templateId) => {
    setTemplate(templateId)
    setShowTemplateSelector(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo with animation */}
          <div className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 p-1.5 sm:p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent truncate">
                AI Resume Builder
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Create Professional Resumes
              </p>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {/* Advanced Template Selector */}
            <div className="relative" ref={templateSelectorRef}>
              {/* Desktop Template Trigger Button */}
              <button
                onClick={() => {
                  setShowTemplateSelector(!showTemplateSelector)
                  setShowExportMenu(false)
                  setShowShareMenu(false)
                }}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 group"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${templateData[selectedTemplate].color} flex items-center justify-center text-white text-sm shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {templateData[selectedTemplate].icon}
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Template</div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1">
                    {templateData[selectedTemplate].name}
                    <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${showTemplateSelector ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Mobile Template Button */}
              <button
                onClick={() => {
                  setShowTemplateSelector(!showTemplateSelector)
                  setShowExportMenu(false)
                  setShowShareMenu(false)
                }}
                className="md:hidden flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg px-2.5 py-1.5 border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${templateData[selectedTemplate].color} flex items-center justify-center text-white text-xs shadow-sm`}>
                  {templateData[selectedTemplate].icon}
                </div>
                <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${showTemplateSelector ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Template Selector Dropdown */}
              {showTemplateSelector && (
                <div className="absolute right-0 md:right-auto md:left-0 mt-3 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fade-in">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                      </svg>
                      Choose Your Template
                    </h3>
                    <p className="text-primary-100 text-xs mt-1">Select a design that matches your style</p>
                  </div>

                  {/* Template Grid */}
                  <div className="p-3 max-h-96 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(templateData).map(([id, template]) => {
                        const templateId = Number(id)
                        const isSelected = selectedTemplate === templateId
                        const isHovered = hoveredTemplate === templateId

                        return (
                          <button
                            key={id}
                            onClick={() => handleTemplateSelect(templateId)}
                            onMouseEnter={() => setHoveredTemplate(templateId)}
                            onMouseLeave={() => setHoveredTemplate(null)}
                            className={`relative group text-left rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                              isSelected
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800 hover:shadow-md'
                            }`}
                          >
                            {/* Selected Badge */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 z-10">
                                <div className="bg-primary-500 text-white rounded-full p-1 shadow-md">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            )}

                            {/* Template Preview Card */}
                            <div className={`h-20 bg-gradient-to-br ${template.color} relative overflow-hidden`}>
                              {/* Decorative Pattern */}
                              <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-2 left-2 right-2 h-2 bg-white rounded-full"></div>
                                <div className="absolute top-6 left-2 w-8 h-1.5 bg-white rounded-full"></div>
                                <div className="absolute top-6 right-2 w-12 h-1.5 bg-white rounded-full"></div>
                                <div className="absolute top-10 left-2 right-2 space-y-1">
                                  <div className="h-1 bg-white rounded-full w-3/4"></div>
                                  <div className="h-1 bg-white rounded-full w-1/2"></div>
                                  <div className="h-1 bg-white rounded-full w-2/3"></div>
                                </div>
                              </div>

                              {/* Icon */}
                              <div className={`absolute inset-0 flex items-center justify-center text-3xl transition-transform duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                                {template.icon}
                              </div>

                              {/* Hover Overlay */}
                              <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'opacity-10' : 'opacity-0'}`}></div>
                            </div>

                            {/* Template Info */}
                            <div className="p-3">
                              <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">
                                {template.name}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                                {template.description}
                              </p>
                              <div className="flex gap-1.5">
                                {template.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      isSelected
                                        ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Ripple Effect on Click */}
                            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isSelected ? 'opacity-0' : ''}`}>
                              <div className="absolute inset-0 bg-primary-500 opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                        Currently using: <span className="font-medium text-gray-700 dark:text-gray-300">{templateData[selectedTemplate].name}</span>
                      </span>
                      <span className="text-gray-400">6 templates</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Export Menu */}
            <div className="relative export-menu">
              <button
                onClick={() => {
                  setShowExportMenu(!showExportMenu)
                  setShowShareMenu(false)
                }}
                disabled={isExporting}
                className="relative group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-1.5 px-2 sm:py-2 sm:px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 overflow-hidden text-xs sm:text-sm"
                title="Export Options"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                {isExporting ? (
                  <>
                    <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="hidden sm:inline">Exporting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Export</span>
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>

              {showExportMenu && !isExporting && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in">
                  <button
                    onClick={handleExportPDF}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Export as PDF
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Export as JSON
                  </button>
                  <button
                    onClick={handleExportTXT}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export as TXT
                  </button>
                </div>
              )}
            </div>

            {/* Share Menu */}
            <div className="relative share-menu">
              <button
                onClick={() => {
                  setShowShareMenu(!showShareMenu)
                  setShowExportMenu(false)
                }}
                className="btn-secondary text-xs py-1.5 px-2 sm:text-sm sm:py-2 sm:px-4 flex items-center gap-1 sm:gap-2 relative"
                title="Share Resume"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="hidden sm:inline">Share</span>
                {copied && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in">
                    Copied!
                  </span>
                )}
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in">
                  <button
                    onClick={handleCopyToClipboard}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={handleGenerateShareLink}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Generate Share Link
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle with enhanced styling */}
            <div className="relative">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

