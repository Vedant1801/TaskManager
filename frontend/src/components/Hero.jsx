export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[70vh] flex flex-col items-center justify-center bg-[#8AA6D9] text-white text-center px-4"
    >
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">
        Welcome to TaskManager
      </h1>

      <p className="text-lg max-w-2xl opacity-90">
        Manage your tasks smarter with a clean and secure task manager.
      </p>
    </section>
  );
}
