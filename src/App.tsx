import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { History } from "./components/History";
import { Attractions } from "./components/Attractions";
import { InteractiveMap } from "./components/InteractiveMap";
import { LocalServices } from "./components/LocalServices";
import { PhotoGallery } from "./components/PhotoGallery";
import { EducationEvents } from "./components/EducationEvents";
import { EssentialServices } from "./components/EssentialServices";
import { CityInfo } from "./components/CityInfo";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./components/context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <History />
          <Attractions />
          <InteractiveMap />
          <LocalServices />
          <PhotoGallery />
          <EducationEvents />
          <EssentialServices />
        </main>
        <Footer />
        {/* Floating Chatbot Assistant */}
        <CityInfo />
      </div>
    </LanguageProvider>
  );
}