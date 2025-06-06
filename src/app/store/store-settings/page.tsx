"use client";
import { useTranslation } from "react-i18next";

//internal import
import Label from "@/components/form/label/Label";
import Error from "@/components/form/others/Error";
import PageTitle from "@/components/Typography/PageTitle";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import useStoreSettingSubmit from "@/hooks/useStoreSettingSubmit";
import AnimatedContent from "@/components/common/AnimatedContent";
import SettingContainer from "@/components/settings/SettingContainer";
import React from "react";

const StoreSetting: React.FC = () => {
  const { t } = useTranslation();
  const {
    isSave,
    errors,
    register,
    onSubmit,
    handleSubmit,
    isSubmitting,
    enabledCOD,
    setEnabledCOD,
    enabledStripe,
    setEnabledStripe,
    enabledRazorPay,
    setEnabledRazorPay,
    enabledFbPixel,
    setEnableFbPixel,
    enabledTawkChat,
    setEnabledTawkChat,
    enabledGoogleLogin,
    setEnabledGoogleLogin,
    enabledGithubLogin,
    setEnabledGithubLogin,
    enabledFacebookLogin,
    setEnabledFacebookLogin,
    enabledGoogleAnalytics,
    setEnabledGoogleAnalytics,
  } = useStoreSettingSubmit(undefined);

  const handleEnableDisableMethod = (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (id === "stripe" && !checked) {
      setEnabledStripe(!enabledStripe);
      setEnabledCOD(true);
    } else if (id === "stripe" && checked) {
      setEnabledStripe(!enabledStripe);
    } else if (id === "cod" && !checked) {
      setEnabledCOD(!enabledCOD);
      setEnabledStripe(true);
    } else {
      setEnabledCOD(!enabledCOD);
    }
  };

  return (
    <>
      <PageTitle>{t("StoreSetting")}</PageTitle>
      <AnimatedContent>
        <div className="sm:container w-full md:p-6 p-4 mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <SettingContainer
              isSave={isSave}
              title={t("StoreDetails")}
              isSubmitting={isSubmitting}
            >
              <div className="flex-grow scrollbar-hide w-full max-h-full">
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("EnableCOD")} <br />
                    <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                      (This is enabled by default)
                    </span>
                  </label>
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="cod"
                      title=""
                      processOption={enabledCOD}
                      handleProcess={(checked) => handleEnableDisableMethod(checked, { target: { value: "cod" } } as React.ChangeEvent<HTMLInputElement>, "cod")}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t("EnableStripe")} />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="stripe"
                      title=""
                      processOption={enabledStripe}
                      handleProcess={(checked) => handleEnableDisableMethod(checked, { target: { value: "stripe" } } as React.ChangeEvent<HTMLInputElement>, "stripe")}
                    />
                  </div>
                </div>

                <div
                  style={{
                    height: enabledStripe ? "auto" : 0,
                    transition: "all .6s",
                    visibility: !enabledStripe ? "hidden" : "visible",
                    opacity: !enabledStripe ? "0" : "1",
                  }}
                  className={`${enabledStripe ? "mb-8" : "mb-2"}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t("StripeKey")} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledStripe}
                        register={register}
                        label={t("StripeKey")}
                        name="stripe_key"
                        type="password"
                        placeholder={t("StripeKey")}
                      />
                      <Error errorName={errors.stripe_key} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t("StripeSecret")} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledStripe}
                        register={register}
                        label={t("StripeSecret")}
                        name="stripe_secret"
                        type="password"
                        placeholder={t("StripeSecret")}
                      />
                      <Error errorName={errors.stripe_secret} />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label="Enable RazorPay" />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="razorpay"
                      title=""
                      processOption={enabledRazorPay}
                      handleProcess={setEnabledRazorPay}
                    />
                  </div>
                </div>

                <div
                  style={{
                    height: enabledRazorPay ? "auto" : 0,
                    transition: "all .6s",
                    visibility: !enabledRazorPay ? "hidden" : "visible",
                    opacity: !enabledRazorPay ? "0" : "1",
                  }}
                  className={`${enabledRazorPay ? "mb-8" : "mb-2"}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label="RazorPay ID" />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledRazorPay}
                        register={register}
                        label="RazorPay ID"
                        name="razorpay_id"
                        type="password"
                        placeholder="RazorPay ID"
                      />
                      <Error errorName={errors.razorpay_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label="RazorPay Secret" />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledRazorPay}
                        register={register}
                        label="RazorPay Secret"
                        name="razorpay_secret"
                        type="password"
                        placeholder="RazorPay Secret"
                      />
                      <Error errorName={errors.razorpay_secret} />
                    </div>
                  </div>
                </div>

                {/* Google key section */}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t("EnableGoogleLogin")} />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="google_login"
                      title=""
                      processOption={enabledGoogleLogin}
                      handleProcess={setEnabledGoogleLogin}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledGoogleLogin ? "auto" : 0,
                    transition: "all .6s",
                    visibility: !enabledGoogleLogin ? "hidden" : "visible",
                    opacity: !enabledGoogleLogin ? "0" : "1",
                  }}
                  className={`${enabledGoogleLogin ? "mb-8" : "mb-2"}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t("GoogleClientId")} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledGoogleLogin}
                        register={register}
                        label={t("GoogleClientId")}
                        name="google_id"
                        type="password"
                        placeholder={t("GoogleClientId")}
                      />
                      <Error errorName={errors.google_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t("GoogleSecret")} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledGoogleLogin}
                        register={register}
                        label={t("GoogleSecret")}
                        name="google_secret"
                        type="password"
                        placeholder={t("GoogleSecret")}
                      />
                      <Error errorName={errors.google_secret} />
                    </div>
                  </div>
                </div>

                {/* Github key section start*/}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label="Enable Github Login" />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="github_login"
                      title=""
                      processOption={enabledGithubLogin}
                      handleProcess={setEnabledGithubLogin}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledGithubLogin ? "auto" : 0,
                    transition: "all .6s",
                    visibility: !enabledGithubLogin ? "hidden" : "visible",
                    opacity: !enabledGithubLogin ? "0" : "1",
                  }}
                  className={`${enabledGithubLogin ? "mb-8" : "mb-2"}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={"Github ID"} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledGithubLogin}
                        register={register}
                        label="Github ID"
                        name="github_id"
                        type="password"
                        placeholder="Github ID"
                      />
                      <Error errorName={errors.github_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label="Github Secret" />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledGithubLogin}
                        register={register}
                        label="Github Secret"
                        name="github_secret"
                        type="password"
                        placeholder="Github Secret"
                      />
                      <Error errorName={errors.github_secret} />
                    </div>
                  </div>
                </div>
                {/* Github key section end*/}

                {/* Facebook key section start*/}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label="Enable Facebook Login" />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="facebook_login"
                      title=""
                      processOption={enabledFacebookLogin}
                      handleProcess={setEnabledFacebookLogin}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledFacebookLogin ? "auto" : 0,
                    transition: "all .6s",
                    visibility: !enabledFacebookLogin ? "hidden" : "visible",
                    opacity: !enabledFacebookLogin ? "0" : "1",
                  }}
                  className={`${enabledFacebookLogin ? "mb-8" : "mb-2"}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label="Facebook ID" />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledFacebookLogin}
                        register={register}
                        label="Facebook ID"
                        name="facebook_id"
                        type="password"
                        placeholder="Facebook ID"
                      />
                      <Error errorName={errors.facebook_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label="Facebook Secret" />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledFacebookLogin}
                        register={register}
                        label="Facebook Secret"
                        name="facebook_secret"
                        type="password"
                        placeholder="Facebook Secret"
                      />
                      <Error errorName={errors.facebook_secret} />
                    </div>
                  </div>
                </div>

                {/* Facebook key section end*/}

                {/* Google Analytics section start */}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t("EnableGoggleAnalytics")} />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="google_analytics"
                      title=""
                      processOption={enabledGoogleAnalytics}
                      handleProcess={setEnabledGoogleAnalytics}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledGoogleAnalytics ? "auto" : 0,
                    transition: "all .6s",
                    visibility: !enabledGoogleAnalytics ? "hidden" : "visible",
                    opacity: !enabledGoogleAnalytics ? "0" : "1",
                  }}
                  className={`$${
                    enabledGoogleAnalytics
                      ? "grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                      : "mb-2"
                  }`}
                >
                  <Label label={t("GoogleAnalyticKey")} />
                  <div className="sm:col-span-4">
                    <InputAreaTwo
                      required={enabledGoogleAnalytics}
                      register={register}
                      label={t("GoogleAnalyticKey")}
                      name="google_analytic_key"
                      type="password"
                      placeholder={t("GoogleAnalyticKey")}
                    />
                    <Error errorName={errors.google_analytic_key} />
                  </div>
                </div>
                {/* Google Analytics section end */}

                {/* EnableTawkChat  section start */}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t("EnableTawkChat")} />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="tawk_chat"
                      title=""
                      processOption={enabledTawkChat}
                      handleProcess={setEnabledTawkChat}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledTawkChat ? "auto" : 0,
                    transition: "all .6s",
                    visibility: !enabledTawkChat ? "hidden" : "visible",
                    opacity: !enabledTawkChat ? "0" : "1",
                  }}
                  className={`${enabledTawkChat ? "mb-8" : "mb-2"}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t("TawkChatPropertyID")} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledTawkChat}
                        register={register}
                        label={t("TawkChatPropertyID")}
                        name="tawk_chat_property_id"
                        type="password"
                        placeholder={t("TawkChatPropertyID")}
                      />
                      <Error errorName={errors.tawk_chat_property_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t("TawkChatWidgetID")} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledTawkChat}
                        register={register}
                        label={t("TawkChatWidgetID")}
                        name="tawk_chat_widget_id"
                        type="password"
                        placeholder={t("TawkChatWidgetID")}
                      />
                      <Error errorName={errors.tawk_chat_widget_id} />
                    </div>
                  </div>
                </div>

                {/* EnableTawkChat  section end */}
              </div>
            </SettingContainer>
          </form>
        </div>
      </AnimatedContent>
    </>
  );
};

export default StoreSetting;
