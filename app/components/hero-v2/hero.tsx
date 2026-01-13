'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { merryWeather, gistesy, poppins } from '../../fonts';
import { BackgroundGradientAnimation } from '../background-gradient-animation';
import { GithubIcon } from '../layouts/icons/github-icon';
import { LinkedinIcon } from '../layouts/icons/linkedin-icon';
import { InstagramIcon } from '../layouts/icons/instagram-icon';
import { GalleryIcon } from '../layouts/icons/gallery-icon';
import Image from 'next/image';
import SplashCursor from '../splash-cursor';

export default function Hero() {
  const linkedinRef = useRef<any>(null);
  const githubRef = useRef<any>(null);
  const instagramRef = useRef<any>(null);
  const galleryRef = useRef<any>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    // Trigger animation on mount
    linkedinRef.current?.startAnimation?.();
    githubRef.current?.startAnimation?.();
    instagramRef.current?.startAnimation?.();
    galleryRef.current?.startAnimation?.();

    // Set up interval to animate every 5 seconds when not hovering
    const interval = setInterval(() => {
      if (!hoveringRef.current) {
        linkedinRef.current?.startAnimation?.();
        githubRef.current?.startAnimation?.();
        instagramRef.current?.startAnimation?.();
        galleryRef.current?.startAnimation?.();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SplashCursor
      containerClassName="min-h-svh w-screen"
      usePrimaryColors={true}
    >
      <main className="relative min-h-svh w-screen overflow-hidden">
        <div
          className={classNames('relative min-h-svh', merryWeather.className)}
        >
            <div className="absolute top-[15%] md:top-[25%] max-w-5xl flex-col space-y-4 justify-center px-8 md:px-24 text-shadow-lg lg:ml-14">
              <h1 className="font-serif text-2xl font-medium md:mr-4 md:text-4xl">
                <span>
                  Hi, welcome to my{' '}
                  <span className="font-bold">personal portfolio — </span> or, as I
                  like to call it, my{' '}
                  <span className="italic border-b">playground</span> on the web.
                </span>
              </h1>
              <section className="relative z-10">
                <p className={classNames("text-2xl md:text-3xl", gistesy.className)}>
                  I&apos;m <span className="font-semibold">Subash Baniya</span> ~ Web developer, designer and lifelong learner.
                </p>
              </section>
              <section className="relative z-10 flex space-x-4 items-center text-sm">
                <div>
                  <div className="flex -ml-2" onMouseEnter={() => { hoveringRef.current = true; }} onMouseLeave={() => { hoveringRef.current = false; }}>
                    <Link
                      href="https://www.linkedin.com/in/subashbaniyaa"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="linkedin"
                    >
                      <LinkedinIcon ref={linkedinRef} className="h-9 w-9" />
                    </Link>
                    <Link
                      href="https://github.com/subashbaniyaa"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="github"
                    >
                      <GithubIcon ref={githubRef} className="h-9 w-9" />
                    </Link>
                    <Link
                      href="https://instagram.com/subashbaniyaa"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="instagram"
                    >
                      <InstagramIcon ref={instagramRef} className="h-9 w-9" />
                    </Link>
                  </div>
                </div>
                <div className="h-14 border-l border-gray-300" />
                <div className="flex flex-wrap space-x-3 space-y-1 items-center">
                  <Link href="/articles" className={classNames("underline-magical bg-black/10 dark:bg-white/10 px-1 rounded-full", poppins.className)}>articles</Link>
                </div>
              </section>
              <div className="select-none pointer-events-none">
                <Image 
                  src="/OnePiece.gif" 
                  alt="One Piece" 
                  width={200} 
                  height={150} 
                  unoptimized 
                  className="rounded-xl"
                  draggable={false}
                />
              </div>
            </div>
          </div>
      </main>
    </SplashCursor>
  );
}
