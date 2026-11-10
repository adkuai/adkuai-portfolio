import { ThemeToggle } from "@/components/theme-toggle";
import { GithubGraph } from "@/components/GithubGraph";
import { CurrentTime } from "@/components/CurrentTime";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ExperienceList } from "@/components/ExperienceList";
import { BlogList } from "@/components/BlogList";
import { Highlights } from "@/components/Highlights";
import { AnimeMusic } from "@/components/AnimeMusic";
import { Hackathons } from "@/components/Hackathons";
import { DsaStats } from "@/components/DsaStats";
import { Education } from "@/components/Education";
import { FooterBackground } from "@/components/FooterBackground";
import { TopNavbar } from "@/components/TopNavbar";
import { CommandMenu } from "@/components/command-menu";
import Link from "next/link";
import { bookingLink } from "@/data/links";
import { portfolio } from "~/portfolio.config";
import { CleanHash } from "@/components/CleanHash";
import { GuestbookNotes } from "@/components/GuestbookNotes";
import { getGuestbook } from "@/lib/stats/guestbook";
import { getBlogMetrics } from "@/lib/stats/blogs";
import { skillGroups } from "@/data/skillsData";
import { getSocialProfiles } from "@/lib/stats/socials";
import SoftPillButton from "@/components/pixel-perfect/soft-pill-button";
import { FlipCoverButton } from "@/components/pixel-perfect/flip-cover-button";
import SocialHoverCard from "@/components/pixel-perfect/social-hover-card";
import { BannerParticles } from "@/components/BannerParticles";
import Image from "next/image";
import { SiGithub, SiLeetcode, SiX, SiGmail, SiDiscord } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { MessageSquare } from "lucide-react";
import { ViewersCount } from "@/components/ViewersCount";
import { getViewsCount } from "@/lib/views";


const lightBannerPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 11'%3E%3Crect width='32' height='11' fill='%23d9e5e7'/%3E%3C/svg%3E";
const darkBannerPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 11'%3E%3Crect width='32' height='11' fill='%23071329'/%3E%3C/svg%3E";

export default async function Home() {
  const initialViews = getViewsCount();
  const socialProfiles = await getSocialProfiles();
  const guestbook = portfolio.sections.guestbook && portfolio.giscus.repoId
    ? await getGuestbook()
    : { notes: [], total: 0, stale: false };
  const blogMetrics = portfolio.sections.blog
    ? await getBlogMetrics()
    : { counts: {}, stale: false };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black relative overflow-x-hidden transition-colors duration-300">
      <CleanHash />

      {/* Frozen Fixed Top Horizontal Navigation */}
      <TopNavbar />

      {/* Main Full-Width Content Container with top padding for fixed navbar */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col pt-[72px] sm:pt-[84px] pb-16">

        {/* Banner Section */}
        <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xs bg-white dark:bg-black">
          <Image
            src="/banner-light.jpg"
            alt="Banner Light"
            fill
            fetchPriority="high"
            sizes="(min-width: 1200px) 1152px, 100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={lightBannerPlaceholder}
            className="object-cover object-center dark:hidden"
          />
          <Image
            src="/banner-dark.jpg"
            alt="Banner Dark"
            fill
            fetchPriority="high"
            sizes="(min-width: 1200px) 1152px, 100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={darkBannerPlaceholder}
            className="hidden object-cover object-center dark:block"
          />
          <BannerParticles />
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-[5] bg-gradient-to-t from-white/90 to-transparent dark:from-black/70 dark:to-transparent" />
          <div className="absolute bottom-3 right-3 z-10 pointer-events-auto">
            <CurrentTime />
          </div>
        </div>

        {/* Identity & About Section */}
        <div id="about" className="relative z-20 -mt-10 sm:-mt-12 px-2 sm:px-4 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end gap-4 sm:gap-5">
              <div className="relative p-[3px] rounded-[10px] sm:rounded-[12px] border-[1.5px] border-black/30 dark:border-white/[0.2] bg-white dark:bg-black shadow-md shrink-0">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[7px] sm:rounded-[9px] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src="/social2.jpg"
                    alt={portfolio.name}
                    width={240}
                    height={240}
                    quality={90}
                    preload
                    fetchPriority="high"
                    sizes="(min-width: 640px) 140px, 100px"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-end pb-1">
                <h1 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none mb-1.5 [text-shadow:-1.5px_0_0_rgba(0,200,255,0.3),1.5px_0_0_rgba(255,80,0,0.3)] dark:[text-shadow:-1.5px_0_0_rgba(0,200,255,0.6),1.5px_0_0_rgba(255,80,0,0.6)]">
                  {portfolio.name}
                </h1>
                <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                  <p className="text-[13px] sm:text-[14px] font-medium text-zinc-500 dark:text-zinc-400">
                    {portfolio.location}
                  </p>
                  <span className="text-zinc-300 dark:text-zinc-700 text-[10px] hidden sm:inline" aria-hidden="true">•</span>
                  <ViewersCount initialCount={initialViews} />
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 pb-1">
              <FlipCoverButton href={bookingLink} label="Book an intro call" />
              <Link href="/contact">
                <SoftPillButton
                  as="span"
                  variant="secondary"
                  className="px-3 py-1.5 !text-[12px]"
                >
                  <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Send an email
                  </div>
                </SoftPillButton>
              </Link>
              <SoftPillButton
                as="a"
                href={portfolio.resume}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="px-3 py-1.5 !text-[12px]"
              >
                <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Résumé
                </div>
              </SoftPillButton>
            </div>
          </div>

          {/* Authentic Bio & Bullets */}
          <div className="mt-5 max-w-4xl">
            <p className="text-[14px] sm:text-[15px] font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Software engineer. I build backend services, APIs, and reliable software systems.
            </p>

            <ul className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3 pl-3 sm:pl-4 space-y-1.5">
              <li className="flex gap-2">
                <span className="text-zinc-400 select-none">•</span>
                <span>Backend engineering, API design, databases, and building reliable software systems are what drive my curiosity, alongside emerging interests in cloud infrastructure and applied AI.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-zinc-400 select-none">•</span>
                <span>Developed projects such as an <span className="font-semibold text-zinc-900 dark:text-white">AI-powered medical document analysis platform</span>, <span className="font-semibold text-zinc-900 dark:text-white">API key management platform</span>, and <span className="font-semibold text-zinc-900 dark:text-white">resume analyzer</span>, applying practical software engineering concepts.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-zinc-400 select-none">•</span>
                <span>Currently focused on becoming a stronger <span className="font-semibold text-zinc-900 dark:text-white">Software Engineer</span>, building full-stack applications with <span className="font-semibold text-zinc-900 dark:text-white">Python, FastAPI, React, and PostgreSQL</span>, while exploring cloud technologies, DevOps, <span className="font-semibold text-zinc-900 dark:text-white">AI Engineering</span>, and open-source development.</span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="mt-6">
            <h2 className="text-[14px] text-zinc-500 mb-2">Here are my <span className="font-medium text-zinc-800 dark:text-zinc-200">socials</span></h2>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'GitHub', href: `https://github.com/${portfolio.handles.github}`, icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" fill="none"></path> },
                { name: 'Twitter', href: `https://x.com/${portfolio.handles.x}`, icon: <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M20 4l-6.768 6.768" stroke="currentColor" strokeWidth="2" fill="none" /> },
                { name: 'LinkedIn', href: `https://www.linkedin.com/in/${portfolio.handles.linkedin}/`, icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" fill="none"></path> },
                { name: 'LeetCode', href: `https://leetcode.com/u/${portfolio.handles.leetcode}` },
              ].map((social, i) => (
                <SocialHoverCard key={i} socialName={social.name} profile={socialProfiles[social.name]}>
                  <SoftPillButton
                    as="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="px-3 py-1.5 !text-[12px]"
                  >
                    <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {social.name === 'LeetCode' ? (
                        <SiLeetcode className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                          {social.icon}
                        </svg>
                      )}
                      {social.name}
                    </div>
                  </SoftPillButton>
                </SocialHoverCard>
              ))}

              <SoftPillButton
                as="a"
                href={portfolio.resume}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="px-3 py-1.5 !text-[12px]"
              >
                <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Résumé
                </div>
              </SoftPillButton>
            </div>
          </div>
        </div>

        {/* Experiences */}
        <div id="experience" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative">
            <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Experiences</h2>
            {/* Bottom full-width line */}
            <div
              className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none"
              style={{
                maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
                WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
              }}
            />
            {/* Bottom Line Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <div className="block mt-0">
            <ExperienceList />

            {/* View All Button */}
            <div className="py-4 px-4 -mx-4 flex justify-center relative hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer rounded-b-lg mt-0">
              <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
              {/* Bottom Line Intersections */}
              <div className="absolute bottom-0 left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <div className="absolute bottom-0 right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <Link href="/experience" className="relative group block mt-0">
                <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
                <div className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                  View All
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div id="projects" className="mt-0 flex flex-col relative z-10 scroll-mt-24">
          <div className="py-2 relative mt-1">
            <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Projects</h2>

            {/* Horizontal line below Projects heading */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 left-1/2 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          {/* Grid Container */}
          <div className="relative pt-6 pb-12 px-4">
            {/* Center Vertical Line */}
            <div className="absolute top-0 bottom-6 left-1/2 w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none -translate-x-1/2 hidden md:block" style={{ maskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)' }} />

            <ProjectsGrid />

            {/* Bottom Horizontal Line */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            {/* Center dot removed to prevent crossing the outline gap of the View All button */}
          </div>

          {/* View All Button */}
          <div className="flex justify-center -mt-[19px] pb-0 relative z-20">
            <Link href="/projects" className="relative group block">
              <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
              <div className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                View All
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </Link>
          </div>
        </div>


        {/* Hackathons */}
        <div id="hackathons" className="mt-6 flex flex-col relative z-10 scroll-mt-24">

          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Hackathons</h2>

            {/* Horizontal line below heading */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <Hackathons />
        </div>

        {/* Github Graph */}
        <GithubGraph />


        {/* DSA & Competitive Programming */}
        <div id="dsa" className="mt-6 flex flex-col relative z-10 scroll-mt-24">

          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">DSA &amp; Problem Solving</h2>

            {/* Horizontal line below heading */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <DsaStats />
        </div>


        {/* Skills */}
        <div id="skills" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Skills & Technologies</h2>

            {/* Horizontal line below Skills heading */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <div className="relative flex flex-col gap-5 pt-6 pb-2">
            {skillGroups.map((group) => (
              <div key={group.group}>
                <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                  {group.group}
                </p>
                {/* No `grow` here: it stretched the last row's chips across the
                    full width, so Git and Github read as giant odd buttons. */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const SkillIcon = skill.icon;

                    return (
                      <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#0a0a0a] dark:hover:bg-[#121214] border border-black/30 dark:border-white/[0.15] rounded-[6px] transition-colors duration-200 cursor-default">
                        <SkillIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-zinc-500 opacity-80" />
                        <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Education & Certifications */}
        <div id="education" className="mt-6 flex flex-col relative z-10 scroll-mt-24">

          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Education &amp; Certifications</h2>

            {/* Horizontal line below heading */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <Education />
        </div>

        {/* Blogs */}
        {portfolio.sections.blog && (
          <div id="blogs" className="mt-6 flex flex-col relative scroll-mt-24">
            {/* Top full-width line */}
            <div
              className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
              style={{
                maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
                WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
              }}
            />
            {/* Top Line Intersections */}
            <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

            <div className="py-2 relative mt-1">
              <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Blogs</h2>

              {/* Horizontal line below Blogs heading */}
              <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
              {/* Intersections */}
              <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            </div>

            <BlogList counts={blogMetrics.counts} />

            {/* View All Button */}
            <div className="py-4 px-4 -mx-4 flex justify-center relative hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer rounded-b-lg mt-0">
              <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
              {/* Bottom Line Intersections */}
              <div className="absolute bottom-0 left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <div className="absolute bottom-0 right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />

              <Link href={`https://www.linkedin.com/in/${portfolio.handles.linkedin}/recent-activity/all/`} target="_blank" rel="noopener noreferrer" className="relative group block mt-0">
                <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
                <div className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                  View All
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Anime & Music */}
        {portfolio.sections.anime && (
          <div id="anime" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
            {/* Top full-width line */}
            <div
              className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
              style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }}
            />
            {/* Top Line Intersections */}
            <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

            <div className="py-2 relative mt-1">
              <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Anime &amp; Music</h2>

              {/* Horizontal line below heading */}
              <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
              {/* Intersections */}
              <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            </div>

            <AnimeMusic />
          </div>
        )}

        {/* Highlights */}
        <div id="highlights" className="mt-6 flex flex-col relative z-10 scroll-mt-24">
          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Highlights</h2>

            {/* Horizontal line below heading */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          <Highlights />

          {/* View All Button */}
          <div className="py-4 px-4 -mx-4 flex justify-center relative hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors rounded-b-lg mt-2">
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            <div className="absolute bottom-0 left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />

            <Link href="/highlights" className="relative group block">
              <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
              <div className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                View All
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Guestbook notes */}
        {portfolio.sections.guestbook && (
          <div id="guestbook" className="mt-6 flex flex-col relative scroll-mt-24">
            <div
              className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
              style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }}
            />
            <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

            <div className="py-2 relative mt-1">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Guestbook</h2>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
                  {guestbook.total > 0 ? `${String(guestbook.total).padStart(2, "0")} notes` : "via GitHub"}
                </span>
              </div>
              <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
              <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
              <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            </div>

            <div className="pt-5 pb-2">
              <GuestbookNotes notes={guestbook.notes} total={guestbook.total} />
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div id="contact" className="mt-8 flex flex-col relative z-10 scroll-mt-24">
          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Top Line Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <div className="py-2 relative mt-1">
            <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Contact</h2>

            {/* Horizontal line below Contact heading */}
            <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
            {/* Intersections */}
            <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
            <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
          </div>

          {/* 4 Circle Icons */}
          <div className="py-8 sm:py-10 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {[
                {
                  name: "LinkedIn",
                  href: `https://www.linkedin.com/in/${portfolio.handles.linkedin}/`,
                  icon: <FaLinkedinIn className="w-5 h-5 text-zinc-700 dark:text-zinc-200 group-hover:text-[#0077b5] dark:group-hover:text-[#0077b5] transition-colors" />,
                },
                {
                  name: "Twitter",
                  href: `https://x.com/${portfolio.handles.x}`,
                  icon: <SiX className="w-4 h-4 text-zinc-700 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors" />,
                },
                {
                  name: "Gmail",
                  href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(portfolio.email)}`,
                  icon: <SiGmail className="w-4 h-4 text-zinc-700 dark:text-zinc-200 group-hover:text-[#ea4335] transition-colors" />,
                },
                {
                  name: "Discord",
                  href: "https://discord.gg/Kb2xutK4C",
                  icon: <SiDiscord className="w-5 h-5 text-zinc-700 dark:text-zinc-200 group-hover:text-[#5865F2] transition-colors" />,
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className="group relative flex size-12 sm:size-14 items-center justify-center rounded-full border border-black/15 dark:border-white/15 bg-zinc-50 dark:bg-[#09090b] shadow-sm shadow-black/5 dark:shadow-black/60 transition-all duration-300 hover:scale-110 hover:border-black/30 dark:hover:border-white/30 hover:bg-zinc-100 dark:hover:bg-[#141416]"
                >
                  <div className="absolute -inset-[3px] rounded-full border border-black/5 dark:border-white/5 pointer-events-none transition-colors duration-300 group-hover:border-black/15 dark:group-hover:border-white/20" />
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Quote Section */}
        <div className="mt-2 flex flex-col items-center justify-center relative py-6">
          <div className="max-w-[560px] w-full flex flex-col items-center">
            <h3 className="text-[15px] sm:text-[16px] font-medium text-center leading-relaxed text-zinc-500 dark:text-zinc-400 mb-6 italic">
              &quot;Obsession + pattern recognition + not giving a f*ck + delusional optimism is the highest form of intelligence.&quot;
            </h3>

            <div className="flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase">
              <div className="w-4 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
              TIM DENNING
              <div className="w-4 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* Source + guestbook links */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-6">
          {portfolio.giscus.repoId && (
            <Link
              href="/guestbook"
              className="group inline-flex items-center gap-2 rounded-[6px] border border-black/5 bg-zinc-50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-zinc-700 dark:border-white/5 dark:bg-[#09090b] dark:text-zinc-600 dark:hover:text-zinc-300"
            >
              <MessageSquare className="h-3 w-3" aria-hidden="true" />
              Sign the guestbook
            </Link>
          )}
          {portfolio.repo && (
            <a
              href={portfolio.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-[6px] border border-black/5 bg-zinc-50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-zinc-700 dark:border-white/5 dark:bg-[#09090b] dark:text-zinc-600 dark:hover:text-zinc-300"
            >
              <SiGithub className="h-3 w-3" aria-hidden="true" />
              Source on GitHub
            </a>
          )}
        </div>

        {/* Fading Grid Filler */}
        <div className="flex-grow w-[calc(100%+32px)] -mx-4 h-[300px] relative mt-4">
          {/* Top full-width line */}
          <div
            className="absolute top-0 left-[-100vw] right-[-100vw] h-0 border-t border-black/30 dark:border-white/[0.15] pointer-events-none z-10"
            style={{
              maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)',
              WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)'
            }}
          />
          {/* Intersections */}
          <div className="absolute top-0 left-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-[2px] h-[2px] bg-black/50 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />

          <FooterBackground />
        </div>

      </main>

    </div>
  );
}
