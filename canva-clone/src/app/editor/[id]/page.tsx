'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, designs } from '@/lib/supabase';
import { EditorProvider } from '@/contexts/EditorContext';
import Toolbar from '@/components/editor/Toolbar';
import Sidebar from '@/components/editor/Sidebar';
import Canvas from '@/components/editor/Canvas';

function EditorContent({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeEditor = async () => {
      try {
        const { session, error: authError } = await auth.getSession();
        
        if (authError || !session) {
          router.push('/login');
          return;
        }

        if (params.id === 'new') {
          const newDesign = {
            title: 'Design sem título',
            content: {
              elements: [],
              background: '#ffffff',
              width: 800,
              height: 600
            },
            is_template: false,
          };

          const { data, error } = await designs.create(session.user.id, newDesign);

          if (error) throw error;
          if (data) {
            router.replace(`/editor/${data[0].id}`);
          }
        } else {
          const { data, error } = await designs.list(session.user.id);
          if (error) throw error;
          
          const design = data?.find(d => d.id === params.id);
          if (!design) {
            setError('Design não encontrado');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar design');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeEditor();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 btn-primary"
          >
            Voltar para o Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Canvas />
      </div>
    </div>
  );
}

export default function EditorPage({ params }: { params: { id: string } }) {
  return (
    <EditorProvider>
      <EditorContent params={params} />
    </EditorProvider>
  );
}