import { useState } from "react";
import { Pencil } from "lucide-react";
import { MainModal } from "../Modal/MainModal";
import PrimaryButton from "../shared/primaryButton";
import { useForm } from "react-hook-form";
import { Clan } from "../../redux/types";
import { useUpdateClanMutation } from "../../redux/apis/clan/ClanApi";
import { toast } from "sonner";
import StatIndicator from "./StatesIndicator";

interface ClanFormData {
  mission: string;
  values: string;
}

const stats = [
  { value: "1,245", label: "Matches Played" },
  { value: "78%", label: "Win Rate" },
  { value: "TOP 500", label: "Current Global Ranking" },
  { value: "15", label: "Matches Played" },
];

export default function OverviewTab({ overview }: { overview: Clan | null }) {
  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const [updateClan, { isLoading }] = useUpdateClanMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClanFormData>({
    defaultValues: {
      mission: overview?.mission || "",
      values: overview?.values || "",
    },
  });

  const onSubmit = async (data: ClanFormData) => {
    if (!overview?.id) return;

    try {
      const response = await updateClan({
        id: overview.id,
        data: {
          name: overview.name, // Include existing name
          mission: data.mission,
          values: data.values,
        },
      }).unwrap();

      toast.success(response.message);
      setMissionModalOpen(false);
    } catch (error) {
      toast.error("Failed to update clan");
      console.error("Update clan error:", error);
    }
  };

  return (
    <div className="">
      <div className="space-y-10 md:space-y-14 lg:space-y-20">
        {/* Mission Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">OUR MISSION</h2>
            <button
              onClick={() => {
                reset({
                  mission: overview?.mission || "",
                  values: overview?.values || "",
                });
                setMissionModalOpen(true);
              }}
              className="text-gray-400 hover:text-white"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-300">{overview?.mission}</p>
        </div>

        {/* Values Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">CORE VALUES</h2>
          </div>
          <div className="space-y-4">
            <p>{overview?.values}</p>
          </div>
        </div>

        {/* Clan Highlights */}
        <div>
          <h2 className="text-xl font-bold mb-8">CLAN HIGHLIGHTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatIndicator
                key={index}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>

        {/* Join the Fight */}
        <div>
          <h2 className="text-xl font-bold mb-4">JOIN THE FIGHT</h2>
          <p className="text-gray-300">
            Ready to join the action? We're always looking for passionate gamers
            to grow our clan.
          </p>
        </div>

        {/* Mission Update Modal */}
        <MainModal
          isOpen={missionModalOpen}
          onClose={() => setMissionModalOpen(false)}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Mission Statement */}
            <div>
              <label className="block mb-1">Mission:</label>
              <textarea
                {...register("mission", {
                  required: "Mission is required",
                  minLength: {
                    value: 10,
                    message: "Mission must be at least 10 characters",
                  },
                })}
                className="w-full p-2 rounded bg-card_bg border border-gray-700"
                placeholder="Describe your clan's mission"
                rows={4}
              />
              {errors.mission && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mission.message}
                </p>
              )}
            </div>

            {/* Clan Values */}
            <div>
              <label className="block mb-1">Clan Values:</label>
              <textarea
                {...register("values", {
                  required: "Values are required",
                  minLength: {
                    value: 10,
                    message: "Values must be at least 10 characters",
                  },
                })}
                className="w-full p-2 rounded bg-card_bg border border-gray-700"
                placeholder="Enter your clan values"
                rows={4}
              />
              {errors.values && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.values.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <PrimaryButton child="w-full" parent="w-full">
              <button
                type="submit"
                className="w-full rounded text-white font-bold"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Clan"}
              </button>
            </PrimaryButton>
          </form>
        </MainModal>
      </div>
    </div>
  );
}
