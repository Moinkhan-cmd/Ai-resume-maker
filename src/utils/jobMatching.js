/**
 * Job Description Matching and Analysis Utilities
 * Analyzes job descriptions and provides matching scores/suggestions
 */

/**
 * Common skill categories for matching
 */
const SKILL_CATEGORIES = {
  programming: ['javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'rust', 'php', 'swift', 'kotlin'],
  frontend: ['react', 'vue', 'angular', 'html', 'css', 'sass', 'less', 'tailwind', 'bootstrap', 'jquery', 'svelte', 'next.js', 'nuxt'],
  backend: ['node.js', 'express', 'django', 'flask', 'spring', 'rails', 'laravel', 'fastapi', 'nest.js', '.net', 'asp.net'],
  database: ['sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'oracle', 'sqlite', 'dynamodb', 'cassandra'],
  cloud: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'jenkins', 'ci/cd', 'devops', 'cloudflare'],
  tools: ['git', 'github', 'gitlab', 'jira', 'confluence', 'figma', 'sketch', 'postman', 'vscode', 'intellij'],
  soft: ['leadership', 'communication', 'teamwork', 'problem-solving', 'analytical', 'agile', 'scrum', 'project management']
}

/**
 * Extract keywords from text
 * @param {string} text - Text to analyze
 * @returns {string[]} - Array of extracted keywords
 */
export function extractKeywords(text) {
  if (!text) return []
  
  const normalized = text.toLowerCase()
  const keywords = new Set()
  
  // Extract skill-related keywords
  Object.values(SKILL_CATEGORIES).flat().forEach(skill => {
    if (normalized.includes(skill.toLowerCase())) {
      keywords.add(skill)
    }
  })
  
  // Extract years of experience patterns
  const expPattern = /(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)?/gi
  let match
  while ((match = expPattern.exec(normalized)) !== null) {
    keywords.add(`${match[1]}+ years experience`)
  }
  
  // Extract degree requirements
  const degreePatterns = ['bachelor', 'master', 'phd', 'doctorate', 'bs', 'ms', 'mba', 'associate']
  degreePatterns.forEach(degree => {
    if (normalized.includes(degree)) {
      keywords.add(degree)
    }
  })
  
  // Extract common job-related terms
  const jobTerms = ['remote', 'hybrid', 'on-site', 'full-time', 'part-time', 'contract', 'senior', 'junior', 'lead', 'manager', 'director']
  jobTerms.forEach(term => {
    if (normalized.includes(term)) {
      keywords.add(term)
    }
  })
  
  return Array.from(keywords)
}

/**
 * Analyze job description and compare with resume
 * @param {string} jobDescription - Job description text
 * @param {object} resumeData - Resume data object
 * @returns {object} - Analysis result with score and suggestions
 */
export function analyzeJobMatch(jobDescription, resumeData) {
  const jobKeywords = extractKeywords(jobDescription)
  const resumeText = getResumeText(resumeData)
  const resumeKeywords = extractKeywords(resumeText)
  
  // Find matching and missing keywords
  const matchingKeywords = jobKeywords.filter(kw => 
    resumeText.toLowerCase().includes(kw.toLowerCase())
  )
  const missingKeywords = jobKeywords.filter(kw => 
    !resumeText.toLowerCase().includes(kw.toLowerCase())
  )
  
  // Calculate match score
  const matchScore = jobKeywords.length > 0 
    ? Math.round((matchingKeywords.length / jobKeywords.length) * 100)
    : 0
  
  // Generate suggestions
  const suggestions = generateSuggestions(missingKeywords, jobDescription, resumeData)
  
  // Identify skill gaps
  const skillGaps = identifySkillGaps(jobKeywords, resumeData.skills)
  
  // Experience alignment
  const experienceAlignment = analyzeExperienceAlignment(jobDescription, resumeData.experience)
  
  return {
    matchScore,
    matchingKeywords,
    missingKeywords,
    skillGaps,
    experienceAlignment,
    suggestions,
    totalJobKeywords: jobKeywords.length,
    totalResumeKeywords: resumeKeywords.length
  }
}

/**
 * Get all text from resume data
 */
function getResumeText(resumeData) {
  const parts = [
    resumeData.personalInfo?.summary || '',
    ...resumeData.skills,
    ...(resumeData.experience || []).map(e => `${e.role} ${e.company} ${e.description}`),
    ...(resumeData.education || []).map(e => `${e.degree} ${e.institute}`),
    ...(resumeData.projects || []).map(p => `${p.title} ${p.description} ${p.techStack}`),
    ...(resumeData.certifications || []).map(c => c.name || ''),
  ]
  return parts.join(' ')
}

/**
 * Identify skill gaps
 */
function identifySkillGaps(jobKeywords, resumeSkills) {
  const normalizedSkills = resumeSkills.map(s => s.toLowerCase())
  const skillKeywords = jobKeywords.filter(kw => 
    Object.values(SKILL_CATEGORIES).flat().includes(kw.toLowerCase())
  )
  
  return skillKeywords.filter(skill => 
    !normalizedSkills.some(rs => rs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(rs))
  )
}

/**
 * Analyze experience alignment
 */
function analyzeExperienceAlignment(jobDescription, experience) {
  const normalized = jobDescription.toLowerCase()
  const alignment = {
    roleMatch: false,
    industryMatch: false,
    yearsMatch: false,
    suggestions: []
  }
  
  // Check for years requirement
  const yearsMatch = normalized.match(/(\d+)\+?\s*years?/i)
  if (yearsMatch) {
    const requiredYears = parseInt(yearsMatch[1])
    const totalExperienceYears = calculateTotalExperience(experience)
    alignment.yearsMatch = totalExperienceYears >= requiredYears
    if (!alignment.yearsMatch) {
      alignment.suggestions.push(`Job requires ${requiredYears}+ years experience. Consider highlighting relevant experience or side projects.`)
    }
  }
  
  // Check role alignment
  const roleKeywords = ['developer', 'engineer', 'designer', 'manager', 'analyst', 'specialist', 'consultant', 'architect']
  const jobRoles = roleKeywords.filter(r => normalized.includes(r))
  const expRoles = experience.map(e => e.role?.toLowerCase() || '')
  
  alignment.roleMatch = jobRoles.some(role => 
    expRoles.some(expRole => expRole.includes(role))
  )
  
  return alignment
}

/**
 * Calculate total years of experience
 */
function calculateTotalExperience(experience) {
  if (!experience || experience.length === 0) return 0
  
  let totalMonths = 0
  experience.forEach(exp => {
    if (exp.startDate) {
      const start = new Date(exp.startDate)
      const end = exp.current ? new Date() : (exp.endDate ? new Date(exp.endDate) : new Date())
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      totalMonths += Math.max(0, months)
    }
  })
  
  return Math.round(totalMonths / 12)
}

/**
 * Generate improvement suggestions
 */
function generateSuggestions(missingKeywords, jobDescription, resumeData) {
  const suggestions = []
  
  // Missing skills suggestions
  const missingSkills = missingKeywords.filter(kw =>
    Object.values(SKILL_CATEGORIES).flat().some(s => s.toLowerCase() === kw.toLowerCase())
  )
  
  if (missingSkills.length > 0) {
    suggestions.push({
      type: 'skills',
      priority: 'high',
      title: 'Add Missing Skills',
      message: `Consider adding these skills to your resume: ${missingSkills.slice(0, 5).join(', ')}`,
      keywords: missingSkills
    })
  }
  
  // Summary optimization
  if (!resumeData.personalInfo?.summary || resumeData.personalInfo.summary.length < 100) {
    suggestions.push({
      type: 'summary',
      priority: 'medium',
      title: 'Enhance Your Summary',
      message: 'Write a compelling professional summary that includes key terms from the job description.'
    })
  }
  
  // Experience bullets
  const hasDetailedBullets = resumeData.experience?.some(exp => 
    exp.description && exp.description.includes('•') && exp.description.split('•').length >= 3
  )
  
  if (!hasDetailedBullets) {
    suggestions.push({
      type: 'experience',
      priority: 'medium',
      title: 'Add Achievement Bullets',
      message: 'Use 3-5 bullet points per role highlighting achievements with quantifiable results.'
    })
  }
  
  // Quantifiable achievements
  const hasNumbers = resumeData.experience?.some(exp => 
    exp.description && /\d+%|\d+\+|\$\d+/.test(exp.description)
  )
  
  if (!hasNumbers) {
    suggestions.push({
      type: 'metrics',
      priority: 'high',
      title: 'Add Quantifiable Results',
      message: 'Include metrics and numbers (e.g., "Increased sales by 25%", "Managed team of 10").'
    })
  }
  
  return suggestions
}

/**
 * Generate optimized keywords for resume
 */
export function generateOptimizedKeywords(jobDescription, currentSkills) {
  const jobKeywords = extractKeywords(jobDescription)
  const currentLower = currentSkills.map(s => s.toLowerCase())
  
  // Find keywords to add
  const toAdd = jobKeywords.filter(kw => 
    !currentLower.some(skill => skill.includes(kw.toLowerCase()))
  )
  
  // Prioritize technical skills
  const technicalSkills = toAdd.filter(kw =>
    Object.entries(SKILL_CATEGORIES)
      .filter(([cat]) => cat !== 'soft')
      .flatMap(([, skills]) => skills)
      .includes(kw.toLowerCase())
  )
  
  return {
    recommended: technicalSkills.slice(0, 10),
    optional: toAdd.filter(k => !technicalSkills.includes(k)).slice(0, 5)
  }
}
