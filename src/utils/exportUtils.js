/**
 * Export resume data as JSON
 * @param {object} resumeData - Resume data object
 * @param {string} filename - Output filename
 */
export function exportToJSON(resumeData, filename = 'resume-data.json') {
  const dataStr = JSON.stringify(resumeData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

/**
 * Export resume data as plain text
 * @param {object} resumeData - Resume data object
 * @param {string} filename - Output filename
 */
export function exportToTXT(resumeData, filename = 'resume.txt') {
  let text = `RESUME\n`
  text += `=${'='.repeat(50)}\n\n`
  
  // Personal Info
  text += `PERSONAL INFORMATION\n`
  text += `-${'-'.repeat(49)}\n`
  text += `Name: ${resumeData.personalInfo.fullName || 'N/A'}\n`
  text += `Email: ${resumeData.personalInfo.email || 'N/A'}\n`
  text += `Phone: ${resumeData.personalInfo.phone || 'N/A'}\n`
  text += `Location: ${resumeData.personalInfo.location || 'N/A'}\n\n`
  
  if (resumeData.personalInfo.summary) {
    text += `PROFESSIONAL SUMMARY\n`
    text += `-${'-'.repeat(49)}\n`
    text += `${resumeData.personalInfo.summary}\n\n`
  }
  
  // Skills
  if (resumeData.skills.length > 0) {
    text += `SKILLS\n`
    text += `-${'-'.repeat(49)}\n`
    text += `${resumeData.skills.join(', ')}\n\n`
  }
  
  // Experience
  if (resumeData.experience.length > 0) {
    text += `WORK EXPERIENCE\n`
    text += `-${'-'.repeat(49)}\n`
    resumeData.experience.forEach((exp, index) => {
      text += `${index + 1}. ${exp.role || 'N/A'} at ${exp.company || 'N/A'}\n`
      if (exp.description) {
        text += `   ${exp.description.replace(/\n/g, '\n   ')}\n`
      }
      text += `\n`
    })
  }
  
  // Education
  if (resumeData.education.length > 0) {
    text += `EDUCATION\n`
    text += `-${'-'.repeat(49)}\n`
    resumeData.education.forEach(edu => {
      text += `${edu.degree || 'N/A'} - ${edu.institute || 'N/A'}`
      if (edu.year) text += ` (${edu.year})`
      text += `\n`
    })
    text += `\n`
  }
  
  // Projects
  if (resumeData.projects.length > 0) {
    text += `PROJECTS\n`
    text += `-${'-'.repeat(49)}\n`
    resumeData.projects.forEach(proj => {
      text += `${proj.title || 'N/A'}\n`
      if (proj.description) {
        text += `${proj.description}\n`
      }
      text += `\n`
    })
  }
  
  const dataBlob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

/**
 * Copy resume data to clipboard as JSON
 * @param {object} resumeData - Resume data object
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(resumeData) {
  try {
    const dataStr = JSON.stringify(resumeData, null, 2)
    await navigator.clipboard.writeText(dataStr)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

/**
 * Generate shareable link (base64 encoded)
 * @param {object} resumeData - Resume data object
 * @returns {string} - Shareable URL
 */
export function generateShareLink(resumeData) {
  const dataStr = JSON.stringify(resumeData)
  const encoded = btoa(encodeURIComponent(dataStr))
  return `${window.location.origin}${window.location.pathname}?data=${encoded}`
}

/**
 * Load resume data from shareable link
 * @param {string} encodedData - Base64 encoded data
 * @returns {object|null} - Resume data or null if invalid
 */
export function loadFromShareLink(encodedData) {
  try {
    const decoded = decodeURIComponent(atob(encodedData))
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Failed to load from share link:', error)
    return null
  }
}


