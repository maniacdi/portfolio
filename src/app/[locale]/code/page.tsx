import Code from "@/app/components/code/Code";
import "@/styles/page.scss";

export default async function CodePage({ params }: { params: Promise<{ locale: string }> }) {

  return (
      <Code />
  );
}
