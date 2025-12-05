// 从环境变量读取 Key
const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const BASE_URL = "https://api.elevenlabs.io/v1";

// 安全检查
if (!API_KEY) {
  console.warn("Missing VITE_ELEVENLABS_API_KEY in .env file");
}

export const textToSpeech = async (text: string, voiceId: string) => {
  if (!API_KEY) return null; // 没有 Key 就不执行

  try {
    const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.4, // 稍微调低一点，让声音更有感情波动
          similarity_boost: 0.8
        }
      }),
    });

    if (!response.ok) throw new Error("ElevenLabs API Error");

    return await response.blob();
  } catch (error) {
    console.error(error);
    return null;
  }
};