"use client";

import Image from "next/image";
import Link from "next/link";
import useSliderControl, { Slide } from "../../hooks/SliderControl";
import ScrollDownButton from "../ScrollDownButton";
import LandingSlider from "../LandingSlider";
import ProgressBar from "../ProgressBar";

const slides: Array<Slide> = [
  {
    color: "bg-light-blue",
    image: "/images/landing-image-1.svg",
    title: "Listen Here",
    content:
      "Find your inner passion for music through rhythm, melody, and harmony",
  },
  {
    color: "bg-dark-pink",
    image: "/images/landing-image-2.svg",
    title: "Find your genre",
    content: "Experience musical journeys through diverse musical genres",
  },
  {
    color: "bg-[#A7DA95]",
    image: "/images/landing-image-3.svg",
    title: "Find your music",
    content: "Unleash emotions through the power of musical expression",
  },
];

export default function Landing() {
  const { next, prev, getSlide, getPrev, getNext, slideIndex } =
    useSliderControl(slides);

  return (
    <section className="min-w-[320px] grid grid-rows-1 gap-4 items-center bg-dark-yellow w-full h-fit px-6 py-10 lg:grid-rows-none lg:grid-cols-[max-content_max-content_1fr] md:px-10 lg:gap-0">
      <div className="flex flex-row justify-start items-center h-fit w-full mr-0 gap-2 order-4 lg:order-none lg:h-full lg:flex-col lg:w-fit lg:mr-24 lg:justify-center col-span-1">
        <button className="p-3 hover:opacity-75" onClick={() => prev()}>
          <Image
            src="/images/previous.svg"
            alt="Previous Button"
            width="24"
            height="24"
            draggable={false}
          />
        </button>
        <button className="p-3 hover:opacity-75" onClick={() => next()}>
          <Image
            src="/images/next.svg"
            alt="Previous Button"
            width="24"
            height="24"
            draggable={false}
          />
        </button>
        <button className="p-3 hover:opacity-75">
          <Image
            src="/images/shuffle.svg"
            alt="Previous Button"
            width="20"
            height="20"
            draggable={false}
          />
        </button>
      </div>
      <div className="flex flex-row justify-start items-start gap-5 h-fit w-full col-start-1 order-2 lg:order-none lg:col-span-1 lg:w-fit lg:justify-center lg:items-center lg:h-full">
        <div className="w-full flex flex-col justify-start items-start gap-12 pr-0 max-w-[86vw] lg:pr-8 lg:max-w-xl">
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <p className="font-circular uppercase text-sm font-semibold tracking-tighter transition-opacity">
              {getSlide().title}
            </p>
            <p className="font-circular font-bold text-3xl lg:text-6xl transition-opacity">
              {getSlide().content}
            </p>
          </div>
          <div className="w-full flex flex-row justify-start">
            <Link
              className="px-6 py-3 font-circular text-lg text-center text-white uppercase bg-black rounded-full w-2/3 font-semibold tracking-wide hover:bg-[#1d1d1d]"
              href="/login"
            >
              Start Now
            </Link>
          </div>
        </div>
      </div>
      <LandingSlider slideInfo={{ next, prev, getSlide, getPrev, getNext }} />
      <div className="col-span-0 lg:col-span-1"></div>
      <div className="flex flex-row justify-between items-center h-fit order-5 gap-2 lg:order-none lg:col-span-2 w-full">
        <ProgressBar current={slideIndex + 1} max={3} />
        <div className="flex flex-row gap-4 justify-between items-center w-fit">
          <p className="font-circular font-medium uppercase tracking-tighter text-base xsm:text-lg">
            Scroll Down
          </p>
          <ScrollDownButton />
        </div>
      </div>
    </section>
  );
}
