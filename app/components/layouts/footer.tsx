'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { GithubIcon } from './icons/github-icon';
import { InstagramIcon } from './icons/instagram-icon';
import { LinkedinIcon } from './icons/linkedin-icon';
import { XIcon } from './icons/x-icon';
import SectionContainer from './section-container';

export default function Footer() {
  const linkedinRef = useRef<any>(null);
  const githubRef = useRef<any>(null);
  const instagramRef = useRef<any>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    // Trigger animation on mount
    linkedinRef.current?.startAnimation?.();
    githubRef.current?.startAnimation?.();
    instagramRef.current?.startAnimation?.();

    // Set up interval to animate every 5 seconds when not hovering
    const interval = setInterval(() => {
      if (!hoveringRef.current) {
        linkedinRef.current?.startAnimation?.();
        githubRef.current?.startAnimation?.();
        instagramRef.current?.startAnimation?.();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionContainer>
      <footer>
        <div className="mb-0 flex flex-col justify-start space-y-1.5 space-x-0 py-10 text-gray-500 dark:text-gray-400">
          <div className="flex flex-col items-center space-y-2 text-sm sm:flex-row sm:justify-between sm:text-base">
            <ul className="flex space-x-2">
              <li>{`© ${new Date().getFullYear()}`}</li>
              <li>{` • `}</li>
              <li>
                <Link href="/">Subash</Link>
              </li>
            </ul>
            <ul className="flex cursor-pointer items-center" onMouseEnter={() => { hoveringRef.current = true; }} onMouseLeave={() => { hoveringRef.current = false; }}>
              <li>
                <Link
                  href="https://www.linkedin.com/in/subashbaniyaa"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="linkedin"
                >
                  <LinkedinIcon ref={linkedinRef} className="h-9 w-9" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/subashbaniyaa/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github"
                >
                  <GithubIcon ref={githubRef} className="h-9 w-9" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/subashbaniyaa"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="twitter"
                >
                  <XIcon className="h-9 w-9" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/subashbaniyaa/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="instagram"
                >
                  <InstagramIcon ref={instagramRef} className="h-9 w-9" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </SectionContainer>
  );
}
