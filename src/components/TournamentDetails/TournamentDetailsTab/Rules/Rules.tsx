import { ScrollText } from 'lucide-react'

export default function Rules({ rules }: { rules: string }) {
  return (
    <div className="min-h-screen bg-[#121212] p-6 text-gray-200 container">
      <div className=" space-y-8">
        {/* Rules Header */}
        <div className="flex items-center gap-2 text-blue-400 mb-6">
          <ScrollText className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Rules</h1>
        </div>

        {/* Recent Changes Section */}
        <div className="space-y-4">
          <div dangerouslySetInnerHTML={{ __html: rules }} />
        </div>

        {/* Rules Sections */}
        <div className="space-y-4">
          {ruleSections.map((section, index) => (
            <div key={index} className="group">
              <button
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-left w-full py-2"
              >
                <span className="text-sm">•</span>
                {section.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


const ruleSections = [
  {
    title: "PC Players (MUST READ)",
    content: "Important information for PC players..."
  },
  {
    title: "Setting, Hosting, and Maps",
    content: "Rules for game settings and hosting..."
  },
  {
    title: "Restricted Items",
    content: "List of banned items and equipment..."
  },
  {
    title: "No Show",
    content: "Policies regarding player absence..."
  },
  {
    title: "Lag, Disconnects, and Glitches",
    content: "How to handle technical issues..."
  },
  {
    title: "Wrong Rules",
    content: "Procedures for incorrect game settings..."
  },
  {
    title: "Submitting Proof",
    content: "Guidelines for match proof submission..."
  },
  {
    title: "Tournament Types and Monitor Cams",
    content: "Information about tournament formats..."
  }
]

