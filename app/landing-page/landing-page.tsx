import {
  ChevronsDown,
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowUpRight,
} from "lucide-react";

export default function LandingPage() {
  const skills = [
    "SolidWorks & GD&T",
    "Robotics & Actuators",
    "STM32 / Embedded",
    "C++ & CMake",
    "Rapid Prototyping",
    "Real-Time Engines",
  ];

  const links = [
    {
      name: "GitHub",
      href: "https://github.com/rayhan-nurdjaman",
      icon: <Github className="w-4 h-4" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/rayhan-nurdjaman/",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: "Email",
      href: "mailto:rayhan.nurdjaman@u.nus.edu",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      name: "Resume",
      href: "/Resume Rayhan Satrio Adi Nurdjaman.pdf",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 text-neutral-900 overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full max-w-7xl mx-auto my-auto">
        {/* Left Column: Messaging & Profile */}
        <div className="flex-1 max-w-2xl space-y-5 text-left">
          <div>
            <p className="font-instrument-serif italic text-3xl md:text-4xl text-neutral-500 mb-1">
              Hello World! I'm
            </p>
            <h1 className="font-instrument-serif text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 leading-none">
              Rayhan Nurdjaman
            </h1>
            <p className="text-xl md:text-2xl font-medium text-neutral-800 mt-3">
              Mechanical Engineer & Systems Developer
            </p>
            <p className="text-sm md:text-base font-semibold tracking-wide uppercase text-neutral-500 mt-1">
              Robotics Spec & Computing Minor • National University of Singapore
            </p>
          </div>

          <p className="text-neutral-600 text-base md:text-lg leading-relaxed pt-2">
            Bridging mechanical precision and low-level software. Experienced in
            designing backdrivable cycloidal actuators and waterproof AUV
            sub-assemblies in{" "}
            <strong className="font-semibold text-neutral-900">
              SolidWorks
            </strong>
            , paired with building real-time simulation engines and motor
            firmware in{" "}
            <strong className="font-semibold text-neutral-900">C++</strong> and{" "}
            <strong className="font-semibold text-neutral-900">STM32</strong>.
          </p>

          {/* Social / Action Links */}
          <div className="flex flex-wrap gap-3 pt-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 shadow-sm hover:text-neutral-950 hover:border-neutral-400 hover:shadow transition-all group"
              >
                {link.icon}
                <span>{link.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Square Showcase & Skill Badges */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg">
          {/* Square Image / GIF Frame */}
          <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] overflow-hidden border border-neutral-200 bg-neutral-900 shadow-2xl group">
            <img
              src="/screenshots/cycloidal-drive/VID_20260205_234147_2.gif"
              alt="20:1 Cycloidal Actuator Assembly"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle Overlay Tag */}
            <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md px-3 py-1 border border-neutral-700/50 text-white text-xs font-mono">
              20:1 Cycloidal Actuator • SolidWorks
            </div>
          </div>

          {/* Skill Badges (Placed below image) */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-[480px]">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 bg-white text-neutral-700 text-xs md:text-sm font-medium border border-neutral-200/90 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex flex-col items-center mt-8 lg:mt-0 lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer">
        <span className="text-xs uppercase tracking-widest font-semibold mb-1">
          Scroll Down
        </span>
        <ChevronsDown className="h-5 w-5 animate-bounce" />
      </div>
    </div>
  );
}
