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
  return (
    <ContentWrapper>
      <LandingPage />
      <ProjectShowcase />
    </ContentWrapper>
  );
}
