import Image from "next/image";

export default function GettingStarted() {
  return (
    <section
      className="bg-light-blue w-full h-fit py-10 px-6 min-w-[320px] xsm:px-10 sm:h-max md:min-h-full 2xl:px-80"
      id="getting-started"
    >
      <div className="flex flex-col justify-start items-center h-full md:h-[80vh] gap-10 md:justify-between md:gap-20 lg:gap-32 md:flex-row">
        <div className="flex flex-col justify-center items-start h-full w-full gap-8 sm:gap-14 md:gap-20">
          <h1 className="text-smoke-black font-semibold text-left text-4xl sm:text-5xl ">
            Getting Started
          </h1>
          <Image
            src="./images/getting-started.svg"
            alt="A person dancing to music."
            width="600"
            height="600"
          />
        </div>
        <div className="flex flex-col h-full w-fit justify-center gap-12">
          <div className="flex flex-col h-fit w-fit justify-center gap-6">
            <h3 className="text-smoke-black font-bold tracking-tight">
              Start listening now.
            </h3>
            <h4 className="text-smoke-black font-medium tracking-tight">
              Login to your Spotify account and discover your music taste. View
              your recent listens and how much time you spend on Spotify. Review
              your favorite songs and share with friends. To get started, click
              below.
            </h4>
          </div>
          <div className="flex flex-row justify-center md:justify-start">
            <button className="px-16 py-4 font-circular text-lg text-white uppercase bg-black rounded-full w-fit font-semibold tracking-wide hover:bg-[#1d1d1d]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
