'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, designs } from '@/lib/supabase';
import type { Design } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const [userDesigns, setUserDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const { session, error: authError } = await auth.getSession();
      
      if (authError || !session) {
        router.push('/login');
        return;
      }

      try {
        const { data, error: designsError } = await designs.list(session.user.id);
        if (designsError) throw designsError;
        
        setUserDesigns(data || []);
      } catch (err: any) {
        setError('Erro ao carregar designs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const templateCategories = [
    { id: 'social', name: 'Redes Sociais', icon: '📱' },
    { id: 'presentation', name: 'Apresentações', icon: '📊' },
    { id: 'marketing', name: 'Marketing', icon: '📢' },
    { id: 'documents', name: 'Documentos', icon: '📄' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Meus Designs</h1>
          <Link
            href="/editor/new"
            className="btn-primary flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Criar novo design
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Template Categories */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Começar com um template</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templateCategories.map((category) => (
              <Link
                key={category.id}
                href={`/templates/${category.id}`}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <span className="text-3xl mb-2 block">{category.icon}</span>
                <span className="text-gray-900 font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Designs */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Designs recentes</h2>
          {userDesigns.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum design encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">Comece criando seu primeiro design.</p>
              <div className="mt-6">
                <Link
                  href="/editor/new"
                  className="btn-primary inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Criar novo design
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userDesigns.map((design) => (
                <Link
                  key={design.id}
                  href={`/editor/${design.id}`}
                  className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {design.thumbnail_url ? (
                    <img
                      src={design.thumbnail_url}
                      alt={design.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{design.title}</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Editado em {new Date(design.updated_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}