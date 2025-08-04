//const API_ENDPOINT = "https://n8n-deploy-0voq.onrender.com/webhook/a8719fcd-367a-4d20-92e7-c47ff591f1cd";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
console.log('API Endpoint:', API_ENDPOINT);
console.log('API Endpoint:', import.meta.env.VITE_API_ENDPOINT);


export const submitResumeAnalysis = async (formData: FormData): Promise<any> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonArray = await response.json();

    if (!Array.isArray(jsonArray) || !jsonArray[0]) {
      throw new Error("Invalid response format from backend");
    }

    return jsonArray[0];
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
