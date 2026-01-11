import { useState, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

/**
 * Custom hook for managing resume data
 * @returns {object} - Resume data and update functions
 */
export function useResumeData() {
  const [resumeData, setResumeData] = useLocalStorage('resumeData', {
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
    experience: [{
      id: Date.now(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    education: [{
      id: Date.now(),
      degree: '',
      institute: '',
      year: '',
      gpa: ''
    }],
    projects: [{
      id: Date.now(),
      title: '',
      description: '',
      techStack: '',
      link: ''
    }],
    languages: [],
    certifications: [],
    awards: [],
    references: [],
    selectedTemplate: 1
  })

  // Update personal info
  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }, [setResumeData])

  // Skills management
  const addSkill = useCallback((skill) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }))
    }
  }, [resumeData.skills, setResumeData])

  const removeSkill = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }, [setResumeData])

  // Experience management
  const addExperience = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }))
  }, [setResumeData])

  const updateExperience = useCallback((index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }, [setResumeData])

  const removeExperience = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }))
  }, [setResumeData])

  // Education management
  const addEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: '',
          institute: '',
          year: '',
          gpa: ''
        }
      ]
    }))
  }, [setResumeData])

  const updateEducation = useCallback((index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }))
  }, [setResumeData])

  const removeEducation = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }, [setResumeData])

  // Projects management
  const addProject = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          title: '',
          description: '',
          techStack: ''
        }
      ]
    }))
  }, [setResumeData])

  const updateProject = useCallback((index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      )
    }))
  }, [setResumeData])

  const removeProject = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }, [setResumeData])

  // Template selection
  const setTemplate = useCallback((templateId) => {
    setResumeData(prev => ({
      ...prev,
      selectedTemplate: templateId
    }))
  }, [setResumeData])

  // Languages management
  const addLanguage = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: Date.now(),
          name: '',
          proficiency: 'Native'
        }
      ]
    }))
  }, [setResumeData])

  const updateLanguage = useCallback((index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) =>
        i === index ? { ...lang, [field]: value } : lang
      )
    }))
  }, [setResumeData])

  const removeLanguage = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }))
  }, [setResumeData])

  // Certifications management
  const addCertification = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: Date.now(),
          name: '',
          issuer: '',
          date: '',
          link: ''
        }
      ]
    }))
  }, [setResumeData])

  const updateCertification = useCallback((index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      )
    }))
  }, [setResumeData])

  const removeCertification = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }))
  }, [setResumeData])

  // Awards management
  const addAward = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      awards: [
        ...prev.awards,
        {
          id: Date.now(),
          title: '',
          issuer: '',
          date: '',
          description: ''
        }
      ]
    }))
  }, [setResumeData])

  const updateAward = useCallback((index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.map((award, i) =>
        i === index ? { ...award, [field]: value } : award
      )
    }))
  }, [setResumeData])

  const removeAward = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.filter((_, i) => i !== index)
    }))
  }, [setResumeData])

  // References management
  const addReference = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      references: [
        ...prev.references,
        {
          id: Date.now(),
          name: '',
          position: '',
          company: '',
          email: '',
          phone: ''
        }
      ]
    }))
  }, [setResumeData])

  const updateReference = useCallback((index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) =>
        i === index ? { ...ref, [field]: value } : ref
      )
    }))
  }, [setResumeData])

  const removeReference = useCallback((index) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }))
  }, [setResumeData])

  // Clear all data
  const clearResumeData = useCallback(() => {
    setResumeData({
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
    })
  }, [setResumeData])

  // Import resume data from external source
  const importResumeData = useCallback((data) => {
    setResumeData(data)
  }, [setResumeData])

  return {
    resumeData,
    updatePersonalInfo,
    addSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addCertification,
    updateCertification,
    removeCertification,
    addAward,
    updateAward,
    removeAward,
    addReference,
    updateReference,
    removeReference,
    setTemplate,
    clearResumeData,
    importResumeData
  }
}

