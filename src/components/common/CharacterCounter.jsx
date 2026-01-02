/**
 * Character counter component for text areas
 * @param {number} current - Current character count
 * @param {number} max - Maximum allowed characters
 */
export default function CharacterCounter({ current, max }) {
  const percentage = (current / max) * 100
  let colorClass = 'text-gray-500'

  if (percentage >= 90) {
    colorClass = 'text-red-500'
  } else if (percentage >= 70) {
    colorClass = 'text-yellow-500'
  } else {
    colorClass = 'text-green-500'
  }

  return (
    <div className={`text-sm ${colorClass} mt-1`}>
      {current} / {max} characters
    </div>
  )
}


