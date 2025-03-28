'use client';

import { useState } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { useRouter } from 'next/navigation';

export default function Toolbar() {
  const router = useRouter();
  const { state, undo, redo, setZoom } = useEditor();
  const [title, setTitle] = useState(state.design?.title || 'Design sem título');

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleZoomIn = () => {
    setZoom(Math.min(state.zoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(state.zoom - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  return (
    <div className="h-14 bg-white border-b flex items-center px-4 justify-between">
      {/* Seção Esquerda */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
          title="Voltar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="h-6 w-px bg-gray-200" />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium focus:outline-none focus:border-b-2 focus:border-primary-500 px-1"
        />
      </div>

      {/* Seção Central */}
      <div className="flex items-center space-x-2">
        <button
          onClick={undo}
          disabled={!state.history.past.length}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Desfazer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a4 4 0 0 1 4 4v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        <button
          onClick={redo}
          disabled={!state.history.future.length}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refazer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10h-10a4 4 0 0 0-4 4v2M21 10l-6 6m6-6l-6-6" />
          </svg>
        </button>
        <div className="h-6 w-px bg-gray-200 mx-2" />
        <div className="flex items-center space-x-1">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
            title="Diminuir zoom"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={handleZoomReset}
            className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            {Math.round(state.zoom * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
            title="Aumentar zoom"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Seção Direita */}
      <div className="flex items-center space-x-2">
        <button className="btn-secondary">
          Compartilhar
        </button>
        <button className="btn-primary">
          Baixar
        </button>
      </div>
    </div>
  );
}