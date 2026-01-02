/**
 * Calculate resume completion percentage
 * @param {object} resumeData - Resume data object
 * @returns {number} - Completion percentage (0-100)
 */
export function calculateProgress(resumeData) {
  let totalFields = 0
  let filledFields = 0

  // Personal Info (5 fields)
  const personalFields = ['fullName', 'email', 'phone', 'location', 'summary']
  personalFields.forEach(field => {
    totalFields++
    if (resumeData.personalInfo[field] && resumeData.personalInfo[field].trim()) {
      filledFields++
    }
  })

  // Skills (at least 3 skills)
  totalFields++
  if (resumeData.skills.length >= 3) {
    filledFields++
  }

  // Experience (at least 1 entry with all fields)
  totalFields++
  if (resumeData.experience.length > 0) {
    const exp = resumeData.experience[0]
    if (exp.company && exp.role && exp.description) {
      filledFields++
    }
  }

  // Education (at least 1 entry with all fields)
  totalFields++
  if (resumeData.education.length > 0) {
    const edu = resumeData.education[0]
    if (edu.degree && edu.institute && edu.year) {
      filledFields++
    }
  }

  // Projects (at least 1 entry with all fields)
  totalFields++
  if (resumeData.projects.length > 0) {
    const proj = resumeData.projects[0]
    if (proj.title && proj.description) {
      filledFields++
    }
  }

  return Math.round((filledFields / totalFields) * 100)
}

/**
 * Format date for display
 * @param {string} date - Date string (YYYY-MM)
 * @returns {string} - Formatted date (MMM YYYY)
 */
export function formatDate(date) {
  if (!date) return ''
  const [year, month] = date.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month) - 1]} ${year}`
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} - True if valid
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number
 * @returns {boolean} - True if valid
 */
export function validatePhone(phone) {
  const re = /^[\d\s\-\+\(\)]+$/
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10
}



