import Link from 'next/link'
import Image from 'next/image';
 
export default function NotFound() {
  return (
    <div className='w-dvh h-dvh flex flex-col justify-center items-center'>
      <h2 className='font-display italic font-black mb-8'>404: Not Found</h2>
      <Image src="/twelve-disappear.gif" width="167" height="156" alt="gone" className='ml-8 mb-12' unoptimized />
      <Link href="/" className='button font-display uppercase' data-button="Return Home">Return Home</Link>
    </div>
  )
}