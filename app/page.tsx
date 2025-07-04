"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import Select from "react-select";

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
  categoria_peca: z.enum([
    "Aleta",
    "Amortecedor",
    "Bandeja",
    "Bandeja de Dreno",
    "Base da Condensadora",
    "Borracha",
    "Bomba",
    "Caracol",
    "Chave Contatora",
    "Compressor",
    "Conector",
    "Conector Chicote",
    "Controle Remoto",
    "Coxim",
    "Dispositivo Piston",
    "Duto",
    "Engrenagem Swing",
    "Filtro",
    "Gabinete",
    "Gaveta",
    "Grade",
    "Hélice",
    "Kit Barras de Led",
    "Magnetron",
    "Mangueira",
    "Motor",
    "Painel",
    "Placa",
    "Placa Display",
    "Rele",
    "Resistor",
    "Sensor",
    "Sensor de Nível",
    "Serpentina",
    "Suporte",
    "Suporte do Tambor",
    "Tampa",
    "Tampa do Dreno",
    "Termistor",
    "Terminal",
    "Transformador",
    "Trava",
    "Tubo",
    "Turbina",
    "Válvula",
    "Válvula de Serviço",
    "Válvula Reversora"
  ], { required_error: "Obrigatório" }),
  sub_peca: z.string().optional(),
  unidade_texto: z
    .array(
      z.enum([
        "Ar Janela",
        "Boiler",
        "Cassete",
        "Condensadora",
        "Controle Central",
        "Cortina de Ar",
        "Dry Contact",
        "Duto",
        "Hi-Wall",
        "Monitor de Energia",
        "Piso Teto",
        "Recuperador de Calor"
      ])
    )
    .min(1, "Obrigatório"),
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
    control,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Opções para o campo unidade_texto
  const unidadeOptions = [
    { value: "Ar Janela", label: "Ar Janela" },
    { value: "Boiler", label: "Boiler" },
    { value: "Cassete", label: "Cassete" },
    { value: "Condensadora", label: "Condensadora" },
    { value: "Controle Central", label: "Controle Central" },
    { value: "Cortina de Ar", label: "Cortina de Ar" },
    { value: "Dry Contact", label: "Dry Contact" },
    { value: "Duto", label: "Duto" },
    { value: "Hi-Wall", label: "Hi-Wall" },
    { value: "Monitor de Energia", label: "Monitor de Energia" },
    { value: "Piso Teto", label: "Piso Teto" },
    { value: "Recuperador de Calor", label: "Recuperador de Calor" },
  ];

  // Mapeamento de subpeças por categoria
  const subPecaOptions: Record<string, string[]> = {
    "Aleta": ["da WindFree", "Horizontal", "Superior", "Vertical"],
    "Bandeja": ["do Dreno"],
    "Bomba": ["do Dreno"],
    "Borracha": ["de Vedação"],
    "Compressor": ["GMCC", "Rechi", "Scroll"],
    "Conector": ["Bluetooth"],
    "Conector Chicote": ["UL94V-BL 2MM"],
    "Controle Remoto": ["AR-JE5", "AR-JW1", "AR-JW22", "AR-RAE7E", "AR-RAH5E/EN", "AR-RY21", "Magic", "R51ME"],
    "Dispositivo Piston": [",11 mm", ",13 mm", ",57 mm", ",61 mm", ",81 mm", ",82 mm"],
    "Filtro": ["da Evaporadora", "de Ar", "de Ar 519x2145mm", "Desodorizante"],
    "Gabinete": ["Frontal"],
    "Gaveta": ["da Prateleira"],
    "Grade": ["da Condensadora", "do Filtro", "Frontal"],
    "Hélice": ["da Condensadora"],
    "Mangueira": ["de Dreno", "do Dispenser"],
    "Motor": ["ADASV2M", "com Kit Turbinas", "da Aleta Horizontal", "da Aletas Verticais", "da Condensadora", "da Evaporadora", "de Passo (Swing)", "RPG15C-8", "SIC-41CVJ-F123-2"],
    "Painel": ["Frontal", "Inferior", "Lateral"],
    "Placa": ["Botão Ligar", "Capacitoria", "Controladora", "de circuito impresso", "de Força", "Display", "Eeprom", "Filtro", "Filtro de Linha", "Fonte", "Inverter", "Principal", "Principal KZJ7-13BH5E-C1", "Principal K7CJ-911W1UE-C1", "Secundária", "Transistor", "Transistora"],
    "Sensor": ["de Velocidade", "de Vibração"],
    "Serpentina": ["da Evaporadora"],
    "Suporte": ["Antiderrapante", "da Evaporadora", "da Serpentina", "da Válvula", "do Motor"],
    "Tampa": ["Controladora", "da Evaporadora", "Lateral"],
    "Terminal": ["da Evaporadora"],
    "Termistor": ["Degelo", "DTN-WS13H6P-FTZ136", "DTN-WS13H6P-FTZ391", "EPH53AR", "PTM-41", "Terminal Azul", "Terminal Branco", "Terminal Vermelho"],
    "Tubo": ["da Serpentina"],
    "Turbina": ["da Evaporadora"],
    "Válvula": ["com Tubulação", "de Expansão", "de Retenção", "Reversora"],
    "Válvula de Serviço": ["3 Vias"],
  };

  const onSubmit = async (data: FormData) => {
    setError("");
    setSuccess(false);
    // Verificar se sub_peca é obrigatória para a categoria selecionada
    const categoria = data.categoria_peca;
    const subpecas = subPecaOptions[categoria] || [];
    if (subpecas.length > 0 && !data.sub_peca) {
      setError("Selecione uma sub peça para a categoria escolhida.");
      return;
    }
    // Forçar unidade como 'UN'
    const dataToSend = {
      ...data,
      unidade: "UN",
      unidade_texto: Array.isArray(data.unidade_texto) ? data.unidade_texto.join(", ") : data.unidade_texto
    };
    const { error } = await supabase.from("produtos").insert([dataToSend]);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      reset({
        ...data,
        unidade_texto: []
      });
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
              <label>Código do Produto<span className="text-red-500">*</span></label>
              <input {...register("codigo_produto")}
                className="input" />
              {errors.codigo_produto && <span className="text-red-500">{errors.codigo_produto.message}</span>}
            </div>
            <div>
              <label>Descrição do Produto no Fabricante<span className="text-red-500">*</span></label>
              <input {...register("descricao_produto")} className="input" />
              {errors.descricao_produto && <span className="text-red-500">{errors.descricao_produto.message}</span>}
            </div>
            <div>
              <label>NCM<span className="text-red-500">*</span></label>
              <input {...register("ncm")} className="input" />
              {errors.ncm && <span className="text-red-500">{errors.ncm.message}</span>}
            </div>
            <div>
              <label>EAN<span className="text-red-500">*</span></label>
              <input {...register("ean")} className="input" />
              {errors.ean && <span className="text-red-500">{errors.ean.message}</span>}
            </div>
            <div>
              <label>CEST<span className="text-red-500">*</span></label>
              <input {...register("cest")} className="input" />
              {errors.cest && <span className="text-red-500">{errors.cest.message}</span>}
            </div>
            <div>
              <label>QUANTIDADE EM ESTOQUE<span className="text-red-500">*</span></label>
              <input type="number" {...register("quantidade_estoque")} className="input" />
              {errors.quantidade_estoque && <span className="text-red-500">{errors.quantidade_estoque.message}</span>}
            </div>
            <div>
              <label>Preço Unitário<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("preco_unitario")} className="input" />
              {errors.preco_unitario && <span className="text-red-500">{errors.preco_unitario.message}</span>}
            </div>
            <div>
              <label>Peso (Kg)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("peso")} className="input" />
              {errors.peso && <span className="text-red-500">{errors.peso.message}</span>}
            </div>
            <div>
              <label>Altura (cm)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("altura")} className="input" />
              {errors.altura && <span className="text-red-500">{errors.altura.message}</span>}
            </div>
            <div>
              <label>Largura (cm)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("largura")} className="input" />
              {errors.largura && <span className="text-red-500">{errors.largura.message}</span>}
            </div>
            <div>
              <label>Profundidade (cm)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("profundidade")} className="input" />
              {errors.profundidade && <span className="text-red-500">{errors.profundidade.message}</span>}
            </div>
            <div>
              <label>Categoria da Peça<span className="text-red-500">*</span></label>
              <select {...register("categoria_peca")} className="input">
                <option value="">Selecione</option>
                <option value="Aleta">Aleta</option>
                <option value="Amortecedor">Amortecedor</option>
                <option value="Bandeja">Bandeja</option>
                <option value="Bandeja de Dreno">Bandeja de Dreno</option>
                <option value="Base da Condensadora">Base da Condensadora</option>
                <option value="Borracha">Borracha</option>
                <option value="Bomba">Bomba</option>
                <option value="Caracol">Caracol</option>
                <option value="Chave Contatora">Chave Contatora</option>
                <option value="Compressor">Compressor</option>
                <option value="Conector">Conector</option>
                <option value="Conector Chicote">Conector Chicote</option>
                <option value="Controle Remoto">Controle Remoto</option>
                <option value="Coxim">Coxim</option>
                <option value="Dispositivo Piston">Dispositivo Piston</option>
                <option value="Duto">Duto</option>
                <option value="Engrenagem Swing">Engrenagem Swing</option>
                <option value="Filtro">Filtro</option>
                <option value="Gabinete">Gabinete</option>
                <option value="Gaveta">Gaveta</option>
                <option value="Grade">Grade</option>
                <option value="Hélice">Hélice</option>
                <option value="Kit Barras de Led">Kit Barras de Led</option>
                <option value="Magnetron">Magnetron</option>
                <option value="Mangueira">Mangueira</option>
                <option value="Motor">Motor</option>
                <option value="Painel">Painel</option>
                <option value="Placa">Placa</option>
                <option value="Placa Display">Placa Display</option>
                <option value="Rele">Rele</option>
                <option value="Resistor">Resistor</option>
                <option value="Sensor">Sensor</option>
                <option value="Sensor de Nível">Sensor de Nível</option>
                <option value="Serpentina">Serpentina</option>
                <option value="Suporte">Suporte</option>
                <option value="Suporte do Tambor">Suporte do Tambor</option>
                <option value="Tampa">Tampa</option>
                <option value="Tampa do Dreno">Tampa do Dreno</option>
                <option value="Termistor">Termistor</option>
                <option value="Terminal">Terminal</option>
                <option value="Transformador">Transformador</option>
                <option value="Trava">Trava</option>
                <option value="Tubo">Tubo</option>
                <option value="Turbina">Turbina</option>
                <option value="Válvula">Válvula</option>
                <option value="Válvula de Serviço">Válvula de Serviço</option>
                <option value="Válvula Reversora">Válvula Reversora</option>
              </select>
              {errors.categoria_peca && <span className="text-red-500">{errors.categoria_peca.message}</span>}
            </div>
            <div>
              <label>
                Sub Peça
                {watch("categoria_peca") && subPecaOptions[watch("categoria_peca")] && subPecaOptions[watch("categoria_peca")].length > 0 && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <select
                {...register("sub_peca")}
                className={`input ${(!watch("categoria_peca") || !subPecaOptions[watch("categoria_peca")]) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
                disabled={!watch("categoria_peca") || !subPecaOptions[watch("categoria_peca")]}
              >
                <option value="">Selecione</option>
                {watch("categoria_peca") && subPecaOptions[watch("categoria_peca")]?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.sub_peca && <span className="text-red-500">{errors.sub_peca.message}</span>}
            </div>
            <div className="mt-1">
              <label>Unidade<span className="text-red-500">*</span></label>
              <Controller
                name="unidade_texto"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={unidadeOptions}
                    classNamePrefix="react-select"
                    placeholder="Selecione"
                    value={unidadeOptions.filter(option => field.value?.includes(option.value as any))}
                    onChange={selected => field.onChange(Array.isArray(selected) ? selected.map(option => option.value) : [])}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: '37px',
                        borderColor: state.isFocused ? '#2563eb' : '#ccc',
                        boxShadow: state.isFocused ? '0 0 0 1px #2563eb' : base.boxShadow,
                        '&:hover': { borderColor: '#2563eb' },
                        fontSize: '1rem',
                        borderRadius: '0.375rem',
                        paddingLeft: '0',
                      }),
                      valueContainer: base => ({
                        ...base,
                        padding: '0 8px',
                      }),
                      multiValue: base => ({
                        ...base,
                        backgroundColor: '#e0e7ff',
                        color: '#1e293b',
                        borderRadius: '0.25rem',
                      }),
                      multiValueLabel: base => ({
                        ...base,
                        color: '#1e293b',
                      }),
                      multiValueRemove: base => ({
                        ...base,
                        color: '#1e293b',
                        ':hover': { backgroundColor: '#2563eb', color: 'white' },
                      }),
                      placeholder: base => ({
                        ...base,
                        color: '#888',
                      }),
                      menu: base => ({
                        ...base,
                        zIndex: 9999,
                      }),
                    }}
                  />
                )}
              />
              {errors.unidade_texto && <span className="text-red-500">{errors.unidade_texto.message}</span>}
            </div>
            <div>
              <label>Aparelho<span className="text-red-500">*</span></label>
              <select {...register("aparelho")} className="input">
                <option value="">Selecione</option>
                <option value="Ar-Condicionado">Ar-Condicionado</option>
                <option value="Ar-Condicionado Portátil">Ar-Condicionado Portátil</option>
                <option value="Lava e Seca">Lava e Seca</option>
                <option value="Microondas">Microondas</option>
                <option value="Purificador de Ar">Purificador de Ar</option>
                <option value="Refrigerador">Refrigerador</option>
                <option value="Smart Tv">Smart Tv</option>
                <option value="Teclados e Mouse">Teclados e Mouse</option>
              </select>
              {errors.aparelho && <span className="text-red-500">{errors.aparelho.message}</span>}
            </div>
            <div>
              <label>Marca<span className="text-red-500">*</span></label>
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
              <label>Range de BTUs<span className="text-red-500">*</span></label>
              <input {...register("range_btus")} className="input" />
              {errors.range_btus && <span className="text-red-500">{errors.range_btus.message}</span>}
            </div>
            <div>
              <label>Modelos Compatíveis<span className="text-red-500">*</span></label>
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
        .input:disabled {
          background-color: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
