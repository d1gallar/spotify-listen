import { useEffect, useState } from "react";

export type Slide = {
  color: string;
  image: string;
  title: string;
  content: string;
};

export default function useSliderControl(slides: Array<Slide>) {
  const [slideIndex, setSlideIndex] = useState(0);

  const updateIndex = (index: number) => {
    setSlideIndex(index);
  };

  const next = () => {
    if (slideIndex + 1 >= slides.length) setSlideIndex(0);
    else setSlideIndex(slideIndex + 1);
  };

  const prev = () => {
    if (slideIndex - 1 < 0) setSlideIndex(slides.length - 1);
    else setSlideIndex(slideIndex - 1);
  };

  const getSlide = () => slides[slideIndex];

  const getPrev = () => {
    if (slideIndex - 1 < 0) return slides[slides.length - 1];
    else return slides[slideIndex - 1];
  };

  const getNext = () => {
    if (slideIndex + 1 >= slides.length) return slides[0];
    else return slides[slideIndex + 1];
  };

  // useEffect(() => {
  //   console.log(slides[slideIndex], slideIndex);
  // }, [slideIndex, slides]);

  return { updateIndex, next, prev, getSlide, slides, getPrev, getNext, slideIndex};
}
