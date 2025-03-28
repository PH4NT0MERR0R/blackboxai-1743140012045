// Auth Types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  subscription_status: 'free' | 'premium';
}

// Design Types
export interface Design {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  content: DesignContent;
  thumbnail_url?: string;
  is_template: boolean;
  created_at: string;
  updated_at: string;
}

export interface DesignContent {
  elements: DesignElement[];
  background: string;
  width: number;
  height: number;
}

export interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  content: TextContent | ImageContent | ShapeContent;
}

export interface TextContent {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  alignment: 'left' | 'center' | 'right';
  italic: boolean;
  underline: boolean;
}

export interface ImageContent {
  src: string;
  filter: string;
  objectFit: 'contain' | 'cover' | 'fill';
}

export interface ShapeContent {
  type: 'rectangle' | 'circle' | 'triangle' | 'line';
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted';
}

// Editor Types
export interface EditorState {
  design: Design | null;
  selectedElement: string | null;
  zoom: number;
  history: EditorHistory;
  isDragging: boolean;
  isResizing: boolean;
}

export interface EditorHistory {
  past: DesignContent[];
  present: DesignContent | null;
  future: DesignContent[];
}

// Subscription Types
export interface SubscriptionPlan {
  id: 'mensal' | 'anual';
  title: string;
  price: number;
  period: number;
}

// Payment Types
export interface PaymentPreference {
  id: string;
  init_point: string;
}

export interface PaymentResponse {
  status: string;
  payment: {
    id: number;
    status: string;
    status_detail: string;
    transaction_amount: number;
    payment_method_id: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Editor Action Types
export type EditorAction =
  | { type: 'SET_DESIGN'; payload: Design }
  | { type: 'SELECT_ELEMENT'; payload: string }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'UPDATE_ELEMENT'; payload: DesignElement }
  | { type: 'ADD_ELEMENT'; payload: DesignElement }
  | { type: 'REMOVE_ELEMENT'; payload: string }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'SET_RESIZING'; payload: boolean };