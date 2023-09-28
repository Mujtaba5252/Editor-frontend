import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
// import { Button, Stack } from "@mui/material";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import "./skin.min.css";

const socket = io("https://editor-backend-a78cd66ab850.herokuapp.com"); // Replace with your server URL

const RealTimeEditor = () => {
  const { id: documentId } = useParams(); //for getting id from url
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("get-document", documentId);

    socket.on("load-document", (data) => {
      setContent(data);
    });

    socket.on("receive-changes", (delta) => {
      setContent(delta);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [documentId]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);

    // Send changes to the server
    socket.emit("send-changes", newContent);
  };

  useEffect(() => {
    if (content == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", content);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [content]);
  return (
    <div>
      <Typography
        variant="h5"
        align="center"
        fontWeight={900}
        fontFamily={"cursive"}
        color={"rgb(4, 165, 240)"}
      >
        REAL TIME EDITOR (TinyMce)
      </Typography>
      <Button
        sx={{
          backgroundColor: "rgb(4, 165, 240)",
          marginY: "10px",
        }}
        variant="contained"
        size={"small"}
        onClick={() => {
          navigate(`/documents/${uuidV4()}`);
        }}
      >
        NEW DOCUMENT
      </Button>
      <Editor
        apiKey="8eys9qzkllwr1xjv98n1d1e84oafgllcbd2fh56szndoywxm"
        value={content}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          placeholder:
            "Please write your text here...to see the real time changes",
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help| Share",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          setup: function (editor) {
            editor.ui.registry.addButton("Share", {
              text: "Share",
              tooltip: "share document",
              onAction: function () {
                // Generate the document URL (you may need to adjust this based on your routing)
                const documentURL = window.location.href;

                // Copy the URL to the clipboard
                navigator.clipboard
                  .writeText(documentURL)
                  .then(function () {
                    toast.success("Copied to clipboard!");
                  })
                  .catch(function (err) {
                    console.error("Failed to copy: ", err);
                  });
              },
            });
          },
        }}
      />
    </div>
  );
};

export default RealTimeEditor;
