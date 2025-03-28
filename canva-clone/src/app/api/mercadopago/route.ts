import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import type { PaymentPreference, PaymentResponse, SubscriptionPlan } from '@/types';

// Configurar MercadoPago com a chave de acesso
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN é necessário');
}

if (!APP_URL) {
  throw new Error('NEXT_PUBLIC_APP_URL é necessário');
}

const client = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_ACCESS_TOKEN });
const preference = new Preference(client);
const payment = new Payment(client);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, planId } = body;

    if (!email || !planId) {
      return NextResponse.json(
        { error: 'Email e planId são obrigatórios' },
        { status: 400 }
      );
    }

    // Definir os detalhes do plano
    const planos: Record<string, SubscriptionPlan> = {
      mensal: {
        id: 'mensal',
        title: 'Plano Mensal Premium',
        price: 29.90,
        period: 1
      },
      anual: {
        id: 'anual',
        title: 'Plano Anual Premium',
        price: 299.90,
        period: 12
      }
    };

    const plano = planos[planId];
    
    if (!plano) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    // Criar preferência de pagamento
    const preferenceData = {
      items: [
        {
          id: plano.id,
          title: plano.title,
          unit_price: plano.price,
          quantity: 1,
          currency_id: 'BRL',
        },
      ],
      payer: {
        email,
      },
      back_urls: {
        success: `${APP_URL}/pagamento/sucesso`,
        failure: `${APP_URL}/pagamento/erro`,
        pending: `${APP_URL}/pagamento/pendente`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [
          {
            id: 'ticket'
          }
        ],
        installments: 12
      },
      statement_descriptor: 'CANVACLONE',
    };

    const result = await preference.create({ body: preferenceData });

    if (!result.id || !result.init_point) {
      throw new Error('Erro ao criar preferência de pagamento');
    }

    const paymentPreference: PaymentPreference = {
      id: result.id,
      init_point: result.init_point,
    };

    return NextResponse.json(paymentPreference);
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento. Tente novamente.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  
  if (!paymentId) {
    return NextResponse.json(
      { error: 'Payment ID não fornecido' },
      { status: 400 }
    );
  }

  try {
    const result = await payment.get({ id: parseInt(paymentId) });

    if (!result.id || !result.status || !result.status_detail || 
        !result.transaction_amount || !result.payment_method_id) {
      throw new Error('Dados de pagamento incompletos');
    }

    const paymentResponse: PaymentResponse = {
      status: status || 'unknown',
      payment: {
        id: result.id,
        status: result.status,
        status_detail: result.status_detail,
        transaction_amount: result.transaction_amount,
        payment_method_id: result.payment_method_id,
      }
    };

    return NextResponse.json(paymentResponse);
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar status do pagamento' },
      { status: 500 }
    );
  }
}