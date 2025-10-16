import { SearchBar, Title, Subtitle, Card } from "@/components/common/";
import Mind from "@assets/images/mind.svg";
import MindUpper from "@assets/images/mind_upper.svg";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};

export const Library = () => {
  return (
    <div>
      <div className="flex justify-center flex-col items-center max-w-[1440px] py-20 px-11 gap-4 w-full mx-auto">
        <div className="bg-indigo-300 rounded-full p-4">
          <img src={MindUpper} alt="Upper Mind Icon" />
        </div>
        <Title type="principal">Biblioteca de Recursos</Title>
        <Subtitle type="principal">Accede a artículos científicos, guías clínicas y material de estudio.</Subtitle>
        <div>
          <div>
            <SearchBar
              placeholder="Buscar Recursos..."
              onChange={() => {}}
              name="resourcesSearchBar"
              id="resourcesSearchBar"
              withIcon={true}
              type="primary"
            />
          </div>
          <div className="flex gap-4 my-8 flex-wrap justify-around">
            <Card
            icon={<MindIcon/>}
            title="Biblioteca de Recursos"
            subtitle="Accede a artículos científicos, guías clínicas y material de estudio."
            description="Colección curada de recursos académicos y clínicos para profundizar en el conocimiento sobre trastornos depresivos y su diagnóstico."
            buttonText="Explorar Biblioteca"
            onButtonClick={() => {}}
            align="left"
            size="medium"
            />
            <Card
            icon={<MindIcon/>}
            title="Biblioteca de Recursos"
            subtitle="Accede a artículos científicos, guías clínicas y material de estudio."
            description="Colección curada de recursos académicos y clínicos para profundizar en el conocimiento sobre trastornos depresivos y su diagnóstico."
            buttonText="Explorar Biblioteca"
            onButtonClick={() => {}}
            align="left"
            size="medium"
            />
            <Card
            icon={<MindIcon/>}
            title="Biblioteca de Recursos"
            subtitle="Accede a artículos científicos, guías clínicas y material de estudio."
            description="Colección curada de recursos académicos y clínicos para profundizar en el conocimiento sobre trastornos depresivos y su diagnóstico."
            buttonText="Explorar Biblioteca"
            onButtonClick={() => {}}
            align="left"
            size="medium"
            />
            <Card
            icon={<MindIcon/>}
            title="Biblioteca de Recursos"
            subtitle="Accede a artículos científicos, guías clínicas y material de estudio."
            description="Colección curada de recursos académicos y clínicos para profundizar en el conocimiento sobre trastornos depresivos y su diagnóstico."
            buttonText="Explorar Biblioteca"
            onButtonClick={() => {}}
            align="left"
            size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
