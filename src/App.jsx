import ResumeUpload from "./components/ResumeUpload";
function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          AI CareerPilot
        </h1>

        <button className="bg-cyan-500 px-5 py-2 rounded-lg hover:bg-cyan-600">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-6xl font-bold mb-6">
          Your AI-Powered
          <span className="text-cyan-400"> Placement Mentor</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Upload your resume, identify skill gaps,
          generate personalized learning roadmaps,
          and discover internships tailored for you.
        </p>

        <button className="mt-10 bg-cyan-500 px-8 py-4 rounded-xl text-lg hover:bg-cyan-600">
          Analyze Resume
        </button>
      </section>

      {/* Features */}
      <section className="pb-20 px-6">
        <ResumeUpload />
      </section>
      <section className="grid md:grid-cols-3 gap-8 px-10 pb-20">

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-3">
            Resume Analysis
          </h2>
          <p className="text-gray-400">
            AI evaluates your resume and gives a score.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-3">
            Skill Gap Detection
          </h2>
          <p className="text-gray-400">
            Discover missing skills required by industry.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-3">
            Internship Matching
          </h2>
          <p className="text-gray-400">
            Get AI-powered internship recommendations.
          </p>
        </div>

      </section>

    </div>
  );
}

export default App;