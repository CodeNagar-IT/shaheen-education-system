import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireUser, branchScope } from "@/lib/session-guard";
import { prisma } from "@/lib/db";
import { VoucherTemplate } from "@/components/dashboard/voucher-template";

export const metadata: Metadata = {
  title: "Fee Challan Voucher — SES Portal",
};

export default async function FeeVoucherPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireUser();
  const scope = branchScope(user);

  const invoice = await prisma.feeInvoice.findFirst({
    where: {
      id: params.id,
      ...(scope.branchId ? { student: { branchId: scope.branchId } } : {}),
    },
    include: {
      student: {
        include: {
          branch: true,
        },
      },
    },
  });

  if (!invoice) {
    notFound();
  }

  return <VoucherTemplate invoice={invoice} />;
}
