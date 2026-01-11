import { useState, useRef, useEffect } from 'react'
import { useResumeData } from './hooks/useResumeData'
import { useTheme } from './hooks/useTheme'
import { useResumeHistory } from './hooks/useResumeHistory'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ProgressBar from './components/common/ProgressBar'
import ResumeAnalytics from './components/common/ResumeAnalytics'
import UndoRedoControls from './components/common/UndoRedoControls'
import LandingPage from './components/landing/LandingPage'
import PersonalInfoForm from './components/form/PersonalInfoForm'
import SkillsForm from './components/form/SkillsForm'
import ExperienceForm from './components/form/ExperienceForm'
import EducationForm from './components/form/EducationForm'
import ProjectsForm from './components/form/ProjectsForm'
import LanguagesForm from './components/form/LanguagesForm'
import CertificationsForm from './components/form/CertificationsForm'
import AwardsForm from './components/form/AwardsForm'
import ReferencesForm from './components/form/ReferencesForm'
import ResumePreview from './components/preview/ResumePreview'
import JobMatcher from './components/tools/JobMatcher'
import CoverLetterGenerator from './components/tools/CoverLetterGenerator'
import InterviewPrep from './components/tools/InterviewPrep'
import VersionManager from './components/tools/VersionManager'
import ResumeImport from './components/tools/ResumeImport'
import KeywordAnalyzer from './components/tools/KeywordAnalyzer'
import { enhanceEntireResume, enhanceSummary, enhanceSkills } from './utils/aiEnhancement'

function App() {
  const [currentSection, setCurrentSection] = useState('landing')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [activeTab, setActiveTab] = useState('build') // 'build', 'tools', 'import'
  const formSectionRef = useRef(null)
  const {
    resumeData,
    updatePersonalInfo,
    addSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addCertification,
    updateCertification,
    removeCertification,
    addAward,
    updateAward,
    removeAward,
    addReference,
    updateReference,
    removeReference,
    setTemplate,
    clearResumeData,
    importResumeData
  } = useResumeData()
  const [theme, toggleTheme] = useTheme()

  // Initialize history tracking
  const { undo, redo, canUndo, canRedo } = useResumeHistory(
    resumeData,
    importResumeData
  )

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) undo()
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        if (canRedo) redo()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, canUndo, canRedo])

  // Scroll to form section
  const scrollToForm = () => {
    setCurrentSection('form')
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Handle adding skill from job matcher
  const handleAddSkillFromMatcher = (skill) => {
    addSkill(skill)
  }

  // Handle loading version
  const handleLoadVersion = (data) => {
    importResumeData(data)
  }

  // Handle import
  const handleImport = (data) => {
    importResumeData(data)
  }

  const tabs = [
    { id: 'build', label: 'Build Resume', icon: '📝' },
    { id: 'tools', label: 'AI Tools', icon: '🛠️' },
    { id: 'import', label: 'Import/Export', icon: '📁' }
  ]

  // AI Enhancement handlers
  const handleEnhanceSummary = async () => {
    if (!resumeData.personalInfo.summary) return
    
    setIsEnhancing(true)
    try {
      const enhanced = await enhanceSummary(resumeData.personalInfo.summary)
      updatePersonalInfo('summary', enhanced)
    } catch (error) {
      console.error('Enhancement failed:', error)
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleEnhanceSkills = async () => {
    if (resumeData.skills.length === 0) return
    
    setIsEnhancing(true)
    try {
      const enhanced = await enhanceSkills(
        resumeData.skills,
        resumeData.experience[0]?.role || ''
      )
      // Replace all skills with enhanced versions
      const currentCount = resumeData.skills.length
      for (let i = 0; i < currentCount; i++) {
        removeSkill(0)
      }
      enhanced.forEach(skill => addSkill(skill))
    } catch (error) {
      console.error('Enhancement failed:', error)
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleEnhanceAll = async () => {
    setIsEnhancing(true)
    try {
      const enhanced = await enhanceEntireResume(resumeData)
      // Update all sections
      Object.keys(enhanced.personalInfo).forEach(key => {
        updatePersonalInfo(key, enhanced.personalInfo[key])
      })
      // Note: Experience enhancement is handled in ExperienceForm component
      // Skills enhancement
      const currentSkillCount = resumeData.skills.length
      for (let i = 0; i < currentSkillCount; i++) {
        removeSkill(0)
      }
      enhanced.skills.forEach(skill => addSkill(skill))
    } catch (error) {
      console.error('Enhancement failed:', error)
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        selectedTemplate={resumeData.selectedTemplate}
        setTemplate={setTemplate}
        resumeData={resumeData}
      />

      {currentSection === 'landing' && (
        <LandingPage scrollToForm={scrollToForm} />
      )}

      {currentSection === 'form' && (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {/* Resume Analytics Dashboard */}
          <div className="mb-4 sm:mb-6">
            <ResumeAnalytics resumeData={resumeData} />
          </div>

          {/* Progress Bar */}
          <div className="mb-4 sm:mb-6">
            <ProgressBar resumeData={resumeData} />
          </div>

          {/* Tab Navigation */}
          <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Action Bar */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md">
            <div className="flex items-center gap-3 sm:gap-4 justify-between sm:justify-start">
              {/* Undo/Redo Controls */}
              <UndoRedoControls
                undo={undo}
                redo={redo}
                canUndo={canUndo}
                canRedo={canRedo}
              />
              
              {/* AI Enhance All Button */}
              <button
                onClick={handleEnhanceAll}
                disabled={isEnhancing}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base py-2 sm:py-2.5 px-3 sm:px-4"
              >
                {isEnhancing ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="hidden sm:inline">Enhancing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="hidden sm:inline">Enhance with AI</span>
                    <span className="sm:hidden">AI</span>
                  </>
                )}
              </button>
            </div>
            
            <button
              onClick={clearResumeData}
              className="btn-secondary text-xs sm:text-sm py-2 sm:py-2.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline">Clear All</span>
              <span className="sm:hidden">Clear</span>
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Form Section */}
            <div ref={formSectionRef} className="space-y-3 sm:space-y-4 md:space-y-6">
              {activeTab === 'build' && (
                <>
                  <PersonalInfoForm
                    personalInfo={resumeData.personalInfo}
                    updatePersonalInfo={updatePersonalInfo}
                  />

                  {/* AI Enhance Summary Button */}
                  {resumeData.personalInfo.summary && (
                    <div className="section-card">
                      <button
                        onClick={handleEnhanceSummary}
                        disabled={isEnhancing}
                        className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base py-2.5"
                      >
                        {isEnhancing ? (
                          <>
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="hidden sm:inline">Enhancing Summary...</span>
                            <span className="sm:hidden">Enhancing...</span>
                          </>
                        ) : (
                          <>
                            ✨ <span className="hidden sm:inline">Enhance Summary with AI</span>
                            <span className="sm:hidden">Enhance Summary</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <SkillsForm
                    skills={resumeData.skills}
                    addSkill={addSkill}
                    removeSkill={removeSkill}
                  />

                  {/* AI Enhance Skills Button */}
                  {resumeData.skills.length > 0 && (
                    <div className="section-card">
                      <button
                        onClick={handleEnhanceSkills}
                        disabled={isEnhancing}
                        className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base py-2.5"
                      >
                        {isEnhancing ? (
                          <>
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="hidden sm:inline">Optimizing Skills...</span>
                            <span className="sm:hidden">Optimizing...</span>
                          </>
                        ) : (
                          <>
                            ✨ <span className="hidden sm:inline">Optimize Skills for ATS</span>
                            <span className="sm:hidden">Optimize Skills</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <ExperienceForm
                    experience={resumeData.experience}
                    addExperience={addExperience}
                    updateExperience={updateExperience}
                    removeExperience={removeExperience}
                  />

                  <EducationForm
                    education={resumeData.education}
                    addEducation={addEducation}
                    updateEducation={updateEducation}
                    removeEducation={removeEducation}
                  />

                  <ProjectsForm
                    projects={resumeData.projects}
                    addProject={addProject}
                    updateProject={updateProject}
                    removeProject={removeProject}
                  />

                  <LanguagesForm
                    languages={resumeData.languages || []}
                    addLanguage={addLanguage}
                    updateLanguage={updateLanguage}
                    removeLanguage={removeLanguage}
                  />

                  <CertificationsForm
                    certifications={resumeData.certifications || []}
                    addCertification={addCertification}
                    updateCertification={updateCertification}
                    removeCertification={removeCertification}
                  />

                  <AwardsForm
                    awards={resumeData.awards || []}
                    addAward={addAward}
                    updateAward={updateAward}
                    removeAward={removeAward}
                  />

                  <ReferencesForm
                    references={resumeData.references || []}
                    addReference={addReference}
                    updateReference={updateReference}
                    removeReference={removeReference}
                  />
                </>
              )}

              {activeTab === 'tools' && (
                <>
                  <JobMatcher
                    resumeData={resumeData}
                    onAddSkills={handleAddSkillFromMatcher}
                  />
                  
                  <CoverLetterGenerator resumeData={resumeData} />
                  
                  <InterviewPrep resumeData={resumeData} />
                  
                  <KeywordAnalyzer resumeData={resumeData} />
                </>
              )}

              {activeTab === 'import' && (
                <>
                  <VersionManager
                    resumeData={resumeData}
                    onLoadVersion={handleLoadVersion}
                  />
                  
                  <ResumeImport onImport={handleImport} />
                </>
              )}
            </div>

            {/* Preview Section */}
            <div>
              <ResumePreview resumeData={resumeData} />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Button */}
      {currentSection === 'landing' && (
        <button
          onClick={scrollToForm}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-primary-600 hover:bg-primary-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-30"
          aria-label="Start building resume"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      )}

      {/* Back to Landing Button */}
      {currentSection === 'form' && (
        <button
          onClick={() => setCurrentSection('landing')}
          className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-30 border border-gray-200 dark:border-gray-700"
          aria-label="Back to home"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App

