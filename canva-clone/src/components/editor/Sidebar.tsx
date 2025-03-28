'use client';

import { useState } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import type { DesignElement } from '@/types';

const ELEMENT_TEMPLATES = {
  text: {
    type: 'text',
    content: {
      text: 'Digite seu texto aqui',
      fontFamily: 'Inter',
      fontSize: 24,
      color: '#000000',
      alignment: 'left',
      italic: false,
      underline: false,
    },
    width: 200,
    height: 50,
    x: 100,
    y: 100,
    rotation: 0,
    opacity: 1,
  },
  heading: {
    type: 'text',
    content: {
      text: 'Título Principal',
      fontFamily: 'Inter',
      fontSize: 36,
      color: '#000000',
      alignment: 'center',
      italic: false,
      underline: false,
    },
    width: 400,
    height: 60,
    x: 100,
    y: 100,
    rotation: 0,
    opacity: 1,
  },
  rectangle: {
    type: 'shape',
    content: {
      type: 'rectangle',
      backgroundColor: '#E5E7EB',
      borderColor: '#D1D5DB',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    width: 200,
    height: 100,
    x: 100,
    y: 100,
    rotation: 0,
    opacity: 1,
  },
  circle: {
    type: 'shape',
    content: {
      type: 'circle',
      backgroundColor: '#E5E7EB',
      borderColor: '#D1D5DB',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    width: 100,
    height: 100,
    x: 100,
    y: 100,
    rotation: 0,
    opacity: 1,
  },
};

export default function Sidebar() {
  const { addElement } = useEditor();
  const [activeTab, setActiveTab] = useState('elementos');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddElement = (templateName: keyof typeof ELEMENT_TEMPLATES) => {
    const template = ELEMENT_TEMPLATES[templateName];
    const newElement: DesignElement = {
      ...template,
      id: `element-${Date.now()}`,
    } as DesignElement;
    addElement(newElement);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'elementos':
        return (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleAddElement('text')}
              className="p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="text-sm font-medium text-gray-900">Texto</div>
              <div className="text-xs text-gray-500 mt-1">Adicionar texto simples</div>
            </button>
            <button
              onClick={() => handleAddElement('heading')}
              className="p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="text-sm font-medium text-gray-900">Título</div>
              <div className="text-xs text-gray-500 mt-1">Adicionar título grande</div>
            </button>
            <button
              onClick={() => handleAddElement('rectangle')}
              className="p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="text-sm font-medium text-gray-900">Retângulo</div>
              <div className="text-xs text-gray-500 mt-1">Forma geométrica básica</div>
            </button>
            <button
              onClick={() => handleAddElement('circle')}
              className="p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="text-sm font-medium text-gray-900">Círculo</div>
              <div className="text-xs text-gray-500 mt-1">Forma circular</div>
            </button>
          </div>
        );

      case 'uploads':
        return (
          <div className="text-center py-8">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">Arraste e solte suas imagens aqui</p>
            <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Fazer upload
            </button>
          </div>
        );

      case 'templates':
        return (
          <div className="text-center py-8 text-gray-500">
            Templates em breve...
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      {/* Barra de pesquisa */}
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'elementos'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('elementos')}
        >
          Elementos
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'uploads'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('uploads')}
        >
          Uploads
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'templates'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderTabContent()}
      </div>
    </div>
  );
}