// ParticipantsTable.tsx
interface Participant {
  name: string;
  image: string | null;
  participantType: string;
  joinedAt: string;
}

export function ParticipantsTable({
  participants,
}: {
  participants: Participant[];
}) {
  return (
    <div className="p-4 bg-[#121212] rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-white">
        Participants ({participants.length})
      </h3>

      {participants.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-700 text-white">
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Participant</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="px-4 py-3 flex items-center gap-2">
                    {participant.image && (
                      <img
                        src={participant.image}
                        alt={participant.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span>{participant.name}</span>
                  </td>
                  <td className="px-4 py-3">{participant.participantType}</td>
                  <td className="px-4 py-3">
                    {new Date(participant.joinedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400">No participants found.</p>
      )}
    </div>
  );
}
