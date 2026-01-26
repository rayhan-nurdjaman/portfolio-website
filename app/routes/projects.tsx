import type { Route } from "./+types/projects";

import { useEffect, useState } from "react";

import ContentWrapper from "../components/content-wrapper";
import Button from "../components/button";

import { ChevronLeft } from "lucide-react";

import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

// export async function loader({ params }: Route.LoaderArgs) {
//   //                           ^? { teamId: string }
// }

export default function Component({ params }: Route.ComponentProps) {
  const slug = params.slug;
  //        ^ string

  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/devlogs/${slug}.md`);

        if (!response.ok) {
          console.log("piss");
          throw new Error(`Failed to fetch ${slug}.md: ${response.statusText}`);
        }

        const markdownText = await response.text();

        const options = {
          prefix: "",
        };

        marked.use(gfmHeadingId(options));
        const html = marked.parse(markdownText);
        setMarkdownContent(html);
      } catch (err) {
        throw new Error("Could not load the dev log content.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchMarkdown();
    }
  }, [slug]); // Re-run effect if slug changes

  if (loading) {
    return (
      <ContentWrapper>
        <div className="z-10 w-full h-screen flex flex-col items-center justify-center">
          <p>Loading dev log...</p>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <Button className="fixed m-8" href="/" external={false}>
        <ChevronLeft className="h-8 w-8 mx-auto" />
      </Button>
      <div className="p-8">
        <div
          className="drop-shadow-md bg-black/50 rounded-lg outline-2 outline-gray-800/40 p-8 max-w-6xl mx-auto prose prose-xl prose-invert text-justify font-instrument-sans w-full list-disc list-inside" // Add Tailwind Typography classes for styling
          dangerouslySetInnerHTML={{ __html: markdownContent }}
        />
      </div>
    </ContentWrapper>
  );
}
