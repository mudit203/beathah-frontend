'use client';

import Cookies from "js-cookie";
import { useContext, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";

// Internal imports
import { AdminContext } from "@/context/AdminContext";
import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useLoginSubmit = (): any => {
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useContext(AdminContext);
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = useCallback(
    async ({ name, email, verifyEmail, password, role }: any): Promise<void> => {
      if (loading) return; // Prevent multiple submissions
      
      setLoading(true);
      const cookieTimeOut = 1;

      try {
        if (pathname === "/login") {
          const res = await AdminServices.loginAdmin({ email, password });

          if (res) {
            const adminData = {
              ...res,
              role: "Super Admin",
              accessList: [
                "dashboard",
                "products",
                "orders",
                "customers",
                "settings",
                "staff",
                "reports",
                "store-settings",
              ],
            };

            notifySuccess("Login Success!");
            
            // Set cookie first
            Cookies.set("adminInfo", JSON.stringify(adminData), {
              expires: cookieTimeOut,
              sameSite: "None",
              secure: true,
            });
            
            // Then dispatch
            dispatch({ type: "USER_LOGIN", payload: adminData });
            
            // Small delay before redirect to ensure state updates are complete
            setTimeout(() => {
              router.replace("/dashboard");
            }, 100);
          }
        }

        if (pathname === "/signup") {
          const res = await AdminServices.registerAdmin({
            name,
            email,
            password,
            role: "Super Admin",
          });

          if (res) {
            const adminData = {
              ...res,
              role: "Super Admin",
              accessList: [
                "dashboard",
                "products",
                "orders",
                "customers",
                "settings",
                "staff",
                "reports",
                "store-settings",
              ],
            };

            notifySuccess("Register Success!");
            
            Cookies.set("adminInfo", JSON.stringify(adminData), {
              expires: cookieTimeOut,
              sameSite: "None",
              secure: true,
            });
            
            dispatch({ type: "USER_LOGIN", payload: adminData });
            
            setTimeout(() => {
              router.replace("/dashboard");
            }, 100);
          }
        }

        if (pathname === "/forgot-password") {
          const res = await AdminServices.forgetPassword({ verifyEmail });
          notifySuccess(res.message);
        }
      } catch (err: any) {
        notifyError(err?.response?.data?.message || err?.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, pathname, router, loading]
  );

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
    loading,
  };
};

export default useLoginSubmit;