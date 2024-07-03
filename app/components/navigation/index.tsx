import Link from "next/link";
import Image from 'next/image';
import SF6Mark from "@/public/street-fighter-6/sf6-logo.svg";
import "./navigation.css"

const Navbar = () => {
  return (
    <>
      <nav className="navigation">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/"><p>okz</p></Link>
            <ul className="hidden md:flex gap-x-6 text-slate-200">
              <li>
                <Link href="/street-fighter-6">
                  <p className="flex flex-row">
                    <Image className="mr-2" priority src={SF6Mark} alt="" width={18} height={18} />
                    <span>SF6</span>
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p>About</p>
                </Link>
              </li>
              <li>
                <Link href="/documentation">
                  <p>Documentation</p>
                </Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;