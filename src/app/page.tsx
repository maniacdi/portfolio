import { redirect } from "next/navigation";

export default function RootRedirectPage() {
  // Redirect to default locale
  redirect("/es");
}
