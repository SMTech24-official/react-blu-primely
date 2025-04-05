import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateClanMutation } from "../../redux/apis/clan/ClanApi";
import PrimaryButton from "../shared/primaryButton";

interface ClanFormData {
    name: string; // Changed from clanName to match API
    mission: string;
    values: string;
}

const CreateClan = () => {
    const [createClan, { isLoading }] = useCreateClanMutation();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ClanFormData>({
        defaultValues: {
            name: "",
            mission: "",
            values: "",
        },
    });

    const onSubmit = async (data: ClanFormData) => {
        try {
            const response = await createClan(data).unwrap();
            toast.success(response.message);
        } catch (error) {
            toast.error("Failed to create clan");
            console.error("Create clan error:", error);
        }
    };

    return (
        <div className="max-w-lg w-full mx-auto p-6 text-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create a Clan</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Clan Name */}
                <div>
                    <label className="block mb-1">Clan Name:</label>
                    <input
                        {...register("name", {
                            required: "Clan name is required",
                            minLength: {
                                value: 3,
                                message: "Clan name must be at least 3 characters"
                            }
                        })}
                        type="text"
                        className="w-full p-2 rounded bg-card_bg border border-gray-700"
                        placeholder="Enter clan name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Mission Statement */}
                <div>
                    <label className="block mb-1">Mission:</label>
                    <textarea
                        {...register("mission", {
                            required: "Mission is required",
                            minLength: {
                                value: 10,
                                message: "Mission must be at least 10 characters"
                            }
                        })}
                        className="w-full p-2 rounded bg-card_bg border border-gray-700"
                        placeholder="Describe your clan's mission"
                        rows={3}
                    />
                    {errors.mission && (
                        <p className="text-red-500 text-sm mt-1">{errors.mission.message}</p>
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
                                message: "Values must be at least 10 characters"
                            }
                        })}
                        className="w-full p-2 rounded bg-card_bg border border-gray-700"
                        placeholder="Enter your clan values"
                        rows={3}
                    />
                    {errors.values && (
                        <p className="text-red-500 text-sm mt-1">{errors.values.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <PrimaryButton child="w-full" parent="w-full">
                    <button
                        type="submit"
                        className="w-full rounded text-white font-bold"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "Create Clan"}
                    </button>
                </PrimaryButton>
            </form>
        </div>
    );
};

export default CreateClan;