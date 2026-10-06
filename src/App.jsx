import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart3,
  Database,
  Code2,
  Terminal,
  Cpu,
  Mail,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Award,
  Send,
  CheckCircle2,
  Globe,
  Sun,
  Moon,
  LineChart,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles,
  Info,
  FolderGit2,
  Filter,
  Copy,
  Check
} from 'lucide-react';

// Custom SVG Component for GitHub to prevent any Lucide-react export breaking changes
const GithubIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const SKILL_CATEGORIES = [
  {
    title: "Linguagens & Consulta",
    icon: Code2,
    skills: [
      { name: "SQL (PostgreSQL, BigQuery, Snowflake)", level: 95 },
      { name: "Python (Pandas, NumPy, Scikit-learn)", level: 90 },
      { name: "R (ggplot2, dplyr)", level: 75 },
      { name: "DAX & M (Power Query)", level: 88 }
    ]
  },
  {
    title: "Business Intelligence & Dataviz",
    icon: BarChart3,
    skills: [
      { name: "Power BI / DAX Studio", level: 95 },
      { name: "Tableau Desktop & Server", level: 85 },
      { name: "Looker Studio", level: 80 },
      { name: "Metabase", level: 85 }
    ]
  },
  {
    title: "Engenharia de Dados & ETL",
    icon: Database,
    skills: [
      { name: "Pipelines ETL/ELT (dbt, Apache Airflow)", level: 82 },
      { name: "Data Warehousing (Kimball, Star Schema)", level: 90 },
      { name: "Docker & AWS S3 / Athena", level: 78 },
      { name: "Git & GitHub Actions CI/CD", level: 85 }
    ]
  },
  {
    title: "Estatística & Analytics",
    icon: LineChart,
    skills: [
      { name: "Testes A/B & Testes de Hipótese", level: 88 },
      { name: "Análise Preditiva & Regressão", level: 82 },
      { name: "Análise de Churn & LTV", level: 90 },
      { name: "Cohort Analysis & Funil de Conversão", level: 92 }
    ]
  }
];

const PROJECTS_DATA = [
  {
    id: "churn-analysis",
    title: "Predição & Diagnóstico de Churn de Clientes",
    category: "Python",
    tags: ["Python", "Scikit-Learn", "Streamlit", "XGBoost"],
    shortDesc: "Análise exploratória e modelo estatístico para identificar fatores de cancelamento SaaS, reduzindo o churn em 14%.",
    fullDesc: "Desenvolvimento de uma pipeline de machine learning para prever a probabilidade de churn em clientes de telecomunicações. Inclui análise de sobrevivência, feature engineering com Pandas e dashboard interativo construído em Streamlit.",
    metrics: ["14% Redução de Churn", "89% Acurácia no Modelo", "50k+ Clientes Analisados"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com"
  },
  {
    id: "sales-executive-pbi",
    title: "Dashboard Executivo de Vendas & Supply Chain",
    category: "Power BI",
    tags: ["Power BI", "DAX", "SQL Server", "Data Modeling"],
    shortDesc: "Painel multinível em Power BI conectando dados de vendas, estoque e margem de contribuição em tempo real.",
    fullDesc: "Modelagem dimensional em esquema estrela (Star Schema) consumindo milhões de linhas de dados do SQL Server. Criação de métricas complexas em DAX para cálculo de Time Intelligence (YTD, YoY), rotatividade de estoque e análise de margem.",
    metrics: ["R$ 12M+ Volume Monitorado", "300ms Tempo de Resposta", "40+ Usuários Diários"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com"
  },
  {
    id: "modern-data-stack",
    title: "Pipeline ETL de Varejo com dbt e BigQuery",
    category: "Pipelines SQL",
    tags: ["dbt", "BigQuery", "SQL", "Airflow", "Docker"],
    shortDesc: "Orquestração automatizada de dados raw para marts analíticos limpos e testados.",
    fullDesc: "Implementação de arquitetura Medallion (Bronze, Prata, Ouro) usando dbt Core e Google BigQuery. Validação automatizada de integridade de dados com testes de chave primária, frescor de dados e relatórios no Slack via Airflow.",
    metrics: ["99.9% Uptime da Pipeline", "60% Redução de Custos Cloud", "100GB+ Processados/dia"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com"
  },
  {
    id: "marketing-attribution",
    title: "Modelo de Atribuição Multi-Toque para E-commerce",
    category: "Python",
    tags: ["Python", "SQL", "Marketing Analytics", "Looker"],
    shortDesc: "Algoritmo em Python para calcular ROI real por canal usando CADEIA DE MARKOV.",
    fullDesc: "Comparativo entre modelos First-Touch, Last-Touch e Atribuição baseada em Cadeia de Markov. A análise permitiu realocar 25% do orçamento de marketing para canais de maior conversão incremental.",
    metrics: ["+22% ROAS Global", "R$ 450k Reorganizados", "5 Canais Integrados"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com"
  }
];

const EXPERIENCES = [
  {
    role: "Analista de Dados Senior",
    company: "Tech Analytics Solutions",
    period: "2024 - Presente",
    description: "Liderança técnica no desenvolvimento de soluções de Business Intelligence, criação de pipelines de dados em SQL/dbt e automação de dashboards executivos.",
    highlights: [
      "Redução de 40% no tempo de geração de relatórios mensais da diretoria.",
      "Implementação de governança de dados e dicionário de dados centralizado.",
      "Mentoria para 3 analistas júniores em SQL avançado e Power BI."
    ]
  },
  {
    role: "Analista de Dados / BI",
    company: "Fintech Growth Enterprise",
    period: "2022 - 2024",
    description: "Análise de funil de conversão, criação de modelos de dados relacionais e execução de consultas SQL otimizadas em grandes volumes de transações.",
    highlights: [
      "Desenvolvimento do dashboard de LTV e CAC com integração via API do CRM.",
      "Construção de testes A/B para fluxo de onboarding de novos clientes."
    ]
  },
  {
    role: "Analista de Business Intelligence Jr.",
    company: "Consultoria Global de Dados",
    period: "2021 - 2022",
    description: "Extração de dados via SQL, modelagem no Power Query e desenvolvimento de visuais para clientes do setor de varejo e logística.",
    highlights: [
      "Consolidação de bases fragmentadas em Excel para bancos SQL.",
      "Criação de documentação funcional dos relatórios corporativos."
    ]
  }
];

const EDUCATION = [
  {
    degree: "Pós-Graduação em Engenharia de Dados & Analytics",
    institution: "Universidade de Tecnologia",
    year: "2023 - 2024",
    type: "Pós-Graduação"
  },
  {
    degree: "Bacharelado em Sistemas de Informação / Ciência da Computação",
    institution: "Instituto Federal de Ensino",
    year: "2018 - 2022",
    type: "Graduação"
  }
];

const CERTIFICATIONS = [
  { name: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)", issuer: "Microsoft", code: "PL-300" },
  { name: "Google Data Analytics Professional Certificate", issuer: "Google", code: "GDA-2023" },
  { name: "dbt Fundamentals Certified", issuer: "dbt Labs", code: "DBT-FUND" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", code: "AWS-CCP" }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeTabVisual, setActiveTabVisual] = useState('sql'); // sql, pipeline, metric

  // Interactive SQL Editor Simulation state
  const [sqlQuery, setSqlQuery] = useState("SELECT status, COUNT(*) as total_pedidos, SUM(valor) as receita\nFROM vendas_ecommerce\nWHERE data_venda >= '2026-01-01'\nGROUP BY status\nORDER BY receita DESC;");
  const [queryResult, setQueryResult] = useState(null);
  const [isQueryRunning, setIsQueryRunning] = useState(false);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Todos') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // Execute Simulated SQL Query
  const handleRunQuery = () => {
    setIsQueryRunning(true);
    setTimeout(() => {
      setQueryResult([
        { status: 'Entregue', total_pedidos: 14250, receita: 'R$ 3.840.120,00' },
        { status: 'Em Trânsito', total_pedidos: 3120, receita: 'R$ 890.450,00' },
        { status: 'Processando', total_pedidos: 1840, receita: 'R$ 412.300,00' },
        { status: 'Cancelado', total_pedidos: 410, receita: 'R$ 98.100,00' }
      ]);
      setIsQueryRunning(false);
    }, 600);
  };

  useEffect(() => {
    handleRunQuery();
  }, []);

  // Sections list for slide navigation
  const sections = [
    { id: 'hero', label: 'Início' },
    { id: 'sobre', label: 'Sobre Mim' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'experiencia', label: 'Experiência' },
    { id: 'formacao', label: 'Formação' },
    { id: 'contato', label: 'Contato' }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-[#0B0F19] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        darkMode ? 'bg-[#0B0F19]/80 border-slate-800/80' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            className="flex items-center gap-2 font-bold text-lg tracking-tight group"
          >
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="bg-gradient-to-r from-slate-100 via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Data.Analyst
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeSection === sec.id
                    ? darkMode
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'bg-cyan-50 text-cyan-600 border border-cyan-200'
                    : darkMode
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </nav>

          {/* Action Header Items */}
          <div className="flex items-center gap-3">
            {/* Deploy GitHub Pages Helper Button */}
            <button
              onClick={() => setDeployModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-all"
              title="Guia de Deploy no GitHub Pages"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Deploy GitHub</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border transition-all ${
                darkMode
                  ? 'bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              aria-label="Alternar Tema"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-700/50 text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-b px-4 py-4 space-y-2 ${
            darkMode ? 'bg-[#0B0F19] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                {sec.label}
              </button>
            ))}
            <button
              onClick={() => { setDeployModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
            >
              <FolderGit2 className="w-4 h-4" />
              Guia Deploy GitHub Pages
            </button>
          </div>
        )}
      </header>

      {/* Floating Side Section Dots Navigator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-2.5 p-2 rounded-full backdrop-blur-md bg-slate-900/40 border border-slate-800/50">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group relative flex items-center justify-center"
            aria-label={`Ir para ${sec.label}`}
          >
            <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSection === sec.id ? 'bg-cyan-400 scale-125 ring-4 ring-cyan-500/20' : 'bg-slate-600 hover:bg-slate-400'
            }`} />
            <span className="absolute right-8 px-2 py-1 rounded bg-slate-900 text-slate-200 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-800 shadow-xl">
              {sec.label}
            </span>
          </button>
        ))}
      </div>

      {/* Main Container Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-8">

        {}
        <section id="hero" className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-12 pt-6">
          
          {/* Left Text Column */}
          <div className="flex-1 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transformando Dados Brutos em Decisões de Alto Impacto</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Olá, sou Quelvin Carvalho <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Analista de Dados</span>
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Especialista em <strong className="text-cyan-400 font-semibold">SQL Avançado</strong>, <strong className="text-cyan-400 font-semibold">Python (Pandas/Scikit-learn)</strong> e <strong className="text-cyan-400 font-semibold">Power BI</strong>. Construo pipelines ETL robustos, dashboards interativos executivos e modelagem estatística para otimizar métricas de negócio.
            </p>

            {/* Quick Tech Badge Pill Cloud */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['SQL (Postgres/BigQuery)', 'Python', 'Power BI & DAX', 'dbt', 'Airflow', 'Estagística & A/B'].map((tech) => (
                <span key={tech} className={`text-xs px-2.5 py-1 rounded-md font-mono ${
                  darkMode ? 'bg-slate-800/80 text-slate-300 border border-slate-700/50' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => scrollToSection('projetos')}
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <span>Explorar Projetos</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('contato')}
                className={`px-6 py-3 rounded-xl font-semibold text-sm border transition-all flex items-center gap-2 ${
                  darkMode
                    ? 'border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Entre em Contato</span>
              </button>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-xl border transition-all ${
                  darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}
                title="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Interactive Hero Card Console */}
          <div className="w-full lg:w-[500px] flex-shrink-0">
            <div className={`rounded-2xl border p-5 shadow-2xl backdrop-blur-xl transition-all ${
              darkMode ? 'bg-slate-900/90 border-slate-800 shadow-cyan-950/20' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-700/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2">data_workspace.sql</span>
                </div>
                
                <div className="flex bg-slate-800/80 p-1 rounded-lg text-xs font-medium">
                  <button
                    onClick={() => setActiveTabVisual('sql')}
                    className={`px-2.5 py-1 rounded ${activeTabVisual === 'sql' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    SQL Query
                  </button>
                  <button
                    onClick={() => setActiveTabVisual('pipeline')}
                    className={`px-2.5 py-1 rounded ${activeTabVisual === 'pipeline' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Pipeline ETL
                  </button>
                </div>
              </div>

              {/* Tab 1: SQL Interactive Console */}
              {activeTabVisual === 'sql' && (
                <div className="space-y-4">
                  <div className="bg-[#050811] rounded-lg p-3 font-mono text-xs border border-slate-800 text-slate-200">
                    <textarea
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      rows={5}
                      className="w-full bg-transparent border-none outline-none resize-none text-emerald-400 font-mono text-xs leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Ambiente: PostgreSQL 16</span>
                    <button
                      onClick={handleRunQuery}
                      disabled={isQueryRunning}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 flex items-center gap-1.5 transition-all"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      {isQueryRunning ? 'Executando...' : 'Executar SQL'}
                    </button>
                  </div>

                  {/* SQL Result Table Render */}
                  {queryResult && (
                    <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#070C16]">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-800/50 text-slate-300 border-b border-slate-800">
                          <tr>
                            <th className="p-2">status</th>
                            <th className="p-2">pedidos</th>
                            <th className="p-2">receita</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-slate-300">
                          {queryResult.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-800/30">
                              <td className="p-2 text-cyan-400">{row.status}</td>
                              <td className="p-2">{row.total_pedidos.toLocaleString()}</td>
                              <td className="p-2 text-emerald-400">{row.receita}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Visual Pipeline Architecture Nodes */}
              {activeTabVisual === 'pipeline' && (
                <div className="space-y-4 py-2">
                  <div className="text-xs font-medium text-slate-400 mb-2">Fluxo de Dados Automatizado (Modern Data Stack)</div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col items-center gap-1">
                      <Database className="w-5 h-5 text-amber-400" />
                      <span className="font-semibold text-slate-200">Fontes Raw</span>
                      <span className="text-[10px] text-slate-400">Postgres / API</span>
                    </div>

                    <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex flex-col items-center gap-1 relative">
                      <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
                      <span className="font-semibold text-cyan-300">dbt / Airflow</span>
                      <span className="text-[10px] text-cyan-400/80">Transformação</span>
                    </div>

                    <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex flex-col items-center gap-1">
                      <BarChart3 className="w-5 h-5 text-indigo-400" />
                      <span className="font-semibold text-indigo-300">Power BI</span>
                      <span className="text-[10px] text-indigo-400/80">Dashboards</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
                    <div className="flex justify-between text-emerald-400">
                      <span>✓ Airflow DAG Status:</span>
                      <span>SUCCESS</span>
                    </div>
                    <div>Data Freshness: &lt; 15 min</div>
                    <div>Data Quality Tests: 42 passed</div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </section>

        {}
        <section id="sobre" className="scroll-mt-24 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Sobre Mim & Impacto</h2>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Minha missão é transformar grandes volumes de dados caóticos em inteligência estratégica simples, escalável e acionável.
            </p>
          </div>

          {/* Metric Stats Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { number: "3+ Anos", label: "Experiência em Analytics", icon: Briefcase, color: "text-cyan-400" },
              { number: "+25", label: "Dashboards em Produção", icon: BarChart3, color: "text-indigo-400" },
              { number: "99.8%", label: "Precisão em Pipelines ETL", icon: CheckCircle2, color: "text-emerald-400" },
              { number: "R$ 2M+", label: "Economia Gerada com Insights", icon: Award, color: "text-amber-400" }
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border transition-all ${
                  darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <stat.icon className={`w-6 h-6 mb-3 ${stat.color}`} />
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100">{stat.number}</div>
                <div className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Detailed Bio Card */}
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <p className={`leading-relaxed text-sm sm:text-base ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Sou profissional apaixonado por resolução de problemas baseada em evidências. Com formação sólida em análise quantitativa e computação, atuo desde a ingestão e modelagem dimensional dos dados em Data Warehouses até a entrega final em relatórios gerenciais e modelos preditivos. Tenho facilidade de comunicação com stakeholders de negócios para traduzir requisitos complexos em KPIs claros de performance.
            </p>
          </div>

        </section>

        {}
        <section id="habilidades" className="scroll-mt-24 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Habilidades Técnicas</h2>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Ferramentas, linguagens de programação e metodologias do meu ecossistema diário de dados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border space-y-4 ${
                    darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-100">{cat.title}</h3>
                  </div>

                  <div className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{skill.name}</span>
                          <span className="text-cyan-400 font-mono">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {}
        <section id="projetos" className="scroll-mt-24 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Projetos em Destaque</h2>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Casos práticos demonstrando ingestão, análise de dados e impacto financeiro.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Todos', 'Python', 'Power BI', 'Pipelines SQL'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : darkMode
                      ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`group rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {project.category}
                    </span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-medium text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      <span>Detalhes</span>
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.shortDesc}
                  </p>

                  {/* Metrics Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.metrics.map((m, mIdx) => (
                      <span key={mIdx} className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Repositório GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                      title="Ver Detalhes"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </section>

        {}
        <section id="experiencia" className="scroll-mt-24 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Trajetória Profissional</h2>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Histórico de atuações e conquistas em empresas de tecnologia e consultoria.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-[#0B0F19]" />

                <div className={`p-6 rounded-2xl border transition-all ${
                  darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                      <div className="text-xs sm:text-sm text-cyan-400 font-semibold">{exp.company}</div>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/50 w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>

        </section>

        {}
        <section id="formacao" className="scroll-mt-24 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Formação & Certificações</h2>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Qualificação acadêmica contínua e certificações de mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Academic Education */}
            <div className="space-y-4">
              <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ?'text-slate-200': 'text-slate-400'}`}>
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Educação Acadêmica</span>
              </h3>

              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${
                    darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 uppercase tracking-wider">
                    {edu.type}
                  </span>
                  <h4 className={`font-bold ${darkMode ? 'text-slate-100':'text-slate-600'} mt-2`}>{edu.degree}</h4>
                  <p className="text-xs text-slate-400 mt-1">{edu.institution} • {edu.year}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ?'text-slate-200': 'text-slate-400'}`}>
                <Award className="w-5 h-5 text-indigo-400" />
                <span>Certificações Oficiais</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <h4 className={`font-bold ${darkMode ? 'text-slate-100':'text-slate-600'} mt-2`}>{cert.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">{cert.issuer}</p>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 mt-3">{cert.code}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>

        {}
        <section id="contato" className="scroll-mt-24 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Vamos Conversar?</h2>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Estou disponível para novas oportunidades de análise de dados, consultoria ou projetos em equipe.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* Left Contact Info Cards */}
            <div className="md:col-span-2 space-y-4">
              <div className={`p-5 rounded-2xl border space-y-2 ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <Mail className="w-5 h-5 text-cyan-400" />
                <h3 className={`text-sm font-semibold ${darkMode ? 'text-slate-200':'text-slate-400'}`}>E-mail Direto</h3>
                <p className={"text-xs text-slate-400"}>quelvindev@gmail.com</p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-2 ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <Globe className="w-5 h-5 text-emerald-400" />
                <h3 className={`text-sm font-semibold ${darkMode ? 'text-slate-200':'text-slate-400'}`}>Localização</h3>
                <p className="text-xs text-slate-400">São Paulo / Remoto (Brasil & Internacional)</p>
              </div>

              <div className={`p-5 rounded-2xl border space-y-2 ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <GithubIcon className="w-5 h-5 text-indigo-400" />
                <h3 className={`text-sm font-semibold ${darkMode ? 'text-slate-200':'text-slate-400'}`}>GitHub & Redes</h3>
                <p className="text-xs text-slate-400">github.com/analistadados</p>
              </div>
            </div>

            {/* Right Interactive Contact Form */}
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada com sucesso!"); }}
              className={`md:col-span-3 p-6 sm:p-8 rounded-2xl border space-y-4 ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-xs font-medium ${darkMode ? 'text-slate-300':'text-slate-400'}`}>Seu Nome</label>
                  <input
                    type="text"
                    required
                    placeholder="João Silva"
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none focus:border-cyan-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-medium ${darkMode ? 'text-slate-300':'text-slate-400'}`}>Seu E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="joao@empresa.com"
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none focus:border-cyan-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-medium ${darkMode ? 'text-slate-300':'text-slate-400'}`}>Assunto</label>
                <input
                  type="text"
                  required
                  placeholder="Oportunidade para Analista de Dados"
                  className={`w-full px-3 py-2 rounded-lg border text-xs outline-none focus:border-cyan-500 ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-medium ${darkMode ? 'text-slate-300':'text-slate-400'}`}>Mensagem</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Olá, gostaria de conversar sobre um projeto de analytics..."
                  className={`w-full px-3 py-2 rounded-lg border text-xs outline-none focus:border-cyan-500 ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem</span>
              </button>
            </form>

          </div>

        </section>

      </main>

      {}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-2xl rounded-2xl border p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Descrição Detalhada</h4>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">{selectedProject.fullDesc}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Métricas Alcançadas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold text-center">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Tecnologias Envolvidas</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Ver Código no GitHub</span>
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {deployModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`w-full max-w-3xl rounded-2xl border p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setDeployModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <FolderGit2 className="w-6 h-6 text-indigo-400" />
              <div>
                <h3 className="text-xl font-bold">Como Publicar no GitHub Pages</h3>
                <p className="text-xs text-slate-400">Passo a passo configurado para Vite + React com GitHub Actions</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* Step 1: vite.config.js */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cyan-400">1. Configure o `vite.config.js` com a base do repositório:</span>
                  <button
                    onClick={() => copyToClipboard(`import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n  base: '/nome-do-seu-repositorio/',\n})`, 'vite')}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400"
                  >
                    {copiedCode === 'vite' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'vite' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-[#050811] border border-slate-800 font-mono text-slate-300 text-[11px] overflow-x-auto">
{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nome-do-seu-repositorio/',
})`}
                </pre>
              </div>

              {/* Step 2: GitHub Action YAML */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-400">2. Crie o arquivo `.github/workflows/deploy.yml`:</span>
                  <button
                    onClick={() => copyToClipboard(`name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`, 'action')}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-400"
                  >
                    {copiedCode === 'action' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'action' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-[#050811] border border-slate-800 font-mono text-slate-300 text-[11px] overflow-x-auto">
{`name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`}
                </pre>
              </div>

              {/* Step 3: Enable Pages */}
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                <strong>Importante:</strong> Nas configurações do seu repositório no GitHub (Settings &gt; Pages), selecione a branch <code>gh-pages</code> como fonte do site.
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDeployModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

      {}
      <footer className={`mt-24 border-t py-12 transition-colors ${
        darkMode ? 'bg-[#070A11] border-slate-800/80 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">Data.Analyst Portfolio © 2026</span>
          </div>

          <p>Construído com React, Tailwind CSS e Engenharia de Dados.</p>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="hover:text-cyan-400 transition-colors">
              <ChevronUp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}