import { client } from "@/apis/client";
import { urls } from "@/apis/urls";
import { IAllCategories, ICategories } from "@/types/categories/categories";


export const fetchAddCategories = async (name: string): Promise< ICategories | undefined> => {
    try {
      const response = await client.post(urls.categories.all, {
        name : name
      });
      return response.data
    } catch (error) {
      console.log(error);
    }
  };

  export const fetchAllCategories = async (): Promise<{ _id: string; name: string; icon: string; createdAt: string; updatedAt: string; slugname: string; }[]> => {
    try {
      const response = await client.get<IAllCategories>(urls.categories.all);
      return response.data.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };
  
  


  export const fetchCategoriesById = async (id : string) => {
    try {
        const response = await client.get<ICategories>(urls.categories.byId(id))
        return response.data.data.category.name
    } catch (error) {
        console.log(error);
    }
  }