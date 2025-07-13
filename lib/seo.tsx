// utils/seo.ts
import React, { FunctionComponent } from "react";

interface JsonLdProps {
  data: unknown;
}

export const JsonLd: FunctionComponent<JsonLdProps> = ({ data }) => {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
