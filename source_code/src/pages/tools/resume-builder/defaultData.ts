import { ResumeData } from './types';

export const DEFAULT_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Jordan Smith',
    email: 'jordan.smith@university.edu',
    phone: '(555) 123-4567',
    location: 'Austin, TX',
    linkedin: 'linkedin.com/in/jordansmith',
    website: 'jordansmith.dev',
  },
  education: [
    {
      id: '1',
      school: 'State University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      graduationDate: 'May 2027',
      gpa: '3.7',
      coursework: 'Data Structures, Algorithms, Intro to Systems, Discrete Math, Linear Algebra',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'University IT Help Desk',
      position: 'Student Technician',
      startDate: 'Sep 2023',
      endDate: 'Present',
      description:
        'Troubleshoot hardware and software issues for 200+ students and faculty per semester. Document solutions in internal knowledge base, reducing repeat tickets by 15%.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Campus Event Finder',
      technologies: 'React, Node.js, MongoDB',
      description:
        'Built a full-stack web app that aggregates campus events from multiple sources. Implements search, filtering by category, and a saved-events feature with user authentication.',
      link: 'github.com/jordansmith/campus-events',
    },
    {
      id: '2',
      name: 'CLI Task Manager',
      technologies: 'Python, SQLite, Click',
      description:
        'Developed a command-line productivity tool with priorities, deadlines, and recurring tasks. Includes data export to CSV and color-coded terminal output.',
      link: 'github.com/jordansmith/task-cli',
    },
  ],
  skills: [
    'Python',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Git',
    'HTML/CSS',
    'SQL',
    'Linux',
    'VS Code',
  ],
};
