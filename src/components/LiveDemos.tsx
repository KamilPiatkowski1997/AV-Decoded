import { useState, useRef } from 'react';
import { ai } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Video, BrainCircuit, Sparkles, Loader2, Upload, ScanSearch, Edit3 } from 'lucide-react';
import Markdown from 'react-markdown';
import { ThinkingLevel } from '@google/genai';

export default function LiveDemos() {
  const [activeTab, setActiveTab] = useState<'image-gen' | 'image-edit' | 'video' | 'analyze' | 'thinking'>('image-gen');

  return (
    <section id="demos" className="py-24 md:py-32 bg-[#080810] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-4 py-1.5">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Live AI Demos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white mb-6">Experience the Power of AI</h2>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Test our cutting-edge AI capabilities right here. From high-quality image generation to advanced reasoning.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:w-64 shrink-0">
            <TabButton 
              active={activeTab === 'image-gen'} 
              onClick={() => setActiveTab('image-gen')} 
              icon={<ImageIcon className="w-5 h-5" />} 
              label="HQ Image Gen" 
            />
            <TabButton 
              active={activeTab === 'image-edit'} 
              onClick={() => setActiveTab('image-edit')} 
              icon={<Edit3 className="w-5 h-5" />} 
              label="Create & Edit Image" 
            />
            <TabButton 
              active={activeTab === 'video'} 
              onClick={() => setActiveTab('video')} 
              icon={<Video className="w-5 h-5" />} 
              label="Image to Video" 
            />
            <TabButton 
              active={activeTab === 'analyze'} 
              onClick={() => setActiveTab('analyze')} 
              icon={<ScanSearch className="w-5 h-5" />} 
              label="Analyze Image" 
            />
            <TabButton 
              active={activeTab === 'thinking'} 
              onClick={() => setActiveTab('thinking')} 
              icon={<BrainCircuit className="w-5 h-5" />} 
              label="Advanced Reasoning" 
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-[#0F0F1A] border border-white/5 rounded-2xl p-6 md:p-8 min-h-[450px]">
            <AnimatePresence mode="wait">
              {activeTab === 'image-gen' && <ImageGenDemo key="image-gen" />}
              {activeTab === 'image-edit' && <ImageEditDemo key="image-edit" />}
              {activeTab === 'video' && <VideoDemo key="video" />}
              {activeTab === 'analyze' && <AnalyzeDemo key="analyze" />}
              {activeTab === 'thinking' && <ThinkingDemo key="thinking" />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap ${
        active 
          ? 'bg-[#2563EB]/10 border border-[#2563EB]/30 text-white' 
          : 'bg-transparent border border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
      }`}
    >
      <div className={active ? 'text-[#2563EB]' : 'text-gray-500'}>{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

function ImageGenDemo() {
  const [prompt, setPrompt] = useState('A futuristic autonomous vehicle driving through a neon-lit cyberpunk city');
  const [size, setSize] = useState<'1024x1024' | '2048x2048' | '4096x4096'>('1024x1024');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setImageUrl(null);
    try {
      const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
          // Note: The SDK might not explicitly support size parameter yet, but we provide the affordance as requested.
        }
      });
      if (response.generatedImages && response.generatedImages.length > 0) {
        setImageUrl(`data:image/jpeg;base64,${response.generatedImages[0].image.imageBytes}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col h-full">
      <h3 className="text-xl font-serif text-white mb-2">Generate High-Quality Images</h3>
      <p className="text-sm text-gray-400 mb-6">Powered by Imagen 3</p>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe an image..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#2563EB]/50"
        />
        <select 
          value={size} 
          onChange={(e) => setSize(e.target.value as any)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#2563EB]/50"
        >
          <option value="1024x1024">1K (1024x1024)</option>
          <option value="2048x2048">2K (2048x2048)</option>
          <option value="4096x4096">4K (4096x4096)</option>
        </select>
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Generate
        </button>
      </div>

      <div className="flex-1 bg-[#0A0A12] border border-white/5 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
            <span className="text-sm">Generating {size} image...</span>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Generated" className="w-full h-full object-contain" />
        ) : (
          <div className="text-gray-600 text-sm flex flex-col items-center gap-2">
            <ImageIcon className="w-8 h-8 opacity-50" />
            <span>Your generated image will appear here</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ImageEditDemo() {
  const [prompt, setPrompt] = useState('A cute robot mascot');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setImageUrl(null);
    try {
      const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1'
        }
      });
      if (response.generatedImages && response.generatedImages.length > 0) {
        setImageUrl(`data:image/jpeg;base64,${response.generatedImages[0].image.imageBytes}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col h-full">
      <h3 className="text-xl font-serif text-white mb-2">Create & Edit Images</h3>
      <p className="text-sm text-gray-400 mb-6">Powered by Imagen 3</p>
      
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe an image to create or edit..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#2563EB]/50"
        />
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit3 className="w-4 h-4" />}
          Create
        </button>
      </div>

      <div className="flex-1 bg-[#0A0A12] border border-white/5 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
            <span className="text-sm">Creating image...</span>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Generated" className="w-full h-full object-contain" />
        ) : (
          <div className="text-gray-600 text-sm flex flex-col items-center gap-2">
            <ImageIcon className="w-8 h-8 opacity-50" />
            <span>Your image will appear here</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function VideoDemo() {
  const [prompt, setPrompt] = useState('Animate this image into a cinematic video');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setVideoUrl(null);
    try {
      let contents: any[] = [{ text: prompt }];

      if (imageFile) {
        const base64Data = imagePreview?.split(',')[1];
        if (base64Data) {
          contents.unshift({
            inlineData: {
              data: base64Data,
              mimeType: imageFile.type
            }
          });
        }
      }

      const config: any = {
        aspectRatio: '16:9',
        personGeneration: 'ALLOW_ADULT'
      };

      if (imageFile) {
        const base64Data = imagePreview?.split(',')[1];
        if (base64Data) {
          config.sourceImage = {
            imageBytes: base64Data,
            mimeType: imageFile.type
          };
        }
      }

      const response: any = await ai.models.generateVideos({
        model: 'veo-2.0-generate-001',
        prompt: prompt,
        config
      });
      if (response.generatedVideos && response.generatedVideos.length > 0) {
        setVideoUrl(`data:video/mp4;base64,${response.generatedVideos[0].video.videoBytes}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col h-full">
      <h3 className="text-xl font-serif text-white mb-2">Animate Images into Video</h3>
      <p className="text-sm text-gray-400 mb-6">Powered by Veo 2</p>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Upload className="w-4 h-4" />
          {imageFile ? 'Change Image' : 'Upload Image'}
        </button>
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the animation..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#2563EB]/50"
        />
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
          Generate
        </button>
      </div>

      <div className="flex-1 bg-[#0A0A12] border border-white/5 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px] relative">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-500 z-10">
            <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
            <span className="text-sm text-center">Generating video...<br/>This may take a minute.</span>
          </div>
        ) : videoUrl ? (
          <video src={videoUrl} autoPlay loop controls className="w-full h-full object-contain" />
        ) : imagePreview ? (
          <img src={imagePreview} alt="Preview" className="w-full h-full object-contain opacity-50" />
        ) : (
          <div className="text-gray-600 text-sm flex flex-col items-center gap-2">
            <Video className="w-8 h-8 opacity-50" />
            <span>Upload an image and generate a video</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function AnalyzeDemo() {
  const [prompt, setPrompt] = useState('Analyze this image and describe what you see in detail.');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !imageFile || isLoading) return;
    setIsLoading(true);
    setResponse(null);
    try {
      const base64Data = imagePreview?.split(',')[1];
      if (!base64Data) throw new Error("No image data");

      const result = await ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { data: base64Data, mimeType: imageFile.type } },
              { text: prompt }
            ]
          }
        ]
      });
      setResponse(result.text);
    } catch (error) {
      console.error(error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col h-full">
      <h3 className="text-xl font-serif text-white mb-2">Analyze Images</h3>
      <p className="text-sm text-gray-400 mb-6">Powered by Gemini 1.5 Pro</p>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Upload className="w-4 h-4" />
          {imageFile ? 'Change Image' : 'Upload Image'}
        </button>
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question about the image..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#2563EB]/50"
        />
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim() || !imageFile}
          className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ScanSearch className="w-4 h-4" />}
          Analyze
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-[300px]">
        <div className="flex-1 bg-[#0A0A12] border border-white/5 rounded-xl overflow-hidden flex items-center justify-center">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
          ) : (
            <div className="text-gray-600 text-sm flex flex-col items-center gap-2">
              <ImageIcon className="w-8 h-8 opacity-50" />
              <span>Upload an image to analyze</span>
            </div>
          )}
        </div>
        <div className="flex-1 bg-[#0A0A12] border border-white/5 rounded-xl p-6 overflow-y-auto max-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
              <span className="text-sm">Analyzing image...</span>
            </div>
          ) : response ? (
            <div className="prose prose-invert prose-sm max-w-none">
              <Markdown>
                {response}
              </Markdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 text-sm gap-2">
              <ScanSearch className="w-8 h-8 opacity-50" />
              <span>Analysis results will appear here</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ThinkingDemo() {
  const [prompt, setPrompt] = useState('Explain the architecture of a scalable AI receptionist system.');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-pro-preview-06-05',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          }
        }
      });
      setResponse(result.text);
    } catch (error) {
      console.error(error);
      alert('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col h-full">
      <h3 className="text-xl font-serif text-white mb-2">Advanced Reasoning</h3>
      <p className="text-sm text-gray-400 mb-6">Powered by Gemini 2.5 Pro with Thinking Mode</p>
      
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a complex question..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#2563EB]/50"
        />
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
          Think
        </button>
      </div>

      <div className="flex-1 bg-[#0A0A12] border border-white/5 rounded-xl p-6 overflow-y-auto min-h-[300px] max-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
            <span className="text-sm">Thinking deeply...</span>
          </div>
        ) : response ? (
          <div className="prose prose-invert prose-sm max-w-none">
            <Markdown>
              {response}
            </Markdown>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 text-sm gap-2">
            <BrainCircuit className="w-8 h-8 opacity-50" />
            <span>Ask a complex question to see advanced reasoning in action</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
