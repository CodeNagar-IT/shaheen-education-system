import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.result.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.feeInvoice.deleteMany();
  await prisma.user.deleteMany();
  await prisma.student.deleteMany();
  await prisma.schoolClass.deleteMany();
  await prisma.admissionApplication.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.academicResource.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.branch.deleteMany();

  const main = await prisma.branch.create({
    data: {
      code: "SES-MAIN",
      name: "Main Campus — Domail",
      address: "Madina Market, Shoukat Line, Upper Chattar, Domail",
      city: "Domail",
      phone: "+92-300-5512345",
      email: "domail@shaheen.edu.pk",
      whatsapp: "923005512345",
      mapUrl: "https://maps.google.com/?q=Madina+Market+Shoukat+Line+Upper+Chattar+Domail",
      isMain: true,
      established: "2009",
      principal: "Mrs. Farzana Bibi",
      studentCap: 650,
    },
  });

  const north = await prisma.branch.create({
    data: {
      code: "SES-NORTH",
      name: "North Campus — Prospective",
      address: "Proposed site, College Road, North Circle",
      city: "Abbottabad Region",
      phone: "+92-333-7718890",
      email: "north@shaheen.edu.pk",
      whatsapp: "923337718890",
      mapUrl: "https://maps.google.com/?q=Abbottabad",
      isMain: false,
      established: "2026 (planned)",
      principal: "To be appointed",
      studentCap: 400,
    },
  });

  const password = await bcrypt.hash("Admin@123", 10);
  const teacherPass = await bcrypt.hash("Teacher@123", 10);
  const parentPass = await bcrypt.hash("Parent@123", 10);

  const classes = [
    { name: "Nursery", section: "A", teacher: "Ms. Hina Aftab", room: "M-01" },
    { name: "KG", section: "A", teacher: "Ms. Sana Khalid", room: "M-02" },
    { name: "Class 3", section: "A", teacher: "Mr. Imran Qureshi", room: "P-12" },
    { name: "Class 5", section: "A", teacher: "Mrs. Nida Shah", room: "P-18" },
    { name: "Class 8", section: "A", teacher: "Mr. Usman Javed", room: "S-04" },
    { name: "Class 10", section: "Science", teacher: "Sir Tahir Mehmood", room: "Lab-1" },
  ];

  for (const c of classes) {
    await prisma.schoolClass.create({ data: { ...c, branchId: main.id } });
  }

  const studentDefs = [
    { firstName: "Ayesha", lastName: "Khan", gender: "Female", className: "Nursery", section: "A", roll: "N-01", guardian: "Muhammad Khan", phone: "0300-1112233" },
    { firstName: "Hamza", lastName: "Ali", gender: "Male", className: "Nursery", section: "A", roll: "N-02", guardian: "Ali Raza", phone: "0301-4455667" },
    { firstName: "Zainab", lastName: "Malik", gender: "Female", className: "KG", section: "A", roll: "KG-04", guardian: "Tariq Malik", phone: "0333-8899001" },
    { firstName: "Omar", lastName: "Sheikh", gender: "Male", className: "Class 3", section: "A", roll: "3-07", guardian: "Naveed Sheikh", phone: "0345-2211009" },
    { firstName: "Fatima", lastName: "Noor", gender: "Female", className: "Class 3", section: "A", roll: "3-08", guardian: "Abdul Noor", phone: "0312-6677885" },
    { firstName: "Ibrahim", lastName: "Siddiqui", gender: "Male", className: "Class 5", section: "A", roll: "5-12", guardian: "Hassan Siddiqui", phone: "0308-9988771" },
    { firstName: "Maryam", lastName: "Javed", gender: "Female", className: "Class 5", section: "A", roll: "5-15", guardian: "Javed Iqbal", phone: "0331-5544332" },
    { firstName: "Ahmed", lastName: "Raza", gender: "Male", className: "Class 8", section: "A", roll: "8-03", guardian: "Ghulam Raza", phone: "0302-7788990" },
    { firstName: "Hira", lastName: "Yousaf", gender: "Female", className: "Class 8", section: "A", roll: "8-11", guardian: "Yousaf Khan", phone: "0344-1122334" },
    { firstName: "Bilal", lastName: "Ahmad", gender: "Male", className: "Class 10", section: "Science", roll: "10-01", guardian: "Saeed Ahmad", phone: "0300-5566778" },
    { firstName: "Sana", lastName: "Rehman", gender: "Female", className: "Class 10", section: "Science", roll: "10-06", guardian: "Abdur Rehman", phone: "0336-9090887" },
    { firstName: "Yusuf", lastName: "Khattak", gender: "Male", className: "Class 10", section: "Science", roll: "10-09", guardian: "Shahid Khattak", phone: "0315-3344556" },
  ];

  const students = [];
  for (let i = 0; i < studentDefs.length; i++) {
    const s = studentDefs[i];
    const created = await prisma.student.create({
      data: {
        rollNumber: s.roll,
        admissionNo: `ADM-2024-${String(i + 101).padStart(3, "0")}`,
        firstName: s.firstName,
        lastName: s.lastName,
        gender: s.gender,
        dateOfBirth: new Date(2010 - (i % 8), (i * 3) % 12, 8 + (i % 20)),
        className: s.className,
        section: s.section,
        bloodGroup: ["A+", "B+", "O+", "AB+", "A-"][i % 5],
        status: "ACTIVE",
        guardianName: s.guardian,
        guardianPhone: s.phone,
        guardianEmail: `${s.firstName.toLowerCase()}.guardian@mail.com`,
        relation: "Father",
        address: `${12 + i} Shoukat Line, Upper Chattar, Domail`,
        branchId: main.id,
      },
    });
    students.push(created);
  }

  await prisma.user.createMany({
    data: [
      { name: "System Director", email: "superadmin@shaheen.edu.pk", password, role: "SUPER_ADMIN", branchId: main.id },
      { name: "Mrs. Farzana Bibi", email: "admin.main@shaheen.edu.pk", password, role: "BRANCH_ADMIN", branchId: main.id },
      { name: "Campus Coordinator (North)", email: "admin.north@shaheen.edu.pk", password, role: "BRANCH_ADMIN", branchId: north.id },
      { name: "Sir Tahir Mehmood", email: "teacher@shaheen.edu.pk", password: teacherPass, role: "TEACHER", branchId: main.id },
      {
        name: "Saeed Ahmad (Parent)",
        email: "parent@shaheen.edu.pk",
        password: parentPass,
        role: "PARENT",
        branchId: main.id,
        studentId: students[9].id,
      },
    ],
  });

  const teacher = await prisma.user.findUnique({ where: { email: "teacher@shaheen.edu.pk" } });

  const months = [
    { month: "August 2026", year: "2026-27", due: new Date("2026-08-10"), status: "PAID", paid: new Date("2026-08-08") },
    { month: "September 2026", year: "2026-27", due: new Date("2026-09-10"), status: "PAID", paid: new Date("2026-09-09") },
    { month: "October 2026", year: "2026-27", due: new Date("2026-10-10"), status: "PENDING", paid: null },
    { month: "November 2026", year: "2026-27", due: new Date("2026-11-10"), status: "OVERDUE", paid: null },
  ];

  let seq = 1;
  for (const student of students) {
    const tuition = student.className.includes("10") ? 8500 : student.className.includes("8") ? 7200 : 5500;
    for (const m of months) {
      const lab = student.className.includes("10") ? 800 : 0;
      const exam = m.month.startsWith("November") ? 1500 : 0;
      const amount = tuition + lab + exam;
      const status =
        m.status === "OVERDUE" && seq % 3 === 0 ? "OVERDUE" : m.status === "PENDING" && seq % 2 === 0 ? "PENDING" : m.status === "PAID" ? "PAID" : m.status;
      await prisma.feeInvoice.create({
        data: {
          challanNo: `CH-2026-${String(seq).padStart(5, "0")}`,
          receiptNo: status === "PAID" ? `RCT-2026-${String(seq).padStart(5, "0")}` : null,
          studentId: student.id,
          month: m.month,
          academicYear: m.year,
          tuition,
          lab,
          exam,
          other: 0,
          amount,
          dueDate: m.due,
          status: status === "PAID" ? "PAID" : status,
          paidAt: status === "PAID" ? m.paid : null,
          method: status === "PAID" ? "Cash / Bank" : null,
        },
      });
      seq += 1;
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let d = 0; d < 8; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() - d);
    if (date.getDay() === 0) continue;
    for (const student of students) {
      const roll = d + student.rollNumber.length;
      const status = roll % 11 === 0 ? "ABSENT" : roll % 9 === 0 ? "LATE" : roll % 13 === 0 ? "LEAVE" : "PRESENT";
      await prisma.attendance.create({
        data: {
          studentId: student.id,
          date,
          status,
          markedById: teacher?.id,
        },
      });
    }
  }

  const exam = await prisma.exam.create({
    data: { name: "First Term Examination", term: "Term 1", academicYear: "2026-27" },
  });

  const subjectMap: Record<string, string[]> = {
    Nursery: ["English", "Urdu", "Maths", "Islamiyat"],
    KG: ["English", "Urdu", "Maths", "Islamiyat"],
    "Class 3": ["English", "Urdu", "Mathematics", "General Science", "Islamiyat", "Social Studies"],
    "Class 5": ["English", "Urdu", "Mathematics", "General Science", "Islamiyat", "Social Studies", "Computer"],
    "Class 8": ["English", "Urdu", "Mathematics", "Physics", "Chemistry", "Biology", "Islamiyat", "Computer"],
    "Class 10": ["English", "Urdu", "Mathematics", "Physics", "Chemistry", "Biology", "Pakistan Studies", "Islamiyat"],
  };

  for (const student of students) {
    const subjects = subjectMap[student.className] ?? subjectMap["Class 5"];
    for (let i = 0; i < subjects.length; i++) {
      const maxMarks = 100;
      const marks = 62 + ((student.rollNumber.charCodeAt(0) + i * 7) % 35);
      const grade = marks >= 90 ? "A+" : marks >= 80 ? "A" : marks >= 70 ? "B" : marks >= 60 ? "C" : "D";
      await prisma.result.create({
        data: {
          studentId: student.id,
          examId: exam.id,
          subject: subjects[i],
          marks,
          maxMarks,
          grade,
          remarks: grade === "A+" || grade === "A" ? "Excellent" : "Keep working",
        },
      });
    }
  }

  await prisma.notice.createMany({
    data: [
      {
        title: "Winter uniform from 15 November",
        body: "All students of Main Campus must wear the approved winter uniform from 15 November. Navy blazer with gold emblem is compulsory on Fridays.",
        category: "General",
        branchId: main.id,
      },
      {
        title: "First Term date sheet released",
        body: "The First Term Examination date sheet for Classes 5–10 is available in Academics. Practicals begin a week earlier.",
        category: "Exams",
        branchId: main.id,
      },
      {
        title: "Parent-teacher conference",
        body: "PTM for primary wing: Saturday 10:00 am – 1:00 pm in the Madina Market campus hall.",
        category: "Events",
        branchId: main.id,
      },
      {
        title: "North Campus admissions interest list",
        body: "Families wishing to register interest for the prospective North Campus may submit an inquiry. A unique branch ID and independent student register will be issued at launch.",
        category: "Admissions",
        branchId: north.id,
      },
    ],
  });

  await prisma.galleryItem.createMany({
    data: [
      { title: "Independence Day Assembly", caption: "Students of Main Campus present national songs at Madina Market campus.", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80", category: "Events" },
      { title: "Science Lab Practicals", caption: "Class 10 science group during chemistry practical week.", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=80", category: "Academics" },
      { title: "Montessori Morning Circle", caption: "Nursery learners in the sensorial classroom.", imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1400&q=80", category: "Montessori" },
      { title: "Sports Gala", caption: "Annual sports day on the Upper Chattar ground.", imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?auto=format&fit=crop&w=1400&q=80", category: "Sports" },
      { title: "Library Hour", caption: "Primary wing silent reading programme.", imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80", category: "Campus" },
      { title: "Qirat Competition", caption: "Inter-house Qirat and Naat contest.", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80", category: "Events" },
    ],
  });

  await prisma.academicResource.createMany({
    data: [
      { title: "Academic Calendar 2026-27", type: "CALENDAR", className: "All", academicYear: "2026-27", fileUrl: "/resources/academic-calendar-2026-27.txt", description: "Term dates, holidays, PTMs and exam windows for all campuses." },
      { title: "First Term Date Sheet — Secondary", type: "DATESHEET", className: "Class 9–10", academicYear: "2026-27", fileUrl: "/resources/datesheet-term1-secondary.txt", description: "Written papers and practical schedule for Matric classes." },
      { title: "Syllabus Outline — Class 5", type: "SYLLABUS", className: "Class 5", academicYear: "2026-27", fileUrl: "/resources/syllabus-class-5.txt", description: "Term-wise syllabus for English, Urdu, Maths, Science and Islamiyat." },
      { title: "Syllabus Outline — Class 10 Science", type: "SYLLABUS", className: "Class 10", academicYear: "2026-27", fileUrl: "/resources/syllabus-class-10.txt", description: "BISE-aligned syllabus with recommended practical list." },
    ],
  });

  await prisma.newsArticle.createMany({
    data: [
      {
        title: "Shaheen students win district science fair",
        excerpt: "Class 10 team from Main Campus placed first in renewable energy models.",
        body: "Three students of Shaheen Education System, Main Campus Domail, presented a low-cost water filtration prototype and secured first position at the district science fair. The school will fund their entry to the regional STEM expo.",
      },
      {
        title: "Multi-branch architecture announced",
        excerpt: "SES will onboard prospective campuses with unique branch IDs, staff, and student registers.",
        body: "The Board has approved a multi-campus operating model. Each campus will retain local leadership while sharing academic policy, fee integrity, and the parent portal. North Campus is the first prospective site.",
      },
      {
        title: "Need-based scholarships for 2026-27",
        excerpt: "Twenty fee concessions are open for deserving students of Upper Chattar and surrounding areas.",
        body: "Applications are accepted at the Main Campus office with income evidence. Decisions are made by the scholarship committee before the new academic year.",
      },
    ],
  });

  await prisma.faculty.createMany({
    data: [
      { name: "Mrs. Farzana Bibi", title: "Principal, Main Campus", subject: "School Leadership", campus: "Main Campus — Domail", bio: "Twenty years in girls' and co-education leadership with a focus on pastoral care.", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
      { name: "Sir Tahir Mehmood", title: "Head of Science", subject: "Physics & Chemistry", campus: "Main Campus — Domail", bio: "BISE examiner and mentor for pre-engineering aspirants.", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80" },
      { name: "Ms. Hina Aftab", title: "Montessori Directress", subject: "Early Years", campus: "Main Campus — Domail", bio: "AMI-oriented practitioner who designed the SES playgroup programme.", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" },
      { name: "Mr. Imran Qureshi", title: "Primary Coordinator", subject: "English & Social Studies", campus: "Main Campus — Domail", bio: "Leads reading intervention and the house system for Classes 1–5.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
      { name: "Mrs. Nida Shah", title: "Mathematics Lead", subject: "Mathematics", campus: "Main Campus — Domail", bio: "Conceptual maths specialist and Olympiad coach.", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
      { name: "Qari Abdul Haq", title: "Head of Islamiyat", subject: "Islamiyat & Qirat", campus: "Main Campus — Domail", bio: "Guides the daily assembly, Nazra, and character education programme.", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
    ],
  });

  await prisma.inquiry.createMany({
    data: [
      { name: "Asif Mehmood", phone: "0300-9988771", email: "asif@example.com", childAge: "5", classInterest: "KG", message: "Please share fee structure for KG and transport availability from Lower Chattar.", status: "NEW", branchId: main.id },
      { name: "Bushra Khan", phone: "0333-2211008", childAge: "14", classInterest: "Class 9", message: "Interested in science group admission mid-year.", status: "CONTACTED", branchId: main.id },
    ],
  });

  await prisma.admissionApplication.create({
    data: {
      trackingCode: "SES-26-DEMO01",
      applicantName: "Hassan Ali",
      fatherName: "Liaquat Ali",
      motherName: "Shabana Ali",
      gender: "Male",
      dateOfBirth: new Date("2016-04-12"),
      classApplied: "Class 3",
      previousSchool: "Community Model School",
      phone: "0345-6677881",
      email: "liaquat.ali@example.com",
      address: "Near Friday Market, Domail",
      cnic: "13503-1234567-1",
      status: "UNDER_REVIEW",
      branchId: main.id,
    },
  });

  console.log("Seed complete. Login as superadmin@shaheen.edu.pk / Admin@123");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
