// === FILE: src/components/Modals.js ===
// Pindahkan komponen AiIntroModal, BirthdayWarningModal, dan GeminiModal dari baris 806-958

import React, { useState, useEffect, useRef } from 'react';
import { BrainCircuit, X, Cake, Send } from 'lucide-react';

// Komponen Modal Intro AI
export const AiIntroModal = ({ isOpen, onClose, onProceed }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm text-center p-8">
                <div className="flex justify-center mb-4">
                    <BrainCircuit size={48} className="text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tanya Asisten AI Kami!</h3>
                <p className="text-gray-600 mb-6">Tanyakan kepada AI untuk rekomendasi menu best seller di katalog kami.</p>
                <div className="flex justify-end gap-3">
                     <button onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">Tutup</button>
                     <button onClick={onProceed} className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">Mulai Bertanya</button>
                </div>
            </div>
        </div>
    );
};

// Birthday warning popup
export const BirthdayWarningModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm text-center p-6">
                 <div className="flex justify-center mb-4">
                    <Cake size={40} className="text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Perhatian</h3>
                <p className="text-gray-700 font-semibold mb-4">Untuk menu Birthday, minimal pemesanan H-1.</p>
                <button onClick={onClose} className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    Mengerti
                </button>
            </div>
        </div>
    )
}

// Komponen Modal Gemini (Chat)
export const GeminiModal = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'ai', text: 'Halo! Ada yang bisa saya bantu? Anda bisa menanyakan menu best seller atau rekomendasi lainnya.' }
    ]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const query = userInput.trim().toLowerCase();
        if (!query || isLoading) return;

        setChatHistory(prev => [...prev, { sender: 'user', text: userInput.trim() }]);
        setUserInput('');
        setIsLoading(true);
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            let simulatedText = "Maaf, saya hanya bisa memberikan informasi seputar menu di katalog kami.";

            if (query.includes('best seller') || query.includes('rekomendasi')) {
                if (query.includes('ramen')) {
                    simulatedText = `Tentu! Untuk kategori Ramen, menu best seller kami adalah:\n\n1. **Ramen Curry**: Kuah kari Jepang kami yang kental dan kaya rempah, favorit banyak orang!\n\n2. **Ramen Tomyam**: Rasa asam pedas yang menyegarkan, pilihan tepat untuk Anda yang suka tantangan rasa.`;
                } else if (query.includes('sushi')) {
                    simulatedText = `Pilihan bagus! Untuk Sushi, yang paling laris adalah:\n\n1. **Fusion Beef Cheese Roll**: Kombinasi sempurna antara daging sapi gurih dan keju leleh yang di-torch.\n\n2. **Fusion Pizza Roll**: Sensasi unik makan pizza dalam bentuk sushi, wajib coba!`;
                } else {
                    // General best seller
                    simulatedText = `Tentu, ini menu best seller di katalog kami:\n\n**Ramen:**\n1. Ramen Curry\n2. Ramen Tomyam\n\n**Sushi:**\n1. Fusion Beef Cheese Roll\n2. Fusion Pizza Roll`;
                }
            }
            
            setChatHistory(prev => [...prev, { sender: 'ai', text: simulatedText }]);

        } catch (error) {
            console.error("Error fetching recommendation:", error);
            setChatHistory(prev => [...prev, { sender: 'ai', text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[80vh]">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2"><BrainCircuit className="text-purple-500"/> Asisten AI</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div ref={chatContainerRef} className="p-6 flex-grow overflow-y-auto bg-gray-50">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                             {msg.sender === 'ai' && <BrainCircuit className="text-purple-500 flex-shrink-0" size={24}/>}
                            <div className={`rounded-lg p-3 max-w-xs lg:max-w-md shadow-sm ${msg.sender === 'user' ? 'bg-purple-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start mb-4">
                             <BrainCircuit className="text-purple-500 flex-shrink-0" size={24}/>
                            <div className="bg-white text-gray-800 rounded-lg p-3 rounded-bl-none shadow-sm">
                                <div className="flex items-center justify-center gap-1">
                                    <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-0"></span>
                                    <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-150"></span>
                                    <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 border-t bg-white">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input 
                            type="text" 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ketik pertanyaan Anda..."
                            className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !userInput} className="bg-purple-500 text-white font-bold p-3 rounded-lg hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center">
                            <Send size={20}/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};