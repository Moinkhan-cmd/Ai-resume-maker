import Template1 from '../templates/Template1.jsx'
import Template2 from '../templates/Template2.jsx'
import Template3 from '../templates/Template3.jsx'
import Template4 from '../templates/Template4.jsx'
import Template5 from '../templates/Template5.jsx'
import Template6 from '../templates/Template6.jsx'

/**
 * Resume preview component with template switching
 * @param {object} resumeData - Complete resume data
 */
export default function ResumePreview({ resumeData }) {
  const renderTemplate = () => {
    switch (resumeData.selectedTemplate) {
      case 1:
        return <Template1 resumeData={resumeData} />
      case 2:
        return <Template2 resumeData={resumeData} />
      case 3:
        return <Template3 resumeData={resumeData} />
      case 4:
        return <Template4 resumeData={resumeData} />
      case 5:
        return <Template5 resumeData={resumeData} />
      case 6:
        return <Template6 resumeData={resumeData} />
      default:
        return <Template1 resumeData={resumeData} />
    }
  }

  return (
    <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto bg-gray-100 dark:bg-gray-900 p-2 sm:p-4 print:h-auto print:overflow-visible print:bg-white">
      <div
        id="resume-preview"
        className="bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none"
      >
        {renderTemplate()}
      </div>
    </div>
  )
}

