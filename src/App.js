import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid, Paper, Box } from "@mui/material"; // Thêm Box

// Import các component
import TopBar from "./components/TopBar";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import UserPhotos from "./components/UserPhotos";

function App() {
  return (
    <Router>
      {/* Box ngoài cùng bao trọn toàn trang với nền xám nhạt */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Thanh TopBar trải dài 100% ở trên cùng */}
        <TopBar />

        {/* Khu vực chứa nội dung chính ở bên dưới TopBar */}
        <Box sx={{ padding: 3 }}>
          <Grid container spacing={3}>
            {/* Cột trái: Chiếm 3/12 màn hình (Sidebar) */}
            <Grid item={true ? 1 : undefined} xs={12}>
              <Paper elevation={3} sx={{ height: "100%" }}>
                <UserList />
              </Paper>
            </Grid>

            {/* Cột phải: Chiếm 9/12 màn hình (Nội dung) */}
            <Grid item={true ? 1 : undefined} xs={12}>
              <Paper elevation={3} sx={{ padding: "20px", minHeight: "80vh" }}>
                <Routes>
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  <Route
                    path="/"
                    element={
                      <h2>
                        Chào mừng đến với Photo Sharing App! Hãy chọn một người
                        dùng bên trái.
                      </h2>
                    }
                  />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
