import { Link } from "react-router";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "~/constants";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}

      <div className="flex flex-col items-center">
        <h1 className="heading sm:max-w-[60vw] lg:max-w-[45vw] text-center">
          Want to contribute to this project or have any suggestions?
        </h1>
        <a
          href="mailto:divyanshuverma@gmail.com"
          className="primary-button w-fit text-2xl items-center font-semibold mt-7 !rounded-lg flex gap-2"
        >
          Let's Connect
          <FaLocationArrow className="" />
        </a>
      </div>
      <div className="flex mt-16 mx-10 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light max-sm:mb-4">
          Copyright © 2025 Divyanshu Kumar Verma
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center bg-black rounded-lg border border-white"
            >
              <Link to={info.link}>
                <img src={info.img} alt="icons" width={20} height={20} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
