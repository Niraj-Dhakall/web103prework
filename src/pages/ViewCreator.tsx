import { ChevronLeft, Link2 } from "lucide-react";
import { getCreator } from "../api/creators";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteCreator } from "../api/creators";

type Creator = {
  name: string;
  url: string;
  description: string;
  imageURL?: string | null;
};

export default function ViewCreator() {
  const [creator, setCreator] = useState<Creator>({
    name: "",
    url: "",
    description: "",
    imageURL: ""
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  
  async  function delCreator(){
   try{
    deleteCreator(id?.toString())
    navigate('/show-creators')
   }catch(e){

   }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCreator(id?.toString());
        setCreator(data);
      } catch (e) {
        console.log("error VC27");
      }
    }
    fetchData();
    
  }, [id]);
  
  return (
    <main
      style={{
        minHeight: "100vh",
        width: '100vw',

      }}
    >
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "3rem 1rem"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifySelf: "center",
            background: "rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)"
          }}
        >
         <button
        style={{
          background: "transparent",
          border: "transparent",
          height: "32px", 
          width: "115px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px", 
          marginTop: "1rem",
          color: "white",
        }}
        onClick={() => navigate("/show-creators")}
      >
        <ChevronLeft />
        Back
      </button>
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.08)"
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                letterSpacing: "0.2px",
                fontWeight: 600
              }}
            >
              
              {creator.name ? `${creator.name}'s Profile` : "Creator Profile"}
            </h3>
            <p style={{ margin: "0.25rem 0 0", color: "#9ca3af", fontSize: 14 }}>
              Bio, image and links
            </p>
          </div>

          
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.25rem",
              padding: "1.25rem 1.5rem",
              flexWrap: "wrap"
            }}
          >
            
            {creator.imageURL ? (
              <img
                src={creator.imageURL}
                alt={`${creator.name} profile`}
                style={{
                  height: 260,
                  width: 260,
                  objectFit: "cover",
                  borderRadius: "16px",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.45)",
                  border: "1px solid rgba(58,206,255,0.25)"
                }}
              />
            ) : (
              <div
                style={{
                  height: 260,
                  width: 260,
                  borderRadius: "16px",
                  border: "1px dashed rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14
                }}
              >
                No image
              </div>
            )}
            <div>
              <p
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1rem 1rem",
                  lineHeight: 1.6,
                  marginTop: 4,
                  color: "#e5e7eb"
                }}
              >
                {creator.description?.trim()
                  ? creator.description
                  : "No description."}
              </p>

              
              <div style={{ marginTop: "1.25rem" }}>
                <h2
                  style={{
                    margin: 0,
                    marginBottom: "0.5rem",
                    fontSize: "1.125rem",
                    fontWeight: 600
                  }}
                >
                  {`${creator.name}'s Links:`}
                </h2>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(0, 153, 255, 0.10)",
                    border: "1px solid rgba(0,153,255,0.25)",
                    borderRadius: 10,
                    padding: "0.5rem 0.75rem"
                  }}
                >
                  <Link2 size={18} />
                  {creator.url ? (
                    <a
                      href={creator.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{
                        color: "#7dd3fc",
                        textDecoration: "none",
                        wordBreak: "break-all"
                      }}
                    >
                      {creator.url}
                    </a>
                  ) : (
                    <span style={{ color: "#9ca3af" }}>No link provided</span>
                  )}
                </div>
              </div>

              <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
                <button
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    
                  }}
                  onClick={() => navigate(`/edit-creator/${id}`)}
                >
                  Edit Profile
                </button>
                <button
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: 10,
                    border: "1px solid rgba(239,68,68,0.35)",
                    background: "red"
                  }}
                   onClick={() => {
                  if (!confirmingDelete) {
                    setConfirmingDelete(true);
                    setTimeout(() => setConfirmingDelete(false), 3000);
                  } else {
                    delCreator()
                    setConfirmingDelete(false);
                  }
                }}
                >
                 {confirmingDelete ? "Are you sure?" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
