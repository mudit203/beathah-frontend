'use client';

import React, { createContext, useReducer, useMemo, ReactNode, Dispatch } from 'react';
import Cookies from 'js-cookie';

interface AdminState {
  adminInfo: any;
}

interface AdminAction {
  type: 'USER_LOGIN' | 'USER_LOGOUT';
  payload?: any;
}

interface AdminContextType {
  state: AdminState;
  dispatch: Dispatch<AdminAction>;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

const initialState: AdminState = {
  adminInfo: Cookies.get('adminInfo')
    ? JSON.parse(Cookies.get('adminInfo') as string)
    : null,
};

function reducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'USER_LOGIN':
      // Only update state if the payload is different
      if (JSON.stringify(state.adminInfo) === JSON.stringify(action.payload)) {
        return state; // No changes, return the current state
      }
      return { ...state, adminInfo: action.payload };
    case 'USER_LOGOUT':
      if (state.adminInfo === null) {
        return state; // No changes, return the current state
      }
      return { ...state, adminInfo: null };
    default:
      return state;
  }
}

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};