import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";

import Button from "../components/button";
import ContentWrapper from "../components/content-wrapper";
import LandingPage from "../landing-page/landing-page";

import { Github, Linkedin, Mail, FileUser } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rayhan Nurdjaman" },
    { name: "description", content: "Have a look at my projects!" },
  ];
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
    <div className="w-full">
      <h1 className="z-10 pt-8 text-8xl font-bold italic text-white drop-shadow-md w-fit mx-auto">
        My Projects
      </h1>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto pt-8 pb-8">
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
      <LandingPage>
        <p className="text-2xl xl:text-3xl text-justify py-4">
          A mechanical engineering student at the{" "}
          <span className="font-bold">National University of Singapore</span>.
          Experienced in CAD using <span className="font-bold">Solidworks</span>
          . Proficient in C++ and Python. Some filler text to fill the space.
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
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
    </ContentWrapper>
  );
}
