import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <Link href="/">
          <h1 className="text-white text-2xl font-bold">ThePlace</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
