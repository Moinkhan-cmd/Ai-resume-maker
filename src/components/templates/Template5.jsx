import { formatDate } from '../../utils/resumeHelpers'

/**
 * Template 5: Modern with Color Accents
 * Bold design with color highlights
 */
export default function Template5({ resumeData }) {
  const { personalInfo, skills, experience, education, projects } = resumeData

  return (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto print:p-6 print:max-w-full">
      {/* Colorful Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-t-lg mb-6 print:rounded-none print:p-6">
        <h1 className="text-5xl font-bold mb-3 print:text-4xl">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-blue-100">
          {personalInfo.email && (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-3 border-b-2 border-purple-600 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-pink-600 mb-3 border-b-2 border-pink-600 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="p-3 bg-pink-50 rounded">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm">
                      {edu.institute}
                      {edu.year && ` • ${edu.year}`}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded border-l-4 border-blue-600">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {exp.role}
                        </h3>
                        <p className="text-blue-600 font-medium">
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

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-3 border-b-2 border-purple-600 pb-1">
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded">
                    <h3 className="font-bold text-gray-900">{proj.title}</h3>
                    {proj.techStack && (
                      <p className="text-sm text-purple-600 mb-1">
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
        </div>
      </div>
    </div>
  )
}


