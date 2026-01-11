/**
 * Interview Preparation Utilities
 * Generate interview questions and tips based on resume content
 */

/**
 * Generate interview questions based on resume
 * @param {object} resumeData - Resume data object
 * @returns {object} - Questions organized by category
 */
export function generateInterviewQuestions(resumeData) {
  const { personalInfo, skills, experience, education, projects } = resumeData
  
  const questions = {
    behavioral: generateBehavioralQuestions(experience),
    technical: generateTechnicalQuestions(skills, projects),
    experience: generateExperienceQuestions(experience),
    situational: generateSituationalQuestions(experience),
    general: getGeneralQuestions()
  }
  
  return questions
}

/**
 * Generate behavioral interview questions
 */
function generateBehavioralQuestions(experience) {
  const baseQuestions = [
    {
      question: 'Tell me about a time when you had to deal with a difficult team member. How did you handle it?',
      tip: 'Use the STAR method (Situation, Task, Action, Result) to structure your answer.',
      category: 'Teamwork'
    },
    {
      question: 'Describe a situation where you had to meet a tight deadline. What did you do?',
      tip: 'Highlight your time management and prioritization skills.',
      category: 'Time Management'
    },
    {
      question: 'Tell me about a project you led. What challenges did you face?',
      tip: 'Focus on leadership decisions and outcomes.',
      category: 'Leadership'
    },
    {
      question: 'Describe a time when you made a mistake at work. How did you handle it?',
      tip: 'Show self-awareness and focus on what you learned.',
      category: 'Problem Solving'
    },
    {
      question: 'Tell me about a time you had to learn something new quickly.',
      tip: 'Demonstrate your adaptability and learning agility.',
      category: 'Adaptability'
    }
  ]
  
  // Add role-specific questions
  if (experience && experience.length > 0) {
    const latestRole = experience[0]?.role?.toLowerCase() || ''
    
    if (latestRole.includes('manager') || latestRole.includes('lead')) {
      baseQuestions.push({
        question: 'How do you motivate team members who are underperforming?',
        tip: 'Share specific strategies and past successes.',
        category: 'Management'
      })
    }
    
    if (latestRole.includes('developer') || latestRole.includes('engineer')) {
      baseQuestions.push({
        question: 'Tell me about a technical challenge you overcame. What was your approach?',
        tip: 'Walk through your problem-solving process step by step.',
        category: 'Technical Problem Solving'
      })
    }
  }
  
  return baseQuestions
}

/**
 * Generate technical interview questions based on skills
 */
function generateTechnicalQuestions(skills, projects) {
  const questions = []
  const skillsLower = skills.map(s => s.toLowerCase())
  
  // Programming language questions
  const langQuestions = {
    'javascript': [
      { question: 'Explain the difference between var, let, and const in JavaScript.', tip: 'Discuss scope, hoisting, and reassignment.' },
      { question: 'What are closures in JavaScript? Give an example.', tip: 'Explain lexical scope and practical use cases.' },
      { question: 'How does the event loop work in JavaScript?', tip: 'Cover call stack, callback queue, and microtasks.' }
    ],
    'typescript': [
      { question: 'What are the benefits of using TypeScript over JavaScript?', tip: 'Focus on type safety, tooling, and maintainability.' },
      { question: 'Explain generics in TypeScript with an example.', tip: 'Show how generics provide reusable type-safe code.' }
    ],
    'python': [
      { question: 'What is the difference between a list and a tuple in Python?', tip: 'Discuss mutability and use cases.' },
      { question: 'Explain decorators in Python.', tip: 'Describe how they modify function behavior.' }
    ],
    'react': [
      { question: 'What is the virtual DOM and how does it work?', tip: 'Explain diffing algorithm and performance benefits.' },
      { question: 'Explain the useEffect hook and its cleanup function.', tip: 'Discuss dependencies and when cleanup runs.' },
      { question: 'What are the differences between class and functional components?', tip: 'Cover hooks, lifecycle, and syntax.' }
    ],
    'node': [
      { question: 'What is the difference between process.nextTick() and setImmediate()?', tip: 'Explain event loop phases.' },
      { question: 'How do you handle errors in async/await?', tip: 'Discuss try-catch and error propagation.' }
    ],
    'sql': [
      { question: 'What is the difference between INNER JOIN and LEFT JOIN?', tip: 'Use examples with actual scenarios.' },
      { question: 'How would you optimize a slow SQL query?', tip: 'Discuss indexing, query plans, and normalization.' }
    ]
  }
  
  // Add relevant questions based on skills
  Object.entries(langQuestions).forEach(([skill, qs]) => {
    if (skillsLower.some(s => s.includes(skill))) {
      questions.push(...qs.map(q => ({ ...q, category: skill.toUpperCase() })))
    }
  })
  
  // Add project-based questions
  if (projects && projects.length > 0) {
    questions.push({
      question: `Tell me about your ${projects[0]?.title || 'main project'}. What was your role and what technologies did you use?`,
      tip: 'Be specific about your contributions and technical decisions.',
      category: 'Projects'
    })
  }
  
  // Add general technical questions
  questions.push(
    { question: 'How do you approach debugging a complex issue?', tip: 'Share your systematic approach.', category: 'Problem Solving' },
    { question: 'How do you stay updated with new technologies?', tip: 'Mention specific resources and learning habits.', category: 'Learning' }
  )
  
  return questions.slice(0, 10)
}

/**
 * Generate experience-based questions
 */
function generateExperienceQuestions(experience) {
  const questions = []
  
  if (experience && experience.length > 0) {
    experience.slice(0, 2).forEach(exp => {
      if (exp.company && exp.role) {
        questions.push({
          question: `What were your main responsibilities as ${exp.role} at ${exp.company}?`,
          tip: 'Focus on key achievements and measurable impact.',
          category: 'Experience'
        })
        
        questions.push({
          question: `Why did you leave ${exp.company}? / Why are you looking to leave?`,
          tip: 'Stay positive and focus on growth opportunities.',
          category: 'Career'
        })
      }
    })
  }
  
  questions.push(
    { question: 'What has been your greatest professional achievement?', tip: 'Choose something quantifiable and relevant.', category: 'Achievements' },
    { question: 'Where do you see yourself in 5 years?', tip: 'Show ambition while being realistic.', category: 'Career Goals' }
  )
  
  return questions
}

/**
 * Generate situational questions
 */
function generateSituationalQuestions(experience) {
  return [
    {
      question: 'If you disagreed with your manager\'s decision, how would you handle it?',
      tip: 'Show respect while demonstrating assertiveness.',
      category: 'Conflict Resolution'
    },
    {
      question: 'How would you handle multiple urgent tasks with the same deadline?',
      tip: 'Discuss prioritization and communication.',
      category: 'Prioritization'
    },
    {
      question: 'What would you do if you noticed a colleague taking credit for your work?',
      tip: 'Balance professionalism with self-advocacy.',
      category: 'Workplace Dynamics'
    },
    {
      question: 'How would you onboard yourself in a new role in the first 90 days?',
      tip: 'Show proactive learning and relationship building.',
      category: 'Onboarding'
    }
  ]
}

/**
 * Get general interview questions
 */
function getGeneralQuestions() {
  return [
    {
      question: 'Tell me about yourself.',
      tip: 'Keep it concise (2-3 minutes), focus on professional highlights.',
      category: 'Introduction'
    },
    {
      question: 'Why do you want to work here?',
      tip: 'Research the company and connect your values/skills.',
      category: 'Motivation'
    },
    {
      question: 'What are your salary expectations?',
      tip: 'Research market rates and provide a range.',
      category: 'Compensation'
    },
    {
      question: 'Do you have any questions for us?',
      tip: 'Always have 2-3 thoughtful questions prepared.',
      category: 'Closing'
    }
  ]
}

/**
 * Generate STAR method template for a question
 */
export function generateSTARTemplate(question) {
  return {
    situation: 'Describe the context and background...',
    task: 'Explain your responsibility or goal...',
    action: 'Detail the specific steps you took...',
    result: 'Share the outcomes and what you learned...'
  }
}

/**
 * Get interview tips based on resume analysis
 */
export function getInterviewTips(resumeData) {
  const tips = []
  
  // General tips
  tips.push({
    category: 'Preparation',
    tips: [
      'Research the company thoroughly - know their products, culture, and recent news',
      'Review the job description and prepare examples for each requirement',
      'Practice your answers out loud, but don\'t memorize scripts',
      'Prepare questions to ask the interviewer'
    ]
  })
  
  // Skills-based tips
  if (resumeData.skills.length > 0) {
    tips.push({
      category: 'Technical Preparation',
      tips: [
        `Be ready to discuss your experience with: ${resumeData.skills.slice(0, 5).join(', ')}`,
        'Prepare to solve problems or write code if relevant',
        'Have examples of projects where you used these skills'
      ]
    })
  }
  
  // Experience-based tips
  if (resumeData.experience.length > 0) {
    tips.push({
      category: 'Experience Stories',
      tips: [
        'Prepare 3-5 detailed stories using the STAR method',
        'Include specific metrics and results in your examples',
        'Be ready to explain gaps in employment positively'
      ]
    })
  }
  
  // Day-of tips
  tips.push({
    category: 'Interview Day',
    tips: [
      'Arrive 10-15 minutes early (or log in early for virtual)',
      'Bring copies of your resume and a notepad',
      'Dress appropriately for the company culture',
      'Maintain eye contact and positive body language',
      'Send a thank-you email within 24 hours'
    ]
  })
  
  return tips
}
