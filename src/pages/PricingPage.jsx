import PageTransition from "../components/PageTransition";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";

export default function PricingPage() {
  return (
    <PageTransition>
      <Pricing />
      <FAQ />
    </PageTransition>
  );
}
