import { ReactNode } from "react";

export default function MainContainer(props: {
  children: ReactNode | ReactNode[];
}) {
  return <main className="flex flex-col justify-start w-full h-fit gap-6 pt-16 px-8 py-8 z-1">{props.children}</main>;
}
