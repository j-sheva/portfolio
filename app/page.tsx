import home from "@/content/home.json";

// Temporary placeholder until phase 1 builds the real layout.
export default function Home() {
  return (
    <main>
      <h1>{home.meta.name}</h1>
      <p>{home.meta.description}</p>
    </main>
  );
}
