import Link from "next/link";
import Image from 'next/image';
import styles from "@/app/ui/footer/footer.module.css"

export default function SiteFooter() {
  return (
    <>
      <footer className={styles.footer}>
        <div className="container mx-auto h-full">
          <div className="flex justify-between items-center h-full px-4">
            <Link href="/"><span className="text-xl">&#8859;</span></Link>
            <ul>
              <li>
                <a 
                  href="https://bsky.app/profile/okize.me"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                    <Image src="/icons/bluesky.svg" width={20} height={20} alt="Bluesky Icon" />
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/okizemeapp"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                    <Image src="/icons/x.svg" width={20} height={20} alt="X (Twitter) Icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};