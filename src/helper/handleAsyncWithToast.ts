/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";

export const handleAsyncWithToast = async (
  asyncCallback: () => Promise<any>,
  loadingMessage: string,
  successMessage?: string,
  errorMessage?: string
) => {
  const toastInit = toast.loading(loadingMessage);

  try {
    const res = await asyncCallback();
    console.log(res);
    if (res?.success) {
      toast.success(res.data.message || res.message || successMessage, {
        id: toastInit,
      });
    } else {
      toast.error(
        res?.error?.data?.errorSources?.[0]?.message || errorMessage,
        {
          id: toastInit,
        }
      );
    }

    return res;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.data.message || "Something went wrong", {
      id: toastInit,
    });
    throw error;
  } finally {
    setTimeout(() => {
      toast.dismiss(toastInit);
    }, 3500);
  }
};
