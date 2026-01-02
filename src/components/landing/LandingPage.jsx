/**
 * Landing page component with hero section and features
 * @param {function} scrollToForm - Function to scroll to form section
 */
export default function LandingPage({ scrollToForm }) {
  const features = [
    {
      icon: '✨',
      title: 'AI-Powered Enhancement',
      description: 'Let AI improve your resume summary, optimize skills for ATS, and enhance experience descriptions.'
    },
    {
      icon: '📄',
      title: 'Multiple Templates',
      description: 'Choose from 3 professional resume templates designed to pass ATS systems and impress recruiters.'
    },
    {
      icon: '👁️',
      title: 'Live Preview',
      description: 'See your resume update in real-time as you type. No need to save or refresh.'
    },
    {
      icon: '💾',
      title: 'Auto-Save',
      description: 'Your progress is automatically saved locally. Never lose your work.'
    },
    {
      icon: '📥',
      title: 'PDF Export',
      description: 'Download your resume as a print-ready PDF with one click.'
    },
    {
      icon: '🌓',
      title: 'Dark Mode',
      description: 'Work comfortably with dark mode support for extended editing sessions.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Build Your Perfect Resume
            <span className="block text-primary-600 dark:text-primary-400 mt-2">
              Powered by AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes in minutes. Enhance your content with AI,
            choose from beautiful templates, and download as PDF.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
            >
              Start Building
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            <button
              onClick={scrollToForm}
              className="btn-secondary text-lg px-8 py-3"
            >
              View Templates
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-primary-600 dark:bg-primary-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Resume?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of job seekers who have created professional resumes with our builder.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  )
}


