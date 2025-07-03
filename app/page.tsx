"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const schema = z.object({
  // Seção 1: FICHA GERAL (Obrigatória)
  codigo_produto: z.string().min(1, "Obrigatório"),
  descricao_produto: z.string().min(1, "Obrigatório"),
  ncm: z.string().min(1, "Obrigatório"),
  ean: z.string().min(1, "Obrigatório"),
  cest: z.string().min(1, "Obrigatório"),
  unidade: z.string().min(1, "Obrigatório"),
  quantidade_estoque: z.coerce.number().min(0, "Obrigatório"),
  preco_unitario: z.coerce.number().min(0, "Obrigatório"),
  peso: z.coerce.number().min(0, "Obrigatório"),
  altura: z.coerce.number().min(0, "Obrigatório"),
  largura: z.coerce.number().min(0, "Obrigatório"),
  profundidade: z.coerce.number().min(0, "Obrigatório"),
  categoria_peca: z.string().min(1, "Obrigatório"),
  sub_peca: z.string().min(1, "Obrigatório"),
  unidade_texto: z.string().min(1, "Obrigatório"),
  aparelho: z.string().min(1, "Obrigatório"),
  marca: z.enum(["FUJITSU", "DAIKIN", "ELGIN", "LG", "SAMSUNG", "MIDEA"]),
  range_btus: z.string().min(1, "Obrigatório"),
  modelos_compativeis: z.string().min(1, "Obrigatório"),
  // Seção 2: FICHA ELÉTRICA (Opcional)
  tensao: z.string().optional().or(z.literal("")),
  potencia: z.string().optional().or(z.literal("")),
  corrente: z.string().optional().or(z.literal("")),
  resistencia: z.string().optional().or(z.literal("")),
  frequencia: z.string().optional().or(z.literal("")),
  capacitancia: z.string().optional().or(z.literal("")),
  // Seção 3: FICHA DE INFORMAÇÕES EXTRAS (Opcional)
  funcoes: z.string().optional().or(z.literal("")),
  tipo_pilha: z.string().optional().or(z.literal("")),
  pontas_cobre: z.string().optional().or(z.literal("")),
  protecao_placas: z.string().optional().or(z.literal("")),
  gas_compressores: z.string().optional().or(z.literal("")),
  capacidade_compressor: z.string().optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    setSuccess(false);
    const { error } = await supabase.from("produtos").insert([data]);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PCA PEÇAS - CADASTRO DE PRODUTOS</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Seção 1: FICHA GERAL */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Ficha Geral</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label>Código do Produto*</label>
              <input {...register("codigo_produto")}
                className="input" />
              {errors.codigo_produto && <span className="text-red-500">{errors.codigo_produto.message}</span>}
            </div>
            <div>
              <label>Descrição do Produto no Fabricante*</label>
              <input {...register("descricao_produto")} className="input" />
              {errors.descricao_produto && <span className="text-red-500">{errors.descricao_produto.message}</span>}
            </div>
            <div>
              <label>NCM*</label>
              <input {...register("ncm")} className="input" />
              {errors.ncm && <span className="text-red-500">{errors.ncm.message}</span>}
            </div>
            <div>
              <label>EAN*</label>
              <input {...register("ean")} className="input" />
              {errors.ean && <span className="text-red-500">{errors.ean.message}</span>}
            </div>
            <div>
              <label>CEST*</label>
              <input {...register("cest")} className="input" />
              {errors.cest && <span className="text-red-500">{errors.cest.message}</span>}
            </div>
            <div>
              <label>UNIDADE*</label>
              <input {...register("unidade")} className="input" />
              {errors.unidade && <span className="text-red-500">{errors.unidade.message}</span>}
            </div>
            <div>
              <label>QUANTIDADE EM ESTOQUE*</label>
              <input type="number" {...register("quantidade_estoque")} className="input" />
              {errors.quantidade_estoque && <span className="text-red-500">{errors.quantidade_estoque.message}</span>}
            </div>
            <div>
              <label>Preço Unitário*</label>
              <input type="number" step="0.01" {...register("preco_unitario")} className="input" />
              {errors.preco_unitario && <span className="text-red-500">{errors.preco_unitario.message}</span>}
            </div>
            <div>
              <label>Peso (Kg)*</label>
              <input type="number" step="0.01" {...register("peso")} className="input" />
              {errors.peso && <span className="text-red-500">{errors.peso.message}</span>}
            </div>
            <div>
              <label>Altura (cm)*</label>
              <input type="number" step="0.01" {...register("altura")} className="input" />
              {errors.altura && <span className="text-red-500">{errors.altura.message}</span>}
            </div>
            <div>
              <label>Largura (cm)*</label>
              <input type="number" step="0.01" {...register("largura")} className="input" />
              {errors.largura && <span className="text-red-500">{errors.largura.message}</span>}
            </div>
            <div>
              <label>Profundidade (cm)*</label>
              <input type="number" step="0.01" {...register("profundidade")} className="input" />
              {errors.profundidade && <span className="text-red-500">{errors.profundidade.message}</span>}
            </div>
            <div>
              <label>Categoria da Peça*</label>
              <input {...register("categoria_peca")} className="input" />
              {errors.categoria_peca && <span className="text-red-500">{errors.categoria_peca.message}</span>}
            </div>
            <div>
              <label>Sub Peça*</label>
              <input {...register("sub_peca")} className="input" />
              {errors.sub_peca && <span className="text-red-500">{errors.sub_peca.message}</span>}
            </div>
            <div>
              <label>Unidade*</label>
              <input {...register("unidade_texto")} className="input" />
              {errors.unidade_texto && <span className="text-red-500">{errors.unidade_texto.message}</span>}
            </div>
            <div>
              <label>Aparelho*</label>
              <input {...register("aparelho")} className="input" />
              {errors.aparelho && <span className="text-red-500">{errors.aparelho.message}</span>}
            </div>
            <div>
              <label>Marca*</label>
              <select {...register("marca")} className="input">
                <option value="">Selecione</option>
                <option value="FUJITSU">FUJITSU</option>
                <option value="DAIKIN">DAIKIN</option>
                <option value="ELGIN">ELGIN</option>
                <option value="LG">LG</option>
                <option value="SAMSUNG">SAMSUNG</option>
                <option value="MIDEA">MIDEA</option>
              </select>
              {errors.marca && <span className="text-red-500">{errors.marca.message}</span>}
            </div>
            <div>
              <label>Range de BTUs*</label>
              <input {...register("range_btus")} className="input" />
              {errors.range_btus && <span className="text-red-500">{errors.range_btus.message}</span>}
            </div>
            <div className="sm:col-span-2">
              <label>Modelos Compatíveis*</label>
              <input {...register("modelos_compativeis")} className="input" />
              {errors.modelos_compativeis && <span className="text-red-500">{errors.modelos_compativeis.message}</span>}
            </div>
          </div>
        </section>

        {/* Seção 2: FICHA ELÉTRICA (Opcional) */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Ficha Elétrica (Opcional)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label>Tensão</label>
              <input {...register("tensao")} className="input" />
            </div>
            <div>
              <label>Potência</label>
              <input {...register("potencia")} className="input" />
            </div>
            <div>
              <label>Corrente</label>
              <input {...register("corrente")} className="input" />
            </div>
            <div>
              <label>Resistência</label>
              <input {...register("resistencia")} className="input" />
            </div>
            <div>
              <label>Frequência</label>
              <input {...register("frequencia")} className="input" />
            </div>
            <div>
              <label>Capacitância</label>
              <input {...register("capacitancia")} className="input" />
            </div>
          </div>
        </section>

        {/* Seção 3: FICHA DE INFORMAÇÕES EXTRAS (Opcional) */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Informações Extras (Opcional)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label>Funções</label>
              <input {...register("funcoes")} className="input" />
            </div>
            <div>
              <label>Tipo de Pilha</label>
              <input {...register("tipo_pilha")} className="input" />
            </div>
            <div>
              <label>Pontas de Cobre</label>
              <input {...register("pontas_cobre")} className="input" />
            </div>
            <div>
              <label>Proteção (Placas)</label>
              <input {...register("protecao_placas")} className="input" />
            </div>
            <div>
              <label>Gás (Compressores)</label>
              <input {...register("gas_compressores")} className="input" />
            </div>
            <div>
              <label>Capacidade do Compressor</label>
              <input {...register("capacidade_compressor")} className="input" />
            </div>
          </div>
        </section>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Cadastrar Produto"}
        </button>
        {success && <div className="text-green-600 font-bold">Cadastro realizado com sucesso!</div>}
        {error && <div className="text-red-600 font-bold">Erro: {error}</div>}
      </form>
      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 0.375rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
}
