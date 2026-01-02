/**
 * Calculate ATS (Applicant Tracking System) score
 * @param {object} resumeData - Resume data object
 * @returns {number} - ATS score (0-100)
 */
export function calculateATSScore(resumeData) {
  let score = 0
  let maxScore = 0

  // Personal Info (20 points)
  maxScore += 20
  const personalFields = ['fullName', 'email', 'phone', 'location', 'summary']
  const filledPersonalFields = personalFields.filter(field => 
    resumeData.personalInfo[field] && resumeData.personalInfo[field].trim()
  ).length
  score += (filledPersonalFields / personalFields.length) * 20

  // Skills (15 points)
  maxScore += 15
  if (resumeData.skills.length >= 5) {
    score += 15
  } else if (resumeData.skills.length >= 3) {
    score += 10
  } else if (resumeData.skills.length > 0) {
    score += 5
  }

  // Experience (25 points)
  maxScore += 25
  if (resumeData.experience.length > 0) {
    const completeExperiences = resumeData.experience.filter(exp => 
      exp.company && exp.role && exp.description
    ).length
    score += Math.min((completeExperiences / Math.max(resumeData.experience.length, 1)) * 25, 25)
  }

  // Education (15 points)
  maxScore += 15
  if (resumeData.education.length > 0) {
    const completeEducation = resumeData.education.filter(edu => 
      edu.degree && edu.institute && edu.year
    ).length
    score += Math.min((completeEducation / Math.max(resumeData.education.length, 1)) * 15, 15)
  }

  // Projects (10 points)
  maxScore += 10
  if (resumeData.projects.length > 0) {
    const completeProjects = resumeData.projects.filter(proj => 
      proj.title && proj.description
    ).length
    score += Math.min((completeProjects / Math.max(resumeData.projects.length, 1)) * 10, 10)
  }

  // Keywords and optimization (15 points)
  maxScore += 15
  const allText = [
    resumeData.personalInfo.summary,
    ...resumeData.skills.join(' '),
    ...resumeData.experience.map(e => e.description),
    ...resumeData.projects.map(p => p.description)
  ].join(' ').toLowerCase()

  const commonKeywords = ['experience', 'skills', 'project', 'develop', 'manage', 'lead', 'create', 'implement', 'improve', 'optimize']
  const foundKeywords = commonKeywords.filter(keyword => allText.includes(keyword)).length
  score += (foundKeywords / commonKeywords.length) * 15

  return Math.round((score / maxScore) * 100)
}

/**
 * Get resume statistics
 * @param {object} resumeData - Resume data object
 * @returns {object} - Statistics object
 */
export function getResumeStats(resumeData) {
  const wordCount = [
    resumeData.personalInfo.summary,
    ...resumeData.experience.map(e => e.description),
    ...resumeData.projects.map(p => p.description)
  ].join(' ').split(/\s+/).filter(word => word.length > 0).length

  const charCount = JSON.stringify(resumeData).length

  return {
    wordCount,
    charCount,
    skillsCount: resumeData.skills.length,
    experienceCount: resumeData.experience.length,
    educationCount: resumeData.education.length,
    projectsCount: resumeData.projects.length,
    atsScore: calculateATSScore(resumeData)
  }
}

/**
 * Get resume suggestions
 * @param {object} resumeData - Resume data object
 * @returns {Array} - Array of suggestion objects
 */
export function getResumeSuggestions(resumeData) {
  const suggestions = []

  if (!resumeData.personalInfo.summary || resumeData.personalInfo.summary.length < 50) {
    suggestions.push({
      type: 'warning',
      message: 'Add a professional summary (at least 50 characters)',
      section: 'summary'
    })
  }

  if (resumeData.skills.length < 5) {
    suggestions.push({
      type: 'info',
      message: 'Add at least 5 skills for better ATS optimization',
      section: 'skills'
    })
  }

  if (resumeData.experience.length === 0) {
    suggestions.push({
      type: 'warning',
      message: 'Add your work experience',
      section: 'experience'
    })
  }

  if (resumeData.education.length === 0) {
    suggestions.push({
      type: 'warning',
      message: 'Add your education details',
      section: 'education'
    })
  }

  const incompleteExperience = resumeData.experience.filter(exp => 
    !exp.company || !exp.role || !exp.description
  )
  if (incompleteExperience.length > 0) {
    suggestions.push({
      type: 'warning',
      message: `Complete ${incompleteExperience.length} incomplete experience${incompleteExperience.length > 1 ? ' entries' : ''}`,
      section: 'experience'
    })
  }

  return suggestions
}


