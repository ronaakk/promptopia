import Feed from "@/components/Feed"

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center text-center">
      <h1 className="head_text">
        Discover & Share
      </h1>
      {/* going to be hidden on screesn 768px and larger, (max-md targets breakpoints max-md and larger) */}
      <br className="max-md:hidden"/>
      <span className="orange_gradient text-2xl">
        AI-Powered Prompts
      </span>

      <p className="desc">
        Promptopia is an AI tool for the modern world to help discover, create, and share unique prompts
      </p>

      <Feed />
    </section>
  );
}
