import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import PrimaryButton from "../shared/primaryButton";


interface GameEntry {
    gameName: string;
    id: string;
}

interface FormData {
    name: string;
    gameEntries: GameEntry[];
}


const EditProfile = () => {

    const { register, control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            name: "",
            gameEntries: [{ gameName: "", id: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "gameEntries",
    });

    const onSubmit = (data: FormData) => {
        console.log("Form Data:", data);
    };



    return (
        <div className=" mx-auto p-4 text-white rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Input */}
                <div>
                    <label className="block mb-1">Name:</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        className="w-full p-2 rounded bg-card_bg border border-gray-700"
                        placeholder="Enter your name"
                    />
                </div>

                {/* Dynamic Game Name & Game IDs */}
                <div>
                    <label className="block mb-1">Game Entries:</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center space-x-2 mb-2">
                            {/* Game Name Input */}
                            <input
                                {...register(`gameEntries.${index}.gameName`, { required: "Game Name is required" })}
                                type="text"
                                className="w-full p-2 rounded bg-card_bg border border-gray-700"
                                placeholder={`Game Name ${index + 1}`}
                            />
                            {/* Game ID Input */}
                            <input
                                {...register(`gameEntries.${index}.id`, { required: "Game ID is required" })}
                                type="text"
                                className="w-full p-2 rounded bg-card_bg border border-gray-700"
                                placeholder={`Game ID ${index + 1}`}
                            />
                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="bg-red-800 px-3 py-1 rounded !text-white"
                            >
                                <X />
                            </button>
                        </div>
                    ))}
                    {/* Add Game Entry Button */}
                    <button
                        type="button"
                        onClick={() => append({ gameName: "", id: "" })}
                        className="bg-blue-800 px-4 py-2 rounded text-white"
                    >
                        + Add Game Entry
                    </button>
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

export default EditProfile;