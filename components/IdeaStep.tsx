import React, { useState } from 'react';
import { SparklesIcon } from './icons';

interface IdeaStepProps {
  topic: string;
  setTopic: (topic: string) => void;
  audience: string;
  setAudience: (audience: string) => void;
  onGenerate: () => void;
  error: string | null;
}

const IdeaStep: React.FC<IdeaStepProps> = ({ topic, setTopic, audience, setAudience, onGenerate, error }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateClick = () => {
        setIsLoading(true);
        onGenerate();
    }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          Produto Digital de 5 Minutos
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Transforme sua ideia em um produto digital vendável com o poder da IA.
        </p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sm:p-8 shadow-2xl shadow-slate-900/50">
        <div className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">
              Qual é o tópico do seu produto?
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Guia de produtividade para freelancers"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="audience" className="block text-sm font-medium text-slate-300 mb-2">
              Para quem é este produto? (Público-alvo)
            </label>
            <input
              id="audience"
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Ex: Desenvolvedores que trabalham de casa"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
            />
          </div>
        </div>

        {error && (
            <p className="mt-4 text-center text-red-400">{error}</p>
        )}

        <div className="mt-8">
          <button
            onClick={handleGenerateClick}
            disabled={!topic || !audience || isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gerando...
                </>
            ) : (
                <>
                    <SparklesIcon className="w-5 h-5" />
                    Gerar Produto com IA
                </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaStep;