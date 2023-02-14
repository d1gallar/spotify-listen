"use client";
import { Slide } from "@/hooks/SliderControl";
import Image from "next/image";
import "./LandingSlider.css";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useRef, useState } from "react";
import { useContainerDimensions } from "@/hooks/ContainerDimensions";

type LandingSliderProps = {
  slideInfo: {
    next: () => void;
    prev: () => void;
    getSlide: () => Slide;
    getPrev: () => Slide;
    getNext: () => Slide;
  };
};

export default function LandingSlider(props: LandingSliderProps) {
  const [drag, setDrag] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const divRef = useRef<HTMLDivElement>(null);
  const { width: divWidth } = useContainerDimensions(divRef);

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPos({ x: data.x, y: 0 });
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const breakPT = Math.floor((divWidth * 1) / 2);
    if (Math.abs(data.x) < breakPT) {
      setPos({ x: 0, y: 0 });
    } else {
      props.slideInfo.next();
      setPos({ x: 0, y: 0 });
    }
    setDrag(false);
  };

  return (
    <div className="landing-square-wrapper place-items-center order-1 md:order-none">
      <Draggable
        axis="x"
        onStart={() => setDrag(true)}
        onStop={(e, data) => handleDragStop(e, data)}
        onDrag={(e, data) => handleDrag(e, data)}
        position={pos}
      >
        <div
          className={`landing-square hover:cursor-grab ${
            props.slideInfo.getSlide().color
          } ${drag && "dragging"}`}
          ref={divRef}
          style={{ transition: drag ? `transform 0.05s` : `opacity 1s`,}}
        >
          <Image
            className="w-full h-full"
            src={`${props.slideInfo.getSlide().image}`}
            width="100"
            height="100"
            alt="Circular Graphic"
            unselectable="on"
            user-drag="none"
            draggable="false"
          />
        </div>
      </Draggable>
      <div className={`landing-square ${props.slideInfo.getNext().color}`}>
        <Image
          className="w-full h-full"
          src={`${props.slideInfo.getNext().image}`}
          width="100"
          height="100"
          alt="Circular Graphic"
          unselectable="on"
          user-drag="none"
          draggable="false"
        />
      </div>
      <div className={`landing-square ${props.slideInfo.getPrev().color}`}>
        <Image
          className="w-full h-full"
          src={`${props.slideInfo.getPrev().image}`}
          width="100"
          height="100"
          alt="Circular Graphic"
          unselectable="on"
          user-drag="none"
          draggable="false"
        />
      </div>
    </div>
  );
}
