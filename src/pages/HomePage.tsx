import { AboutSystem } from "@/components/feature/home/AboutSystem";
import { Introduction } from "@/components/feature/home/Introduction";
import { Caracteristics } from "@/components/feature/home/Caracteristics";
import { Resources } from "@/components/feature/home/Resources";
import { CallToAction } from "@/components/feature/home/CallToAction";

const HomePage = () => {
  return (
    <>
      <div>
        <Introduction/>
        <Caracteristics/>
        <AboutSystem/>
        <Resources />
        <CallToAction/>
      </div>
    </>
  );
}
export default HomePage;