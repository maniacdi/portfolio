export interface CVUrls {
  es: string;
  en: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://portfolio-backend-azure-one.vercel.app";

export const cvService = {
  async getCVUrls(): Promise<CVUrls | null> {
    try {
      const response = await fetch(`${API_URL}/api/cv`);
      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching CV URLs:", error);
      return null;
    }
  },

  async downloadCV(lang: "es" | "en"): Promise<void> {
    try {
      // Use window.open to download the CV
      const cvUrls = await this.getCVUrls();
      if (cvUrls && cvUrls[lang]) {
        window.open(cvUrls[lang], "_blank");
      }
    } catch (error) {
      console.error("Error downloading CV:", error);
    }
  },

  async getPreviewUrl(lang: "es" | "en"): Promise<string | null> {
    try {
      const response = await fetch(`${API_URL}/api/cv/preview/${lang}`);
      const data = await response.json();

      if (data.success) {
        return data.url;
      }
      return null;
    } catch (error) {
      console.error("Error getting CV preview:", error);
      return null;
    }
  },
};
