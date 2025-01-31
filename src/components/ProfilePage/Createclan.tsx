import { useForm } from "react-hook-form";
import PrimaryButton from "../shared/primaryButton";


interface ClanFormData {
    clanName: string;
    mission: string;
    values: string;
}

const CreateClan = () => {
    const { register, handleSubmit } = useForm<ClanFormData>({
        defaultValues: {
            clanName: "",
            mission: "",
            values: "",
        },
    });


    const onSubmit = (data: ClanFormData) => {
        console.log("Clan Data:", data);
    };

    return (
        <div className="max-w-lg w-full mx-auto p-6  text-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create a Clan</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Clan Name */}
                <div>
                    <label className="block mb-1">Clan Name:</label>
                    <input
                        {...register("clanName", { required: "Clan name is required" })}
                        type="text"
                        className="w-full p-2 rounded bg-card_bg border border-gray-700"
                        placeholder="Enter clan name"
                    />
                </div>

                {/* Mission Statement */}
                <div>
                    <label className="block mb-1">Mission:</label>
                    <textarea
                        {...register("mission", { required: "Mission is required" })}
                        className="w-full p-2 rounded bg-card_bg border border-gray-700"
                        placeholder="Describe your clan's mission"
                    />
                </div>

                {/* Clan Values */}
                <div>
                    <label className="block mb-1">Clan Values:</label>
                    <textarea
                        {...register("values", { required: "Values are required" })}
                        className="w-full p-2 rounded bg-card_bg border border-gray-700"
                        placeholder="Enter your clan values"
                    />
                </div>



                {/* Submit Button */}
                <PrimaryButton child="w-full" parent="w-full">
                    <button
                        type="submit"
                        className="w-full  rounded text-white font-bold"
                    >
                        Submit
                    </button>
                </PrimaryButton>
            </form>
        </div>
    );
};

export default CreateClan;
