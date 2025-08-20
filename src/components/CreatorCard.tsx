import { Link, Links } from "react-router-dom";
import { Pencil,Info } from 'lucide-react';
type Creator = {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL?: string | null;
};

export default function CreatorCard({ c }: { c: Creator }) {
  return (
    <article style={{
      padding: '2rem',
      margin: '1rem',
      width: '370px',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.2s ease',
      boxShadow: '0 5px 6px rgba(76, 180, 255, 0.1)',
      position: 'relative',
      backgroundImage: c.imageURL ? `url(${c.imageURL})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      
    }}>
     
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        
      }} />
      
      
      <div style={{ position: 'relative'}}>
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: '.5rem',

        }}>
          <div style={{
            display: "flex",
          }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>{c.name}</h3>
              <div style={{display: "flex",
                marginLeft: 'auto',
                gap: 6
              }}>
                <Link to={`/view-creator/${c.id}`}><Info /></Link>
                <Link to={`/edit-creator/${c.id}`}><Pencil/></Link>
              </div>

          </div>
          <a href={c.url} target="_blank" style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            {c.url}
          </a>
        </div>
        <span style={{fontSize: '15px', fontWeight: 600}}>Description:</span>
        <div style={{
          overflow: 'auto',
          background: 'rgba(94, 94, 94, 0.2)', 
          borderRadius: '12px',               
          padding: '0.5rem'
        }}>
          <p>{c.description}</p>
        </div>
      </div>
    </article>
  );
}