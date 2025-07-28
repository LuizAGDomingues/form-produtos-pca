import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { notificationConfig, formatEmailHTML } from '../../../config/notifications';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { codigo_produto, descricao_produto, mensagem } = await request.json();

    // Configurar destinatários (você pode ajustar conforme necessário)
    const destinatarios = process.env.EMAIL_DESTINATARIOS?.split(',') || ['admin@pcapecas.com.br'];
    
    const { data, error } = await resend.emails.send({
      from: notificationConfig.email.from,
      to: destinatarios,
      subject: notificationConfig.email.subject,
      html: formatEmailHTML(codigo_produto, descricao_produto),
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return NextResponse.json(
        { error: 'Erro ao enviar email' },
        { status: 500 }
      );
    }

    console.log('Email enviado com sucesso:', data);
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Erro na API de email:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 