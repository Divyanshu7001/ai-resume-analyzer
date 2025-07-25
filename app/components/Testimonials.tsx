import React from "react";

import { testimonials } from "~/constants";
import { InfiniteMovingCards } from "./InfiniteCards";

const Testimonials = () => {
  return (
    <section id="testimonials" className="pt-10 ">
      <div className="flex items-center justify-center">
        <h1 className="page-heading ">Kind words from clients</h1>
      </div>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] lg:h-[35vh] lg:pt-10 md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
