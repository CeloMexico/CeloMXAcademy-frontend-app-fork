
//@ts-nocheck
import { Community } from "@/types/community";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChallengeCard from "@/components/cards/challenge/Challenge";
import Scoreboard from "@/components/sections/communities/overview/scoreboard/index";
import CommunityWrapper from "@/components/sections/communities/overview/Wrapper";
import CommunityLayout from "@/layouts/Community";
import { ReactElement } from "react";
import { Challenge } from "@/types/course";
import { wrapper } from "@/store";
import { fetchCurrentCommunity, fetchLearningMaterials } from "@/store/services/community.service";
import { fetchAllChallenges } from "@/store/services/communities/challenges";
import { NotFoundError } from "@/utilities/errors/NotFoundError";
import { fetchAllScoreboards } from "@/store/services/communities/scoreboard.service";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import MetaData from "@/components/ui/MetaData";
import LearningMaterialsOverview from "@/components/sections/communities/overview/LearningMaterials";
import { fetchCommunities } from "@/services/community";
import { GetStaticPathsContext } from "next";
import CommunityNavItem from "@/components/sections/communities/overview/_partials/NavItem";

import { useState,useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';



  const lessons = [
    {
      title: "Lección 1: ¿Qué es Celo Composer y por qué usarlo?",
      content: [
        { type: "heading", text: "Objetivo", level: 2 },
        { type: "text", text: "Comprender qué es Celo Composer y qué problemas resuelve." },
        { type: "heading", text: "¿Qué es Celo Composer?", level: 2 },
        { type: "list", items: [
          "Es la herramienta oficial para construir y desplegar dApps en la blockchain de Celo.",
          "Ofrece plantillas, funciones, ejemplos y configuraciones listas para usar.",
          "Ideal para proyectos con React, RainbowKit, MiniPay, Valora, entre otros.",
          "Facilita el desarrollo de pagos, la conexión con wallets y la integración de contratos inteligentes."
        ]},
        { type: "heading", text: "¿Por qué usarlo?", level: 2 },
        { type: "list", items: [
          "Ahorra tiempo y reduce la complejidad técnica al iniciar un proyecto.",
          "Permite enfocarte en la lógica de tu dApp, sin preocuparte por la configuración inicial.",
          "Incluye ejemplos prácticos y utilidades específicas para el ecosistema Celo."
        ]},
        { type: "divider" },
        { type: "heading", text: "Instrucciones paso a paso", level: 2 },
        { type: "text", text: "1. **¿Qué es Celo?**" },
        { type: "list", items: [
          "Celo es una blockchain enfocada en la inclusión financiera y el acceso móvil.",
          "Permite crear aplicaciones descentralizadas (dApps) fáciles de usar y accesibles desde cualquier smartphone."
        ]},
        { type: "text", text: "2. **¿Qué es Celo Composer?**" },
        { type: "list", items: [
          "Es un monorepo que acelera la creación de dApps en Celo, integrando herramientas modernas como Next.js, Hardhat y contratos inteligentes listos para usar."
        ]},
        { type: "heading", text: "Recursos adicionales", level: 2 },
        { type: "link", text: "Documentación oficial de Celo", url: "https://docs.celo.org/" },
        { type: "link", text: "Repositorio de Celo Composer", url: "https://github.com/celo-org/celo-composer" }
      ]
    },
    {
      title: "Lección 2: Requisitos previos antes de comenzar",
      content: [
        { type: "heading", text: "Objetivo", level: 2 },
        { type: "text", text: "Asegurarse de que el entorno está listo para usar Celo Composer." },
        { type: "heading", text: "Contenido para instalar previamente", level: 2 },
        { type: "list", items: [
          "Tener [Node.js v20+](https://nodejs.org/)",
          "Tener [Git v2.38+](https://git-scm.com/)",
          "Contar con conocimientos básicos de línea de comandos [Git](https://learngitbranching.js.org/)"
        ]}
      ]
    },
    {
      title: "Lección 3: Crear tu primer proyecto con Celo Composer",
      content: [
        { type: "heading", text: "Objetivo", level: 2 },
        { type: "text", text: "Generar un proyecto funcional desde cero." },
        { type: "heading", text: "Pasos", level: 2 },
        { type: "text", text: "Ejecuta el siguiente comando en tu terminal:" },
        { type: "code", language: "bash", code: "npx @celo/celo-composer@latest create" },
        { type: "text", text: "Responde las siguientes preguntas:" },
        { type: "list", items: [
          "**Nombre del proyecto:** Escribe el nombre de tu app.",
          "**¿Quieres usar Hardhat?** (Sí o No) Selecciona Si",
          "**¿Quieres usar una plantilla?** (Sí o No) Selecciona Si",
          "Selecciona la siguiente: MINIPAY (ENTER)",
          "**MiniPay:** App de micropagos integrada con Celo.",
          "**Valora:** App preparada para conectar con la wallet Valora.",
          "**Nombre del propietario del proyecto**"
        ]},
        { type: "text", text: "Espera unos minutos mientras se crea el proyecto." }
      ]
    },
    {
      title: "Lección 4: Preparar el entorno (.env y dependencias)",
      content: [
        { type: "heading", text: "Objetivo", level: 2 },
        { type: "text", text: "Configurar tu entorno para que la app funcione correctamente." },
        { type: "heading", text: "Pasos", level: 2 },
        { type: "text", text: "Antes de iniciar tu proyecto, sigue estos pasos:" },
        { type: "list", items: [
          "Renombra `.env.template` a `.env` en `packages/react-app/`.",
          "Agrega tu WalletConnect Project ID desde [WalletConnect Cloud](https://cloud.walletconnect.com/)."
        ]},
        { type: "text", text: "1. Renombra el archivo:" },
        { type: "code", language: "bash", code: "packages/react-app/.env.template → packages/react-app/.env" },
        { type: "text", text: "2. Abre el archivo `.env` y completa las variables necesarias (por ejemplo: claves API, direcciones de contrato, etc.)." },
        { type: "text", text: "3. Instala dependencias:" },
        { type: "code", language: "bash", code: "yarn install" }
      ]
    },
    {
      title: "Lección 5: Corrección de errores comunes en monorepos",
      content: [
        { type: "heading", text: "Objetivo", level: 2 },
        { type: "text", text: "Ajustar los nombres de los workspaces y scripts en el `package.json` raíz para que el proyecto funcione correctamente." },
        { type: "heading", text: "Pasos detallados", level: 2 },
        { type: "list", items: [
          "Abre el archivo `package.json` en la raíz del proyecto.",
          "Busca la sección \"scripts\". Borra cualquier script que haga referencia a un workspace incorrecto.",
          "Copia y pega este bloque en la sección \"scripts\" de tu `package.json` raíz:"
        ]},
        { type: "code", language: "json", code: `{
  "scripts": {
    "react-app:dev": "yarn workspace @examples/react-app dev",
    "react-app:build": "yarn workspace @examples/react-app build",
    "react-app:start": "yarn workspace @examples/react-app start",
    "react-app:lint": "yarn workspace @examples/react-app lint"
  }
}` },
        { type: "list", items: [
          "Verifica que el nombre del workspace (`@examples/react-app`) coincida exactamente con el campo \"name\" en `packages/react-app/package.json`.",
          "(Opcional) Agrega un script raíz para mayor facilidad:"
        ]},
        { type: "code", language: "json", code: `"dev": "yarn react-app:dev"` },
        { type: "text", text: "Ejemplo final de la sección \"scripts\":" },
        { type: "code", language: "json", code: `{
  "scripts": {
    "react-app:dev": "yarn workspace @examples/react-app dev",
    "react-app:build": "yarn workspace @examples/react-app build",
    "react-app:start": "yarn workspace @examples/react-app start",
    "react-app:lint": "yarn workspace @examples/react-app lint",
    "dev": "yarn react-app:dev"
  }
}` }
      ]
    },
    {
      title: "Lección 6: Iniciar tu aplicación",
      content: [
        { type: "heading", text: "Objetivo", level: 2 },
        { type: "text", text: "Levantar el servidor de desarrollo y ver la app en acción." },
        { type: "heading", text: "Comandos", level: 2 },
        { type: "code", language: "bash", code: "yarn dev" },
        { type: "text", text: "O directamente:" },
        { type: "code", language: "bash", code: "yarn react-app:dev" },
        { type: "text", text: "Luego abre en el navegador:" },
        { type: "link", text: "http://localhost:3000", url: "http://localhost:3000" }
      ]
    },
    {
      title: "Lección 7: Conoce las plantillas disponibles",
      content: [
        { type: "heading", text: "MiniPay", level: 2 },
        { type: "list", items: [
          "Plantilla para apps de micropagos.",
          "Incluye funciones prehechas de firmar, transferir y mintear tokens.",
          "Integra fácilmente con la blockchain de Celo."
        ]},
        { type: "heading", text: "Valora", level: 2 },
        { type: "list", items: [
          "Plantilla para conexión fácil con la wallet Valora.",
          "Ideal para manejar transacciones y conectividad móvil."
        ]}
      ]
    },
    {
      title: "Lección 8: Comunidad y soporte",
      content: [
        { type: "text", text: "Si tienes dudas:" },
        { type: "list", items: [
          "Únete al Telegram de CeloMexico: [https://web.telegram.org/k/#@celomexico](https://web.telegram.org/k/#@celomexico)",
          "Escribe tus dudas."
        ]}
      ]
    }
  ];

import { Highlight, themes } from 'prism-react-renderer';

const CeloComposerLessons = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const renderContent = (content: any) => {
    return content.map((item: any, index: number) => {
      switch (item.type) {
        case "heading":
          const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements;
          return <HeadingTag key={index} className={`font-bold mt-4 mb-2 ${item.level === 2 ? 'text-xl' : 'text-lg'}`}>{item.text}</HeadingTag>;
        case "text":
          return <p key={index} className="mb-4 text-gray-700" dangerouslySetInnerHTML={{ __html: item.text }}></p>;
        case "list":
          return (
            <ul key={index} className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
              {item.items.map((listItem: string, i: number) => (
                <li key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: listItem }}></li>
              ))}
            </ul>
          );
        case "code":
          const codeId = `code-${currentLesson}-${index}`;
          return (
            <div key={index} className="relative mb-4">
              <Highlight
                theme={themes.github}
                code={item.code}
                language={item.language}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`${className} rounded-lg text-sm p-4 overflow-x-auto`} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
              <button
                onClick={() => copyToClipboard(item.code, codeId)}
                className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition-colors"
              >
                {copied === codeId ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          );
        case "divider":
          return <hr key={index} className="my-6 border-gray-200" />;
        case "link":
          return (
            <a 
              key={index} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-celo-600 hover:text-celo-800 hover:underline block mb-2 transition-colors"
            >
              {item.text}
            </a>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-celo-600 text-white p-3 rounded-full shadow-lg"
      >
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar Navigation */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transform fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out z-40`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-celo-800">Celo Composer</h2>
          <p className="text-sm text-gray-500">Lecciones interactivas</p>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {lessons.map((lesson, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setCurrentLesson(index);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${currentLesson === index ? 'bg-celo-100 text-celo-800 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="flex items-center">
                    <span className="mr-2 w-6 h-6 flex items-center justify-center bg-celo-600 text-white rounded-full text-xs">
                      {index + 1}
                    </span>
                    {lesson.title.replace(/Lección \d+: /, '')}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-celo-800">{lessons[currentLesson].title}</h1>
              <div className="text-sm text-gray-500">
                Lección {currentLesson + 1} de {lessons.length}
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              {renderContent(lessons[currentLesson].content)}
            </div>

            <div className="flex justify-between pt-6 border-t">
              <button
                onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                disabled={currentLesson === 0}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
              >
                ← Lección anterior
              </button>
              <button
                onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
                disabled={currentLesson === lessons.length - 1}
                className="px-4 py-2 bg-celo-600 text-white rounded-lg hover:bg-celo-700 disabled:opacity-50 transition-colors"
              >
                Siguiente lección →
              </button>
            </div>

            <div className="mt-8 flex justify-center space-x-2 md:hidden">
              {lessons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentLesson(index)}
                  className={`w-3 h-3 rounded-full ${currentLesson === index ? 'bg-celo-600' : 'bg-gray-300'}`}
                  aria-label={`Ir a lección ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const celoCommunity: Community = {
  id: "celo",
  ref: "community-celo",
  created_at: new Date(),
  updated_at: new Date(),
  summary: "A mobile-first, carbon-negative blockchain supporting global payments and DeFi.",
  icon: "https://cms.solow.io/wp-content/uploads/2024/03/InjXBNx9_400x400.jpg",
  image: "https://cms.solow.io/wp-content/uploads/2024/03/InjXBNx9_400x400.jpg",
  name: "Celo",
  slug: "celo",
  active: true,
  description: "Empowering mobile-first DeFi on an EVM-compatible blockchain.",
  colors: {
    text: "#000000",
    textAccent: "#4d4d00",
    accent: "#333300",
    primary: "#fcfe51",
    secondary: "#f7f98e",
    highlight: "#ffffc2",
    muted: "#e6e68a",
    cover: {
      background: "#fcfe51",
      text: "#000000",
      primary: "#fcfe51",
      accent: "#333300",
    },
  },
  metadata: {
    id: "meta-celo",
    ref: "meta-celo",
    created_at: new Date(),
    updated_at: new Date(),
    visibility: "public",
    position: 1,
    locale: "en",
    title: "Celo Community",
    summary: "Join the Celo community and build the future of mobile-first DeFi.",
    tags: ["DeFi", "Mobile", "Blockchain"],
    type: "ecosystem",
    image: "https://cms.solow.io/wp-content/uploads/2024/03/InjXBNx9_400x400.jpg",
    timestamp: Date.now(),
  },
  timestamp: Date.now(),
  rewards: [],
  reward: {
    id: "reward-celo-001",
    ref: "submission-reward-celo",
    created_at: new Date(),
    updated_at: new Date(),
    challenge: "challenge-celo-001",
    type: "SUBMISSION",
    community: "celo",
    token: "CELO",
    stable: false,
    amount: 50,
    timestamp: Date.now(),
    fiatCurrency: "USD",
    distribution: undefined,
  },
  courses: 2,
  challenges: 1,
  duration: 7,
  can_mint_certificates: true,
};

const mockChallenge: Challenge = {
  id: "challenge-celo-001",
  ref: "challenge-celo-001",
  created_at: new Date(),
  updated_at: new Date(),
  hint: "Think green, build clean.",
  name: "Launch a Celo dApp",
  format: "project",
  description: "Build a DeFi or social impact dApp using the Celo EVM network.",
  course: undefined as any,
  type: "development",
  isTeamChallenge: false,
  objectives: ["Deploy to Celo Testnet", "Use CELO token"],
  threshold: 60,
  community: celoCommunity,
  reviewTime: 48,
  metadata: celoCommunity.metadata,
  level: 2,
  courses: [],
  learningModules: [],
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  reward: celoCommunity.reward,
  certificateIcon: "https://example.com/certificate.png",
  certificateData: {
    name: "Celo Builder Certificate",
    description: "Awarded for building on the Celo blockchain.",
    image: "https://example.com/certificate.png",
  },
  ratingCriteria: [],
  timestamp: Date.now(),
  maxPoints: 100,
  minPoints: 60,
  rewards: [celoCommunity.reward],
  feedbacks: {},
  bestSubmissions: [],
};



export default function Slug(props: {
  pageProps: {
    community: Community;
    challenges: Challenge[];
  };
}): ReactElement | null {
  const { t } = useTranslation();
  let community = celoCommunity;
  let challenges = [mockChallenge];

  return (
    <>
      <Head>
        <MetaData community={community.name} title={community.description} description={community?.description} />
      </Head>
      <CommunityWrapper>
        <CommunityNavItem
          title={community.id}
          description={community.description}
          className="md:hidden my-8"
        />
        <div className="grid gap-6">
        <CeloComposerLessons/>
        </div>
        <div className="md:hidden w-full grid">
          {/* <LearningMaterialsOverview /> */}
          {/* <Scoreboard /> */}
        </div>
      </CommunityWrapper>
    </>
  );
}

Slug.getLayout = function (page: ReactElement) {
  return <CommunityLayout>{page}</CommunityLayout>;
};


