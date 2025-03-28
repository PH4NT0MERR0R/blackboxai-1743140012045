'use client';

import { useRef, useState, useEffect } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import type { DesignElement } from '@/types';

interface CanvasProps {
  width?: number;
  height?: number;
}

export default function Canvas({ width = 800, height = 600 }: CanvasProps) {
  const { state, selectElement, updateElement } = useEditor();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Ajustar escala baseado no zoom
  useEffect(() => {
    if (canvasRef.current) {
      setScale(state.zoom);
    }
  }, [state.zoom]);

  // Renderizar um elemento baseado em seu tipo
  const renderElement = (element: DesignElement) => {
    const isSelected = state.selectedElement === element.id;
    const baseStyle = {
      position: 'absolute',
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      transform: `rotate(${element.rotation}deg)`,
      opacity: element.opacity,
      cursor: 'move',
      border: isSelected ? '2px solid #0ea5e9' : 'none',
      borderRadius: '2px',
    } as React.CSSProperties;

    switch (element.type) {
      case 'text':
        const textContent = element.content as { text: string; fontFamily: string; fontSize: number; color: string; alignment: string };
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              fontFamily: textContent.fontFamily,
              fontSize: `${textContent.fontSize}px`,
              color: textContent.color,
              textAlign: textContent.alignment as any,
              display: 'flex',
              alignItems: 'center',
              justifyContent: textContent.alignment === 'center' ? 'center' : 'flex-start',
              padding: '4px',
            }}
            onClick={() => selectElement(element.id)}
          >
            {textContent.text}
          </div>
        );

      case 'image':
        const imageContent = element.content as { src: string; objectFit: string };
        return (
          <div
            key={element.id}
            style={baseStyle}
            onClick={() => selectElement(element.id)}
          >
            <img
              src={imageContent.src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: imageContent.objectFit as any,
              }}
            />
          </div>
        );

      case 'shape':
        const shapeContent = element.content as {
          type: string;
          backgroundColor: string;
          borderColor: string;
          borderWidth: number;
          borderStyle: string;
        };
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              backgroundColor: shapeContent.backgroundColor,
              border: `${shapeContent.borderWidth}px ${shapeContent.borderStyle} ${shapeContent.borderColor}`,
              borderRadius: shapeContent.type === 'circle' ? '50%' : '0',
            }}
            onClick={() => selectElement(element.id)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-auto p-8">
      <div className="flex items-center justify-center min-h-full">
        <div
          ref={canvasRef}
          className="bg-white shadow-lg"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            position: 'relative',
          }}
        >
          {state.history.present?.elements.map(renderElement)}
        </div>
      </div>
    </div>
  );
}