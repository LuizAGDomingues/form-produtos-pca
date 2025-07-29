import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { formatEmailHTML } from '../../../config/notifications';

export async function POST(request: NextRequest) {
  try {
    const { codigo_produto, descricao_produto, mensagem } = await request.json();

    // Configurar Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // seu-email@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD // senha de aplicativo
      }
    });

    // Configurar destinatários
    const destinatarios = process.env.EMAIL_DESTINATARIOS?.split(',') || ['admin@pcapecas.com.br'];
    
    const mailOptions = {
      from: `PCA Peças <${process.env.GMAIL_USER}>`,
      to: destinatarios,
      subject: 'Novo Produto Cadastrado - PCA Peças',
      html: formatEmailHTML(codigo_produto, descricao_produto),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email enviado com sucesso:', info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });

  } catch (error) {
    console.error('Erro na API de email:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 