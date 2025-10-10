'use client';

import { useReducer, useEffect, useCallback } from 'react';

// Define the state and action types
type State = {
  stack: string[];
};

type Action = 
  | { type: 'PUSH'; payload: string }
  | { type: 'POP' }
  | { type: 'REPLACE'; payload: string[] };

// Reducer function to manage the stack
const stackReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'PUSH':
      return { ...state, stack: [...state.stack, action.payload] };
    case 'POP':
      return { ...state, stack: state.stack.slice(0, -1) };
    case 'REPLACE':
      return { ...state, stack: action.payload };
    default:
      return state;
  }
};

const SESSION_STORAGE_KEY = 'panelStack';

// This initializer function runs only once, on the initial render.
const getInitialState = () => {
  // This code only runs on the client.
  if (typeof window !== 'undefined') {
    try {
      const savedStack = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (savedStack) {
        return { stack: JSON.parse(savedStack) };
      }
    } catch (error) {
      console.error("Failed to read from sessionStorage", error);
    }
  }
  // Default state if on server or if nothing is in storage.
  return { stack: [] };
};

export const usePanelStack = () => {
  const [state, dispatch] = useReducer(stackReducer, getInitialState());

  // Whenever the stack changes, save it to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state.stack));
    } catch (error) {
      console.error("Failed to write to sessionStorage", error);
    }
  }, [state.stack]);

  const push = useCallback((panel: string) => {
    dispatch({ type: 'PUSH', payload: panel });
  }, []);

  const pop = useCallback(() => {
    dispatch({ type: 'POP' });
  }, []);

  return { stack: state.stack, push, pop };
};
