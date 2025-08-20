import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCreator } from "../api/creators";
import type { FormEvent } from "react";
type Creator = {
  name: string;
  url: string;
  description: string;
  imageURL?: string | null;
};


export default function AddCreator() {

  const navigate = useNavigate();
  const [addCreator, setAddCreator] = useState<Creator>({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [err, setErr] = useState("")
  async function submit(e: FormEvent){
  e.preventDefault();
  try{
      const data = await createCreator({
      name: addCreator.name,
      url: addCreator.url,
      description: addCreator.description,
      imageURL: addCreator.imageURL || null
    })
  }catch (e: any){
    setErr(e.message ?? "could not create")
  }
}

  

  
  return (
   <main className="container">
      <div style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}>
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center'
        }}>
        <form onSubmit={submit}>
          <h1>Add Creator</h1>
          <label> Name <input placeholder="Name" onChange={(e) => setAddCreator({...addCreator, name: e.target.value})}></input></label>
          <label> URL <input placeholder="Creator's URL" onChange={(e) => setAddCreator({...addCreator, url: e.target.value})}></input></label>
          <label> Description <textarea placeholder="Description" onChange={(e) => setAddCreator({...addCreator, description: e.target.value})}></textarea></label>
          <label> Image URL (Optional) <input placeholder="Image URL" onChange={(e) => setAddCreator({...addCreator,imageURL: e.target.value})}></input></label>
          {err && <p>{err}</p>}
          <button type="submit">Add Creator</button>
          
        </form>
        <button onClick={() => navigate('/view-creators')}>View Creators</button>
        
        
        </div>
      </div>
    </main>
    
     
  );
}