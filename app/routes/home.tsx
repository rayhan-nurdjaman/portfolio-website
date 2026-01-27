import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

import Button from "../components/button";
import ContentWrapper from "../components/content-wrapper";

import LandingPage from "../landing-page/landing-page";
import ProjectShowcase from "../project-showcase/project-showcase";

import { Github, Linkedin, Mail, FileUser } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rayhan Nurdjaman" },
    { name: "description", content: "Have a look at my projects!" },
  ];
}

export default function Home() {
  // return <Welcome />;
  return (
    <ContentWrapper>
      <LandingPage>
        <p className="text-xl xl:text-3xl text-justify py-4">
          A mechanical engineering student at the{" "}
          <span className="font-bold">National University of Singapore</span>.
          Experienced in CAD using <span className="font-bold">Solidworks</span>
          . Proficient in C++ and Python.
        </p>
        <div className="flex flex-row space-x-4">
          <Button href="https://github.com/satiniize" external={true}>
            <Github className="h-6 w-6 xl:h-8 xl:w-8 mx-auto" />
          </Button>
          <Button
            href="https://www.linkedin.com/in/rayhan-nurdjaman"
            external={true}
          >
            <Linkedin className="h-6 w-6 xl:h-8 xl:w-8 mx-auto" />
          </Button>
          <Button href="mailto:rayhansat1210@gmail.com" external={true}>
            <Mail className="h-6 w-6 xl:h-8 xl:w-8 mx-auto" />
          </Button>
          <Button href="mailto:rayhansat1210@gmail.com" external={true}>
            <FileUser className="h-6 w-6 xl:h-8 xl:w-8 mx-auto" />
          </Button>
        </div>
      </LandingPage>
      <ProjectShowcase />
    </ContentWrapper>
  );
}
