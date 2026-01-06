import { Travel } from "@/utils/types/Travel";
import { adaptApiTravelToFrontend, ApiTravel } from "@/utils/adapters/travelAdapter";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-backend-azure-one.vercel.app';

export async function fetchAllTravels(): Promise<Travel[]> {
  try {
    const response = await fetch(`${API_URL}/api/travels/all`);
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((apiTravel: ApiTravel) => 
        adaptApiTravelToFrontend(apiTravel)
      );
    }
    return [];
  } catch (error) {
    console.error('Error fetching travels:', error);
    return [];
  }
}

export async function fetchTravelStats() {
  try {
    const response = await fetch(`${API_URL}/api/travels/stats`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}