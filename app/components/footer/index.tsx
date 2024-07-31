import Link from "next/link";
import Image from 'next/image';
import "./footer.css"

export default function SiteFooter() {
  return (
    <>
      <footer className="main-footer">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/"><p>okz</p></Link>
          </div>
        </div>
      </footer>
    </>
  );
};