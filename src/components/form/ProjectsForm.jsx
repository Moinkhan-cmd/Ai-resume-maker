import FormLayout from '../layout/FormLayout'

/**
 * Projects form component with multiple entries
 * @param {Array} projects - Projects array
 * @param {function} addProject - Function to add project
 * @param {function} updateProject - Function to update project
 * @param {function} removeProject - Function to remove project
 */
export default function ProjectsForm({
  projects,
  addProject,
  updateProject,
  removeProject
}) {
  return (
    <FormLayout title="Projects">
      <div className="space-y-6">
        {projects.map((proj, index) => (
          <div
            key={proj.id || index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Project #{index + 1}
              </h3>
              {projects.length > 1 && (
                <button
                  onClick={() => removeProject(index)}
                  className="text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 py-1.5 px-3 rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Project Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  placeholder="E-Commerce Platform"
                  className="input-field"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  placeholder="Describe the project, your role, key features, and achievements..."
                  rows={4}
                  className="input-field resize-none"
                  required
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tech Stack
                </label>
                <input
                  type="text"
                  value={proj.techStack}
                  onChange={(e) => updateProject(index, 'techStack', e.target.value)}
                  placeholder="React, Node.js, MongoDB, AWS (comma-separated)"
                  className="input-field"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Separate technologies with commas
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Add Project Button */}
        <button
          onClick={addProject}
          className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Another Project
        </button>
      </div>
    </FormLayout>
  )
}


