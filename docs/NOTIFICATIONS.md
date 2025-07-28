# Sistema de Notificações - PCA Peças

## Visão Geral

O sistema de notificações do PCA Peças envia automaticamente alertas por **email** sempre que um novo produto é cadastrado com sucesso no sistema.

## Funcionalidades

### ✅ Email
- **Serviço:** Resend (resend.com)
- **Template:** Email HTML responsivo e profissional
- **Destinatários:** Configuráveis via variável de ambiente
- **Conteúdo:** Código do produto, descrição e data/hora do cadastro

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# Email Configuration (Resend)
RESEND_API_KEY=sua_api_key_do_resend
EMAIL_DESTINATARIOS=admin@pcapecas.com.br,gerente@pcapecas.com.br
```

### 2. Configuração do Email (Resend)

1. **Criar conta no Resend:**
   - Acesse [resend.com](https://resend.com)
   - Crie uma conta gratuita
   - Obtenha sua API Key no painel

2. **Configurar domínio:**
   - Adicione seu domínio (ex: pcapecas.com.br)
   - Configure os registros DNS conforme instruções
   - Aguarde a verificação do domínio

3. **Configurar destinatários:**
   - Adicione os emails na variável `EMAIL_DESTINATARIOS`
   - Separe múltiplos emails por vírgula

## Estrutura do Código

### APIs
- `/api/notificar-email` - Envia notificações por email

### Configurações
- `config/notifications.ts` - Configurações centralizadas
- Templates de mensagem formatados

### Componentes
- `NotificationStatus.tsx` - Status visual das notificações

## Fluxo de Funcionamento

1. **Usuário cadastra produto** no formulário
2. **Dados são salvos** no Supabase
3. **Sistema aciona** a API de notificação por email
4. **Notificação é enviada** por email
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
    from: 'Seu Nome <noreply@seudominio.com>',
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
- Logs do Resend

### Métricas
- Taxa de entrega de emails
- Tempo de resposta das APIs

## Troubleshooting

### Email não está sendo enviado
1. Verificar API Key do Resend
2. Verificar configuração do domínio
3. Verificar logs do Resend

### Notificações não aparecem
1. Verificar variáveis de ambiente
2. Verificar logs do console
3. Verificar conectividade com as APIs

## Segurança

- Tokens são armazenados em variáveis de ambiente
- APIs são protegidas por CORS
- Dados sensíveis não são expostos no frontend
- Logs não contêm informações sensíveis

## Limitações

### Resend (Email)
- Limite de 100 emails/dia na versão gratuita
- Domínio deve ser verificado
- Templates HTML devem ser responsivos 