import Link from "next/link";
import Image from 'next/image';
import "./footer.css"

export default function SiteFooter() {
  return (
    <>
      <footer className="main-footer">
        <div className="container mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/"><span className="text-xl">&#8859;</span></Link>
            <span>don&apos;t think too hard.</span>
          </div>
        </div>
      </footer>
    </>
  );
};