import type { Metadata } from "next";
import PanelClient from "@/components/PanelClient";

export const metadata: Metadata = { title: "Panel interno", robots: { index: false, follow: false } };

export default function PanelPage() { return <PanelClient />; }
