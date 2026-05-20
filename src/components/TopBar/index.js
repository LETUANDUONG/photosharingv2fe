import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";

const BACKEND_URL = "https://nrklg2-8081.csb.app";

function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const viewType = pathParts[1];
    const userId = pathParts[2];

    if (userId) {
      fetchModel(`${BACKEND_URL}/user/${userId}`)
        .then((user) => {
          const fullName = user.first_name
            ? `${user.first_name} ${user.last_name}`
            : user.last_name;
          if (viewType === "users") {
            setContextText(fullName);
          } else if (viewType === "photos") {
            setContextText(`Photos of ${fullName}`);
          }
        })
        .catch((err) => {
          console.error("Lỗi tải ngữ cảnh TopBar:", err);
          setContextText("");
        });
    } else {
      setContextText("Photo Sharing App");
    }
  }, [location]);

  return (
    // Dùng position="static" để TopBar không bị đè lên nội dung bên dưới
    <AppBar position="static">
      <Toolbar>
        {/* flexGrow: 1 giúp phần này đẩy phần tử tiếp theo ra tận cùng bên phải */}
        <Typography
          variant="h6"
          color="inherit"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Lê Tuấn Dương
        </Typography>

        {/* Phần ngữ cảnh (Photos of...) nằm ở góc phải */}
        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
