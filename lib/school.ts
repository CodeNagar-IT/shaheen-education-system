export const school = {
  name: "Shaheen Education System",
  shortName: "SES",
  tagline: "Nurturing minds. Building character. Shaping Pakistan's future.",
  established: "2009",
  mainBranch: {
    name: "Main Campus — Domail",
    address: "Madina Market, Shoukat Line, Upper Chattar, Domail",
    city: "Domail",
    phone: "+92-300-5512345",
    whatsapp: "923005512345",
    email: "info@shaheen.edu.pk",
    mapUrl: "https://maps.google.com/?q=Madina+Market+Shoukat+Line+Upper+Chattar+Domail",
  },
  vision:
    "To become a trusted network of campuses that delivers world-class, values-rooted education from Montessori through college, producing confident, compassionate, and capable citizens.",
  mission:
    "Shaheen Education System provides a rigorous academic programme, character education, and a caring campus culture so every child — regardless of background — can soar.",
  coreValues: [
    { title: "Integrity", body: "We teach honesty in the classroom, on the playground, and in every report we issue." },
    { title: "Excellence", body: "High standards in teaching, assessment, and student support — never at the cost of wellbeing." },
    { title: "Respect", body: "A culture of courtesy toward teachers, peers, families, and the wider community." },
    { title: "Faith & Character", body: "Moral grounding and civic responsibility sit beside science, languages, and the arts." },
    { title: "Inclusion", body: "Every learner is known by name and given a pathway to progress." },
    { title: "Innovation", body: "Modern pedagogy, digital literacy, and continuous teacher development." },
  ],
  director: {
    name: "Prof. Dr. Khalid Mahmood",
    title: "Director, Shaheen Education System",
    message:
      "When we founded Shaheen Education System, our promise was simple: a neighbourhood school with the heart of a family and the standards of a leading academy. From our Main Campus at Madina Market, Shoukat Line, Upper Chattar, Domail, we now prepare to welcome sister campuses — each with its own identity, yet bound by one academic framework, one fee integrity, and one duty of care. I invite parents to walk our corridors, meet our faculty, and see how seriously we take your child's tomorrow.",
  },
};

export const roles = {
  SUPER_ADMIN: "SUPER_ADMIN",
  BRANCH_ADMIN: "BRANCH_ADMIN",
  TEACHER: "TEACHER",
  PARENT: "PARENT",
  STUDENT: "STUDENT",
} as const;

export type Role = (typeof roles)[keyof typeof roles];

export const curriculumLevels = [
  {
    id: "montessori",
    title: "Montessori",
    ages: "2.5 – 6 years",
    classes: ["Playgroup", "Nursery", "Kindergarten"],
    summary:
      "Sensorial classrooms, phonetic English, early numeracy, and Urdu conversation in a play-based environment aligned with AMI-inspired practice.",
    subjects: ["Practical Life", "Sensorial", "Phonics", "Early Maths", "Urdu", "Art & Movement", "Islamic Studies"],
  },
  {
    id: "primary",
    title: "Primary",
    ages: "6 – 11 years",
    classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
    summary:
      "National curriculum with enhanced English, STEM labs, and continuous assessment. Emphasis on reading fluency and conceptual mathematics.",
    subjects: ["English", "Urdu", "Mathematics", "General Science", "Social Studies", "Islamiyat", "Computer", "Art", "PE"],
  },
  {
    id: "middle",
    title: "Middle School",
    ages: "11 – 14 years",
    classes: ["Class 6", "Class 7", "Class 8"],
    summary:
      "Subject specialists, laboratory science, and debate. Students begin elective enrichment in robotics, calligraphy, and public speaking.",
    subjects: ["English", "Urdu", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography", "Islamiyat", "Computer"],
  },
  {
    id: "secondary",
    title: "Secondary / Matric",
    ages: "14 – 16 years",
    classes: ["Class 9", "Class 10"],
    summary:
      "BISE-aligned science and arts groups with weekly past-paper clinics, career counselling, and board-exam simulations.",
    subjects: ["English", "Urdu", "Mathematics", "Physics", "Chemistry", "Biology / Computer", "Pakistan Studies", "Islamiyat"],
  },
  {
    id: "college",
    title: "College / Intermediate",
    ages: "16 – 18 years",
    classes: ["F.Sc Pre-Medical", "F.Sc Pre-Engineering", "ICS", "I.Com", "F.A"],
    summary:
      "College-level instruction for pre-medical, pre-engineering, computer science, and commerce streams with university placement support.",
    subjects: ["English", "Urdu", "Islamic Education", "Physics", "Chemistry", "Biology / Maths / Computer / Accounting"],
  },
];
