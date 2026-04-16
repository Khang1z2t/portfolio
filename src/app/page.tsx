import { PortfolioShowcase } from "@/app/_components/portfolio-showcase";
import { localizedContent } from "@/data/portfolio";

export default function Home() {
  return <PortfolioShowcase content={localizedContent} />;
}
