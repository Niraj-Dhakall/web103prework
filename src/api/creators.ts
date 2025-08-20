import { supabase } from "../client";
type Creator = {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL?: string | null;
};


const creatorsTable = "creators";

export async function getCreators() {
  const { data, error } = await supabase.from(
    creatorsTable).select("*").order("name", 
    { ascending: true });
  if (error) throw error;
  return data as Creator[];
}

export async function getCreator(id: string){
    const {data, error} = await supabase.from(creatorsTable).select("name, url, description, imageURL").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function createCreator(payload: Omit<Creator, "id">): Promise<Creator> {
  const { data, error } = await supabase.from(creatorsTable).insert(payload).select().single();
  if (error) throw error;
  return data!;
}

export async function updateCreator(
    id: string,
    payload: Partial<Omit<Creator, "id">> // we don't want to update the id so omit it and make the rest of
                                            // the things partial

): Promise<Creator>{
    const {data, error} = await supabase.from(creatorsTable).update(payload).eq("id",id).select().single();
    if (error) throw error;
    return data;

}

export async function deleteCreator(
    id: string,
    
):Promise<void>{
    const {error} = await supabase.from(creatorsTable).delete().eq("id",id);
    if (error) throw error;
}