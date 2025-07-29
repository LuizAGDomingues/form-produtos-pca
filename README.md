# PCA PEÇAS - Cadastro de Produtos

Este projeto é um formulário online para cadastro de produtos de peças, inspirado em um Google Forms, desenvolvido com Next.js, React Hook Form, Zod e integrado ao banco de dados Supabase.

## Funcionalidades
- Cadastro de produtos com validação de campos obrigatórios e opcionais
- Armazenamento das respostas diretamente no Supabase
- **Sistema de notificações automáticas por email (gratuito)**
- Interface responsiva e fácil de usar

## Tecnologias Utilizadas
- [Next.js](https://nextjs.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Supabase](https://supabase.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nodemailer](https://nodemailer.com/) (Email via Gmail SMTP)

## Sistema de Notificações

### 🆓 **Solução Gratuita Implementada**
- **Email:** Gmail SMTP (500 emails/dia)
- **Custo:** R$ 0,00
- **Domínio:** Não necessário
- **Configuração:** Simples e rápida

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd form-produtos-pca
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=COLOQUE_AQUI_SUA_URL_DO_SUPABASE
   NEXT_PUBLIC_SUPABASE_ANON_KEY=COLOQUE_AQUI_SUA_ANON_KEY_DO_SUPABASE

   # Email Configuration (Gmail SMTP)
   GMAIL_USER=seu-email@gmail.com
   GMAIL_APP_PASSWORD=sua-senha-de-app
   EMAIL_DESTINATARIOS=admin@pcapecas.com.br,gerente@pcapecas.com.br
   ```

   ### Configuração do Email (Gmail SMTP):
   1. **Ative 2FA na sua conta Google:**
      - Acesse [myaccount.google.com](https://myaccount.google.com)
      - Vá em "Segurança"
      - Ative "Verificação em duas etapas"

   2. **Gere uma senha de aplicativo:**
      - Ainda em "Segurança"
      - Clique em "Senhas de app"
      - Selecione "Outro (nome personalizado)"
      - Digite "PCA Peças"
      - Copie a senha de 16 caracteres gerada

   3. **Configure as variáveis de ambiente:**
      - `GMAIL_USER`: seu email do Gmail
      - `GMAIL_APP_PASSWORD`: a senha de 16 caracteres gerada
      - `EMAIL_DESTINATARIOS`: emails separados por vírgula

4. **Configure o banco de dados Supabase:**
   No painel do Supabase, crie uma tabela chamada `produtos` com as seguintes colunas (todas tipo `text`, exceto onde indicado):

   | Nome                  | Tipo    |
   |-----------------------|---------|
   | codigo_produto        | text    |
   | descricao_produto     | text    |
   | ncm                   | text    |
   | ean                   | text    |
   | cest                  | text    |
   | unidade               | text    |
   | quantidade_estoque    | numeric |
   | preco_unitario        | numeric |
   | peso_peca             | numeric |
   | altura_peca           | numeric |
   | largura_peca          | numeric |
   | profundidade_peca     | numeric |
   | peso_caixa            | numeric |
   | altura_caixa          | numeric |
   | largura_caixa         | numeric |
   | profundidade_caixa    | numeric |
   | categoria_peca        | text    |
   | sub_peca              | text    |
   | unidade_texto         | text    |
   | aparelho              | text    |
   | marca                 | text    |
   | range_btus            | text    |
   | modelos_compativeis   | text    |
   | tensao                | text    |
   | potencia              | text    |
   | corrente              | text    |
   | resistencia           | text    |
   | frequencia            | text    |
   | capacitancia          | text    |
   | funcoes               | text    |
   | tipo_pilha            | text    |
   | pontas_cobre          | text    |
   | protecao_placas       | text    |
   | gas_compressores      | text    |
   | capacidade_compressor | text    |

   > **Dica:** Você pode ajustar os tipos conforme sua necessidade.

5. **Execute o projeto:**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) para utilizar o formulário.

## Estrutura do Formulário
O formulário é dividido em três seções:
- **Ficha Geral:** campos obrigatórios sobre o produto
- **Ficha Elétrica:** campos opcionais sobre características elétricas
- **Informações Extras:** campos opcionais para informações adicionais

## Sistema de Notificações

### Email (Gmail SMTP)
- **Serviço:** Gmail SMTP
- **Template:** Email HTML responsivo com informações do produto
- **Destinatários:** Configuráveis via variável de ambiente
- **Conteúdo:** Código do produto, descrição e data/hora do cadastro
- **Limite:** 500 emails/dia
- **Custo:** R$ 0,00

### Fluxo de Notificação
1. Usuário cadastra produto no formulário
2. Dados são salvos no Supabase
3. Sistema envia notificação por email via Gmail SMTP
4. Feedback de sucesso é exibido ao usuário

## APIs Disponíveis

### Email
- `/api/notificar-email-gmail` - Gmail SMTP (gratuito)

## Personalização
Você pode adaptar os campos do formulário e a tabela do Supabase conforme a necessidade do seu negócio.

## Licença
Este projeto é open source e está sob a licença MIT.
