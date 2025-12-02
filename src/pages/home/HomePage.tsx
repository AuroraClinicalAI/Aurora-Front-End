import { Introduction, Caracteristics, AboutSystem, Resources, CallToAction } from "@/components/feature/home";
import { DefaultLayout } from "@/layout/DefaultLayout";

const HomePage = () => {
  return (
    <DefaultLayout>
      <div>
        <Introduction/>
        <Caracteristics/>
        <AboutSystem/>
        <Resources />
        <CallToAction/>
      </div>
    </DefaultLayout>
  );
}
export default HomePage;
