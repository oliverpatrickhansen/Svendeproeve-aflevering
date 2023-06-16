import React, { useState } from "react";
import { motion, AnimatePresence, wrap } from "framer-motion";
import dummyData from "../dummyData";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function ImageCarousel({ slides }) {
  const [[page, direction], SetPage] = useState([0, 0]);

  const imageIndex = wrap(0, dummyData.length, page);

  const paginate = (newDirection) => {
    SetPage([page + newDirection, newDirection]);
  };

  return (
    <section className="flex  relative justify-center w-[100vw] h-[48rem]">
      <div
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-16 text-5xl text-sky-500 z-50 cursor-pointer select-none"
      >
        <FaArrowAltCircleRight />
      </div>
      <div
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-16 text-5xl text-sky-500 z-50 cursor-pointer select-none"
      >
        <FaArrowAltCircleLeft />
      </div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          className="absolute max-full flex overflow-hidden rounded-b-md"
          key={page}
          src={slides[imageIndex].image}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.y);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
    </section>
  );
}
