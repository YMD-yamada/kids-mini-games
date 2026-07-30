import { notFound } from "next/navigation";
import { IslandPageClient } from "@/components/island-page-client";
import { ISLANDS, isIslandId } from "@/lib/islands";

export function generateStaticParams() {
  return ISLANDS.map((i) => ({ id: i.id }));
}

export default async function IslandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isIslandId(id)) notFound();
  return <IslandPageClient id={id} />;
}
