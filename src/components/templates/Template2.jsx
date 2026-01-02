import { formatDate } from '../../utils/resumeHelpers'

/**
 * Template 2: Two-Column Classic
 * Left sidebar for contact/skills, right column for experience/education
 */
export default function Template2({ resumeData }) {
  const { personalInfo, skills, experience, education, projects } = resumeData

  return (
    <div className="bg-white text-gray-900 max-w-5xl mx-auto print:max-w-full">
      {/* Header with colored background */}
      <header className="bg-primary-600 text-white p-6 print:p-4">
        <h1 className="text-4xl font-bold mb-2 print:text-3xl">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.summary && (
          <p className="text-primary-100 text-sm leading-relaxed">
            {personalInfo.summary}
          </p>
        )}
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <aside className="bg-gray-100 p-6 w-full md:w-1/3 print:w-1/3 print:p-4">
          {/* Contact Info */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Contact
            </h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>
                  <p className="text-gray-600 break-all">{personalInfo.email}</p>
                </div>
              )}
              {personalInfo.phone && (
                <div>
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <p className="text-gray-600">{personalInfo.phone}</p>
                </div>
              )}
              {personalInfo.location && (
                <div>
                  <span className="font-semibold text-gray-700">Location:</span>
                  <p className="text-gray-600">{personalInfo.location}</p>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Skills
              </h2>
              <ul className="space-y-1">
                {skills.map((skill, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right Column */}
        <main className="flex-1 p-6 print:p-4">
          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-primary-600 mb-4 uppercase tracking-wide border-b-2 border-primary-600 pb-1">
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {exp.role}
                        </h3>
                        <p className="text-primary-600 font-medium">
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
              <h2 className="text-xl font-bold text-primary-600 mb-4 uppercase tracking-wide border-b-2 border-primary-600 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-primary-600">
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
              <h2 className="text-xl font-bold text-primary-600 mb-4 uppercase tracking-wide border-b-2 border-primary-600 pb-1">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-bold text-gray-900">{proj.title}</h3>
                    {proj.techStack && (
                      <p className="text-sm text-primary-600 mb-1 italic">
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


