import { educationList, certifications } from "@/data/educationData";

const dashedX = {
  maskImage:
    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage:
    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
} as const;

export function Education() {
  const primaryDegree = educationList[0];
  const secondaryEducation = educationList.slice(1);

  return (
    <div className="relative pt-6 pb-2 grid gap-5 md:grid-cols-2">
      {/* College / University Card */}
      <div className="relative group">
        <div className="absolute -inset-[5px] rounded-[11px] border border-black/5 dark:border-white/5 pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
        <div className="relative flex flex-col h-full rounded-[6px] overflow-hidden bg-zinc-50 dark:bg-[#09090b] border border-black/5 dark:border-white/5 shadow-sm shadow-black/5 dark:shadow-lg dark:shadow-black/80">
          <div className="px-4 pt-3 pb-3">
            <h3 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {primaryDegree.school}
            </h3>
            <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{primaryDegree.degree}</p>
            <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-500">
              {primaryDegree.dates} · CGPA {primaryDegree.cgpa || primaryDegree.grade} {primaryDegree.location ? `· ${primaryDegree.location}` : ""}
            </p>
          </div>

          <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

          {primaryDegree.coursework && (
            <div className="px-4 py-3.5">
              <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-600">
                Relevant coursework
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {primaryDegree.coursework.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 bg-zinc-100 dark:bg-[#0a0a0a] border border-black/30 dark:border-white/[0.15] rounded-[6px] text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schooling & Certifications Card */}
      <div className="relative group">
        <div className="absolute -inset-[5px] rounded-[11px] border border-black/5 dark:border-white/5 pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
        <div className="relative flex flex-col h-full rounded-[6px] overflow-hidden bg-zinc-50 dark:bg-[#09090b] border border-black/5 dark:border-white/5 shadow-sm shadow-black/5 dark:shadow-lg dark:shadow-black/80">
          <div className="px-4 pt-3 pb-3">
            <h3 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Schooling &amp; Certifications
            </h3>
          </div>

          <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

          <ul className="flex flex-col">
            {secondaryEducation.map((edu, i) => (
              <li key={edu.degree}>
                {i > 0 && <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />}
                <div className="px-4 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{edu.degree}</p>
                    <span className="font-mono text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded border border-black/10 dark:border-white/10">
                      {edu.grade}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-500">
                    {edu.school} · {edu.dates}
                  </p>
                </div>
              </li>
            ))}

            {certifications.length > 0 && (
              <>
                <li className="px-4 pt-3 pb-1 border-t border-black/10 dark:border-white/10 bg-zinc-100/50 dark:bg-zinc-900/50">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Certifications &amp; Credentials
                  </span>
                </li>
                {certifications.map((c) => (
                  <li key={c.name}>
                    <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />
                    <div className="px-4 py-2.5">
                      <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{c.name}</p>
                      <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-500">
                        {c.date} · {c.issuer}
                        {c.note ? ` · ${c.note}` : ""}
                        {c.link && (
                          <>
                            {" · "}
                            <a
                              href={c.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-dotted underline-offset-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                            >
                              Verify
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
