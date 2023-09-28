import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
const LandingPage = () => {
  console.log("Hello");
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/documents/${uuidV4()}`);
    return () => {};
  }, []);
  return (
    <div>
      {/* <Button
        variant="contained"
        onClick={() => {
          navigate(`/documents/${uuidV4()}`);
        }}
      >
        Hello
      </Button> */}
    </div>
  );
};

export default LandingPage;
