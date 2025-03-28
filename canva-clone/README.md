# CanvaClone - Editor de Design Online

Um clone do Canva construído com Next.js, Tailwind CSS, e Supabase. Este projeto é uma plataforma de design online que permite aos usuários criar designs profissionais facilmente.

## 🚀 Funcionalidades

- ✨ Editor de design intuitivo e responsivo
- 🎨 Templates prontos para uso
- 👥 Sistema de autenticação de usuários
- 💾 Salvamento automático dos designs
- 🔄 Histórico de alterações (undo/redo)
- 💳 Integração com MercadoPago para pagamentos
- 📱 Design responsivo para todas as telas

## 🛠️ Tecnologias Utilizadas

- [Next.js 13](https://nextjs.org/) - Framework React com App Router
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Supabase](https://supabase.com/) - Backend as a Service
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript
- [MercadoPago](https://www.mercadopago.com.br/) - Processamento de pagamentos

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- NPM ou Yarn
- Conta no Supabase
- Conta no MercadoPago (para processamento de pagamentos)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/canva-clone.git
cd canva-clone
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` com suas credenciais.

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:3000`

## 🗄️ Estrutura do Projeto

```
canva-clone/
├── src/
│   ├── app/                 # App Router do Next.js
│   ├── components/          # Componentes React reutilizáveis
│   ├── contexts/           # Contextos React
│   ├── lib/                # Utilitários e configurações
│   └── types/              # Definições de tipos TypeScript
├── public/                 # Arquivos estáticos
└── ...
```

## 🔐 Variáveis de Ambiente

- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima do Supabase
- `MERCADO_PAGO_ACCESS_TOKEN`: Token de acesso do MercadoPago
- `NEXT_PUBLIC_APP_URL`: URL base da aplicação

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a build de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter
- `npm run test`: Executa os testes

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Seu Nome - [@seutwitter](https://twitter.com/seutwitter) - seu@email.com

Link do Projeto: [https://github.com/seu-usuario/canva-clone](https://github.com/seu-usuario/canva-clone)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [MercadoPago](https://www.mercadopago.com.br/)