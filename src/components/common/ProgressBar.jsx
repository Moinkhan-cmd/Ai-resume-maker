import { calculateProgress } from '../../utils/resumeHelpers'

/**
 * Progress bar component showing resume completion percentage
 * @param {object} resumeData - Resume data object
 */
export default function ProgressBar({ resumeData }) {
  const progress = calculateProgress(resumeData)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Resume Completion
        </span>
        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}


