
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const contentGenerationModel = "gemini-2.5-flash";
const imageGenerationModel = "gemini-2.5-flash-image";

interface ProductDetails {
    title: string;
    description: string;
    price: string;
    content: string;
}

export const generateProductContent = async (topic: string, audience: string): Promise<ProductDetails> => {
    const prompt = `
    Você é um especialista em marketing digital e criação de produtos digitais.
    Com base no tópico "${topic}" e no público-alvo "${audience}", crie um produto digital conciso.
    
    Retorne um objeto JSON com a seguinte estrutura:
    - "title": um título cativante e curto.
    - "description": uma descrição de venda persuasiva de 2-3 frases.
    - "price": um preço sugerido em BRL, ex: "R$ 27,90".
    - "content": o conteúdo principal do produto, como um guia passo-a-passo ou uma lista de dicas, com cerca de 300-400 palavras, formatado em markdown simples (use # para título, * para listas, e \n para parágrafos).
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: contentGenerationModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        price: { type: Type.STRING },
                        content: { type: Type.STRING },
                    },
                    required: ["title", "description", "price", "content"],
                },
            },
        });
        
        const jsonText = response.text?.trim();
        if (!jsonText) {
            throw new Error("A resposta da IA estava vazia.");
        }

        return JSON.parse(jsonText) as ProductDetails;

    } catch (error) {
        console.error("Erro ao gerar conteúdo do produto:", error);
        throw new Error("Não foi possível gerar os detalhes do produto.");
    }
};

export const generateProductCover = async (title: string): Promise<string> => {
    const prompt = `Crie uma imagem de capa de e-book minimalista e profissional para um produto digital com o título "${title}". A imagem deve ser abstrata, usando uma paleta de cores moderna e atraente, como azul, roxo e dourado. Evite usar qualquer texto na imagem. O estilo deve ser elegante e digital.`;

    try {
        const response = await ai.models.generateContent({
            model: imageGenerationModel,
            contents: {
                parts: [{ text: prompt }],
            },
             config: {
                imageConfig: {
                    aspectRatio: "3:4",
                },
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        throw new Error("Nenhuma imagem foi gerada.");

    } catch (error) {
        console.error("Erro ao gerar capa do produto:", error);
        throw new Error("Não foi possível gerar a capa do produto.");
    }
};
