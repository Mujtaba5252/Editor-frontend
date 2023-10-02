import { useCallback, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import Quill from "quill";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Button, Stack } from "@mui/material";
const TextEditor = () => {
  const navigate = useNavigate();

  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  //////////////////
  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  //for loading document
  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);
  //for socket connection
  useEffect(() => {
    const s = io("https://editor-backend-a78cd66ab850.herokuapp.com");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  //for receiving changes
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  //for sending changes
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill?.on("text-change", handler);
    return () => {
      quill?.off("text-change", handler);
    };
  }, [socket, quill]);

  //for creating new document
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    const TOOLBAR_OPTIONS = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ];
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.enable(false);
    q.setText("Loading...");
    setQuill(q);
  }, []);
  return (
    <>
      <Stack direction={"row"} justifyContent={"right"} my={1}>
        <Button
          sx={{
            backgroundColor: "rgb(4, 165, 240)",
          }}
          variant="contained"
          size={"small"}
          onClick={() => {
            navigate(`/documents/${uuidV4()}`);
          }}
        >
          NEW DOCUMENT
        </Button>
      </Stack>
      <div className="container" ref={wrapperRef}></div>;
    </>
  );
};

export default TextEditor;
