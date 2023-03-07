import Image from "next/image";
import { createRef } from "react";
import { useHorizontalOverflow } from "@/hooks/HorizontalOverflow";
import HighlightCard from "../HighlightCard";
import HighlightContainer from "../HighlightContainer";
import { ArtistHighlightSkeleton } from "../Skeletons";
import { Artist } from "@/types/spotify";

type ArtistHighlightsProps = {
  artists: Artist[];
};

export default function ArtistHighlights(props: ArtistHighlightsProps) {
  const topArtistOneRef = createRef<HTMLDivElement>();
  const topArtistTwoRef = createRef<HTMLDivElement>();
  const topArtistThreeRef = createRef<HTMLDivElement>();

  const isTopArtistOneOverflowed = useHorizontalOverflow(topArtistOneRef);
  const isTopArtistTwoOverflowed = useHorizontalOverflow(topArtistTwoRef);
  const isTopArtistThreeOverflowed = useHorizontalOverflow(topArtistThreeRef);

  const [firstArtist, secondArtist, thirdArtist] = props.artists;
  if (!props.artists) return <ArtistHighlightSkeleton />;
  return (
    <HighlightContainer>
      <HighlightCard className="bg-mint-green">
        <div className="w-full flex flex-row justify-start items-start gap-4">
          <a
            target="_blank"
            href={firstArtist.external_urls.spotify}
            className="hover:cursor-pointer"
          >
            <Image
              className="min-w-[120px]"
              src={firstArtist.images[0].url}
              width={120}
              height={120}
              alt={firstArtist.name || ""}
              draggable={false}
            />
          </a>
          <div className="w-full flex flex-col justify-start items-start overflow-x-hidden">
            <div
              className="w-full max-w-full h-fit relative"
              ref={topArtistOneRef}
            >
              <h3
                className={`w-fit font-circular text-white font-bold tracking-[-0.04em] whitespace-nowrap relative overflow-y-none overflow-x-hidden cursor-default ${
                  isTopArtistOneOverflowed && "hover:animate-slideText"
                }`}
              >
                {`1. ${firstArtist.name}`}
              </h3>
            </div>
          </div>
        </div>
      </HighlightCard>
      <HighlightCard className="bg-bright-purple">
        <div className="w-full flex flex-row justify-start items-start gap-4">
          <a
            target="_blank"
            href={secondArtist.external_urls.spotify}
            className="hover:cursor-pointer"
          >
            <Image
              className="min-w-[120px]"
              src={secondArtist.images[0].url}
              width={120}
              height={120}
              alt={secondArtist.name || ""}
              draggable={false}
            />
          </a>
          <div className="w-full flex flex-col justify-start items-start overflow-x-hidden">
            <div
              className="w-full max-w-full h-fit relative"
              ref={topArtistTwoRef}
            >
              <h3
                className={`w-fit font-circular text-white font-bold tracking-[-0.04em] whitespace-nowrap relative overflow-y-none overflow-x-hidden cursor-default ${
                  isTopArtistTwoOverflowed && "hover:animate-slideText"
                }`}
              >
                {`2.  ${secondArtist.name}`}
              </h3>
            </div>
          </div>
        </div>
      </HighlightCard>
      <HighlightCard className="bg-bright-maroon">
        <div className="w-full flex flex-row justify-start items-start gap-4">
          <a
            target="_blank"
            href={thirdArtist.external_urls.spotify}
            className="hover:cursor-pointer"
          >
            <Image
              className="min-w-[120px]"
              src={thirdArtist.images[0].url}
              width={120}
              height={120}
              alt={thirdArtist.name || ""}
              draggable={false}
            />
          </a>
          <div className="w-full flex flex-col justify-start items-start overflow-x-hidden">
            <div
              className="w-full max-w-full h-fit relative"
              ref={topArtistThreeRef}
            >
              <h3
                className={`w-fit font-circular text-white font-bold tracking-[-0.04em] whitespace-nowrap relative overflow-y-none overflow-x-hidden cursor-default ${
                  isTopArtistThreeOverflowed && "hover:animate-slideText"
                }`}
              >
                {`3.  ${thirdArtist.name}`}
              </h3>
            </div>
          </div>
        </div>
      </HighlightCard>
    </HighlightContainer>
  );
}
