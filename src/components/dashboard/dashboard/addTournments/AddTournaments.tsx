/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../ui/button";
import { Calendar } from "../../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";

export default function TournamentForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { register, handleSubmit, setValue, watch } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setValue("image", file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 p-6 text-white">
            <div className="mb-10 text-center">
                <p className="text-3xl font-bold">Add Tournament</p>
                <p className="text-lg text-gray-400">Create a new tournament by filling the form below</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-6">
                <div className="space-y-4">

                    <div className="flex items-center gap-10 w-full">
                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Tournament Title</label>
                            <input placeholder="Tournament Title" {...register("title")} className="mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Subtitle</label>
                            <input placeholder="Subtitle" {...register("subtitle")} className="mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                        </div>
                    </div>


                    <div className="flex flex-col w-full">

                        <label className="font-semibold">Description</label>
                        <textarea placeholder="Description" {...register("description")} className="w-full mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                    </div>

                    <div className="flex items-center gap-10 w-full">
                        <div className="flex flex-col w-full">

                            <label className="font-semibold">Game Name</label>
                            <input placeholder="Game Name" {...register("gameName")} className="mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Tournament Type</label>
                            <Select onValueChange={(value) => setValue("tournamentType", value)} >
                                <SelectTrigger className="p-3 text-white rounded-md">
                                    <SelectValue placeholder="Tournament Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single Elimination</SelectItem>
                                    <SelectItem value="double">Double Elimination</SelectItem>
                                    <SelectItem value="round">Round Robin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-10 w-full">

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Start Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={`w-full mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300 ${!watch("startDate") && "text-gray-400"}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {watch("startDate") ? format(watch("startDate"), "PPP") : "Select Start Date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar mode="single" selected={watch("startDate")} onSelect={(date) => setValue("startDate", date)} />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Prize Pool</label>
                            <input placeholder="Prize Pool" type="number" {...register("prizePool")} className="mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                        </div>
                    </div>
                    <div className="flex items-center gap-10 w-full">

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Entry Fee</label>
                            <input placeholder="Entry Fee" type="number" {...register("entryFee")} className="mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Tournament Region</label>
                            <input placeholder="Tournament Region" {...register("region")} className="mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                        </div>
                    </div>
                    <div className="flex items-center gap-10 w-full">

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Max Teams</label>
                            <input placeholder="Max Teams" type="number" {...register("maxTeams")} className="mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Team Size</label>
                            <input placeholder="Team Size" type="number" {...register("teamSize")} className="mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                        </div>
                    </div>
                    <div className="flex items-center gap-10 w-full">

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Skill Level</label>
                            <Select onValueChange={(value) => setValue("skillLevel", value)}>
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
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="font-semibold">Game Platform</label>
                            <Select onValueChange={(value) => setValue("platform", value)}>
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
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="font-semibold">Rules and Regulations</label>
                        <textarea placeholder="Rules and Regulations" {...register("rules")} className="w-full mt-1 rounded-md focus:outline-primary_highlighted outline-none ring-0 bg-transparent p-2 border border-gray-300" />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="font-semibold">Upload Image</label>
                        <div className="relative min-h-[200px] cursor-pointer rounded-lg border-2 border-dashed border-gray-700 bg-gray-900 transition-colors hover:border-gray-600">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                onChange={handleImageUpload}
                            />
                            {imagePreview ? (
                                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="rounded-lg object-cover" />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center">
                                    <Upload className="mb-2 h-8 w-8 text-gray-400" />
                                    <p className="text-sm text-gray-400">Upload Image</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md text-white">Submit</Button>
            </form>
        </div>
    );
}
