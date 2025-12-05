// ElevenLabs 配置
const API_KEY = import.meta.env.VITE_ELEVENLABS_KEY; // 需要在 .env 设置
const BASE_URL = "https://api.elevenlabs.io/v1";

// 1. 获取声音列表 (用于选择哪个声音是爷爷)
export const getVoices = async () => {
  const response = await fetch(`${BASE_URL}/voices`, {
    headers: { "xi-api-key": API_KEY }
  });
  return response.json();
};

// 2. 文本转语音 (核心功能 - 用于 Echo)
// text: AI 生成的回复
// voiceId: 克隆出来的爷爷声音 ID
export const textToSpeech = async (text: string, voiceId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2", // 支持中文/英文混合，更有感情
        voice_settings: {
          stability: 0.5, // 越低越有情感波动，越高越平稳
          similarity_boost: 0.8 // 越像原声
        }
      }),
    });

    if (!response.ok) throw new Error("ElevenLabs API Error");

    // 返回音频 Blob
    return await response.blob();
  } catch (error) {
    console.error(error);
    return null;
  }
};