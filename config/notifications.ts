// Configurações do sistema de notificações

export const notificationConfig = {
  // Configurações de Email
  email: {
    from: 'PCA Peças <noreply@pcapecas.com.br>',
    subject: 'Novo Produto Cadastrado - PCA Peças',
    template: {
      title: 'PCA Peças - Notificação de Cadastro',
      successMessage: '✅ O produto foi cadastrado com sucesso no sistema de gestão de estoque.',
      footer: 'Esta é uma notificação automática do sistema PCA Peças.'
    }
  },
  // Configurações gerais
  general: {
    // Tempo de timeout para envio de notificações (em ms)
    timeout: 10000,
    // Tentativas de reenvio em caso de falha
    retryAttempts: 3,
    // Delay entre tentativas (em ms)
    retryDelay: 2000
  }
};

// Função para formatar HTML do email
export const formatEmailHTML = (codigo_produto: string, descricao_produto: string) => {
  const { template } = notificationConfig.email;
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2563eb; margin-bottom: 20px;">${template.title}</h2>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #1e293b; margin-bottom: 15px;">Produto Cadastrado com Sucesso</h3>
        <div style="margin-bottom: 15px;">
          <strong>Código do Produto:</strong> ${codigo_produto}
        </div>
        <div style="margin-bottom: 15px;">
          <strong>Descrição:</strong> ${descricao_produto}
        </div>
        <div style="margin-bottom: 15px;">
          <strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}
        </div>
      </div>
      <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
        <p style="margin: 0; color: #065f46;">
          ${template.successMessage}
        </p>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
        <p>${template.footer}</p>
        <p>Para mais informações, acesse o painel administrativo.</p>
      </div>
    </div>
  `;
}; 