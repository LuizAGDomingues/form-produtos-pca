# Sistema de Notificações - PCA Peças

## Visão Geral

O sistema de notificações do PCA Peças envia automaticamente alertas por **email** sempre que um novo produto é cadastrado com sucesso no sistema.

## Funcionalidades

### ✅ Email (Gmail SMTP)
- **Serviço:** Gmail SMTP (gratuito)
- **Template:** Email HTML responsivo e profissional
- **Destinatários:** Configuráveis via variável de ambiente
- **Conteúdo:** Código do produto, descrição e data/hora do cadastro
- **Limite:** 500 emails/dia

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# Email Configuration (Gmail SMTP)
GMAIL_USER=seu-email@gmail.com
GMAIL_APP_PASSWORD=sua-senha-de-app
EMAIL_DESTINATARIOS=admin@pcapecas.com.br,gerente@pcapecas.com.br
```

### 2. Configuração do Email (Gmail SMTP)

1. **Ativar 2FA no Gmail:**
   - Acesse [myaccount.google.com](https://myaccount.google.com)
   - Vá em "Segurança"
   - Ative "Verificação em duas etapas"

2. **Gerar senha de aplicativo:**
   - Ainda em "Segurança"
   - Clique em "Senhas de app"
   - Selecione "Outro (nome personalizado)"
   - Digite "PCA Peças"
   - Copie a senha de 16 caracteres gerada

3. **Configurar variáveis de ambiente:**
   - `GMAIL_USER`: seu email do Gmail
   - `GMAIL_APP_PASSWORD`: a senha de 16 caracteres gerada
   - `EMAIL_DESTINATARIOS`: emails separados por vírgula

## Estrutura do Código

### APIs
- `/api/notificar-email-gmail` - Envia notificações por email via Gmail SMTP

### Configurações
- `config/notifications.ts` - Configurações centralizadas
- Templates de mensagem formatados

### Componentes
- `NotificationStatus.tsx` - Status visual das notificações

## Fluxo de Funcionamento

1. **Usuário cadastra produto** no formulário
2. **Dados são salvos** no Supabase
3. **Sistema aciona** a API de notificação por email
4. **Notificação é enviada** via Gmail SMTP
5. **Status visual** é exibido ao usuário
6. **Feedback de sucesso** é mostrado

## Templates de Mensagem

### Email
```html
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <h2>PCA Peças - Notificação de Cadastro</h2>
  <div>
    <strong>Código do Produto:</strong> [CODIGO]
    <strong>Descrição:</strong> [DESCRICAO]
    <strong>Data/Hora:</strong> [DATA/HORA]
  </div>
</div>
```

## Tratamento de Erros

### Email
- Timeout de 10 segundos
- Retry automático em caso de falha
- Log detalhado de erros

## Personalização

### Alterar Templates
Edite o arquivo `config/notifications.ts`:

```typescript
export const notificationConfig = {
  email: {
    from: 'Seu Nome <seu-email@gmail.com>',
    subject: 'Seu Assunto Personalizado',
    template: {
      title: 'Seu Título',
      successMessage: 'Sua mensagem de sucesso',
      footer: 'Seu rodapé'
    }
  }
};
```

### Adicionar Novos Canais
1. Crie nova API em `/api/notificar-[canal]`
2. Adicione configurações em `config/notifications.ts`
3. Atualize a função `enviarNotificacoes` em `page.tsx`

## Monitoramento

### Logs
- Console do navegador para erros de frontend
- Logs do servidor para erros de API
- Logs do Gmail SMTP

### Métricas
- Taxa de entrega de emails
- Tempo de resposta das APIs

## Troubleshooting

### Email não está sendo enviado
1. Verificar se 2FA está ativado no Gmail
2. Verificar se a senha de aplicativo está correta
3. Verificar logs do servidor
4. Verificar se o email não está indo para spam

### Notificações não aparecem
1. Verificar variáveis de ambiente
2. Verificar logs do console
3. Verificar conectividade com Gmail SMTP

## Segurança

- Senhas são armazenadas em variáveis de ambiente
- APIs são protegidas por CORS
- Dados sensíveis não são expostos no frontend
- Logs não contêm informações sensíveis

## Limitações

### Gmail SMTP
- Limite de 500 emails/dia
- Pode ir para pasta de spam
- Precisa de 2FA ativado
- Precisa de senha de aplicativo

## Vantagens

### Gmail SMTP
- ✅ Totalmente gratuito
- ✅ Não precisa de domínio
- ✅ Configuração simples
- ✅ 500 emails/dia
- ✅ Confiável e estável 