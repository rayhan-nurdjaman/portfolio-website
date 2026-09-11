import { Link } from "react-router";
import { ArrowUpRight, Calendar, Layers } from "lucide-react";

export default function MyProjects() {
  const projects = [
    {
      title: "20:1 Cycloidal Actuator",
      subtitle: "Solo Developer, Actuators & Embedded",
      date: "Jan 2026 - Present",
      slug: "cycloidal-drives",
      thumbnail: "/screenshots/cycloidal-drive/VID_20260205_234147_2.gif",
      tagline: "High-Reduction Backdrivable Actuator with Custom STM32 Control",
      bullets: [
        "Designed and simulated a compact 20:1 cycloidal drive actuator in SolidWorks, achieving smooth backdrivable operation and <2° backlash via iterative 3D-printed prototyping.",
        "Developed custom open-loop motor drive circuitry and firmware using STM32 microcontrollers paired with NEMA 17 stepper motors.",
      ],
      skills: [
        "SolidWorks",
        "Actuators",
        "STM32",
        "C++",
        "3D Printing",
        "Motor Control",
      ],
    },
    {
      title: "Gauss Chamber — Circuit Solver Engine",
      subtitle: "Lead Developer, NUS Orbital 25 Artemis Team",
      date: "May 2025 - Aug 2025",
      slug: "orbital-25",
      thumbnail: "/screenshots/orbital-25/gauss-chamber.png",
      tagline:
        "SPICE-Inspired Physics Circuit Simulation Puzzle Game (Top 4% / 500 Teams)",
      bullets: [
        "Architected and developed Gauss Chamber in Godot, applying electromagnetism and circuit theory into interactive puzzle mechanics.",
        "Engineered a SPICE-inspired physically accurate circuit solver in GDScript leveraging linear algebra and behavioral patterns to achieve real-time 120 FPS performance.",
        "Instituted 2-week agile sprints, feature-branch workflows, and GitHub Actions CI/CD pipelines to enforce code quality and automated testing across milestones.",
      ],
      skills: [
        "Godot",
        "GDScript",
        "Linear Algebra",
        "Circuit Simulation",
        "CI/CD",
      ],
    },
    {
      title: "Hornet X AUV Sub-assemblies",
      subtitle: "Mech IC, Hornet X SAUVC Team",
      date: "Sep 2024 - Mar 2025",
      slug: "hornet-x",
      thumbnail: "/screenshots/hornet-x/hornet-x.jpg",
      tagline:
        "Autonomous Underwater Vehicle Mechanical Architecture & Waterproofing",
      bullets: [
        "Led an 8-person mechanical sub-team through the end-to-end design, CAD modeling, and assembly of the Hornet X robot for the Singapore Autonomous Underwater Vehicle Challenge (SAUVC).",
        "Restored the Hornet 9 predecessor robot to active working status by reverse engineering and 3D printing replacement components in SolidWorks, enabling concurrent software testing.",
        "Designed the internal chassis housing electronics, verified O-ring selection and tolerances for complete waterproofing, and resolved cross-subsystem assembly interference.",
      ],
      skills: [
        "SolidWorks",
        "GD&T",
        "Rapid Prototyping",
        "Waterproofing",
        "Assemblies",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen w-full px-6 md:px-16 lg:px-24 py-16 text-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="border-b border-neutral-300 pb-8 mb-12">
          <p className="font-instrument-serif italic text-2xl md:text-3xl text-neutral-500 mb-1">
            Engineering & Systems
          </p>
          <h1 className="font-instrument-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-none">
            Project Timeline
          </h1>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {projects.map((project, idx) => (
            <div key={project.slug} className="flex gap-6 sm:gap-10 group">
              {/* Left Timeline Bar & Marker */}
              <div className="flex flex-col items-center shrink-0">
                {/* Square Node on Timeline */}
                <div className="w-3.5 h-3.5 bg-neutral-900 border-2 border-neutral-50 shadow-sm mt-3 shrink-0 group-hover:bg-neutral-600 transition-colors" />
                {/* Connecting Line (hidden on the last item) */}
                {idx !== projects.length - 1 && (
                  <div className="w-px grow bg-neutral-300 my-2" />
                )}
              </div>

              {/* Project Card Content */}
              <div className="flex-1 pb-16">
                <div className="bg-white border border-neutral-200 shadow-sm p-6 sm:p-8 hover:border-neutral-400 hover:shadow-md transition-all">
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wider text-neutral-500 font-mono mb-2">
                    <span className="flex items-center gap-1.5 font-semibold text-neutral-700">
                      <Layers className="w-3.5 h-3.5" />
                      {project.subtitle}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {project.date}
                    </span>
                  </div>

                  {/* Main Grid: Info + Media */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
                    {/* Details Column */}
                    <div className="lg:col-span-7 space-y-4">
                      <Link
                        to={`/`}
                        className="inline-flex items-center gap-2 group/title"
                      >
                        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight group-hover/title:underline">
                          {project.title}
                        </h2>
                        <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover/title:text-neutral-900 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform" />
                      </Link>

                      <p className="text-sm font-medium text-neutral-600 italic">
                        {project.tagline}
                      </p>

                      <ul className="space-y-2 text-sm text-neutral-600 leading-relaxed list-disc list-outside pl-4">
                        {project.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 text-xs font-mono font-medium text-neutral-700 bg-neutral-100 border border-neutral-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Thumbnail Column */}
                    <div className="lg:col-span-5 w-full">
                      <Link
                        to={`/`}
                        className="block relative aspect-4/3 overflow-hidden border border-neutral-200 bg-neutral-900 group/img"
                      >
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          onError={(e) => {
                            // Fallback if local image doesn't exist yet
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />
                        <div className="absolute bottom-2 left-2 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 border border-neutral-700/50 text-white text-[11px] font-mono">
                          View Case Study →
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
