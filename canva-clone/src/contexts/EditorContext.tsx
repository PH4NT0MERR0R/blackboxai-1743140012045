'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { 
  Design, 
  EditorState, 
  EditorAction, 
  DesignElement, 
  DesignContent 
} from '@/types';

// Estado inicial
const initialState: EditorState = {
  design: null,
  selectedElement: null,
  zoom: 1,
  history: {
    past: [],
    present: null,
    future: [],
  },
  isDragging: false,
  isResizing: false,
};

// Reducer para gerenciar o estado
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_DESIGN':
      return {
        ...state,
        design: action.payload,
        history: {
          past: [],
          present: action.payload.content,
          future: [],
        },
      };

    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElement: action.payload,
      };

    case 'SET_ZOOM':
      return {
        ...state,
        zoom: action.payload,
      };

    case 'UNDO':
      if (state.history.past.length === 0) return state;
      
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, -1);

      return {
        ...state,
        history: {
          past: newPast,
          present: previous,
          future: [state.history.present!, ...state.history.future],
        },
      };

    case 'REDO':
      if (state.history.future.length === 0) return state;
      
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);

      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present!],
          present: next,
          future: newFuture,
        },
      };

    case 'UPDATE_ELEMENT':
      if (!state.history.present) return state;
      
      const updatedElements = state.history.present.elements.map(el =>
        el.id === action.payload.id ? action.payload : el
      );

      const updatedContent: DesignContent = {
        ...state.history.present,
        elements: updatedElements,
      };

      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: updatedContent,
          future: [],
        },
      };

    case 'ADD_ELEMENT':
      if (!state.history.present) return state;

      const contentWithNewElement: DesignContent = {
        ...state.history.present,
        elements: [...state.history.present.elements, action.payload],
      };

      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: contentWithNewElement,
          future: [],
        },
      };

    case 'REMOVE_ELEMENT':
      if (!state.history.present) return state;

      const contentWithoutElement: DesignContent = {
        ...state.history.present,
        elements: state.history.present.elements.filter(el => el.id !== action.payload),
      };

      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: contentWithoutElement,
          future: [],
        },
      };

    case 'SET_DRAGGING':
      return {
        ...state,
        isDragging: action.payload,
      };

    case 'SET_RESIZING':
      return {
        ...state,
        isResizing: action.payload,
      };

    default:
      return state;
  }
}

interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  addElement: (element: DesignElement) => void;
  updateElement: (element: DesignElement) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  undo: () => void;
  redo: () => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const addElement = useCallback((element: DesignElement) => {
    dispatch({ type: 'ADD_ELEMENT', payload: element });
  }, []);

  const updateElement = useCallback((element: DesignElement) => {
    dispatch({ type: 'UPDATE_ELEMENT', payload: element });
  }, []);

  const removeElement = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ELEMENT', payload: id });
  }, []);

  const selectElement = useCallback((id: string | null) => {
    if (id) {
      dispatch({ type: 'SELECT_ELEMENT', payload: id });
    }
  }, []);

  const setZoom = useCallback((zoom: number) => {
    dispatch({ type: 'SET_ZOOM', payload: zoom });
  }, []);

  const undo = useCallback(() => {
    if (state.history.past.length > 0) {
      dispatch({ type: 'UNDO' });
    }
  }, [state.history.past.length]);

  const redo = useCallback(() => {
    if (state.history.future.length > 0) {
      dispatch({ type: 'REDO' });
    }
  }, [state.history.future.length]);

  const value: EditorContextType = {
    state,
    dispatch,
    addElement,
    updateElement,
    removeElement,
    selectElement,
    setZoom,
    undo,
    redo,
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}