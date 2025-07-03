# PCA PEÇAS - Cadastro de Produtos

Este projeto é um formulário online para cadastro de produtos de peças, inspirado em um Google Forms, desenvolvido com Next.js, React Hook Form, Zod e integrado ao banco de dados Supabase.

## Funcionalidades
- Cadastro de produtos com validação de campos obrigatórios e opcionais
- Armazenamento das respostas diretamente no Supabase
- Interface responsiva e fácil de usar

## Tecnologias Utilizadas
- [Next.js](https://nextjs.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Supabase](https://supabase.com/)
- [TypeScript](https://www.typescriptlang.org/)

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
   NEXT_PUBLIC_SUPABASE_URL=COLOQUE_AQUI_SUA_URL_DO_SUPABASE
   NEXT_PUBLIC_SUPABASE_ANON_KEY=COLOQUE_AQUI_SUA_ANON_KEY_DO_SUPABASE
   ```
   Obtenha esses valores no painel do seu projeto Supabase.

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
   | peso                  | numeric |
   | altura                | numeric |
   | largura               | numeric |
   | profundidade          | numeric |
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

## Personalização
Você pode adaptar os campos do formulário e a tabela do Supabase conforme a necessidade do seu negócio.

## Licença
Este projeto é open source e está sob a licença MIT.
