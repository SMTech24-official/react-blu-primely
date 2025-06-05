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
import { useEffect, useState, useRef } from "react";
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      // Prepare form data for user update
      const formData = new FormData();

      // Add username if provided
      if (data.name) {
        formData.append("bodyData", JSON.stringify({ fullName: data.name }));
      }

      // Add profile picture if selected
      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
      }

      // Update user if there's any data to update
      if (data.name || selectedImage) {
        await updateUser(formData).unwrap();
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

      // Reset image selection after successful upload
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
          {/* Profile Picture Upload */}
          <div>
            <label className="block mb-1">Profile Picture:</label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-card_bg border border-gray-700 flex items-center justify-center">
                    <span className="text-xs">No image</span>
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                  id="profilePicture"
                  disabled={isLoading}
                />
                <label
                  htmlFor="profilePicture"
                  className="bg-blue-800 px-4 py-2 rounded text-white cursor-pointer disabled:opacity-50"
                >
                  {selectedImage ? "Change Image" : "Upload Image"}
                </label>
                {selectedImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewImage(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="ml-2 text-red-500 text-sm"
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block mb-1">Name:</label>
            <textarea
              {...register("name")}
              className="w-full p-2 rounded bg-card_bg border text-white border-gray-700 max-h-12"
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
                <textarea
                  {...register(`gameEntries.${index}.gameName`)}
                  className="w-full p-2 rounded bg-card_bg border border-gray-700 max-h-12"
                  placeholder={`Game Name ${index + 1}`}
                  disabled={isLoading}
                />
                {/* Game ID Input */}
                <textarea
                  {...register(`gameEntries.${index}.gameId`)}
                  className="w-full p-2 rounded bg-card_bg border border-gray-700 max-h-12"
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
              disabled={isLoading || (!isDirty && !selectedImage)}
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
