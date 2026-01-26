import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";

import Button from "../components/button";
import ContentWrapper from "../components/content-wrapper";

import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ChevronsDown, FileUser } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

function LandingPage({ children }: { children: React.ReactNode }) {
  const rotatingTexts = ["Rayhan", "an engineer", "a developer"];

  const accompanyingImages = [
    "/me.jpg",
    "/screenshots/cycloidal-drive.jpg",
    "/screenshots/photo-sorter.png",
  ];

  const carousel = [
    {
      image: "/me.jpg",
      title: "Rayhan",
    },
    {
      image: "/screenshots/cycloidal-drive.jpg",
      title: "Cycloidal Drive",
    },
    {
      image: "/screenshots/photo-sorter.png",
      title: "Photo Sorter",
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
    <div className="relative flex flex-row h-screen p-24 space-x-16">
      <div className="flex-1 flex flex-col justify-center space-y-4 h-full">
        <div className="drop-shadow-md italic whitespace-nowrap select-none">
          <p className="text-7xl">Hello, I'm</p>
          <div className="text-9xl font-bold">
            {/*Placeholder text to offset the above text accordingly.
  					Needed because absolute positioning doesn't describe size.
  					Decided to do this instead of h-XX since it's more adaptable*/}
            <p className="text-transparent">{rotatingTexts[currentIndex]}</p>
            {/*The actual morphing text visible to the user*/}
            {rotatingTexts.map((text, index) => (
              <p
                key={index}
                className={`absolute bottom-0 transition-all duration-500 ease-in-out ${index == currentIndex ? "text-white blur-none" : "text-transparent blur-lg"}`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
        {/*Body Text*/}
        {children}
      </div>

      {/*Accompanying Images*/}
      <div className="relative flex flex-col flex-1 justify-center">
        <div className="w-full object-cover aspect-square rounded-full drop-shadow-md" />
        {rotatingTexts.map((text, index) => (
          <img
            key={index}
            src={accompanyingImages[index]}
            className={`absolute w-full object-cover aspect-square rounded-full transition-all duration-500 ease-in-out ${index == currentIndex ? "opacity-100 blur-none" : "opacity-0 blur-lg"}`}
          />
        ))}
      </div>

      {/*Scroll down*/}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <p className="text-2xl font-bold">Scroll down</p>
        <ChevronsDown className="h-8 w-8 mx-auto" />
      </div>
    </div>
  );
}

function MyProjects() {
  const devlogs = [
    {
      title: "Cycloidal Drives",
      thumbnail: "/screenshots/cycloidal-drive.jpg",
      slug: "cycloidal-drives",
    },
    {
      title: "Software Renderer",
      thumbnail: "/screenshots/software-renderer/clay-and-sdl-gpu.jpg",
      slug: "software-renderer",
    },
    {
      title: "Gauss Chamber",
      thumbnail: "/screenshots/cycloidal-drive.jpg",
      slug: "gauss-chamber",
    },
    {
      title: "This Website",
      thumbnail: "/screenshots/cycloidal-drive.jpg",
      slug: "this-website",
    },
  ];

  return (
    <div className="w-full h-min-screen pt-12 space-y-4">
      <h1 className="text-8xl font-bold italic text-white drop-shadow-md w-fit mx-auto">
        My Projects
      </h1>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto pt-12 pb-8">
        {devlogs.map((post, index) => (
          <Link
            className="relative aspect-square"
            to={`/projects/${post.slug}`}
            key={index}
          >
            <img
              src={post.thumbnail}
              className="h-full object-cover rounded-xl"
              key={index}
            ></img>
            <div className="absolute inset-0 bg-linear-to-tr from-black/80 to-50% to-transparent"></div>
            <h2 className="absolute bottom-0 left-0 drop-shadow-lg text-7xl font-bold m-4">
              {post.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  // return <Welcome />;
  return (
    <ContentWrapper>
      <div className="font-instrument-serif">
        <LandingPage>
          <p className="text-3xl text-justify">
            A mechanical engineering student at the{" "}
            <span className="font-bold">National University of Singapore</span>.
            Experienced in CAD using{" "}
            <span className="font-bold">Solidworks</span>. Proficient in C++ and
            Python. Some filler text to fill the space. Lorem ipsum dolor sit
            amet.
          </p>
          <div className="flex flex-row space-x-4">
            <Button href="https://github.com/satiniize" external={true}>
              <Github className="h-8 w-8 mx-auto" />
            </Button>
            <Button
              href="https://www.linkedin.com/in/rayhan-nurdjaman"
              external={true}
            >
              <Linkedin className="h-8 w-8 mx-auto" />
            </Button>
            <Button href="mailto:rayhansat1210@gmail.com" external={true}>
              <Mail className="h-8 w-8 mx-auto" />
            </Button>
            <Button href="mailto:rayhansat1210@gmail.com" external={true}>
              <FileUser className="h-8 w-8 mx-auto" />
            </Button>
          </div>
        </LandingPage>
        <MyProjects />
      </div>
    </ContentWrapper>
  );
}
