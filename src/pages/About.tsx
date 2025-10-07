import { AboutBorn } from "@/components/feature/about/AboutBorn";
import { AboutEthics } from "@/components/feature/about/AboutEthics";
import { AboutImpact } from "@/components/feature/about/AboutImpact";
import { AboutMission } from "@/components/feature/about/AboutMission";
import { AboutTeam } from "@/components/feature/about/AboutTeam";
import { AboutTitle } from "@/components/feature/about/AboutTitle";

export const About = () => {
  return (
    <div>
      <AboutTitle/>
      <AboutBorn/>
      <AboutMission/>
      <AboutEthics/>
      <AboutTeam/>
      <AboutImpact/>
    </div>
  );
}