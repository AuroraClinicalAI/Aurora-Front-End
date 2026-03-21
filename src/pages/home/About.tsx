import { AboutTitle, AboutBorn, AboutMission, AboutEthics, AboutTeam, AboutImpact } from "@/components/feature/about";
import { DefaultLayout } from "@/layout/DefaultLayout";

export const About = () => {
  return (
    <DefaultLayout>
      <AboutTitle/>
      <AboutBorn/>
      <AboutMission/>
      <AboutEthics/>
      <AboutTeam/>
      <AboutImpact/>
    </DefaultLayout>
  );
}
