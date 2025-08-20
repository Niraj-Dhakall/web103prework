import { useEffect, useState } from "react";
import { getCreators } from "../api/creators";
import { useNavigate } from "react-router-dom";
import CreatorCard from "../components/CreatorCard";
import { Link } from "react-router-dom";
type Creator = {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL?: string | null;
};
export default function ShowCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
      try {
        const data = await getCreators();
        setCreators(data);
      } catch (e: any) {
        console.log(e.message ?? "Failed to load creators");
      } finally{
        setLoading(false)
      }
    })();
  }, []);
  const navigate = useNavigate();
  if(loading){
    return(
        <main className="container" style = {{minHeight: '60vh'}}>
            <div>
                <p style={{ margin: 0, opacity: 0.7 }}>Loading creators...</p>
            </div>
        </main>
    )
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
            <nav>
                <h1>All Creators</h1>
            </nav>

            {creators.length === 0 && <p>No creators yet. Add one!</p>}
                <button onClick={() => navigate('/add-creator')}>Add</button>
            <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            width: "100%",
            maxHeight: "70vh",
            overflowY: "auto",
            padding: "10px"
          }}>
            {creators.map(c => <CreatorCard key={c.id} c={c} />)}
          </div>
        </div>
      </div>
    </main>
  );
}
