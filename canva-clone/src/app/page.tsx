import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container-custom py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                Crie designs incríveis em minutos
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8">
                Ferramenta de design online simples e poderosa para criar apresentações, posts para redes sociais, e muito mais.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/registro" className="btn-primary text-lg px-8 py-4">
                  Comece Grátis
                </Link>
                <Link href="/templates" className="btn-secondary text-lg px-8 py-4">
                  Ver Templates
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Tudo que você precisa para criar designs profissionais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-paint-brush text-2xl text-primary-600"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Templates Prontos</h3>
                <p className="text-gray-600">
                  Milhares de templates profissionais para personalizar e usar
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-magic text-2xl text-primary-600"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Editor Intuitivo</h3>
                <p className="text-gray-600">
                  Interface simples e fácil de usar para criar designs rapidamente
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-images text-2xl text-primary-600"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Biblioteca de Mídia</h3>
                <p className="text-gray-600">
                  Acesso a milhões de fotos, ícones e elementos gráficos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Preview Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Templates para todas as necessidades
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Template Card 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Posts para Redes Sociais</h3>
                  <p className="text-gray-600 text-sm">
                    Templates otimizados para Instagram, Facebook e mais
                  </p>
                </div>
              </div>

              {/* Template Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Apresentações</h3>
                  <p className="text-gray-600 text-sm">
                    Slides profissionais para suas apresentações
                  </p>
                </div>
              </div>

              {/* Template Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Marketing Digital</h3>
                  <p className="text-gray-600 text-sm">
                    Banners, anúncios e materiais promocionais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-900 text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">
              Comece a criar designs incríveis hoje mesmo
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se a milhões de pessoas que já estão criando designs profissionais com nossa plataforma
            </p>
            <Link href="/registro" className="btn-primary text-lg px-8 py-4">
              Criar Conta Gratuita
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}