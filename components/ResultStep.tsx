import React, { useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { type DigitalProduct } from '../types';
import { DownloadIcon, BookOpenIcon, RefreshCwIcon } from './icons';

interface ResultStepProps {
  product: DigitalProduct;
  onStartOver: () => void;
}

const ResultStep: React.FC<ResultStepProps> = ({ product, onStartOver }) => {
  const handleDownloadPdf = useCallback(async () => {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4'
    });
    
    const docWidth = doc.internal.pageSize.getWidth();
    const docHeight = doc.internal.pageSize.getHeight();
    
    // Page 1: Cover Image
    doc.addImage(product.coverImageUrl, 'PNG', 0, 0, docWidth, docHeight);

    // Page 2 onwards: Content
    doc.addPage();

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(product.title, docWidth - 80);
    doc.text(titleLines, 40, 60);

    // Content
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const contentLines = doc.splitTextToSize(product.content.replace(/# /g, ''), docWidth - 80);
    doc.text(contentLines, 40, 120);

    doc.save(`${product.title.replace(/\s/g, '_')}.pdf`);
  }, [product]);

  return (
    <div className="w-full animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">Seu Produto Digital está Pronto!</h1>
        <p className="mt-2 text-slate-400">
            Abaixo estão os detalhes. Você pode baixar o PDF completo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Cover & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <img 
              src={product.coverImageUrl} 
              alt="Capa do Produto Digital" 
              className="w-full rounded-lg shadow-2xl shadow-orange-900/40 aspect-[3/4] object-cover"
            />
          </div>
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
             <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{product.title}</h2>
            <p className="text-slate-400 mt-2">{product.description}</p>
            <div className="mt-4 text-3xl font-extrabold text-green-400">{product.price}</div>
          </div>
           <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadPdf}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <DownloadIcon className="w-5 h-5" />
                Baixar PDF Completo
              </button>
              <button
                onClick={onStartOver}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                <RefreshCwIcon className="w-5 h-5" />
                Criar Outro
              </button>
            </div>
        </div>

        {/* Right Column: Content Preview */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800/50 p-6 sm:p-8 rounded-xl border border-slate-700 h-full">
            <div className="flex items-center gap-3 mb-4">
              <BookOpenIcon className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-bold text-slate-200">Conteúdo do Produto</h3>
            </div>
            <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 prose-strong:text-slate-100 max-w-none h-[calc(100vh-20rem)] min-h-[400px] overflow-y-auto pr-2">
                {product.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                        return <h2 key={index} className="text-xl font-semibold mt-4 mb-2">{paragraph.substring(2)}</h2>
                    }
                    if (paragraph.startsWith('* ')) {
                         return <li key={index} className="ml-4 list-disc">{paragraph.substring(2)}</li>
                    }
                    return <p key={index} className="my-3">{paragraph}</p>
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultStep;