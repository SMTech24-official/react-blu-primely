/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../../ui/button";
import { Calendar } from "../../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import JoditEditor from "jodit-react";
import { useCreateTournamentMutation } from "../../../../redux/apis/tournament/TournamentApi";
import { toast } from "sonner";
import { Toaster } from "react-hot-toast";

// Define Zod schema
const tournamentFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    subtitle: z.string().min(1, "Subtitle is required").max(100),
    description: z.string().min(1, "Description is required").max(500),
    gameName: z.string().min(1, "Game name is required").max(50),
    tournamentType: z.enum(["single", "double", "round"], {
        required_error: "Tournament type is required",
    }),
    startDate: z.date({
        required_error: "Start date is required",
    }),
    endDate: z.date({
        required_error: "End date is required",
    }),
    prizePool: z.coerce.number().min(0, "Prize pool must be positive"),
    entryFee: z.coerce.number().min(0, "Entry fee must be positive"),
    region: z.string().min(1, "Region is required").max(50),
    maxTeams: z.coerce.number()
        .min(2, "Minimum 2 teams required")
        .refine(val => (val & (val - 1)) === 0, {
            message: "maxTeams must be a power of 2 (2, 4, 8, 16, 32)",
        }),
    teamSize: z.coerce.number().min(1, "Minimum team size is 1"),
    skillLevel: z.enum(["beginner", "intermediate", "advanced", "pro"], {
        required_error: "Skill level is required",
    }),
    platform: z.enum(["pc", "playstation", "xbox", "nintendo", "mobile"], {
        required_error: "Platform is required",
    }),
    image: z.instanceof(File, { message: "Image is required" })
        .refine(file => file.size <= 5 * 1024 * 1024, "Max image size is 5MB")
        .refine(
            file => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Only .jpg, .png, and .webp formats are supported"
        ),
}).refine(data => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
});



// Infer the type from the schema
type TournamentFormData = z.infer<typeof tournamentFormSchema>;

export default function TournamentForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        trigger,
    } = useForm<TournamentFormData>({
        resolver: zodResolver(tournamentFormSchema),
        defaultValues: {
            title: '',
            subtitle: '',
            description: '',
            gameName: '',
            prizePool: 0,
            entryFee: 0,
            region: '',
            maxTeams: 2,
            teamSize: 1,
        }
    });

    const [createTournament] = useCreateTournamentMutation();
    const onSubmit = async (data: TournamentFormData) => {
        // Prepare the body data (everything except the image)
        const bodyData = {
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            gameName: data.gameName,
            tournamentType: data.tournamentType,
            startDate: data.startDate.toISOString(),
            endDate: data.endDate.toISOString(),
            prizePool: data.prizePool,
            entryFee: data.entryFee,
            region: data.region,
            maxTeams: data.maxTeams,
            teamSize: data.teamSize,
            skillLevel: data.skillLevel,
            gamePlatform: data.platform,
            rules: content
        };

        try {
            // Create FormData only for the image
            const imageFormData = new FormData();
            imageFormData.append("image", data.image);

            // First upload the image if needed
            // (Assuming your API expects separate endpoints or can handle multipart)
            // If your API expects everything in one request, you would need to adjust this

            // For a single request approach with separate fields:
            const combinedFormData = new FormData();

            // Append the JSON data as a string
            combinedFormData.append("bodyData", JSON.stringify(bodyData));

            // Append the image file
            combinedFormData.append("image", data.image);

            await createTournament(combinedFormData).unwrap();
            toast.success('Tournament added successfully!');

        } catch (error) {
            console.error("Failed to create tournament", error);
            toast.error('Failed to create tournament. Please try again.');
        }
    };

    const editor = useRef<any>(null);
    const [content, setContent] = useState('');

    const config = useMemo(
        () => ({
            readonly: false,
            dropdownFullScreen: true,
            height: "300px",
            theme: "dark"
        }),
        []
    );

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setValue("image", file);
            await trigger("image");
        }
    };

    return (
        <div className="min-h-screen p-6 text-white">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="mb-10 text-center">
                <p className="text-3xl font-bold">Add Tournament</p>
                <p className="text-lg text-gray-400">Create a new tournament by filling the form below</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-4 sm:gap-10 flex-col sm:flex-row w-full">
                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Tournament Title</label>
                            <input
                                placeholder="Tournament Title"
                                {...register("title")}
                                className="mt-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Subtitle</label>
                            <input
                                placeholder="Subtitle"
                                {...register("subtitle")}
                                className="mt-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300"
                            />
                            {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                        <label className="font-semibold">Description</label>
                        <textarea
                            placeholder="Description"
                            {...register("description")}
                            className="w-full mt-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="flex items-center gap-4 sm:gap-10 flex-col sm:flex-row w-full">
                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Game Name</label>
                            <input
                                placeholder="Game Name"
                                {...register("gameName")}
                                className="mt-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300"
                            />
                            {errors.gameName && <p className="text-red-500 text-sm mt-1">{errors.gameName.message}</p>}
                        </div>

                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Tournament Type</label>
                            <Select
                                onValueChange={(value) => setValue("tournamentType", value as TournamentFormData["tournamentType"], { shouldValidate: true })}
                            >
                                <SelectTrigger className="p-3 text-white rounded-md">
                                    <SelectValue placeholder="Tournament Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single Elimination</SelectItem>
                                    <SelectItem value="double">Double Elimination</SelectItem>
                                    <SelectItem value="round">Round Robin</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.tournamentType && <p className="text-red-500 text-sm mt-1">{errors.tournamentType.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-10 flex-col sm:flex-row w-full">
                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Start Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className={`w-full mt-1 flex items-center gap-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300 ${!watch("startDate") && "text-gray-400"}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {watch("startDate") ? format(watch("startDate") as Date, "PPP") : "Select Start Date"}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={watch("startDate")}
                                        onSelect={(date) => {
                                            if (date) {
                                                setValue("startDate", date, { shouldValidate: true });
                                            }
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                        </div>
                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">End Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className={`w-full mt-1 flex items-center gap-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300 ${!watch("endDate") && "text-gray-400"}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {watch("endDate") ? format(watch("endDate") as Date, "PPP") : "Select End Date"}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={watch("endDate")}
                                        onSelect={(date) => {
                                            if (date) {
                                                setValue("endDate", date, { shouldValidate: true });
                                            }
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                        <label className="font-semibold">Prize Pool</label>
                        <input
                            placeholder="Prize Pool"
                            type="number"
                            {...register("prizePool")}
                            className="mt-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300"
                        />
                        {errors.prizePool && <p className="text-red-500 text-sm mt-1">{errors.prizePool.message}</p>}
                    </div>

                    <div className="flex items-center gap-4 sm:gap-10 flex-col sm:flex-row w-full">
                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Entry Fee</label>
                            <input
                                placeholder="Entry Fee"
                                type="number"
                                {...register("entryFee")}
                                className="mt-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300"
                            />
                            {errors.entryFee && <p className="text-red-500 text-sm mt-1">{errors.entryFee.message}</p>}
                        </div>

                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Tournament Region</label>
                            <input
                                placeholder="Tournament Region"
                                {...register("region")}
                                className="mt-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300"
                            />
                            {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-10 flex-col sm:flex-row w-full">
                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Max Teams</label>
                            <input
                                placeholder="Max Teams"
                                type="number"
                                {...register("maxTeams")}
                                className="mt-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300"
                            />
                            {errors.maxTeams && <p className="text-red-500 text-sm mt-1">{errors.maxTeams.message}</p>}
                        </div>

                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Team Size</label>
                            <input
                                placeholder="Team Size"
                                type="number"
                                {...register("teamSize")}
                                className="mt-1 rounded-md focus:border-transparent focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300"
                            />
                            {errors.teamSize && <p className="text-red-500 text-sm mt-1">{errors.teamSize.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-10 flex-col sm:flex-row w-full">
                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Skill Level</label>
                            <Select
                                onValueChange={(value) => setValue("skillLevel", value as TournamentFormData["skillLevel"], { shouldValidate: true })}
                            >
                                <SelectTrigger className="p-3 text-white rounded-md">
                                    <SelectValue placeholder="Skill Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                    <SelectItem value="pro">Professional</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.skillLevel && <p className="text-red-500 text-sm mt-1">{errors.skillLevel.message}</p>}
                        </div>

                        <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                            <label className="font-semibold">Game Platform</label>
                            <Select
                                onValueChange={(value) => setValue("platform", value as TournamentFormData["platform"], { shouldValidate: true })}
                            >
                                <SelectTrigger className="p-3 text-white rounded-md">
                                    <SelectValue placeholder="Game Platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pc">PC</SelectItem>
                                    <SelectItem value="playstation">PlayStation</SelectItem>
                                    <SelectItem value="xbox">Xbox</SelectItem>
                                    <SelectItem value="nintendo">Nintendo</SelectItem>
                                    <SelectItem value="mobile">Mobile</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                        <label className="font-semibold mb-1">Rules and Regulations</label>
                        <JoditEditor
                            className=""
                            ref={editor}
                            value={content}
                            config={config}
                            onBlur={(newContent: string) => setContent(newContent)}
                        />
                        {!content && <p className="text-red-500 text-sm mt-1">Rules and regulations are required</p>}
                    </div>

                    <div className="flex flex-col w-full focus-within:text-primary_highlighted">
                        <label className="font-semibold mb-1">Upload Image</label>
                        <div className="relative min-h-[200px] cursor-pointer rounded-lg border-2 border-dashed border-gray-700 transition-colors hover:border-gray-600">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                onChange={handleImageUpload}
                            />
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="h-full w-full rounded-lg object-cover" />
                            ) : (
                                <div className="flex h-[200px] flex-col items-center justify-center border">
                                    <Upload className="mb-2 h-8 w-8 text-gray-400" />
                                    <p className="text-sm text-gray-400">Upload Image</p>
                                </div>
                            )}
                        </div>
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                    </div>
                </div>
                <Button type="submit" className="w-full bg-primary_highlighted/80 hover:bg-primary_highlighted p-3 rounded-md text-white">
                    Submit
                </Button>
            </form>
        </div>
    );
}