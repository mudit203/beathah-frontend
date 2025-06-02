'use client'

import { createContext, useState, useContext, useRef, useEffect, ReactNode, Dispatch, SetStateAction, MutableRefObject, useMemo, useCallback } from 'react'
import LanguageServices from "@/services/LanguageServices";
import SettingServices from "@/services/SettingServices";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import "@/i18n";

interface Language {
  iso_code: string;
  name: string;
  flag: string;
  [key: string]: any;
}

interface SidebarContextType {
  method: string;
  setMethod: Dispatch<SetStateAction<string>>;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  closeBulkDrawer: () => void;
  isBulkDrawerOpen: boolean;
  toggleBulkDrawer: () => void;
  isModalOpen: boolean;
  toggleModal: () => void;
  closeModal: () => void;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
  currLang: Language | null;
  handleLanguageChange: (value: Language) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  handleChangePage: (p: number) => void;
  searchText: string | null;
  setSearchText: Dispatch<SetStateAction<string | null>>;
  category: any;
  setCategory: Dispatch<SetStateAction<any>>;
  searchRef: MutableRefObject<HTMLInputElement | null>;
  handleSubmitForAll: (e: React.FormEvent<HTMLFormElement>) => void;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  zone: string;
  setZone: Dispatch<SetStateAction<string>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  sortedField: string;
  setSortedField: Dispatch<SetStateAction<string>>;
  resultsPerPage: number;
  limitData: number;
  setLimitData: Dispatch<SetStateAction<number>>;
  windowDimension: number;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  invoice: string | null;
  setInvoice: Dispatch<SetStateAction<string | null>>;
  invoiceRef: MutableRefObject<HTMLInputElement | null>;
  setNavBar: Dispatch<SetStateAction<boolean>>;
  navBar: boolean;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const resultsPerPage = 20;
  const searchRef = useRef<HTMLInputElement | null>(null);
  const invoiceRef = useRef<HTMLInputElement | null>(null);

  const [limitData, setLimitData] = useState(20);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBulkDrawerOpen, setIsBulkDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [lang, setLang] = useState("en");
  const [currLang, setCurrLang] = useState<Language | null>({
    iso_code: "en",
    name: "English",
    flag: "US",
  });
  const [time, setTime] = useState("");
  const [sortedField, setSortedField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [zone, setZone] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [method, setMethod] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [loading, setLoading] = useState(false);
  const [navBar, setNavBar] = useState(true);
  const { i18n } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const { data: globalSetting } = useQuery({
    queryKey: ["globalSetting"],
    queryFn: async () => await SettingServices.getGlobalSetting(),
    staleTime: 20 * 60 * 1000,
    gcTime: 25 * 60 * 1000,
  });

  const { data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: async () => await LanguageServices.getShowingLanguage(),
    staleTime: 20 * 60 * 1000,
    gcTime: 25 * 60 * 1000,
  });

  // Memoized callback functions
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(prev => !prev);
  }, []);

  const closeBulkDrawer = useCallback(() => {
    setIsBulkDrawerOpen(false);
  }, []);

  const toggleBulkDrawer = useCallback(() => {
    setIsBulkDrawerOpen(prev => !prev);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  const handleLanguageChange = useCallback((value: Language) => {
    Cookies.set("i18next", value?.iso_code, {
      sameSite: "None",
      secure: true,
    });
    i18n.changeLanguage(value?.iso_code);
    setLang(value?.iso_code);
    Cookies.set("_currLang", JSON.stringify(value), {
      sameSite: "None",
      secure: true,
    });
    setCurrLang(value);
  }, [i18n]);

  const handleChangePage = useCallback((p: number) => {
    setCurrentPage(p);
  }, []);

  const handleSubmitForAll = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchRef?.current?.value) {
      setSearchText(null);
      return;
    }
    setSearchText(searchRef.current.value);
    setCategory(null);
  }, []);

  // Language effect with proper dependencies - FIXED
  useEffect(() => {
    if (typeof window === 'undefined' || !globalSetting || !languages?.length) return;
    
    const pathname = window?.location.pathname === "/login";
    if (pathname) return;

    const defaultLang = globalSetting?.default_language || "en";
    const cookieLang = Cookies.get("i18next");
    const currLangCookie = Cookies.get("_currLang");

    if (currLangCookie) {
      try {
        const parsedLang = JSON.parse(currLangCookie);
        if (parsedLang?.iso_code && parsedLang.iso_code !== lang) {
          setLang(parsedLang.iso_code);
          setCurrLang(parsedLang);
          if (i18n.language !== parsedLang.iso_code) {
            i18n.changeLanguage(parsedLang.iso_code);
          }
          return;
        }
      } catch (e) {
        console.error("Error parsing currLang cookie:", e);
      }
    }

    const removeRegion = (langCode: string) => langCode?.split("-")[0];
    let selectedLang = removeRegion(cookieLang || defaultLang);

    // Only update if language actually changed
    if (lang !== selectedLang) {
      setLang(selectedLang);
      
      if (!cookieLang || cookieLang !== selectedLang) {
        Cookies.set("i18next", selectedLang, {
          sameSite: "None",
          secure: true,
        });
      }

      if (i18n.language !== selectedLang) {
        i18n.changeLanguage(selectedLang);
      }

      // Update currLang if not already set
      const result = languages.find((lang: Language) => lang?.iso_code === selectedLang);
      if (result) {
        setCurrLang(result);
        Cookies.set("_currLang", JSON.stringify(result), {
          sameSite: "None",
          secure: true,
        });
      }
    }
  }, [globalSetting?.default_language, languages]); // Removed lang and i18n from dependencies

  // Window resize effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Memoized context value
  const contextValue = useMemo(() => ({
    method,
    setMethod,
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    isDrawerOpen,
    toggleDrawer,
    closeDrawer,
    setIsDrawerOpen,
    closeBulkDrawer,
    isBulkDrawerOpen,
    toggleBulkDrawer,
    isModalOpen,
    toggleModal,
    closeModal,
    isUpdate,
    setIsUpdate,
    lang,
    setLang,
    currLang,
    handleLanguageChange,
    currentPage,
    setCurrentPage,
    handleChangePage,
    searchText,
    setSearchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    status,
    setStatus,
    zone,
    setZone,
    time,
    setTime,
    sortedField,
    setSortedField,
    resultsPerPage,
    limitData,
    setLimitData,
    windowDimension,
    modalOpen,
    setModalOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loading,
    setLoading,
    invoice,
    setInvoice,
    invoiceRef,
    setNavBar,
    navBar,
    tabIndex,
    setTabIndex,
  }), [
    method,
    isSidebarOpen,
    isDrawerOpen,
    isBulkDrawerOpen,
    isModalOpen,
    isUpdate,
    lang,
    currLang,
    currentPage,
    searchText,
    category,
    status,
    zone,
    time,
    sortedField,
    limitData,
    windowDimension,
    modalOpen,
    startDate,
    endDate,
    loading,
    invoice,
    navBar,
    tabIndex,
    toggleSidebar,
    closeSidebar,
    toggleDrawer,
    closeDrawer,
    closeBulkDrawer,
    toggleBulkDrawer,
    toggleModal,
    closeModal,
    handleLanguageChange,
    handleChangePage,
    handleSubmitForAll,
  ]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}