import Link from "next/link";
import Image from 'next/image';
import SF6Mark from "@/public/street-fighter-6/sf6-logo.svg";
import Riot2XKOMark from "@/public/2xko/2xko-logo-white.svg";
import "./navigation.css"

const Navbar = () => {
  return (
    <>
      <nav className="navigation">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/"><p>okz</p></Link>
            <ul className="flex gap-x-6 text-slate-200">
              <li>
                <Link href="/street-fighter-6">
                  <p className="flex flex-row game">
                    <Image className="mr-2" priority src={SF6Mark} alt="" width={18} height={18} />
                    <span>SF6</span>
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/2xko">
                  <p className="flex flex-row game">
                    <Image className="mr-2" priority src={Riot2XKOMark} alt="" width={22} height={22} />
                    <span>2XKO</span>
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p>About</p>
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