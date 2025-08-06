const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
console.log('API Endpoint:', API_ENDPOINT);
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
