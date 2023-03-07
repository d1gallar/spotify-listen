import { Artist } from "@/types/spotify";

type ArtistsProps = {
  artists: Artist[];
};

export default function Artists(props: ArtistsProps) {
  if (props.artists.length === 0) return null;

  if (props.artists.length === 1) {
    const artist = props.artists[0];
    const artistHref = artist.external_urls.spotify;
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="font-circular text-xs tracking-tight text-[#B3B3B3] font-medium hover:underline"
        href={artistHref}
      >
        <p className="overflow-hidden text-ellipsis">{props.artists[0].name}</p>
      </a>
    );
  }

  const artistMap = props.artists.map((artist, i) => {
    const artistHref = artist.external_urls.spotify;
    return (
      <div
        className="flex flex-row whitespace-nowrap overflow-ellipsis"
        key={artist.id}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="font-circular text-xs tracking-tight text-[#B3B3B3] font-medium hover:underline"
          href={artistHref}
        >
          <p className="overflow-hidden text-ellipsis">{artist.name}</p>
        </a>
        <p className="font-circular text-xs tracking-tight text-[#B3B3B3] font-medium">
          {i !== props.artists.length - 1 ? ", " : ""}&nbsp;
        </p>
      </div>
    );
  });

  return <div className="flex flex-row">{...artistMap}</div>;
}
