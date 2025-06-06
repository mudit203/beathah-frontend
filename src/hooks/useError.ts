'use client';

import Cookies from "js-cookie";
import { useContext } from "react";

//internal import
import { notifyError } from "@/utils/toast";
import { AdminContext } from "@/context/AdminContext";

const useError = (): { handleErrorNotification: (err: any, from: string, time?: number) => void } => {
  const { dispatch } = useContext(AdminContext);

  const handleErrorNotification = async (err: any, from: string, time: number = 1000): Promise<void> => {
    console.log(
      `handleErrorNotification, error on ${from}`,
      err?.response?.data?.message || err?.message
    );
    if (
      err?.response?.data?.message === "jwt expired" ||
      err?.response?.data?.message === "jwt malformed" ||
      err?.response?.data?.message === "invalid signature" ||
      err?.response?.data?.message === "Unauthorized Access!"
    ) {
      console.log("inside", err?.response?.data?.message);
      dispatch({ type: "USER_LOGOUT" });
      Cookies.remove("adminInfo");

      // notifyError("Your Session is expired! Please Click on Login again");
      const timeoutId = setTimeout(() => {
        // history?.replace(`/login`);
        window.location.replace(
          `https://${process.env.NEXT_PUBLIC_ADMIN_DOMAIN}/login`
        );
      }, 2500);
    } else {
      // @ts-ignore
      notifyError(err?.response?.data?.message || err?.message, time);
    }
  };

  return {
    handleErrorNotification,
  };
};

export default useError;
