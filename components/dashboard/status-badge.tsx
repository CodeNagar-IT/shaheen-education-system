import { Badge } from "@/components/ui/badge";

export function FeeStatusBadge({ status }: { status: string }) {
  const variant = status === "PAID" ? "success" : status === "OVERDUE" ? "danger" : "warning";
  return <Badge variant={variant}>{status}</Badge>;
}

export function AttendanceBadge({ status }: { status: string }) {
  const variant =
    status === "PRESENT" ? "success" : status === "ABSENT" ? "danger" : status === "LATE" ? "warning" : "info";
  return <Badge variant={variant}>{status}</Badge>;
}

export function ApplicationBadge({ status }: { status: string }) {
  const variant =
    status === "ACCEPTED" ? "success" : status === "REJECTED" ? "danger" : status === "UNDER_REVIEW" ? "info" : "warning";
  return <Badge variant={variant}>{status.replace("_", " ")}</Badge>;
}
