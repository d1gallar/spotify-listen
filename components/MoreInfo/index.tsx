import "./MoreInfo.css";

export default function MoreInfo() {
  return (
    <section
      className="min-w-[320px] flex justify-start bg-light-pink w-full h-fit bg-[url('/images/more-info.svg')] bg-no-repeat bg-right-bottom moreinfo-bg pb-[50%] px-6 pt-10 md:pb-10 p-6 md:px-10 md:min-h-full xl:h-full 2xl:px-80"
      id="more-info"
    >
      <div className="flex flex-col justify-start items-start h-full w-full sm:w-1/2 lg:w-2/5 gap-12 sm:gap-16 xl:justify-center">
        <h1 className="text-smoke-black font-semibold text-left">More Info</h1>
        <div className="w-full h-fit flex flex-col justify-start gap-2">
          <h4 className="text-smoke-black font-bold tracking-tight">
            An easier way to view what you’re listening now.
          </h4>
          <h5 className="text-smoke-black font-medium tracking-tight">
            This web app provides a dashboard just by signing in to your Spotify
            account.
          </h5>
        </div>
        <div className="w-full h-fit flex flex-col justify-start gap-2">
          <h4 className="text-smoke-black font-bold tracking-tight">
            View how many minutes you spend listening to your favorite artists.
          </h4>
          <h5 className="text-smoke-black font-medium tracking-tight">
            Prepare yourself for next year’s Spotify Wrapped and create a
            playlist based on your personal charts.
          </h5>
        </div>
        <div className="w-full h-fit flex flex-col justify-start gap-2">
          <h4 className="text-smoke-black font-bold tracking-tight">
            Find out what songs you have recently listened to.
          </h4>
          <h5 className="text-smoke-black font-medium tracking-tight">
            Checkout your recently played songs with timestamps.
          </h5>
        </div>
      </div>
    </section>
  );
}
