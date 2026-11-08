import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { ReportCardTemplate } from "@/components/dashboard/report-card-template";

export const metadata: Metadata = {
  title: "Official Report Card — SES Portal",
};

export default async function ReportCardPage({
  params,
}: {
  params: { examId: string; studentId: string };
}) {
  const user = await requireUser();
  const scope = branchScope(user);

  const student = await prisma.student.findFirst({
    where: {
      id: params.studentId,
      ...scope,
    },
    include: {
      branch: true,
    },
  });

  const exam = await prisma.exam.findUnique({
    where: { id: params.examId },
  });

  if (!student || !exam) {
    notFound();
  }

  const results = await prisma.result.findMany({
    where: {
      studentId: student.id,
      examId: exam.id,
    },
    orderBy: { subject: "asc" },
  });

  return (
    <ReportCardTemplate
      student={student}
      exam={exam}
      results={results}
    />
  );
}
