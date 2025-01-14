import { ScrollText } from 'lucide-react'

export default function Rules() {
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
          <div className="space-y-3">
            {recentChanges.map((change, index) => (
              <div key={index} className="text-sm">
                <p className="text-gray-400">{change.date}</p>
                <p className="mt-1">{change.description}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            All new changes will be posted here. Follow us at @CMG_Esports on X for more updates
          </p>
        </div>

        {/* Rules Sections */}
        <div className="space-y-4">
          {ruleSections.map((section, index) => (
            <div key={index} className="group">
              <button
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-left w-full py-2"
                onClick={() => console.log(`Navigate to ${section.title}`)}
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

const recentChanges = [
  {
    date: "EFFECTIVE 3:00pm EST 11/21/2024",
    description: "The Solo Spam is BANNED in all BOB Matches"
  },
  {
    date: "EFFECTIVE 3:00pm EST 11/15/2024",
    description: "The KJR-C is banned in all BOB matches"
  },
  {
    date: "EFFECTIVE 11/02/2024",
    description: "There are known bugs with custom game rules resetting. If game rules are incorrect, either the hosting or non-hosting team should take a screenshot and attempt to correct the issue due to these bugs. Games will not be issuing forfeits or replays, as this is a common issue. All rounds played before leaving will be counted if neither team leaves and both teams decide to play on. In the results will also show. We recommend that you check if there are mistakes at the start of round 1 and leave immediately if so. Please note that if you leave after round 1 has been played, those rounds will count towards the final score regardless of settings being incorrect."
  },
  {
    date: "EFFECTIVE midnight EST 10/30/2024",
    description: "The M44 been BANNED in all BOB matches"
  },
  {
    date: "EFFECTIVE 3:00pm EST 10/30/2024",
    description: "The Dante.22, Blueprints, and Tracer Rounds have been BANNED in all BOB matches"
  }
]

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

