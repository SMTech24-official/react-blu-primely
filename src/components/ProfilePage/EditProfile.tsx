import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import PrimaryButton from "../shared/primaryButton";
import {
  useGetUserGameEntriesQuery,
  useCreateGameEntriesMutation,
  useUpdateGameEntryMutation,
  useDeleteGameEntryMutation,
  useUpdateUserMutation,
} from "../../redux/apis/auth/userApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface GameEntry {
  gameName: string;
  gameId: string;
  id?: string; // Optional for existing entries
}

interface FormData {
  name: string;
  gameEntries: GameEntry[];
}

const EditProfile = () => {
  // API hooks with loading states
  const {
    data: gameEntriesData,
    isLoading: isFetching,
    refetch: refetchGameEntries,
  } = useGetUserGameEntriesQuery();
  const [createGameEntries, { isLoading: isCreating }] =
    useCreateGameEntriesMutation();
  const [updateGameEntry, { isLoading: isUpdating }] =
    useUpdateGameEntryMutation();
  const [deleteGameEntry, { isLoading: isDeleting }] =
    useDeleteGameEntryMutation();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

  // Local loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      gameEntries: [{ gameName: "", gameId: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "gameEntries",
  });

  // Initialize form with existing data
  useEffect(() => {
    if (gameEntriesData?.data) {
      reset({
        name: "", // You might want to get this from user profile
        gameEntries:
          gameEntriesData.data.length > 0
            ? gameEntriesData.data.map((entry) => ({
                gameName: entry.gameName,
                gameId: entry.gameId,
                id: entry.id,
              }))
            : [{ gameName: "", gameId: "" }], // Default empty entry if no data
      });
    }
  }, [gameEntriesData, reset]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Update user name if needed
      if (data.name) {
        await updateUser({ userName: data.name }).unwrap();
      }

      // Process game entries
      const newEntries = data.gameEntries.filter((entry) => !entry.id);
      const existingEntries = data.gameEntries.filter((entry) => entry.id);

      // Create new entries
      if (newEntries.length > 0) {
        await createGameEntries(
          newEntries.map(({ gameName, gameId }) => ({
            gameName,
            gameId,
          }))
        ).unwrap();
      }

      // Update existing entries
      await Promise.all(
        existingEntries.map((entry) => {
          if (entry.id) {
            return updateGameEntry({
              id: entry.id,
              body: {
                gameName: entry.gameName,
                gameId: entry.gameId,
              },
            }).unwrap();
          }
          return Promise.resolve();
        })
      );

      // Refetch data
      await refetchGameEntries();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEntry = async (id: string | undefined, index: number) => {
    if (!id) {
      remove(index);
      return;
    }
    const realData = gameEntriesData?.data.filter((data) => data.gameId === id);
    if (realData)
      try {
        await deleteGameEntry(realData[0].id).unwrap();
        remove(index);
        toast.success("Game entry deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete game entry");
        console.error("Error deleting game entry:", error);
      }
  };

  const isLoading =
    isFetching ||
    isCreating ||
    isUpdating ||
    isDeleting ||
    isUpdatingUser ||
    isSubmitting;

  return (
    <div className="mx-auto p-4 text-white rounded-lg">
      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block mb-1">Name:</label>
            <input
              {...register("name")}
              type="text"
              className="w-full p-2 rounded bg-card_bg border border-gray-700"
              placeholder="Enter your name"
              disabled={isLoading}
            />
          </div>

          {/* Dynamic Game Name & Game IDs */}
          <div>
            <label className="block mb-1">Game Entries:</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                {/* Game Name Input */}
                <input
                  {...register(`gameEntries.${index}.gameName`)}
                  type="text"
                  className="w-full p-2 rounded bg-card_bg border border-gray-700"
                  placeholder={`Game Name ${index + 1}`}
                  disabled={isLoading}
                />
                {/* Game ID Input */}
                <input
                  {...register(`gameEntries.${index}.gameId`)}
                  type="text"
                  className="w-full p-2 rounded bg-card_bg border border-gray-700"
                  placeholder={`Game ID ${index + 1}`}
                  disabled={isLoading}
                />
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleDeleteEntry(field.gameId, index)}
                  className="bg-red-800 px-3 py-1 rounded !text-white disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isDeleting && field.id ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <X />
                  )}
                </button>
              </div>
            ))}
            {/* Add Game Entry Button */}
            <button
              type="button"
              onClick={() => append({ gameName: "", gameId: "" })}
              className="bg-blue-800 px-4 py-2 rounded text-white disabled:opacity-50"
              disabled={isLoading}
            >
              + Add Game Entry
            </button>
          </div>

          {/* Submit Button */}
          <PrimaryButton child="w-full" parent="w-full">
            <button
              type="submit"
              className="w-full rounded text-white font-bold flex justify-center items-center gap-2"
              disabled={isLoading || !isDirty}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </PrimaryButton>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
