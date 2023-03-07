export default function PlaylistContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {

  return <section className="bg-[#00000036] py-4 -mx-8 px-8 h-fit">
    {children}
  </section>
}
