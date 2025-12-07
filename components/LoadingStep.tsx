import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons';

const loadingMessages = [
  "Consultando a criatividade da IA...",
  "Elaborando um título irresistível...",
  "Gerando uma capa com design profissional...",
  "Escrevendo o conteúdo do seu produto...",
  "Calculando o preço ideal...",
  "Quase pronto!"
];

const LoadingStep: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
        <div className="relative flex items-center justify-center">
            <div className="absolute h-24 w-24 bg-orange-500 rounded-full opacity-20 animate-ping"></div>
            <SparklesIcon className="w-16 h-16 text-orange-400 animate-pulse" />
        </div>
      <h2 className="mt-8 text-2xl font-bold text-slate-200">
        A IA está criando seu produto...
      </h2>
      <p className="mt-2 text-slate-400 w-full max-w-sm transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingStep;