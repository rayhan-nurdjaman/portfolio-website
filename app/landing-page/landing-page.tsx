import { useState, useEffect } from "react";
import { ChevronsDown } from "lucide-react";

export default function LandingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const carousel = [
    {
      image: "/me.jpg",
      title: "Rayhan",
    },
    {
      image: "/screenshots/cycloidal-drive/cycloidal-drive.jpg",
      title: "an engineer",
    },
    {
      image: "/screenshots/oxiide/modern-oxiide.png",
      title: "a developer",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carousel.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col-reverse md:flex-row h-screen">
      <div className="flex flex-1 items-center px-8 pt-4 md:py-0 md:pr-4">
        <div className="pb-24 md:pb-0">
          <p className="text-4xl xl:text-7xl italic select-none">Hello, I'm</p>

          <div className="relative text-6xl xl:text-9xl text-bold font-bold italic select-none">
            <p className="text-transparent">{carousel[1]["title"]}</p>
            {carousel.map((item, index) => (
              <p
                key={index}
                className={`absolute bottom-0 transition-[filter,opacity] duration-500 ease-in-out ${
                  index == currentIndex
                    ? "text-white blur-none"
                    : "text-transparent blur-lg"
                }`}
              >
                {item["title"]}
              </p>
            ))}
          </div>

          {children}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center pt-8 pb-4 md:py-0 px-8 md:pl-4">
        <div className="relative w-fit h-full md:w-full md:h-fit aspect-square rounded-full">
          {carousel.map((item, index) => (
            <img
              key={index}
              src={item.image}
              className={`absolute aspect-square w-full rounded-full object-cover transition-[filter,opacity] duration-500 ease-in-out ${
                index == currentIndex
                  ? "opacity-100 blur-none"
                  : "opacity-0 blur-lg"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll down */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <p className="text-xl font-bold">Scroll down</p>
        <ChevronsDown className="mx-auto h-8 w-8" />
      </div>
    </div>
  );
}
