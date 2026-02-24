import React from "react";

import "./SectionHeader.scss";

interface Props {
  title: string;
  description?: string;
}

export const SectionHeader: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="section-header-wrapper">
      <h2 className="section-header-title">{title}</h2>
      {description && <p className="section-header-description">{description}</p>}
    </div>
  );
};
