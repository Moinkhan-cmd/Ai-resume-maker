import { formatDate } from '../../utils/resumeHelpers'

/**
 * Template 3: Creative Modern
 * Bold header with card-based sections
 */
export default function Template3({ resumeData }) {
  const { personalInfo, skills, experience, education, projects } = resumeData

  return (
    <div className="bg-gray-50 text-gray-900 p-8 max-w-4xl mx-auto print:bg-white print:p-6 print:max-w-full">
      {/* Bold Header */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8 rounded-lg mb-8 print:rounded-none print:p-6">
        <h1 className="text-5xl font-bold mb-3 print:text-4xl">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-6 text-primary-100">
          {personalInfo.email && (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary Card */}
      {personalInfo.summary && (
        <section className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none print:border print:border-gray-200">
          <h2 className="text-2xl font-bold text-primary-600 mb-3 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary-600 rounded"></span>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Skills Card */}
      {skills.length > 0 && (
        <section className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none print:border print:border-gray-200">
          <h2 className="text-2xl font-bold text-primary-600 mb-4 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary-600 rounded"></span>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience Card */}
      {experience.length > 0 && (
        <section className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none print:border print:border-gray-200">
          <h2 className="text-2xl font-bold text-primary-600 mb-4 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary-600 rounded"></span>
            Work Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-primary-400 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">
                      {exp.role}
                    </h3>
                    <p className="text-primary-600 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-gray-600 text-sm font-medium whitespace-nowrap bg-gray-100 px-3 py-1 rounded">
                    {formatDate(exp.startDate)}
                    {exp.startDate && ' - '}
                    {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-gray-700 mt-2 whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Card */}
      {education.length > 0 && (
        <section className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none print:border print:border-gray-200">
          <h2 className="text-2xl font-bold text-primary-600 mb-4 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary-600 rounded"></span>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 border-primary-400 pl-4">
                <h3 className="font-bold text-lg text-gray-900">{edu.degree}</h3>
                <p className="text-primary-600 font-medium">
                  {edu.institute}
                  {edu.year && ` • ${edu.year}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Card */}
      {projects.length > 0 && (
        <section className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none print:border print:border-gray-200">
          <h2 className="text-2xl font-bold text-primary-600 mb-4 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary-600 rounded"></span>
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj, index) => (
              <div key={index} className="border-l-4 border-primary-400 pl-4">
                <h3 className="font-bold text-lg text-gray-900">{proj.title}</h3>
                {proj.techStack && (
                  <p className="text-sm text-primary-600 mb-2 font-medium">
                    Tech: {proj.techStack}
                  </p>
                )}
                {proj.description && (
                  <p className="text-gray-700 mt-1">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}


