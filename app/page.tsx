"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import Select from "react-select";
import NotificationStatus from "./components/NotificationStatus";

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
  quantidade_estoque: z.coerce.number().min(0, "Obrigatório"),
  preco_unitario: z.coerce.number().min(0, "Obrigatório"),
  peso_peca: z.coerce.number().min(0, "Obrigatório"),
  altura_peca: z.coerce.number().min(0, "Obrigatório"),
  largura_peca: z.coerce.number().min(0, "Obrigatório"),
  profundidade_peca: z.coerce.number().min(0, "Obrigatório"),
  peso_caixa: z.coerce.number().min(0, "Obrigatório"),
  altura_caixa: z.coerce.number().min(0, "Obrigatório"),
  largura_caixa: z.coerce.number().min(0, "Obrigatório"),
  profundidade_caixa: z.coerce.number().min(0, "Obrigatório"),
  categoria_peca: z.enum([
    "Aleta",
    "Amortecedor",
    "Bandeja",
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
    "Tampa",
    "Termistor",
    "Terminal",
    "Transformador",
    "Trava",
    "Tubo",
    "Turbina",
    "Válvula"
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
  marca: z.enum(["Fujitsu", "Daikin", "Elgin", "LG", "Samsung", "Midea"]),
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
  const [showNotificationStatus, setShowNotificationStatus] = useState(false);
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

  useEffect(() => {
    console.log("isSubmitting:", isSubmitting);
  }, [isSubmitting]);

  // Função para enviar notificações
  const enviarNotificacoes = async (codigo_produto: string, descricao_produto: string) => {
    setShowNotificationStatus(true);
    
    try {
      // Enviar notificação por email (Gmail SMTP)
      await fetch('/api/notificar-email-gmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo_produto,
          descricao_produto,
          mensagem: `Produto cadastrado com sucesso: ${codigo_produto} - ${descricao_produto}`
        }),
      });

      console.log('Notificação por email enviada com sucesso');
      
      // Removido: Envio de notificação por WhatsApp (WPPConnect)
      
      // Ocultar status após 3 segundos
      setTimeout(() => {
        setShowNotificationStatus(false);
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao enviar notificação por email:', error);
      setShowNotificationStatus(false);
    }
  };

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

  // Mapeamento de aparelhos por categoria
  const aparelhoOptions: Record<string, string[]> = {
    "Aleta": ["Ar-Condicionado"],
    "Amortecedor": ["Lava e Seca"],
    "Bandeja": ["Ar-Condicionado", "Ar-Condicionado Portátil"],
    "Base da Condensadora": ["Ar-Condicionado"],
    "Bomba": ["Ar-Condicionado", "Lava e Seca"],
    "Borracha": ["Ar-Condicionado", "Lava e Seca"],
    "Bucha": ["Ar-Condicionado"],
    "Capacitor": ["Ar-Condicionado"],
    "Capacitor Permanente": ["Ar-Condicionado"],
    "Caracol": ["Ar-Condicionado"],
    "Chave Contatora": ["Ar-Condicionado"],
    "Compressor": ["Ar-Condicionado"],
    "Condutor": ["Ar-Condicionado"],
    "Conector": ["Teclados e Mouse"],
    "Conector Chicote": ["Ar-Condicionado", "Purificador de Ar"],
    "Controle Remoto": ["Ar-Condicionado", "Smart Tv"],
    "Coxim": ["Ar-Condicionado"],
    "Dispositivo Piston": ["Ar-Condicionado"],
    "Engrenagem Swing": ["Ar-Condicionado"],
    "Filtro": ["Ar-Condicionado"],
    "Gabinete": ["Ar-Condicionado"],
    "Gaveta": ["Refrigerador"],
    "Grade": ["Ar-Condicionado", "Purificador de Ar"],
    "Hélice": ["Ar-Condicionado"],
    "Kit Barras de Led": ["Smart Tv"],
    "Kit Parafusos": ["Ar-Condicionado"],
    "Magnetron": ["Microondas"],
    "Mangueira": ["Ar-Condicionado", "Lava e Seca"],
    "Motor": ["Ar-Condicionado", "Purificador de Ar"],
    "Painel": ["Ar-Condicionado"],
    "Placa": ["Ar-Condicionado", "Purificador de Ar"],
    "Placa Display": ["Ar-Condicionado"],
    "Pressostato": ["Ar-Condicionado"],
    "Puxador da Porta": ["Lava e Seca"],
    "Rele": ["Ar-Condicionado"],
    "Resistor": ["Ar-Condicionado"],
    "Sensor": ["Lava e Seca"],
    "Sensor de Nível": ["Ar-Condicionado"],
    "Serpentina": ["Ar-Condicionado"],
    "Suporte": ["Ar-Condicionado", "Lava e Seca"],
    "Suporte do Tambor": ["Lava e Seca"],
    "Tampa": ["Ar-Condicionado", "Lava e Seca", "Purificador de Ar"],
    "Tampa do Dreno": ["Ar-Condicionado"],
    "Terminal": ["Ar-Condicionado"],
    "Termistor": ["Ar-Condicionado"],
    "Transformador": ["Ar-Condicionado"],
    "Trava": ["Lava e Seca"],
    "Trava Magnética": ["Ar-Condicionado"],
    "Tubo": ["Ar-Condicionado"],
    "Turbina": ["Ar-Condicionado"],
    "Válvula": ["Ar-Condicionado", "Lava e Seca"],
    "Válvula de Serviço": ["Ar-Condicionado", "Lava e Seca"],
    "Válvula Reversora": ["Ar-Condicionado"]
  };

  // Mapeamento de categorias elétricas
  const categoriasEletricas = [
    "Bomba", "Capacitor", "Capacitor Permanente", "Chave Contatora", "Compressor", "Condutor", "Conector", "Conector Chicote", "Controle Remoto", "Kit Barras de Led", "Magnetron", "Motor", "Painel", "Placa", "Placa Display", "Pressostato", "Rele", "Resistor", "Sensor", "Sensor de Nível", "Terminal", "Termistor", "Transformador", "Trava", "Trava Magnética", "Válvula", "Válvula Reversora"
  ];

  const categoriaSelecionada = watch("categoria_peca");
  const isEletrica = categoriasEletricas.includes(categoriaSelecionada || "");

  const onSubmit = async (data: FormData) => {
    setError("");
    setSuccess(false);
    let erroManual = false;
    // Verificar se sub_peca é obrigatória para a categoria selecionada
    const categoria = data.categoria_peca;
    const subpecas = subPecaOptions[categoria] || [];
    if (subpecas.length > 0 && !data.sub_peca) {
      setError("Selecione uma sub peça para a categoria escolhida.");
      erroManual = true;
      return;
    }
    // Validação manual dos campos elétricos se for categoria elétrica
    if (categoriasEletricas.includes(categoria)) {
      const camposEletricos = [
        { nome: "tensao", label: "Tensão" },
        { nome: "potencia", label: "Potência" },
        { nome: "corrente", label: "Corrente" },
        { nome: "resistencia", label: "Resistência" },
        { nome: "frequencia", label: "Frequência" },
        { nome: "capacitancia", label: "Capacitância" },
      ];
      const dataObj: Record<string, any> = data;
      for (const campo of camposEletricos) {
        if (!dataObj[campo.nome]) {
          setError(`O campo ${campo.label} é obrigatório para esta categoria.`);
          erroManual = true;
          return;
        }
      }
    }
    // Forçar unidade como 'UN'
    const dataToSend = {
      ...data,
      unidade: "UN",
      unidade_texto: Array.isArray(data.unidade_texto) ? data.unidade_texto.join(", ") : data.unidade_texto
    };
    console.log("Enviando para Supabase:", dataToSend);
    try {
      const { error } = await supabase.from("produtos").insert([dataToSend]);
      if (error) {
        setError("Erro Supabase: " + error.message);
        console.error("Erro Supabase:", error);
      } else {
        setSuccess(true);
        
        // Enviar notificações após cadastro bem-sucedido
        await enviarNotificacoes(data.codigo_produto, data.descricao_produto);
        
        reset({
          codigo_produto: "",
          descricao_produto: "",
          ncm: "",
          ean: "",
          cest: "",
          quantidade_estoque: undefined,
          preco_unitario: undefined,
          peso_peca: undefined,
          altura_peca: undefined,
          largura_peca: undefined,
          profundidade_peca: undefined,
          peso_caixa: undefined,
          altura_caixa: undefined,
          largura_caixa: undefined,
          profundidade_caixa: undefined,
          categoria_peca: undefined,
          sub_peca: "",
          unidade_texto: [],
          aparelho: undefined,
          marca: undefined,
          range_btus: "",
          modelos_compativeis: "",
          tensao: "",
          potencia: "",
          corrente: "",
          resistencia: "",
          frequencia: "",
          capacitancia: "",
          funcoes: "",
          tipo_pilha: "",
          pontas_cobre: "",
          protecao_placas: "",
          gas_compressores: "",
          capacidade_compressor: ""
        });
      }
    } catch (e) {
      setError("Erro inesperado: " + (e instanceof Error ? e.message : String(e)));
      console.error("Erro inesperado:", e);
    } finally {
      // Garante que o isSubmitting volte a false
      if (!erroManual) setTimeout(() => { setSuccess(false); }, 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PCA PEÇAS - CADASTRO DE PRODUTOS</h1>
      
      {/* Componente de status das notificações */}
      <NotificationStatus 
        isVisible={showNotificationStatus} 
        onClose={() => setShowNotificationStatus(false)} 
      />
      
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
              <label>Peso da Peça (Kg)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("peso_peca")} className="input" />
              {errors.peso_peca && <span className="text-red-500">{errors.peso_peca.message}</span>}
            </div>
            <div>
              <label>Altura da Peça (cm)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("altura_peca")} className="input" />
              {errors.altura_peca && <span className="text-red-500">{errors.altura_peca.message}</span>}
            </div>
            <div>
              <label>Largura da Peça (cm)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("largura_peca")} className="input" />
              {errors.largura_peca && <span className="text-red-500">{errors.largura_peca.message}</span>}
            </div>
            <div>
              <label>Profundidade da Peça (cm)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("profundidade_peca")} className="input" />
              {errors.profundidade_peca && <span className="text-red-500">{errors.profundidade_peca.message}</span>}
            </div>
            <div>
              <label>Peso da Caixa (Kg)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("peso_caixa")} className="input" />
              {errors.peso_caixa && <span className="text-red-500">{errors.peso_caixa.message}</span>}
            </div>
            <div>
              <label>Altura da Caixa (cm)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("altura_caixa")} className="input" />
              {errors.altura_caixa && <span className="text-red-500">{errors.altura_caixa.message}</span>}
            </div>
            <div>
              <label>Largura da Caixa (cm)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("largura_caixa")} className="input" />
              {errors.largura_caixa && <span className="text-red-500">{errors.largura_caixa.message}</span>}
            </div>
            <div>
              <label>Profundidade da Caixa (cm)<span className="text-red-500">*</span></label>
              <input type="number" step="0.01" {...register("profundidade_caixa")} className="input" />
              {errors.profundidade_caixa && <span className="text-red-500">{errors.profundidade_caixa.message}</span>}
            </div>
            <div>
              <label>Categoria da Peça<span className="text-red-500">*</span></label>
              <select {...register("categoria_peca")} className="input">
                <option value="">Selecione</option>
                <option value="Aleta">Aleta</option>
                <option value="Amortecedor">Amortecedor</option>
                <option value="Bandeja">Bandeja</option>
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
                <option value="Tampa">Tampa</option>
                <option value="Termistor">Termistor</option>
                <option value="Terminal">Terminal</option>
                <option value="Transformador">Transformador</option>
                <option value="Trava">Trava</option>
                <option value="Tubo">Tubo</option>
                <option value="Turbina">Turbina</option>
                <option value="Válvula">Válvula</option>
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
              {(errors.sub_peca || error) && <span className="text-red-500">{errors.sub_peca?.message || error}</span>}
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
              <select
                {...register("aparelho")}
                className={`input ${(!watch("categoria_peca") || !aparelhoOptions[watch("categoria_peca")]) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
                disabled={!watch("categoria_peca") || !aparelhoOptions[watch("categoria_peca")]}
              >
                <option value="">Selecione</option>
                {watch("categoria_peca") && aparelhoOptions[watch("categoria_peca")]?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.aparelho && <span className="text-red-500">{errors.aparelho.message}</span>}
            </div>
            <div>
              <label>Marca<span className="text-red-500">*</span></label>
              <select {...register("marca")} className="input">
                <option value="">Selecione</option>
                <option value="Fujitsu">FUJITSU</option>
                <option value="Daikin">DAIKIN</option>
                <option value="Elgin">ELGIN</option>
                <option value="LG">LG</option>
                <option value="Samsung">SAMSUNG</option>
                <option value="Springer Midea Carrier">SPRINGER MIDEA CARRIER</option>
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
          <h2 className="text-xl font-semibold mb-2">
            Ficha Elétrica {isEletrica ? <span className="text-red-500">*</span> : <span className="text-gray-400">(Opcional)</span>}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label>Tensão{isEletrica && <span className="text-red-500">*</span>}</label>
              <input {...register("tensao")} className="input" />
              {errors.tensao && <span className="text-red-500">{errors.tensao.message || 'Obrigatório'}</span>}
            </div>
            <div>
              <label>Potência{isEletrica && <span className="text-red-500">*</span>}</label>
              <input {...register("potencia")} className="input" />
              {errors.potencia && <span className="text-red-500">{errors.potencia.message || 'Obrigatório'}</span>}
            </div>
            <div>
              <label>Corrente{isEletrica && <span className="text-red-500">*</span>}</label>
              <input {...register("corrente")} className="input" />
              {errors.corrente && <span className="text-red-500">{errors.corrente.message || 'Obrigatório'}</span>}
            </div>
            <div>
              <label>Resistência{isEletrica && <span className="text-red-500">*</span>}</label>
              <input {...register("resistencia")} className="input" />
              {errors.resistencia && <span className="text-red-500">{errors.resistencia.message || 'Obrigatório'}</span>}
            </div>
            <div>
              <label>Frequência{isEletrica && <span className="text-red-500">*</span>}</label>
              <input {...register("frequencia")} className="input" />
              {errors.frequencia && <span className="text-red-500">{errors.frequencia.message || 'Obrigatório'}</span>}
            </div>
            <div>
              <label>Capacitância{isEletrica && <span className="text-red-500">*</span>}</label>
              <input {...register("capacitancia")} className="input" />
              {errors.capacitancia && <span className="text-red-500">{errors.capacitancia.message || 'Obrigatório'}</span>}
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
