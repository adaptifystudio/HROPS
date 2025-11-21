import { redirect } from "next/navigation";

export default function AssessmentIndex() {
  // Redirect to the start page
  redirect("/assessment/start");
  return null;
}
