"use client";
import Footer from "@/components/Footer";
import GettingStarted from "@/components/GettingStarted";
import Landing from "@/components/Landing";
import MoreInfo from "@/components/MoreInfo";
import Navbar from "@/components/Navbar";
import RootLayout from "./layout";

export default function Home() {
  return (
    <RootLayout>
      <Navbar />
      <Landing />
      <GettingStarted />
      <MoreInfo />
      <Footer />
    </RootLayout>
  );
}
