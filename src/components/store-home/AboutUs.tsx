'use client';

import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tabs as TabsComponent,
} from "react-tabs";
import { UseFormRegister, FieldErrors } from "react-hook-form";

//internal import

import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import TextAreaCom from "@/components/form/others/TextAreaCom";
import Uploader from "@/components/image-uploader/Uploader";

interface AboutUsProps {
  isSave: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setAboutHeaderBg: (url: string) => void;
  aboutHeaderBg: string;
  setAboutPageHeader: (checked: boolean) => void;
  aboutPageHeader: boolean;
  setAboutTopContentLeft: (checked: boolean) => void;
  aboutTopContentLeft: boolean;
  setAboutTopContentRight: (checked: boolean) => void;
  aboutTopContentRight: boolean;
  setAboutTopContentRightImage: (url: string) => void;
  aboutTopContentRightImage: string;
  setAboutMiddleContentSection: (checked: boolean) => void;
  aboutMiddleContentSection: boolean;
  setAboutMiddleContentImage: (url: string) => void;
  aboutMiddleContentImage: string;
  setOurFounderSection: (checked: boolean) => void;
  ourFounderSection: boolean;
  setOurFounderOneImage: (url: string) => void;
  ourFounderOneImage: string;
  setOurFounderTwoImage: (url: string) => void;
  ourFounderTwoImage: string;
  setOurFounderThreeImage: (url: string) => void;
  ourFounderThreeImage: string;
  setOurFounderFourImage: (url: string) => void;
  ourFounderFourImage: string;
  setOurFounderFiveImage: (url: string) => void;
  ourFounderFiveImage: string;
  setOurFounderSixImage: (url: string) => void;
  ourFounderSixImage: string;
  isSubmitting: boolean;
}

const AboutUs = ({
  isSave,
  register,
  errors,
  setAboutHeaderBg,
  aboutHeaderBg,
  setAboutPageHeader,
  aboutPageHeader,
  setAboutTopContentLeft,
  aboutTopContentLeft,
  setAboutTopContentRight,
  aboutTopContentRight,
  setAboutTopContentRightImage,
  aboutTopContentRightImage,
  setAboutMiddleContentSection,
  aboutMiddleContentSection,
  setAboutMiddleContentImage,
  aboutMiddleContentImage,
  setOurFounderSection,
  ourFounderSection,
  setOurFounderOneImage,
  ourFounderOneImage,
  setOurFounderTwoImage,
  ourFounderTwoImage,
  setOurFounderThreeImage,
  ourFounderThreeImage,
  setOurFounderFourImage,
  ourFounderFourImage,
  setOurFounderFiveImage,
  ourFounderFiveImage,
  setOurFounderSixImage,
  ourFounderSixImage,
  isSubmitting,
}: AboutUsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-12 font-sans pr-4">
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <div className="sticky top-0 z-20 flex justify-end">
            {isSubmitting ? (
              <Button disabled={true} type="button" className="h-10 px-6">
                <img
                  src={spinnerLoadingImage}
                  alt="Loading"
                  width={20}
                  height={10}
                />{" "}
                <span className="font-serif ml-2 font-light">
                  {" "}
                  {t("Processing")}
                </span>
              </Button>
            ) : (
              <Button type="submit" className="h-10 px-6 ">
                {" "}
                {isSave ? t("SaveBtn") : t("UpdateBtn")}
              </Button>
            )}
          </div>

          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1">
            <FiSettings className="mt-1 mr-2" />
            {t("AboutUs")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full">
            <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400">
              <strong>{t("PageHeader")}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setAboutPageHeader}
                  processOption={aboutPageHeader}
                />
              </div>
            </div>

            <div
              className="mb-height-0"
              style={{
                height: aboutPageHeader ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !aboutPageHeader ? "hidden" : "visible",
                opacity: !aboutPageHeader ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("PageHeaderBg")}
                </label>
                <div className="sm:col-span-4">
                  <Uploader
                    imageUrl={aboutHeaderBg}
                    setImageUrl={setAboutHeaderBg}
                    folder="about"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("PageTitle")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Page Title"
                    name="about_page_title"
                    type="text"
                    placeholder={t("PageTitle")}
                  />
                  <Error errorName={typeof errors.about_page_title?.message === 'string' ? { message: errors.about_page_title.message } : undefined} />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 mt-5 text-gray-500 dark:text-gray-400">
              <strong>{t("AboutPageTopContentLeft")}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setAboutTopContentLeft}
                  processOption={aboutTopContentLeft}
                />
              </div>
            </div>

            <div
              className="mb-height-0"
              style={{
                height: aboutTopContentLeft ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !aboutTopContentLeft ? "hidden" : "visible",
                opacity: !aboutTopContentLeft ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("TopTitle")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_title"
                    type="text"
                    placeholder={t("TopTitle")}
                  />
                  <Error errorName={typeof errors.about_page_Top_title_left?.message === 'string' ? { message: errors.about_page_Top_title_left.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("TopDescription")}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Top Description"
                    name="about_us_top_description"
                    type="text"
                    placeholder="About Us Top Description"
                  />
                  <Error errorName={typeof errors.about_us_top_description?.message === 'string' ? { message: errors.about_us_top_description.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("BoxOneTitle")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_left_box_one_title"
                    type="text"
                    placeholder={t("BoxOneTitle")}
                  />
                  <Error errorName={typeof errors.about_page_Top_left_box_one_title?.message === 'string' ? { message: errors.about_page_Top_left_box_one_title.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("BoxOneSubtitle")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_left_box_one_subtitle"
                    type="text"
                    placeholder={t("BoxOneSubtitle")}
                  />
                  <Error errorName={typeof errors.about_page_Top_left_box_one_subtitle?.message === 'string' ? { message: errors.about_page_Top_left_box_one_subtitle.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("BoxOneDescription")}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Top Box One Description"
                    name="about_us_top_box_one_description"
                    type="text"
                    placeholder={t("BoxOneDescription")}
                  />
                  <Error errorName={typeof errors.about_us_top_box_one_description?.message === 'string' ? { message: errors.about_us_top_box_one_description.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("BoxTwoTitle")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_left_box_two_title"
                    type="text"
                    placeholder={t("BoxTwoTitle")}
                  />
                  <Error errorName={typeof errors.about_page_Top_left_box_two_title?.message === 'string' ? { message: errors.about_page_Top_left_box_two_title.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("BoxTwoSubtitle")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_left_box_two_subtitle"
                    type="text"
                    placeholder={t("BoxTwoSubtitle")}
                  />
                  <Error errorName={typeof errors.about_page_Top_left_box_two_subtitle?.message === 'string' ? { message: errors.about_page_Top_left_box_two_subtitle.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("BoxTwoDescription")}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Top Box Two Description"
                    name="about_us_top_box_two_description"
                    type="text"
                    placeholder={t("BoxTwoDescription")}
                  />
                  <Error errorName={typeof errors.about_us_top_box_two_description?.message === 'string' ? { message: errors.about_us_top_box_two_description.message } : undefined} />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 md:mt-5 text-gray-500 dark:text-gray-400 ">
              <strong>{t("PageTopContentRight")}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setAboutTopContentRight}
                  processOption={aboutTopContentRight}
                />
              </div>
            </div>

            <div
              style={{
                height: aboutTopContentRight ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !aboutTopContentRight ? "hidden" : "visible",
                opacity: !aboutTopContentRight ? "0" : "1",
              }}
              className="mb-height-0 grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative"
            >
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("TopContentRightImage")}
              </label>
              <div className="sm:col-span-4">
                <Uploader
                  imageUrl={aboutTopContentRightImage}
                  setImageUrl={setAboutTopContentRightImage}
                  folder="about"
                  targetWidth={1050}
                  targetHeight={805}
                />
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 md:mt-5 text-gray-500 dark:text-gray-400 relative ">
              <strong>{t("MiddleContentSection")}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setAboutMiddleContentSection}
                  processOption={aboutMiddleContentSection}
                />
              </div>
            </div>

            <div
              className="mb-height-0"
              style={{
                height: aboutMiddleContentSection ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !aboutMiddleContentSection ? "hidden" : "visible",
                opacity: !aboutMiddleContentSection ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("MiddleDescriptionOne")}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Middle Description"
                    name="about_us_middle_description_one"
                    type="text"
                    placeholder={t("MiddleDescriptionOne")}
                  />
                  <Error errorName={typeof errors.about_us_middle_description_one?.message === 'string' ? { message: errors.about_us_middle_description_one.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("MiddleDescriptionTwo")}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Middle Description"
                    name="about_us_middle_description_two"
                    type="text"
                    placeholder={t("MiddleDescriptionTwo")}
                  />
                  <Error errorName={typeof errors.about_us_middle_description_two?.message === 'string' ? { message: errors.about_us_middle_description_two.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("MiddleContentImage")}
                </label>
                <div className="sm:col-span-4">
                  <Uploader
                    imageUrl={aboutMiddleContentImage}
                    setImageUrl={setAboutMiddleContentImage}
                    folder="about"
                    targetWidth={1420}
                    targetHeight={425}
                  />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 md:mt-5 text-gray-500 dark:text-gray-400 ">
              <strong>{t("OurFounder")}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setOurFounderSection}
                  processOption={ourFounderSection}
                />
              </div>
            </div>

            <div
              className="mb-height-0"
              style={{
                height: ourFounderSection ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !ourFounderSection ? "hidden" : "visible",
                opacity: !ourFounderSection ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("OurFounderTitle")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="about_page_ourfounder_title"
                    type="text"
                    placeholder={t("OurFounderTitle")}
                  />
                  <Error errorName={typeof errors.about_page_ourfounder_title?.message === 'string' ? { message: errors.about_page_ourfounder_title.message } : undefined} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("OurFounderDescription")}
                </label>
                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="Our Founder Description"
                    name="about_us_ourfounder_description"
                    type="text"
                    placeholder={t("OurFounderDescription")}
                  />
                  <Error errorName={typeof errors.about_us_ourfounder_description?.message === 'string' ? { message: errors.about_us_ourfounder_description.message } : undefined} />
                </div>
              </div>

              {/*  ====================================================== Our Team Tabs ====================================================== */}

              <TabsComponent>
                <Tabs>
                  <TabList>
                    <Tab>{t("OurTeam")} 1</Tab>
                    <Tab>{t("OurTeam")} 2</Tab>
                    <Tab>{t("OurTeam")} 3</Tab>
                    <Tab>{t("OurTeam")} 4</Tab>
                    <Tab>{t("OurTeam")} 5</Tab>
                    <Tab>{t("OurTeam")} 6</Tab>
                  </TabList>

                  <TabPanel className="mt-10">
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderOneImage")}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderOneImage}
                          setImageUrl={setOurFounderOneImage}
                          folder="about"
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderOneTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_one_title"
                          type="text"
                          placeholder={t("OurFounderOneTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_one_title?.message === 'string' ? { message: errors.about_page_ourfounder_one_title.message } : undefined} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderOneSubTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_one_sub_title"
                          type="text"
                          placeholder={t("OurFounderOneSubTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_one_sub_title?.message === 'string' ? { message: errors.about_page_ourfounder_one_sub_title.message } : undefined} />
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderTwoImage")}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderTwoImage}
                          setImageUrl={setOurFounderTwoImage}
                          folder="about"
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderTwoTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_two_title"
                          type="text"
                          placeholder={t("OurFounderTwoTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_two_title?.message === 'string' ? { message: errors.about_page_ourfounder_two_title.message } : undefined} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderTwoSubTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_two_sub_title"
                          type="text"
                          placeholder={t("OurFounderTwoSubTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_two_sub_title?.message === 'string' ? { message: errors.about_page_ourfounder_two_sub_title.message } : undefined} />
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderThreeImage")}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderThreeImage}
                          setImageUrl={setOurFounderThreeImage}
                          folder="about"
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderThreeTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_three_title"
                          type="text"
                          placeholder={t("OurFounderThreeTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_three_title?.message === 'string' ? { message: errors.about_page_ourfounder_three_title.message } : undefined} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderThreeSubTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_three_sub_title"
                          type="text"
                          placeholder={t("OurFounderThreeSubTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_three_sub_title?.message === 'string' ? { message: errors.about_page_ourfounder_three_sub_title.message } : undefined} />
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderFourImage")}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderFourImage}
                          setImageUrl={setOurFounderFourImage}
                          folder="about"
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderFourTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_four_title"
                          type="text"
                          placeholder={t("OurFounderFourTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_four_title?.message === 'string' ? { message: errors.about_page_ourfounder_four_title.message } : undefined} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderFourSubTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_four_sub_title"
                          type="text"
                          placeholder={t("OurFounderFourSubTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_four_sub_title?.message === 'string' ? { message: errors.about_page_ourfounder_four_sub_title.message } : undefined} />
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderFiveImage")}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderFiveImage}
                          setImageUrl={setOurFounderFiveImage}
                          folder="about"
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderFiveTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_five_title"
                          type="text"
                          placeholder={t("OurFounderFiveTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_five_title?.message === 'string' ? { message: errors.about_page_ourfounder_five_title.message } : undefined} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderFiveSubTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_five_sub_title"
                          type="text"
                          placeholder={t("OurFounderFiveSubTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_five_sub_title?.message === 'string' ? { message: errors.about_page_ourfounder_five_sub_title.message } : undefined} />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 ">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderSixImage")}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderSixImage}
                          setImageUrl={setOurFounderSixImage}
                          folder="about"
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderSixTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_six_title"
                          type="text"
                          placeholder={t("OurFounderSixTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_six_title?.message === 'string' ? { message: errors.about_page_ourfounder_six_title.message } : undefined} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t("OurFounderSixSubTitle")}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_six_sub_title"
                          type="text"
                          placeholder={t("OurFounderSixSubTitle")}
                        />
                        <Error errorName={typeof errors.about_page_ourfounder_six_sub_title?.message === 'string' ? { message: errors.about_page_ourfounder_six_sub_title.message } : undefined} />
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
              </TabsComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
