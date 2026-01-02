import { formatDate } from '../../utils/resumeHelpers'

/**
 * Template 4: Professional with Sidebar
 * Clean sidebar layout with professional styling
 */
export default function Template4({ resumeData }) {
  const { personalInfo, skills, experience, education, projects } = resumeData

  return (
    <div className="bg-white text-gray-900 max-w-5xl mx-auto print:max-w-full">
      {/* Header Section */}
      <header className="bg-gray-800 text-white p-8 print:p-6">
        <h1 className="text-4xl font-bold mb-2 print:text-3xl">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <aside className="bg-gray-50 p-6 w-full md:w-2/5 print:w-2/5 print:p-4 border-r border-gray-200">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-800 pb-1">
                Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-800 pb-1">
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    • {skill}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 p-6 print:p-4">
          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-800 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {exp.role}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-gray-600 text-sm whitespace-nowrap">
                        {formatDate(exp.startDate)}
                        {exp.startDate && ' - '}
                        {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <div className="text-gray-700 mt-2 text-sm whitespace-pre-line">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-800 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">
                      {edu.institute}
                      {edu.year && ` • ${edu.year}`}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-800 pb-1">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-bold text-gray-900">{proj.title}</h3>
                    {proj.techStack && (
                      <p className="text-sm text-gray-600 mb-1 italic">
                        {proj.techStack}
                      </p>
                    )}
                    {proj.description && (
                      <p className="text-gray-700 mt-1 text-sm">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}


