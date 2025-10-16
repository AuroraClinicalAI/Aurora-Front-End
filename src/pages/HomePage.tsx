import { Introduction, Caracteristics, AboutSystem, Resources, CallToAction } from "@/components/feature/home";

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
