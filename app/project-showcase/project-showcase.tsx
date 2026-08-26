import { Link } from "react-router";

export default function MyProjects() {
  const devlogs = [
    {
      title: "Cycloidal Drives",
      thumbnail: "/screenshots/cycloidal-drive/cycloidal-drive.jpg",
      slug: "cycloidal-drives",
    },
    {
      title: "Oxiide",
      thumbnail: "/screenshots/oxiide/modern-oxiide.png",
      slug: "software-renderer",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <h1 className="z-10 text-7xl font-bold italic text-white drop-shadow-md w-fit mx-auto pt-8">
        My Projects
      </h1>
      <div className="grid grid-cols-2 gap-8 p-8 max-w-6xl mx-auto">
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
            <h2 className="absolute bottom-0 left-0 drop-shadow-lg text-4xl xl:text-7xl font-bold m-4">
              {post.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
