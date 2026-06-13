import { useState } from "react";
import { analyzeResume } from "../services/aiService";

function ResumeUpload() {
  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState(""); // Holds the securely extracted text
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const internships = [
    {
      role: "Frontend Developer Intern",
      company: "TechNova Solutions",
      match: "92%",
      color: "bg-green-600",
    },
    {
      role: "Software Engineer Intern",
      company: "Infosys",
      match: "85%",
      color: "bg-yellow-600",
    },
    {
      role: "Full Stack Developer Intern",
      company: "TCS Digital",
      match: "80%",
      color: "bg-blue-600",
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);

      // Read any file format cleanly as text without external plugins
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setResumeText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!fileName) {
      alert("Please upload a resume first.");
      return;
    }

    setLoading(true);
    setShowResults(false);

    try {
      // Send the clean text structure directly to your AI pipeline
      const result = await analyzeResume(`Analyze this resume and return ONLY in this format:

Resume Score: XX/100

Top Skills:
- Skill 1
- Skill 2
- Skill 3

Missing Skills:
- Skill 1
- Skill 2
- Skill 3

Learning Roadmap:
1. Step One
2. Step Two
3. Step Three

Recommended Roles:
- Role 1
- Role 2
- Role 3

Internship Suggestions:
- Company 1
- Company 2
- Company 3

Keep response concise and professional.

Resume Content to Process:
${resumeText || "File profile: " + fileName}`);

      setAiResult(result || "AI analysis completed.");
      setShowResults(true);
    } catch (error) {
      console.error(error);
      setAiResult("Failed to get AI response. Please check your Netlify environment variables configuration.");
      setShowResults(true);
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-900 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto border border-slate-800">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        Upload Your Resume
      </h2>

      <label
        htmlFor="resume-upload"
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-cyan-500 rounded-2xl cursor-pointer hover:bg-slate-800 transition"
      >
        <div className="text-5xl mb-3">📄</div>

        <p className="text-lg font-semibold">
          Click to Upload Resume
        </p>

        <p className="text-gray-400 text-sm mt-2">
          PDF, DOC, DOCX
        </p>
      </label>

      <input
        id="resume-upload"
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      {fileName && (
        <div className="mt-6 p-4 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-gray-300">Selected File:</p>

          <p className="text-cyan-400 font-semibold mt-1 break-all">
            {fileName}
          </p>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-xl text-lg font-semibold"
      >
        Analyze Resume
      </button>

      {loading && (
        <div className="mt-6 bg-slate-800 p-6 rounded-xl text-center">
          <div className="animate-pulse">
            <h3 className="text-cyan-400 text-xl font-bold">
              🤖 AI Analyzing Resume...
            </h3>

            <p className="text-gray-400 mt-3">
              Detecting Skills
            </p>

            <p className="text-gray-400">
              Finding Skill Gaps
            </p>

            <p className="text-gray-400">
              Generating Learning Roadmap
            </p>
          </div>
        </div>
      )}

      {showResults && (
        <div className="mt-8 space-y-4">

          {/* AI Report */}

          <div className="bg-gradient-to-r from-cyan-900 to-slate-800 p-6 rounded-2xl border border-cyan-500 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
              🤖 AI Career Analysis
            </h3>

            <div className="bg-slate-900 p-5 rounded-xl max-h-[500px] overflow-y-auto">
              <p className="whitespace-pre-wrap text-gray-300 leading-8">
                {aiResult}
              </p>
            </div>
          </div>

          {/* Profile Card */}

          <div className="bg-slate-800 p-5 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-2xl font-bold">
                T
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Teja Vardhan
                </h3>

                <p className="text-gray-400">
                  B.Tech Student | AI CareerPilot User
                </p>
              </div>
            </div>
          </div>

          {/* Resume Score */}

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-400 mb-4 text-center">
              Resume Score
            </h3>

            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#1e293b"
                    strokeWidth="12"
                    fill="transparent"
                  />

                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#22c55e"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="440"
                    strokeDashoffset="79"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">
                    82%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}

          <div className="bg-slate-800 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-cyan-400 mb-2">
              Detected Skills
            </h3>

            <div className="flex gap-2 flex-wrap">
              <span className="bg-cyan-600 px-3 py-1 rounded-full">React</span>
              <span className="bg-cyan-600 px-3 py-1 rounded-full">Java</span>
              <span className="bg-cyan-600 px-3 py-1 rounded-full">Git</span>
            </div>
          </div>

          {/* Missing Skills */}

          <div className="bg-slate-800 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-red-400 mb-2">
              Missing Skills
            </h3>

            <ul className="list-disc ml-5 text-gray-300">
              <li>SQL</li>
              <li>AWS</li>
              <li>Docker</li>
            </ul>
          </div>

          {/* Roadmap */}

          <div className="bg-slate-800 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              Learning Roadmap
            </h3>

            <ul className="list-disc ml-5 text-gray-300">
              <li>Learn SQL</li>
              <li>Learn AWS</li>
            </ul>
          </div>

          {/* Internships */}

          <div className="bg-slate-800 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-purple-400 mb-4">
              Recommended Internships
            </h3>

            <div className="space-y-4">
              {internships.map((job, index) => (
                <div
                  key={index}
                  className="bg-slate-900 p-4 rounded-xl border border-slate-700"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg">
                        {job.role}
                      </h4>

                      <p className="text-gray-400">
                        {job.company}
                      </p>
                    </div>

                    <span
                      className={`${job.color} px-3 py-1 rounded-full text-white`}
                    >
                      {job.match} Match
                    </span>
                  </div>

                  <button className="mt-3 bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 font-semibold">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Download Report */}

          <button className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-xl font-bold text-white">
            Download AI Career Report
          </button>

        </div>
      )}
    </div>
  );
}

export default ResumeUpload;