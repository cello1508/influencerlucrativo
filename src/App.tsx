import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, CheckCircle2, Play, Star, TrendingUp,
  Target, ShieldCheck, Smartphone, Zap,
  Video, DollarSign, Lock, Check, TrendingDown, Activity, Rocket,
  User, Mail, Phone, Instagram
} from 'lucide-react';

const QUESTIONS = [
  {
    title: "Você já tentou ganhar dinheiro com IA antes?",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    options: [
      "Sim, mas não tive resultados",
      "Não, nunca tentei",
      "Estou começando a estudar agora"
    ]
  },
  {
    title: "Quantas horas por dia você consegue dedicar?",
    image: "https://images.unsplash.com/photo-1495364141860-b0d03eca4620?auto=format&fit=crop&q=80&w=800",
    options: [
      "Apenas 30 minutos",
      "Cerca de 1 hora",
      "Até 2 horas",
      "Mais de 2 horas"
    ]
  },
  {
    title: "Qual seu objetivo de renda extra mensal?",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    options: [
      "R$ 1.000 a R$ 3.000",
      "R$ 3.000 a R$ 7.000",
      "R$ 7.000 a R$ 15.000",
      "Mais de R$ 15.000"
    ]
  }
];

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState("Analisando seu perfil...");

  const handleStart = () => setStep(1);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [step]: answer }));
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(QUESTIONS.length + 1);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setStep(QUESTIONS.length + 2);

    setTimeout(() => setAnalysisText("Calculando potencial de ganhos..."), 1000);
    setTimeout(() => setAnalysisText("Preparando seu plano de ação..."), 2000);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a1a12] text-zinc-50 font-sans selection:bg-emerald-500/30">
      {/* Progress Bar for Quiz */}
      {step > 0 && step <= QUESTIONS.length && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
          <motion.div
            className="h-full bg-emerald-500"
            initial={{ width: `${((step - 1) / QUESTIONS.length) * 100}%` }}
            animate={{ width: `${(step / QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      )}

      <main className="max-w-md mx-auto min-h-screen flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <EntryScreen key="entry" onStart={handleStart} />
          )}

          {step > 0 && step <= QUESTIONS.length && (
            <QuestionScreen
              key={`q-${step}`}
              step={step}
              question={QUESTIONS[step - 1]}
              onAnswer={handleAnswer}
            />
          )}

          {step === QUESTIONS.length + 1 && (
            <LeadFormScreen key="leadform" onSubmit={startAnalysis} />
          )}

          {step > QUESTIONS.length + 1 && isAnalyzing && (
            <AnalyzingScreen key="analyzing" text={analysisText} />
          )}

          {step > QUESTIONS.length + 1 && !isAnalyzing && (
            <SalesPage key="sales" answers={answers} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const VTurbPlayer = () => {
  useEffect(() => {
    if (!document.getElementById("vturb-script-69a7bd885a70781128b7568f")) {
      const s = document.createElement("script");
      s.id = "vturb-script-69a7bd885a70781128b7568f";
      s.src = "https://scripts.converteai.net/4000cfee-6301-49d1-a1d0-07f3a10f1621/players/69a7bd885a70781128b7568f/v4/player.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div className="w-full mb-8 relative z-20 rounded-[2rem] overflow-hidden shadow-[0_0_50px_-15px_rgba(16,185,129,0.3)] border border-emerald-900/30">
      {React.createElement('vturb-smartplayer', {
        id: 'vid-69a7bd885a70781128b7568f',
        style: { display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }
      })}
    </div>
  );
};

const EntryScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const tickerItems = [
    "Sem saber programar",
    "Sem aparecer",
    "Sem saber termos técnicos",
    "Começando do absoluto zero",
    "No automático",
    "Apenas copie e cole"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-between p-6 text-center relative min-h-screen pt-16"
    >
      {/* Scroll Ticker */}
      <div className="absolute top-0 left-0 w-full overflow-hidden bg-emerald-500/10 border-b border-emerald-500/20 py-2 z-20">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap gap-8 text-xs font-bold uppercase tracking-widest text-emerald-400 w-max"
        >
          {Array(4).fill(tickerItems).flat().map((text, i) => (
            <span key={i} className="flex items-center gap-2">
              <Zap className="w-3 h-3 fill-emerald-500" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="text-emerald-100/80 tracking-[0.25em] text-xs font-bold uppercase mb-8 font-serif">
          AI Influencer Quiz
        </div>

        <VTurbPlayer />

        <h1 className="text-[26px] sm:text-3xl font-serif leading-[1.4] mb-6 text-white px-2">
          <mark className="bg-[#10b981] text-zinc-950 font-black px-2 py-1 rounded box-decoration-clone">
            Faça sua primeira venda usando clones de IA
          </mark>
          <span className="font-bold">
            {", começando do zero ou eu devolvo 100% do seu dinheiro e ainda te pago R$500."}
          </span>
        </h1>

        <p className="text-emerald-100/70 text-[15px] sm:text-base font-serif leading-relaxed mb-10 px-4">
          Passo a Passo atualizado, direto ao ponto, que já ajudou mais de 1000 mil alunos a conquistar sua primeira venda.
        </p>
      </div>

      <div className="w-full relative z-10 pb-8 mt-auto">
        <button
          onClick={onStart}
          className="w-full bg-[#10b981] hover:bg-[#059669] text-black font-serif font-bold text-lg py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]"
        >
          Quero entender se é para mim
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

const QuestionScreen: React.FC<{ step: number, question: any, onAnswer: (a: string) => void }> = ({ step, question, onAnswer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col p-6 pt-10"
    >
      <span className="text-emerald-500 font-bold tracking-wider text-sm mb-4 uppercase">
        Pergunta {step} de 3
      </span>

      {question.image && (
        <div className="w-full h-40 sm:h-52 mb-6 rounded-2xl overflow-hidden shadow-lg border border-emerald-900/30">
          <img
            src={question.image}
            alt={`Ilustração para: ${question.title}`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 leading-tight">
        {question.title}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option: string, idx: number) => (
          <button
            key={idx}
            onClick={() => onAnswer(option)}
            className="w-full text-left p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/50 transition-all flex items-center justify-between group active:scale-[0.98]"
          >
            <span className="font-medium text-lg text-zinc-200 group-hover:text-white">{option}</span>
            <div className="w-6 h-6 rounded-full border-2 border-zinc-700 group-hover:border-emerald-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

const LeadFormScreen: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', instagram: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Você pode conectar a API de CRM/Webhook de Leads aqui
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col p-6 pt-10"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3 leading-tight">
          Quase lá!
        </h2>
        <p className="text-zinc-400">
          Precisamos de alguns dados para liberar o seu acesso à análise e salvar sua vaga.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <User className="w-5 h-5 text-zinc-500" />
          </div>
          <input
            type="text"
            required
            placeholder="Seu nome completo"
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-zinc-500" />
          </div>
          <input
            type="email"
            required
            placeholder="Seu melhor e-mail"
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-colors"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Phone className="w-5 h-5 text-zinc-500" />
          </div>
          <input
            type="tel"
            required
            placeholder="WhatsApp com DDD"
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-colors"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Instagram className="w-5 h-5 text-zinc-500" />
          </div>
          <input
            type="text"
            required
            placeholder="@seu_instagram"
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 text-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-colors"
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          />
        </div>

        <div className="mt-auto pt-8">
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-lg py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]"
          >
            Ver Minha Análise
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4" />
            Seus dados estão 100% seguros com a gente
          </div>
        </div>
      </form>
    </motion.div>
  );
}

const AnalyzingScreen: React.FC<{ text: string }> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-zinc-800 border-t-emerald-500"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Target className="w-8 h-8 text-emerald-500" />
        </div>
      </div>

      <h2 className="text-2xl font-display font-bold mb-2">Processando dados</h2>
      <p className="text-zinc-400">{text}</p>
    </motion.div>
  );
}

const SalesPage: React.FC<{ answers: Record<number, string> }> = ({ answers }) => {
  const [orderBump, setOrderBump] = useState(false);

  const basePrice = 29.90;
  const bumpPrice = 47.90;
  const total = orderBump ? basePrice + bumpPrice : basePrice;

  const timeCommitment = answers[2] || "1 hora";
  const incomeGoal = answers[3] || "R$ 3.000 a R$ 7.000";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col pb-24"
    >
      {/* Result Header */}
      <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-6 pt-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-display font-bold text-emerald-400 mb-2">
          Perfil Aprovado!
        </h2>
        <p className="text-zinc-300 leading-relaxed">
          Seu potencial é gerar <strong className="text-white">{incomeGoal}</strong> por mês dedicando apenas <strong className="text-white">{timeCommitment}</strong> por dia.
        </p>
      </div>

      <div className="p-6 space-y-12">
        {/* Headline */}
        <div className="text-center">
          <h3 className="text-3xl font-display font-bold leading-tight mb-4">
            O método para fazer R$10.000/mês com Clones de IA
          </h3>
          <p className="text-zinc-400">
            Copie e cole a estratégia exata usada pelos maiores perfis dark do momento.
          </p>
        </div>

        {/* Fake Video Player (Vertical VSL) */}
        <div className="relative aspect-[9/16] max-w-[360px] mx-auto bg-zinc-900 rounded-3xl border border-zinc-700 overflow-hidden group cursor-pointer shadow-[0_20px_50px_-15px_rgba(16,185,129,0.3)]">
          <img
            src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=600&q=80"
            alt="Video Thumbnail Vertical"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/90 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Play className="w-8 h-8 text-zinc-950 fill-zinc-950 ml-1.5" />
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-700/50 flex items-center gap-2 backdrop-blur-md">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Ao Vivo</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between text-sm font-medium text-white/90">
            <span>00:00 / 12:45</span>
            <span className="flex items-center gap-1 font-bold text-emerald-400"><Video className="w-4 h-4" /> Assista até o final</span>
          </div>
        </div>

        {/* Social Proof */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h4 className="text-xl font-display font-bold">Resultados Reais</h4>
          </div>
          <div className="flex flex-col gap-4">
            {[
              "/src/assets/IMG_3505.PNG",
              "/src/assets/IMG_3506.PNG",
              "/src/assets/IMG_3507.PNG",
              "/src/assets/IMG_3508.PNG",
              "/src/assets/IMG_3509.PNG"
            ].map((imgUrl, i) => (
              <div key={i} className="relative bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700/50 shadow-2xl">
                <img
                  src={imgUrl}
                  alt={`Depoimento de Aluno ${i + 1}`}
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Viral Videos Proof */}
        <div>
          <h4 className="text-2xl font-display font-bold mb-6 text-center">O poder da viralização</h4>

          <div className="flex flex-col gap-4 mb-10">
            {[
              "/src/assets/IMG_5349.jpg",
              "/src/assets/IMG_5350.jpg",
              "/src/assets/IMG_5351.jpg"
              // Adicionaremos os próximos 2 prints aqui assim que você enviar
            ].map((imgUrl, i) => (
              <div key={i} className="relative bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700/50 shadow-2xl">
                <img
                  src={imgUrl}
                  alt={`Comprovação de Viralização ${i + 1}`}
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          <p className="text-zinc-400 text-[15px] leading-relaxed text-center mb-8 px-2 max-w-sm mx-auto">
            Somando apenas os 3 primeiros perfis acima, temos mais de <strong className="text-white text-base">8 MILHÕES de visualizações</strong>.<br />
            Veja o que isso representa vendendo um produto de R$40:
          </p>

          {/* Infographic / Scenarios */}
          <div className="grid gap-4 mb-4">
            {/* Conservador */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110">
                <TrendingDown className="w-24 h-24" />
              </div>
              <h5 className="font-bold text-amber-500 mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" /> Cenário Conservador
              </h5>
              <div className="space-y-3 text-sm text-zinc-300 relative z-10">
                <div className="flex justify-between border-b border-zinc-800/50 pb-2">
                  <span>8.000.000 views</span>
                  <span className="text-zinc-500 text-xs mt-0.5">Base</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/50 pb-2">
                  <span>1% clica</span>
                  <span className="font-medium text-white flex items-center gap-1">80.000 <span className="text-xs text-zinc-500 font-normal">na LP</span></span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/50 pb-2">
                  <span>20% vai pro checkout</span>
                  <span className="font-medium text-white">16.000</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/50 pb-2">
                  <span>2% converte</span>
                  <span className="font-medium text-white flex items-center gap-1">320 <span className="text-xs text-zinc-500 font-normal">vendas</span></span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-800 font-display flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Ganho Estimado</span>
                <span className="text-2xl font-bold text-amber-400">R$ 12.800</span>
              </div>
            </div>

            {/* Médio */}
            <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-5 relative overflow-hidden group shadow-[0_0_30px_-15px_rgba(16,185,129,0.2)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
              <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-500 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110">
                <Activity className="w-24 h-24" />
              </div>
              <h5 className="font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Cenário Médio
              </h5>
              <div className="space-y-3 text-sm text-zinc-300 relative z-10">
                <div className="flex justify-between border-b border-emerald-900/30 pb-2">
                  <span>8.000.000 views</span>
                  <span className="text-emerald-500/40 text-xs mt-0.5">Base</span>
                </div>
                <div className="flex justify-between border-b border-emerald-900/30 pb-2">
                  <span>2% clica</span>
                  <span className="font-medium text-white flex items-center gap-1">160.000 <span className="text-xs text-zinc-500 font-normal">na LP</span></span>
                </div>
                <div className="flex justify-between border-b border-emerald-900/30 pb-2">
                  <span>25% vai pro checkout</span>
                  <span className="font-medium text-white">40.000</span>
                </div>
                <div className="flex justify-between border-b border-emerald-900/30 pb-2">
                  <span>3% converte</span>
                  <span className="font-medium text-white flex items-center gap-1">1.200 <span className="text-xs text-zinc-500 font-normal">vendas</span></span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-emerald-900/30 font-display flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <span className="text-[10px] text-emerald-500/70 uppercase tracking-widest font-bold">Ganho Estimado</span>
                <span className="text-3xl font-bold text-emerald-400">R$ 48.000</span>
              </div>
            </div>

            {/* Agressivo */}
            <div className="bg-purple-950/20 border border-purple-900/50 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.04] text-purple-500 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110">
                <Rocket className="w-24 h-24" />
              </div>
              <div className="mb-4">
                <h5 className="font-bold text-purple-400 flex items-center gap-2 mb-1">
                  <Rocket className="w-5 h-5" /> Cenário Agressivo
                </h5>
                <p className="text-xs text-purple-400/70">Oferta muito alinhada ao conteúdo</p>
              </div>
              <div className="space-y-3 text-sm text-zinc-300 relative z-10">
                <div className="flex justify-between border-b border-purple-900/30 pb-2">
                  <span>8.000.000 views</span>
                  <span className="text-purple-500/40 text-xs mt-0.5">Base</span>
                </div>
                <div className="flex justify-between border-b border-purple-900/30 pb-2">
                  <span>3% clica</span>
                  <span className="font-medium text-white flex items-center gap-1">240.000 <span className="text-xs text-zinc-500 font-normal">na LP</span></span>
                </div>
                <div className="flex justify-between border-b border-purple-900/30 pb-2">
                  <span>30% vai pro checkout</span>
                  <span className="font-medium text-white">72.000</span>
                </div>
                <div className="flex justify-between border-b border-purple-900/30 pb-2">
                  <span>3% converte</span>
                  <span className="font-medium text-white flex items-center gap-1">2.160 <span className="text-xs text-zinc-500 font-normal">vendas</span></span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-purple-900/30 font-display flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <span className="text-[10px] text-purple-500/70 uppercase tracking-widest font-bold">Ganho Estimado</span>
                <span className="text-3xl font-bold text-purple-400">R$ 86.400</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center shadow-[0_0_30px_-15px_rgba(16,185,129,0.2)] mb-8">
            <h4 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 leading-tight">
              Em qualquer um dos cenários <span className="text-emerald-400">você faz no mínimo 12 mil</span> por mês
            </h4>
          </div>
        </div>

        {/* Modules */}
        <div>
          <h4 className="text-2xl font-display font-bold mb-2 text-center">Por Dentro da Plataforma</h4>
          <p className="text-zinc-400 text-sm text-center mb-6">Tudo estruturado passo a passo para você replicar.</p>

          {/* Fake Platform Video Player */}
          <div className="relative aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden group cursor-pointer shadow-2xl mb-8">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
              alt="Plataforma de Alunos"
              className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-900/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/90 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform backdrop-blur-sm">
                <Play className="w-6 h-6 text-zinc-950 fill-zinc-950 ml-1" />
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-700/50 flex items-center gap-2 backdrop-blur-md">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Tour Exclusivo</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-medium text-white/80">
              <span>00:00 / 08:15</span>
              <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Assistir Demo</span>
            </div>
          </div>

          <h4 className="text-xl font-display font-bold mb-6">O que você vai receber:</h4>
          <div className="space-y-3">
            {[
              { icon: Target, title: "Módulo 1: A Mente do Clone", desc: "Como criar a persona perfeita que engaja e vende." },
              { icon: Smartphone, title: "Módulo 2: Geração de Imagem e Vídeo", desc: "As ferramentas secretas gratuitas e pagas." },
              { icon: TrendingUp, title: "Módulo 3: Viralização no TikTok/Reels", desc: "O algoritmo hackeado para views infinitas." },
              { icon: DollarSign, title: "Módulo 4: Monetização Expressa", desc: "Como transformar visualizações em dinheiro na conta." }
            ].map((mod, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 text-emerald-400">
                  <mod.icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold mb-1">{mod.title}</h5>
                  <p className="text-sm text-zinc-400">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Section */}
        <div id="checkout" className="bg-zinc-900 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden mt-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />

          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold mb-6 uppercase tracking-wider">
              Oferta Especial de Lançamento
            </span>

            <h4 className="text-2xl font-display font-bold mb-6">Resumo do seu Acesso:</h4>

            <div className="space-y-2 text-sm text-zinc-400 mb-6 max-w-[280px] mx-auto text-left">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span>Módulo: A Mente do Clone</span>
                <span className="line-through">R$ 97,00</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span>Módulo: Geração de Imagem/Vídeo</span>
                <span className="line-through">R$ 97,00</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span>Módulo: Viralização Hackeada</span>
                <span className="line-through">R$ 147,00</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span>Módulo: Monetização Expressa</span>
                <span className="line-through">R$ 197,00</span>
              </div>
              <div className="flex justify-between items-center pt-2 font-bold text-white">
                <span>VALOR TOTAL</span>
                <span className="text-red-400 line-through">R$ 538,00</span>
              </div>
            </div>

            <div className="relative inline-block mb-2 mt-4">
              <span className="absolute -top-3 -right-6 rotate-12 bg-emerald-500 text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                -94% OFF
              </span>
              <div className="text-6xl font-display font-black text-emerald-400 tracking-tight">
                <span className="text-2xl text-emerald-500/70 mr-1 font-bold">R$</span>29<span className="text-3xl text-emerald-500/70 ml-1">,90</span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mt-2 font-medium">Pagamento único. Acesso vitalício imediato.</p>
          </div>

          {/* Order Bump */}
          <div
            onClick={() => setOrderBump(!orderBump)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all mb-6 flex gap-3 ${orderBump ? 'border-emerald-500 bg-emerald-500/5' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
              }`}
          >
            <div className={`w-6 h-6 rounded shrink-0 flex items-center justify-center mt-0.5 transition-colors ${orderBump ? 'bg-emerald-500' : 'bg-zinc-800'
              }`}>
              {orderBump && <Check className="w-4 h-4 text-zinc-950 font-bold" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" /> VIP
                </span>
              </div>
              <h5 className="font-bold mb-1">Grupo VIP de Networking (+ R$47,90)</h5>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Receba vídeos virais prontos toda semana e participe de lives exclusivas tirando dúvidas.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 border-t border-zinc-800 mb-6 font-bold">
            <span>Total a pagar:</span>
            <span className="text-xl">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>

          <button
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-lg py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] mb-4"
            onClick={() => window.location.href = '#'}
          >
            <Lock className="w-5 h-5" />
            GARANTIR MEU ACESSO
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4" />
            Pagamento 100% seguro
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl border border-zinc-800 bg-zinc-900/50">
          <div className="w-20 h-20 shrink-0 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-10 h-10 text-emerald-500" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-display font-bold mb-2">Garantia Incondicional de 7 Dias</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              O risco é 100% nosso. Se por qualquer motivo você achar que o método de Clones de IA não é para você, basta nos enviar um único e-mail e devolveremos cada centavo do seu investimento. Sem perguntas.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
