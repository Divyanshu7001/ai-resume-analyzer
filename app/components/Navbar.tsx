import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">ANALIZER</p>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>
        <Link
          to="https://github.com/Divyanshu7001/ai-resume-analyzer"
          className="w-10 h-10 cursor-pointer flex justify-center items-center bg-black rounded-full"
        >
          <img src="./icons/git.svg" alt="icons" width={20} height={20} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
