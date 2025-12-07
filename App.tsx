
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { AppStep, type DigitalProduct } from './types';
import IdeaStep from './components/IdeaStep';
import LoadingStep from './components/LoadingStep';
import ResultStep from './components/ResultStep';
import { generateProductContent, generateProductCover } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Idea);
  const [topic, setTopic] = useState<string>('');
  const [audience, setAudience] = useState<string>('');
  const [product, setProduct] = useState<DigitalProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!topic || !audience) {
      setError('Por favor, preencha o tópico e o público-alvo.');
      return;
    }
    setError(null);
    setStep(AppStep.Loading);
    
    try {
      // Step 1: Generate Text Content (Title, Desc, Price, Content)
      const contentDetails = await generateProductContent(topic, audience);
      
      // Step 2: Generate Cover Image using the new title
      const coverImageBase64 = await generateProductCover(contentDetails.title);
      const coverImageUrl = `data:image/png;base64,${coverImageBase64}`;

      setProduct({ ...contentDetails, coverImageUrl });
      setStep(AppStep.Result);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(`Falha ao gerar o produto. Detalhes: ${errorMessage}`);
      setStep(AppStep.Idea);
    }
  }, [topic, audience]);

  const handleStartOver = useCallback(() => {
    setTopic('');
    setAudience('');
    setProduct(null);
    setError(null);
    setStep(AppStep.Idea);
  }, []);

  const renderStep = () => {
    switch (step) {
      case AppStep.Idea:
        return (
          <IdeaStep
            topic={topic}
            setTopic={setTopic}
            audience={audience}
            setAudience={setAudience}
            onGenerate={handleGenerate}
            error={error}
          />
        );
      case AppStep.Loading:
        return <LoadingStep />;
      case AppStep.Result:
        return product ? (
          <ResultStep product={product} onStartOver={handleStartOver} />
        ) : (
          <div className="text-center text-red-500">
            <p>Ocorreu um erro e o produto não pôde ser exibido.</p>
            <button onClick={handleStartOver} className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">
              Tentar Novamente
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default App;
