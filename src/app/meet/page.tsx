import { redirect } from "next/navigation";

// Zoom meetings are now auto-created per booking via the n8n workflow.
// This page redirects to the homepage as a fallback.
export default function MeetPage() {
  redirect("/");
}
