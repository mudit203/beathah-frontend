'use client';

import axios from "axios";
// import Cookies from 'js-cookie';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

interface UseAsyncResult<T> {
  data: T;
  error: string;
  loading: boolean;
}

const useAsync = <T = any>(asyncFunction: (args: any) => Promise<T>): UseAsyncResult<T> => {
  const [data, setData] = useState<T>([] as any);
  const [error, setError] = useState<string>("");
  // const [errCode, setErrCode] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const {
    invoice,
    status,
    zone,
    time,
    source,
    limitData,
    startDate,
    endDate,
    method,
    isUpdate,
    setIsUpdate,
    currentPage,
    category,
    searchText,
    sortedField,
  } = useContext(SidebarContext);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    
    const fetchData = async () => {
      try {
        const res = await asyncFunction({ cancelToken: source.token });
        if (!unmounted) {
          setData(res);
          setError("");
          setLoading(false);
        }
      } catch (err: any) {
        if (!unmounted) {
          setError(err.message);
          if (axios.isCancel(err)) {
            setError(err.message);
            setLoading(false);
            setData([] as any);
          } else {
            setError(err.message);
            setLoading(false);
            setData([] as any);
          }
        }
      }
    };

    fetchData();
    setIsUpdate(false);

    return () => {
      unmounted = true;
      source.cancel("Cancelled in cleanup");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    invoice,
    status,
    zone,
    time,
    method,
    source,
    limitData,
    startDate,
    endDate,
    isUpdate,
    currentPage,
    category,
    searchText,
    sortedField,
  ]);

  return {
    data,
    error,
    loading,
  };
};

export default useAsync;
