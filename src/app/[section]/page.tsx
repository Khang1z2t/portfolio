import { PortfolioShowcase } from "@/app/_components/portfolio-showcase";
import { localizedContent } from "@/data/portfolio";

const trackedSections = [
  "about",
  "work",
  "skills",
  "how-i-work",
  "mindset",
  "contact",
  "cv",
];

export const dynamicParams = false;

export function generateStaticParams() {
  return trackedSections.map((section) => ({ section }));
}

export default function TrackedSectionPage() {
  return <PortfolioShowcase content={localizedContent} />;
}
