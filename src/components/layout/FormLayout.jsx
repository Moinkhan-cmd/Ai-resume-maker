/**
 * Layout wrapper for form sections
 * @param {string} title - Section title
 * @param {React.ReactNode} children - Form content
 */
export default function FormLayout({ title, children }) {
  return (
    <div className="section-card">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
        {title}
      </h2>
      {children}
    </div>
  )
}


