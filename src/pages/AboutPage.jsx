import PageTransition from "../components/PageTransition";
import About from "../components/About";
import SocialProof from "../components/SocialProof";

export default function AboutPage() {
  return (
    <PageTransition>
      <About />
      <SocialProof />
    </PageTransition>
  );
}
