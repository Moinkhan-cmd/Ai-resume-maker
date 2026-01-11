/**
 * Cover Letter Generation Utilities
 * AI-powered cover letter generation based on resume and job description
 */

/**
 * Generate a professional cover letter
 * @param {object} resumeData - Resume data object
 * @param {string} jobDescription - Job description text
 * @param {string} companyName - Target company name
 * @param {string} jobTitle - Target job title
 * @param {string} tone - Tone of the letter (professional, friendly, enthusiastic)
 * @returns {Promise<string>} - Generated cover letter
 */
export async function generateCoverLetter(resumeData, jobDescription, companyName, jobTitle, tone = 'professional') {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const { personalInfo, skills, experience, education } = resumeData
  
  // Extract key requirements from job description
  const keyRequirements = extractKeyRequirements(jobDescription)
  
  // Get most relevant experience
  const relevantExperience = experience?.[0] || {}
  
  // Get highest education
  const topEducation = education?.[0] || {}
  
  // Generate letter based on tone
  const toneStyles = {
    professional: {
      greeting: 'Dear Hiring Manager',
      opener: `I am writing to express my strong interest in the ${jobTitle} position at ${companyName}.`,
      closing: 'I look forward to the opportunity to discuss how I can contribute to your team.',
      signoff: 'Sincerely'
    },
    friendly: {
      greeting: 'Hello',
      opener: `I'm excited to apply for the ${jobTitle} role at ${companyName}!`,
      closing: 'I would love the chance to chat more about this opportunity.',
      signoff: 'Best regards'
    },
    enthusiastic: {
      greeting: 'Dear Hiring Team',
      opener: `I am thrilled to apply for the ${jobTitle} position at ${companyName}! This opportunity perfectly aligns with my career aspirations.`,
      closing: 'I am eager to bring my passion and expertise to your team and would welcome the opportunity to discuss this further.',
      signoff: 'With enthusiasm'
    }
  }
  
  const style = toneStyles[tone] || toneStyles.professional
  
  // Build cover letter
  const letter = `${style.greeting},

${style.opener}

${generateOpeningParagraph(personalInfo, relevantExperience, jobTitle)}

${generateExperienceParagraph(relevantExperience, keyRequirements, skills)}

${generateSkillsParagraph(skills, keyRequirements, companyName)}

${generateClosingParagraph(style.closing, personalInfo)}

${style.signoff},
${personalInfo.fullName || 'Your Name'}
${personalInfo.email || ''}
${personalInfo.phone || ''}`

  return letter
}

/**
 * Extract key requirements from job description
 */
function extractKeyRequirements(jobDescription) {
  if (!jobDescription) return []
  
  const normalized = jobDescription.toLowerCase()
  const requirements = []
  
  // Common requirement patterns
  const patterns = [
    /(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi,
    /proficient\s+in\s+([^.]+)/gi,
    /experience\s+with\s+([^.]+)/gi,
    /knowledge\s+of\s+([^.]+)/gi,
    /skilled\s+in\s+([^.]+)/gi,
    /ability\s+to\s+([^.]+)/gi
  ]
  
  patterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(normalized)) !== null) {
      requirements.push(match[0].trim())
    }
  })
  
  return requirements.slice(0, 10)
}

/**
 * Generate opening paragraph
 */
function generateOpeningParagraph(personalInfo, experience, jobTitle) {
  const summary = personalInfo.summary || ''
  const yearsExp = experience.startDate ? calculateYears(experience.startDate) : 'several'
  
  if (summary.length > 50) {
    // Use parts of the summary
    const firstSentence = summary.split('.')[0]
    return `With ${yearsExp} years of professional experience, I bring a strong background in ${experience.role || 'the field'}. ${firstSentence}.`
  }
  
  return `As a dedicated ${experience.role || 'professional'} with ${yearsExp} years of experience, I have developed a comprehensive skill set that makes me an excellent candidate for this ${jobTitle} position.`
}

/**
 * Generate experience paragraph
 */
function generateExperienceParagraph(experience, requirements, skills) {
  const role = experience.role || 'my current role'
  const company = experience.company || 'my organization'
  
  const topSkills = skills.slice(0, 3).join(', ')
  
  return `In my role as ${role} at ${company}, I have successfully leveraged my expertise in ${topSkills || 'various technologies'} to deliver impactful results. I thrive in collaborative environments and have a proven track record of meeting project deadlines while maintaining high-quality standards.`
}

/**
 * Generate skills paragraph
 */
function generateSkillsParagraph(skills, requirements, companyName) {
  const skillsList = skills.slice(0, 5).join(', ')
  
  return `My technical proficiency includes ${skillsList || 'a wide range of relevant technologies'}. I am particularly drawn to ${companyName} because of the opportunity to apply these skills in an innovative environment while continuing to grow professionally.`
}

/**
 * Generate closing paragraph
 */
function generateClosingParagraph(closingLine, personalInfo) {
  return `I am confident that my combination of technical skills, practical experience, and passion for excellence would make me a valuable addition to your team. ${closingLine}

Thank you for considering my application.`
}

/**
 * Calculate years from date
 */
function calculateYears(startDate) {
  const start = new Date(startDate)
  const now = new Date()
  const years = Math.floor((now - start) / (365.25 * 24 * 60 * 60 * 1000))
  return years || 1
}

/**
 * Generate multiple cover letter variations
 */
export async function generateCoverLetterVariations(resumeData, jobDescription, companyName, jobTitle) {
  const tones = ['professional', 'friendly', 'enthusiastic']
  const variations = []
  
  for (const tone of tones) {
    const letter = await generateCoverLetter(resumeData, jobDescription, companyName, jobTitle, tone)
    variations.push({
      tone,
      label: tone.charAt(0).toUpperCase() + tone.slice(1),
      content: letter
    })
  }
  
  return variations
}

/**
 * Export cover letter to text file
 */
export function exportCoverLetter(content, filename = 'cover-letter.txt') {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
