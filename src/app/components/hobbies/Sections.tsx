import { HobbySection } from "@/utils/types/Hobby";
import { HobbyCard } from "./HobbyCard";
import { SectionHeader } from "./SectionHeader";
import { useTranslations } from "next-intl";
import "./Sections.scss";

interface Props {
  section: HobbySection;
}

export const Sections = ({ section }: Props) => {
  const t = useTranslations("hobbies");

  return (
    <div className="section-wrapper">
      <SectionHeader 
        title={section.title} 
        description={t(`${section.id}.description` as any)} 
      />

      <div className="cards-grid">
        {section.items.map((item) => (
          <HobbyCard key={item.slug || item.id} item={item} />
        ))}
      </div>
    </div>
  );
};