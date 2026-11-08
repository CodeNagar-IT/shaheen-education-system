import type { Metadata } from "next";
import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { saveAttendance } from "@/app/actions/attendance";
import { formatDate } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Class Attendance Logger — SES Portal",
};

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: { date?: string; className?: string };
}) {
  const user = await requireUser();
  const scope = branchScope(user);

  const todayStr = new Date().toISOString().split("T")[0];
  const selectedDateStr = searchParams.date || todayStr;
  const selectedDate = new Date(selectedDateStr);
  selectedDate.setHours(0, 0, 0, 0);

  // Available classes
  const classesList = await prisma.student.findMany({
    where: scope,
    select: { className: true },
    distinct: ["className"],
    orderBy: { className: "asc" },
  });

  const selectedClass = searchParams.className || classesList[0]?.className || "Class 10";

  // Fetch students for the selected class
  const students = await prisma.student.findMany({
    where: {
      ...scope,
      className: selectedClass,
      status: "ACTIVE",
    },
    include: {
      attendance: {
        where: {
          date: selectedDate,
        },
      },
    },
    orderBy: { rollNumber: "asc" },
  });

  // Calculate today's stats for summary
  const allTodayAttendance = await prisma.attendance.findMany({
    where: {
      date: selectedDate,
      ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
    },
    include: {
      student: true,
    },
  });

  const presentCount = allTodayAttendance.filter((a) => a.status === "PRESENT").length;
  const absentCount = allTodayAttendance.filter((a) => a.status === "ABSENT").length;
  const lateCount = allTodayAttendance.filter((a) => a.status === "LATE").length;
  const totalMarked = allTodayAttendance.length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">
            Daily Attendance Logger
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Log, update, and monitor student daily attendance and class-wise presence metrics.
          </p>
        </div>
      </div>

      {/* Daily Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Marked Today</span>
            <Users className="h-4 w-4 text-navy" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-navy">{totalMarked}</p>
          <p className="text-xs text-slate-400 mt-1">{formatDate(selectedDate)}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 uppercase">Present</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-emerald-600">{presentCount}</p>
          <p className="text-xs text-slate-400 mt-1">
            {totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 0}% of marked
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-red-600 uppercase">Absent</span>
            <XCircle className="h-4 w-4 text-red-600" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-red-600">{absentCount}</p>
          <p className="text-xs text-slate-400 mt-1">Requires leave verification</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-600 uppercase">Late Arrivals</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-amber-600">{lateCount}</p>
          <p className="text-xs text-slate-400 mt-1">Morning gate records</p>
        </div>
      </div>

      {/* Date & Class Selector Bar */}
      <form method="GET" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-12 items-end">
          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
              Select Class
            </label>
            <select
              name="className"
              defaultValue={selectedClass}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-medium text-navy"
            >
              {classesList.map((c) => (
                <option key={c.className} value={c.className}>
                  {c.className}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
              Attendance Date
            </label>
            <input
              type="date"
              name="date"
              defaultValue={selectedDateStr}
              className="w-full rounded-lg border border-slate-300 p-2 text-sm text-navy"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full rounded-lg bg-royal py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Load Register
            </button>
          </div>
        </div>
      </form>

      {/* Class Attendance Form */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-navy">
              Class Register: {selectedClass}
            </h2>
            <p className="text-xs text-slate-500">
              Date: {formatDate(selectedDate)} • Total Students: {students.length}
            </p>
          </div>
        </div>

        {students.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            No enrolled students in {selectedClass}. Please add students or select another class.
          </div>
        ) : (
          <form
            action={async (formData) => {
              "use server";
              await saveAttendance(formData);
            }}
          >
            <input type="hidden" name="date" value={selectedDateStr} />
            <input type="hidden" name="className" value={selectedClass} />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                  <tr>
                    <th className="px-6 py-3 w-20">Roll #</th>
                    <th className="px-6 py-3">Student Name</th>
                    <th className="px-6 py-3">Section</th>
                    <th className="px-6 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => {
                    const currentStatus = student.attendance[0]?.status || "PRESENT";
                    return (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="px-6 py-3.5 font-mono text-xs font-bold text-slate-700">
                          {student.rollNumber}
                        </td>
                        <td className="px-6 py-3.5">
                          <input type="hidden" name="studentId" value={student.id} />
                          <p className="font-medium text-navy text-sm">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-xs text-slate-400">Adm: {student.admissionNo}</p>
                        </td>
                        <td className="px-6 py-3.5 text-xs text-slate-600 font-semibold">
                          Section {student.section}
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center justify-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-700">
                              <input
                                type="radio"
                                name={`status-${student.id}`}
                                value="PRESENT"
                                defaultChecked={currentStatus === "PRESENT"}
                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                              />
                              Present
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-red-700">
                              <input
                                type="radio"
                                name={`status-${student.id}`}
                                value="ABSENT"
                                defaultChecked={currentStatus === "ABSENT"}
                                className="h-4 w-4 text-red-600 focus:ring-red-500"
                              />
                              Absent
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-amber-700">
                              <input
                                type="radio"
                                name={`status-${student.id}`}
                                value="LATE"
                                defaultChecked={currentStatus === "LATE"}
                                className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                              />
                              Late
                            </label>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy/90 shadow transition"
              >
                Save Attendance Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
