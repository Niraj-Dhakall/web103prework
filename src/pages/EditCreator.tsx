import type { FormEvent } from "react";
import { updateCreator } from "../api/creators";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCreator } from "../api/creators";
import { useNavigate } from "react-router-dom";
type Creator = {
  name: string;
  url: string;
  description: string;
  imageURL?: string | null;
};
export default function EditCreator() {
  const navigate = useNavigate()
  const [editCreator, setEditCreator] = useState<Creator>({
      name: '',
      url: '',
      description: '',
      imageURL: ''
    });
    
    const { id } = useParams();
    const strID = id?.toString()
    useEffect(()=>{
      async function getCurrentCreator(){
        const currentData = await getCreator(strID)
        
        setEditCreator(currentData)
      }
      getCurrentCreator();
    }, [strID])
    

  async function submit(e: FormEvent){
    e.preventDefault();
    try{
        const data = await updateCreator( strID,{
        name: editCreator.name,
        url: editCreator.url,
        description: editCreator.description,
        imageURL: editCreator.imageURL || null
      })
    }catch (e: any){
      
    }
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: "center",
      height: '100vh',
      width: '100vw'
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        marginTop: '2rem'
        
      }}>
        <form onSubmit={submit}>
          <h1>Add Creator</h1>
          <label> Name <input value={editCreator.name} onChange={(e) => setEditCreator({...editCreator, name: e.target.value})}></input></label>
          <label> URL <input value={editCreator.url} onChange={(e) => setEditCreator({...editCreator, url: e.target.value})}></input></label>
          <label> Description <textarea value={editCreator.description} onChange={(e) => setEditCreator({...editCreator, description: e.target.value})}></textarea></label>
          <label> Image URL (Optional) <input value= {editCreator.imageURL} onChange={(e) => setEditCreator({...editCreator,imageURL: e.target.value})}></input></label>
          
          <button type="submit">Update Creator</button>
          
        </form>
        <button  style= {{
          background: 'rgb(75, 39, 255)'
        }}onClick={() => navigate('/view-creators')}>View Creators</button>
      </div>
    </div>
  );
}