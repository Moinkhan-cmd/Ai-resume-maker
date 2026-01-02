import { formatDate } from '../../utils/resumeHelpers'

/**
 * Template 6: Minimalist Clean
 * Ultra-minimal design with focus on content
 */
export default function Template6({ resumeData }) {
  const { personalInfo, skills, experience, education, projects } = resumeData

  return (
    <div className="bg-white text-gray-900 p-10 max-w-3xl mx-auto print:p-8 print:max-w-full">
      {/* Minimal Header */}
      <header className="mb-10 text-center print:mb-6">
        <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight print:text-4xl">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-10 print:mb-6">
          <p className="text-gray-700 leading-relaxed text-center italic">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-10 print:mb-6">
          <h2 className="text-2xl font-light text-gray-900 mb-6 uppercase tracking-wider print:text-xl print:mb-4">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-normal text-gray-900">
                      {exp.role}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm whitespace-nowrap">
                    {formatDate(exp.startDate)}
                    {exp.startDate && ' — '}
                    {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-gray-700 mt-3 text-sm leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills and Education Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 print:mb-6 print:gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4 uppercase tracking-wider print:text-xl print:mb-3">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="text-gray-700 text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4 uppercase tracking-wider print:text-xl print:mb-3">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-gray-900 font-normal">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">
                    {edu.institute}
                    {edu.year && `, ${edu.year}`}
                    {edu.gpa && ` • ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-10 print:mb-6">
          <h2 className="text-2xl font-light text-gray-900 mb-6 uppercase tracking-wider print:text-xl print:mb-4">
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((proj, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-6">
                <h3 className="text-lg font-normal text-gray-900 mb-1">
                  {proj.title}
                </h3>
                {proj.techStack && (
                  <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">
                    {proj.techStack}
                  </p>
                )}
                {proj.description && (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}


