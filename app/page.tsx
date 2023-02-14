import Footer from "@/components/Footer";
import GettingStarted from "@/components/GettingStarted";
import Landing from "@/components/Landing";
import MoreInfo from "@/components/MoreInfo";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <Landing />
      <GettingStarted />
      <MoreInfo />
      <Footer />
    </div>
  );
}
