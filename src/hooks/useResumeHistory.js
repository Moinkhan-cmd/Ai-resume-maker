import { useState, useCallback, useEffect } from 'react'

/**
 * Custom hook for managing resume version history with undo/redo
 * @param {object} initialData - Initial resume data
 * @param {function} setResumeData - Function to update resume data
 * @param {number} maxHistory - Maximum number of history states to keep
 * @returns {object} - History management functions
 */
export function useResumeHistory(resumeData, setResumeData, maxHistory = 50) {
  const [history, setHistory] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isUndoRedo, setIsUndoRedo] = useState(false)

  // Save state to history when resumeData changes
  useEffect(() => {
    // Skip if this change was from undo/redo
    if (isUndoRedo) {
      setIsUndoRedo(false)
      return
    }

    // Don't save if resumeData is the same as current history state
    if (currentIndex >= 0 && history[currentIndex]) {
      const current = JSON.stringify(history[currentIndex])
      const newData = JSON.stringify(resumeData)
      if (current === newData) return
    }

    // Add to history, removing any future states if we're not at the end
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1)
      newHistory.push(JSON.parse(JSON.stringify(resumeData)))
      
      // Keep only last maxHistory states
      if (newHistory.length > maxHistory) {
        return newHistory.slice(-maxHistory)
      }
      return newHistory
    })
    
    setCurrentIndex(prev => Math.min(prev + 1, maxHistory - 1))
  }, [resumeData])

  // Undo function
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setIsUndoRedo(true)
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setResumeData(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }, [currentIndex, history, setResumeData])

  // Redo function
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setIsUndoRedo(true)
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setResumeData(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }, [currentIndex, history, setResumeData])

  // Check if undo/redo is available
  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  // Get version info
  const getVersionInfo = useCallback(() => {
    return {
      currentVersion: currentIndex + 1,
      totalVersions: history.length,
      versions: history.map((state, index) => ({
        index,
        timestamp: new Date().toISOString(),
        summary: `Version ${index + 1}`,
        isCurrent: index === currentIndex
      }))
    }
  }, [history, currentIndex])

  // Restore to specific version
  const restoreVersion = useCallback((index) => {
    if (index >= 0 && index < history.length) {
      setIsUndoRedo(true)
      setCurrentIndex(index)
      setResumeData(JSON.parse(JSON.stringify(history[index])))
    }
  }, [history, setResumeData])

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([JSON.parse(JSON.stringify(resumeData))])
    setCurrentIndex(0)
  }, [resumeData])

  return {
    undo,
    redo,
    canUndo,
    canRedo,
    getVersionInfo,
    restoreVersion,
    clearHistory,
    historyLength: history.length
  }
}

/**
 * Custom hook for saved resume versions (snapshots)
 * @returns {object} - Version management functions
 */
export function useSavedVersions() {
  const [savedVersions, setSavedVersions] = useState(() => {
    const saved = localStorage.getItem('resumeVersions')
    return saved ? JSON.parse(saved) : []
  })

  // Save versions to localStorage
  useEffect(() => {
    localStorage.setItem('resumeVersions', JSON.stringify(savedVersions))
  }, [savedVersions])

  // Save a new version
  const saveVersion = useCallback((resumeData, name = '') => {
    const version = {
      id: Date.now(),
      name: name || `Version ${savedVersions.length + 1}`,
      timestamp: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(resumeData))
    }
    setSavedVersions(prev => [...prev, version])
    return version.id
  }, [savedVersions.length])

  // Load a saved version
  const loadVersion = useCallback((id) => {
    const version = savedVersions.find(v => v.id === id)
    return version ? JSON.parse(JSON.stringify(version.data)) : null
  }, [savedVersions])

  // Delete a saved version
  const deleteVersion = useCallback((id) => {
    setSavedVersions(prev => prev.filter(v => v.id !== id))
  }, [])

  // Rename a version
  const renameVersion = useCallback((id, newName) => {
    setSavedVersions(prev => prev.map(v => 
      v.id === id ? { ...v, name: newName } : v
    ))
  }, [])

  // Get all saved versions
  const getVersions = useCallback(() => {
    return savedVersions.map(v => ({
      id: v.id,
      name: v.name,
      timestamp: v.timestamp,
      preview: {
        name: v.data.personalInfo?.fullName || 'Unnamed',
        skills: v.data.skills?.length || 0,
        experience: v.data.experience?.length || 0
      }
    }))
  }, [savedVersions])

  // Export version to file
  const exportVersion = useCallback((id) => {
    const version = savedVersions.find(v => v.id === id)
    if (version) {
      const blob = new Blob([JSON.stringify(version.data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${version.name.replace(/\s+/g, '-').toLowerCase()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }, [savedVersions])

  // Compare two versions
  const compareVersions = useCallback((id1, id2) => {
    const v1 = savedVersions.find(v => v.id === id1)
    const v2 = savedVersions.find(v => v.id === id2)
    
    if (!v1 || !v2) return null
    
    const differences = {
      personalInfo: {},
      skills: { added: [], removed: [] },
      experience: { added: 0, removed: 0 },
      education: { added: 0, removed: 0 }
    }
    
    // Compare personal info
    Object.keys(v1.data.personalInfo).forEach(key => {
      if (v1.data.personalInfo[key] !== v2.data.personalInfo[key]) {
        differences.personalInfo[key] = {
          old: v1.data.personalInfo[key],
          new: v2.data.personalInfo[key]
        }
      }
    })
    
    // Compare skills
    const skills1 = new Set(v1.data.skills)
    const skills2 = new Set(v2.data.skills)
    differences.skills.added = [...skills2].filter(s => !skills1.has(s))
    differences.skills.removed = [...skills1].filter(s => !skills2.has(s))
    
    // Compare counts
    differences.experience.added = Math.max(0, v2.data.experience.length - v1.data.experience.length)
    differences.experience.removed = Math.max(0, v1.data.experience.length - v2.data.experience.length)
    differences.education.added = Math.max(0, v2.data.education.length - v1.data.education.length)
    differences.education.removed = Math.max(0, v1.data.education.length - v2.data.education.length)
    
    return differences
  }, [savedVersions])

  return {
    savedVersions: getVersions(),
    saveVersion,
    loadVersion,
    deleteVersion,
    renameVersion,
    exportVersion,
    compareVersions,
    totalVersions: savedVersions.length
  }
}
