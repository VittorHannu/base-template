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
      if (state.stack.includes(action.payload)) {
        return state;
      }
      return { ...state, stack: [...state.stack, action.payload] };
    case 'POP':
      return { ...state, stack: state.stack.slice(0, -1) };
    case 'REPLACE':
      return { ...state, stack: action.payload };
    default:
      return state;
  }
};

// This initializer function runs only once
const getInitialState = (): State => {
  if (typeof window === 'undefined') {
    return { stack: [] };
  }

  const hash = window.location.hash;
  if (hash.startsWith('#panels=')) {
    const panelNames = hash.substring(8).split(',');
    return { stack: panelNames.filter(Boolean) };
  }

  return { stack: [] };
};

export const usePanelStack = () => {
  const [state, dispatch] = useReducer(stackReducer, getInitialState());

  // Effect to sync state to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('panelStack', JSON.stringify(state.stack));
    } catch (error) {
      console.error("Failed to write to sessionStorage", error);
    }
  }, [state.stack]);

  // Effect to handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const panelNames = hash.startsWith('#panels=') ? hash.substring(8).split(',').filter(Boolean) : [];
      
      // Only dispatch if the state is actually different
      if (JSON.stringify(panelNames) !== JSON.stringify(state.stack)) {
        setTimeout(() => {
          dispatch({ type: 'REPLACE', payload: panelNames });
        }, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [state.stack]);

  const push = useCallback((panel: string) => {
    // First, update the React state
    dispatch({ type: 'PUSH', payload: panel });
    
    // Then, update the URL, creating a new history entry
    const newStack = [...state.stack, panel];
    const newHash = `#panels=${newStack.join(',')}`;
    window.history.pushState(null, '', newHash);
  }, [state.stack]);

  const pop = useCallback(() => {
    // Let the browser handle the state change via the hashchange listener
    window.history.back();
  }, []);

  return { stack: state.stack, push, pop };
};