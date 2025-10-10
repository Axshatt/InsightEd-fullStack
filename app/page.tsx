'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="font-poppins bg-gradient-to-br from-sky-100 to-sky-200 text-gray-900 min-h-screen overflow-x-hidden">

      {/* Navbar */}
      <header className="flex justify-between items-center px-14 py-5 bg-white/40 backdrop-blur-md border-b border-white/20 shadow-md">
        <div className="flex items-center">
          <Image
            src="/insighted.png"
            alt="InsightEd Logo"
            width={80}
            height={80}
            className="mr-3 transition-transform duration-300 hover:rotate-6 hover:scale-105"
          />
          <h1 className="text-2xl text-blue-700 tracking-wide font-semibold">InsightEd</h1>
        </div>

        <nav>
          <ul className="flex space-x-8">
            <li><a href="#features" className="text-blue-700 font-medium hover:text-blue-900 hover:drop-shadow">Features</a></li>
            <li><a href="#about" className="text-blue-700 font-medium hover:text-blue-900 hover:drop-shadow">About</a></li>
            <li><a href="#team" className="text-blue-700 font-medium hover:text-blue-900 hover:drop-shadow">Team</a></li>
          </ul>
        </nav>
      </header>


      {/* Hero Section */}
      <section className="flex flex-wrap justify-around items-center px-14 py-24 text-left">
        <div className="max-w-md animate-fadeIn">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">Unlock Insights, Elevate Education</h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Meet <strong>InsightEd</strong> — your AI-powered study buddy that helps you analyze performance,
            improve learning, and stay motivated.
          </p>
          <button
            onClick={() => router.push('/chat')}
            className="bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-800 transition-transform hover:-translate-y-0.5"
          >
            Start Chatting 🤖
          </button>
        </div>

        <div className="animate-float">
          <Image src="/robot.png" alt="InsightEd Robot" width={320} height={320} />
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="text-center py-20 px-10 bg-white/80 rounded-t-[2.5rem]">
        <h3 className="text-3xl font-semibold text-blue-800 mb-12">Why Students Love InsightEd</h3>

        <div className="flex justify-center flex-wrap">
          {[
            {
              title: "📊 Smart Analysis",
              desc: "Understand your strengths and weaknesses instantly through personalized insights."
            },
            {
              title: "🧠 Personalized Study Tips",
              desc: "Get daily learning suggestions tailored to your academic performance."
            },
            {
              title: "💬 Simple Chat Interface",
              desc: "Talk to InsightEd just like a friend and get instant answers about your progress."
            }
          ].map((card, i) => (
            <div
              key={i}
              className="bg-sky-50 rounded-2xl w-64 m-4 p-6 shadow-lg hover:-translate-y-1 transition-transform"
            >
              <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
              <p className="text-gray-700 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="text-center py-16 px-6">
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">About InsightEd</h3>
        <p className="max-w-2xl mx-auto text-gray-700 leading-relaxed">
          InsightEd uses AI to make learning simpler and more effective. It helps students identify weak areas,
          track growth, and improve consistently — all through an engaging chat interface.
        </p>
      </section>


      {/* Team Section */}
      <section id="team" className="text-center py-16 px-6">
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">Team HACKMANTHAN</h3>
        <p className="max-w-2xl mx-auto text-gray-700 leading-relaxed">
          We&apos;re a group of passionate learners from DDUGU, building smart solutions to make education fun and insightful.
        </p>
      </section>


      {/* Footer */}
      <footer className="text-center bg-blue-700 text-white py-4 text-sm">
        © 2025 InsightEd | Built with 💙 by Team HACKMANTHAN
      </footer>
    </main>
  );
}
