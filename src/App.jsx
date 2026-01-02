import { useState, useRef } from 'react'
import { useResumeData } from './hooks/useResumeData'
import { useTheme } from './hooks/useTheme'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ProgressBar from './components/common/ProgressBar'
import ResumeAnalytics from './components/common/ResumeAnalytics'
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
import { enhanceEntireResume, enhanceSummary, enhanceSkills } from './utils/aiEnhancement'

function App() {
  const [currentSection, setCurrentSection] = useState('landing')
  const [isEnhancing, setIsEnhancing] = useState(false)
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
    clearResumeData
  } = useResumeData()
  const [theme, toggleTheme] = useTheme()

  // Scroll to form section
  const scrollToForm = () => {
    setCurrentSection('form')
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Resume Analytics Dashboard */}
          <div className="mb-6">
            <ResumeAnalytics resumeData={resumeData} />
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <ProgressBar resumeData={resumeData} />
          </div>

          {/* AI Enhance All Button */}
          <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
            <button
              onClick={handleEnhanceAll}
              disabled={isEnhancing}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              {isEnhancing ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enhancing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Enhance Entire Resume with AI
                </>
              )}
            </button>
            <button
              onClick={clearResumeData}
              className="btn-secondary text-sm"
            >
              Clear All Data
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Form Section */}
            <div ref={formSectionRef} className="space-y-4 sm:space-y-6">
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
                    className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isEnhancing ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enhancing Summary...
                      </>
                    ) : (
                      <>
                        ✨ Enhance Summary with AI
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
                    className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isEnhancing ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Optimizing Skills...
                      </>
                    ) : (
                      <>
                        ✨ Optimize Skills for ATS
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
          className="fixed bottom-8 right-8 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-30"
          aria-label="Start building resume"
        >
          <svg
            className="w-6 h-6"
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

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App

