/**
 * Mock data that mirrors the shapes used by the Streamlit frontend.
 * This file is the single source of truth for the Data Example preview page.
 * Replace or extend when real API integration lands.
 */

export interface SkillGap {
  name: string;
  is_gap: boolean;
  required_level: string;
  current_level: string;
  reason: string;
}

export interface LearningSession {
  id: string;
  title: string;
  abstract: string;
  if_learned: boolean;
  associated_skills: string[];
  knowledge_points: { name: string; complexity_level: string }[];
}

export interface LearnerProfile {
  learner_information: string;
  learning_goal: string;
  cognitive_status: {
    overall_progress: number;
    mastered_skills: { name: string; proficiency_level: string }[];
    in_progress_skills: {
      name: string;
      required_proficiency_level: string;
      current_proficiency_level: string;
    }[];
  };
  learning_preferences: {
    fslsm_dimensions: {
      fslsm_processing: number;
      fslsm_perception: number;
      fslsm_input: number;
      fslsm_understanding: number;
    };
    content_style: string;
    preferred_activity: string;
  };
}

// ── Skill Gaps ──────────────────────────────────────────────────────────
export const skillGaps: SkillGap[] = [
  {
    name: "Python Fundamentals",
    is_gap: true,
    required_level: "intermediate",
    current_level: "beginner",
    reason:
      "Learner can write simple scripts but lacks understanding of OOP and error handling.",
  },
  {
    name: "Data Structures",
    is_gap: true,
    required_level: "advanced",
    current_level: "beginner",
    reason:
      "Limited experience with trees, graphs, and hash maps beyond basic arrays.",
  },
  {
    name: "Machine Learning Basics",
    is_gap: true,
    required_level: "intermediate",
    current_level: "unlearned",
    reason: "No prior exposure to ML concepts or libraries.",
  },
  {
    name: "Statistics & Probability",
    is_gap: false,
    required_level: "intermediate",
    current_level: "intermediate",
    reason:
      "Completed college-level statistics; comfortable with distributions and hypothesis testing.",
  },
  {
    name: "SQL & Database Querying",
    is_gap: true,
    required_level: "intermediate",
    current_level: "beginner",
    reason:
      "Familiar with SELECT statements but not JOINs or window functions.",
  },
];

// ── Learning Path Sessions ──────────────────────────────────────────────
export const learningSessions: LearningSession[] = [
  {
    id: "Session 1",
    title: "Python OOP & Error Handling",
    abstract:
      "Build a solid foundation in object-oriented programming with classes, inheritance, and exception handling patterns.",
    if_learned: true,
    associated_skills: ["Python Fundamentals"],
    knowledge_points: [
      { name: "Classes and Objects", complexity_level: "beginner" },
      { name: "Inheritance & Polymorphism", complexity_level: "intermediate" },
      { name: "Exception Handling", complexity_level: "intermediate" },
    ],
  },
  {
    id: "Session 2",
    title: "Core Data Structures",
    abstract:
      "Deep-dive into linked lists, stacks, queues, hash maps, and their time complexity trade-offs.",
    if_learned: false,
    associated_skills: ["Data Structures"],
    knowledge_points: [
      { name: "Linked Lists", complexity_level: "intermediate" },
      { name: "Hash Maps", complexity_level: "intermediate" },
      { name: "Stacks & Queues", complexity_level: "beginner" },
    ],
  },
  {
    id: "Session 3",
    title: "Trees & Graphs",
    abstract:
      "Explore binary trees, BSTs, BFS/DFS traversal, and practical graph algorithms.",
    if_learned: false,
    associated_skills: ["Data Structures"],
    knowledge_points: [
      { name: "Binary Trees & BST", complexity_level: "intermediate" },
      { name: "Graph Representation", complexity_level: "advanced" },
      { name: "BFS & DFS", complexity_level: "intermediate" },
    ],
  },
  {
    id: "Session 4",
    title: "SQL Joins & Advanced Queries",
    abstract:
      "Master multi-table joins, subqueries, window functions, and query optimisation basics.",
    if_learned: false,
    associated_skills: ["SQL & Database Querying"],
    knowledge_points: [
      { name: "JOIN types", complexity_level: "intermediate" },
      { name: "Window Functions", complexity_level: "advanced" },
      { name: "Query Planning", complexity_level: "intermediate" },
    ],
  },
  {
    id: "Session 5",
    title: "Intro to Machine Learning",
    abstract:
      "Understand supervised vs unsupervised learning, train-test splits, and build a first model with scikit-learn.",
    if_learned: false,
    associated_skills: ["Machine Learning Basics", "Python Fundamentals"],
    knowledge_points: [
      { name: "Supervised vs Unsupervised", complexity_level: "beginner" },
      { name: "Train-Test Split & Metrics", complexity_level: "intermediate" },
      {
        name: "Linear Regression with sklearn",
        complexity_level: "intermediate",
      },
    ],
  },
];

// ── Learner Profile ─────────────────────────────────────────────────────
export const learnerProfile: LearnerProfile = {
  learner_information:
    "Recent graduate with a statistics background, looking to transition into data science and machine learning engineering.",
  learning_goal:
    "Become proficient in Python, data structures, SQL, and introductory machine learning within 8 weeks.",
  cognitive_status: {
    overall_progress: 20,
    mastered_skills: [
      { name: "Statistics & Probability", proficiency_level: "intermediate" },
    ],
    in_progress_skills: [
      {
        name: "Python Fundamentals",
        required_proficiency_level: "intermediate",
        current_proficiency_level: "beginner",
      },
      {
        name: "Data Structures",
        required_proficiency_level: "advanced",
        current_proficiency_level: "beginner",
      },
      {
        name: "Machine Learning Basics",
        required_proficiency_level: "intermediate",
        current_proficiency_level: "unlearned",
      },
      {
        name: "SQL & Database Querying",
        required_proficiency_level: "intermediate",
        current_proficiency_level: "beginner",
      },
    ],
  },
  learning_preferences: {
    fslsm_dimensions: {
      fslsm_processing: 0.4,
      fslsm_perception: -0.2,
      fslsm_input: 0.6,
      fslsm_understanding: 0.1,
    },
    content_style: "Visual diagrams and step-by-step code examples",
    preferred_activity: "Hands-on coding exercises with immediate feedback",
  },
};
