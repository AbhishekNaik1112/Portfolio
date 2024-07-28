"use client";

import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { components } from "../index";
import Boundary from "@/app/components/boundary";
import {ShapeDisplay} from "./geometry";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {}, component);
    const tl = gsap.timeline();
    tl.fromTo(
      ".name-animation",
      { x: -100, opacity: 0, rotate: -10 },
      {
        x: 0,
        opacity: 1,
        rotate: 0,
        ease: "elastic.out(1, 0.3)",
        duration: 1,
        delay: 0.5,
        transformOrigin: "left top",
        stagger: {
          each: 0.1,
          from: "random",
        },
      }
    );
    tl.fromTo(
      ".tag-line",
      {
        y: 20,
        opacity: 0,
        scale: 1.5,
        delay: 0.5,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "elastic.out(0.5, 0.3)",
      }
    );
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Boundary>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        ref={component}
      >
        <div className="grid min-h-[50vh] grid-cols-1 md:grid-cols-2 items-center">
          <ShapeDisplay />
          <div className="cols-start-1 md:row-start-1">
            <h1 className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter aria-label={slice.primary.first_name + ' ' + slice.primary.last_name}">
              <span className="block text-lime-300">
                {renderLetters(slice.primary.first_name, "first")}
              </span>
              <span className="-mt-[.2em] block text-lime-500">
                {renderLetters(slice.primary.last_name, "last")}
              </span>
            </h1>
            <span className="tag-line block bg-gradient-to-tr from-gray-300 via-gray-500 to-gray-300 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
              {slice.primary.tag_line}
            </span>
          </div>
        </div>
      </section>
    </Boundary>
  );
};

export default Hero;
