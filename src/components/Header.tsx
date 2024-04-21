"use client";
import React from "react";
import MagicButton from "./Magicbutton";
import Link from "next/link";

const Header = () => {
  return (
    <header className=" z-20 bg-transparent absolute w-full flex items-center md:justify-between justify-center px-20 text-white text-center py-4">
      <h1 className="text-4xl font-bold">opinionZ.com</h1>
      <div className=" hidden md:block">
        <Link href="/sign-in">
        <MagicButton name="Sign in" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
