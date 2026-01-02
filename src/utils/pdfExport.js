import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * Export resume preview as PDF
 * @param {string} elementId - ID of the element to export
 * @param {string} filename - Output filename
 * @returns {Promise<void>}
 */
export async function exportToPDF(elementId, filename = 'resume.pdf') {
  const element = document.getElementById(elementId)
  
  if (!element) {
    throw new Error('Resume preview element not found')
  }

  try {
    // Show loading state (you can add a toast notification here)
    const loadingToast = showLoadingToast('Generating PDF...')

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    })

    const imgData = canvas.toDataURL('image/png')
    
    // Calculate PDF dimensions (A4 size)
    const pdfWidth = 210 // A4 width in mm
    const pdfHeight = 297 // A4 height in mm
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgScaledWidth = imgWidth * ratio
    const imgScaledHeight = imgHeight * ratio

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    // Calculate centering
    const xOffset = (pdfWidth - imgScaledWidth) / 2
    const yOffset = 0

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgScaledWidth, imgScaledHeight)

    // Handle multi-page if content is too long
    const pageHeight = pdf.internal.pageSize.height
    let heightLeft = imgScaledHeight
    let position = 0

    while (heightLeft > 0) {
      position = heightLeft - pageHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', xOffset, position, imgScaledWidth, imgScaledHeight)
      heightLeft -= pageHeight
    }

    // Save PDF
    pdf.save(filename)
    
    // Hide loading toast
    hideLoadingToast(loadingToast)
    
    // Show success message
    showSuccessToast('PDF downloaded successfully!')
  } catch (error) {
    console.error('Error generating PDF:', error)
    showErrorToast('Failed to generate PDF. Please try again.')
    throw error
  }
}

/**
 * Simple toast notification helpers
 */
function showLoadingToast(message) {
  const toast = document.createElement('div')
  toast.id = 'pdf-loading-toast'
  toast.className = 'fixed top-4 right-4 bg-primary-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2'
  toast.innerHTML = `
    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    <span>${message}</span>
  `
  document.body.appendChild(toast)
  return toast
}

function hideLoadingToast(toast) {
  if (toast && toast.parentNode) {
    toast.parentNode.removeChild(toast)
  }
}

function showSuccessToast(message) {
  const toast = document.createElement('div')
  toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, 3000)
}

function showErrorToast(message) {
  const toast = document.createElement('div')
  toast.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, 3000)
}



