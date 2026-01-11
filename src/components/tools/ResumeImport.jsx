import { useState, useRef } from 'react'

/**
 * Resume Import Component
 * Allows importing resume data from JSON files
 */
export default function ResumeImport({ onImport }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const processFile = (file) => {
    setError('')
    setSuccess(false)

    // Validate file type
    if (!file.name.endsWith('.json')) {
      setError('Please upload a JSON file')
      return
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setError('File size must be less than 1MB')
      return
    }

    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        // Validate resume structure
        if (!validateResumeData(data)) {
          setError('Invalid resume format. Please use a valid resume JSON file.')
          return
        }

        // Merge with default structure to ensure all fields exist
        const mergedData = mergeWithDefaults(data)
        
        if (onImport) {
          onImport(mergedData)
          setSuccess(true)
          setTimeout(() => setSuccess(false), 3000)
        }
      } catch (err) {
        setError('Failed to parse JSON file. Please check the file format.')
      }
    }

    reader.onerror = () => {
      setError('Failed to read file. Please try again.')
    }

    reader.readAsText(file)
  }

  const validateResumeData = (data) => {
    // Check for essential structure
    if (typeof data !== 'object' || data === null) return false
    
    // Must have at least personalInfo or any other main section
    const hasValidStructure = 
      data.personalInfo || 
      data.skills || 
      data.experience || 
      data.education

    return hasValidStructure
  }

  const mergeWithDefaults = (data) => {
    const defaults = {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        website: '',
        linkedin: '',
        github: '',
        twitter: ''
      },
      skills: [],
      experience: [],
      education: [],
      projects: [],
      languages: [],
      certifications: [],
      awards: [],
      references: [],
      selectedTemplate: 1
    }

    return {
      ...defaults,
      ...data,
      personalInfo: {
        ...defaults.personalInfo,
        ...(data.personalInfo || {})
      }
    }
  }

  return (
    <div className="section-card">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Import Resume
      </h2>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <svg
          className={`w-12 h-12 mx-auto mb-4 ${
            isDragging ? 'text-primary-600' : 'text-gray-400'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          {isDragging ? 'Drop your file here' : 'Drag & drop your resume JSON file'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          or click to browse
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Supports JSON files exported from this app
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-400">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">Resume imported successfully!</span>
        </div>
      )}

      {/* Tips */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Tips for importing:
        </h4>
        <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
          <li>• Export your resume as JSON from the header menu first</li>
          <li>• Imported data will replace your current resume</li>
          <li>• Make sure to save a version before importing</li>
        </ul>
      </div>
    </div>
  )
}
