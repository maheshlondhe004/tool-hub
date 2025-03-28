"use client";

import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";
import ImageIcon from "@mui/icons-material/Image";
import BrushIcon from "@mui/icons-material/Brush";
import TableChartIcon from "@mui/icons-material/TableChart";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

const tools = [
  { name: "Image Compressor", path: "/image-compressor", icon: <ImageIcon sx={{ fontSize: 50, color: "#ff6f00" }} /> },
  { name: "Background Removal", path: "/background-removal", icon: <BrushIcon sx={{ fontSize: 50, color: "#1976d2" }} /> },
  { name: "Excel to CSS", path: "/excel-to-css", icon: <TableChartIcon sx={{ fontSize: 50, color: "#2e7d32" }} /> },
  { name: "Video to MP3", path: "/video-to-mp3", icon: <AudiotrackIcon sx={{ fontSize: 50, color: "#d32f2f" }} /> },
];

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5", // White background
        color: "#333",
        textAlign: "center",
        p: 3,
      }}
    >
      <Container>
        {/* Header */}
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
          Online Tool Hub
        </Typography>
        <Typography variant="h5" sx={{ mb: 5, opacity: 0.7 }}>
          A collection of powerful online tools to make your work easier!
        </Typography>

        {/* Tool Cards */}
        <Grid container spacing={3} justifyContent="center">
          {tools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.name}>
              <Link href={tool.path} passHref>
                <Card
                  sx={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    textAlign: "center",
                    p: 3,
                    transition: "0.3s",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                    },
                    cursor: "pointer",
                  }}
                >
                  <CardContent>
                    {tool.icon}
                    <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
                      {tool.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
