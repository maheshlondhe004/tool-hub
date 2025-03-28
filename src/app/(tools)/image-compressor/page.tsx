"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    Box,
    Button,
    Typography,
    Container,
    Slider,
    Grid,
    CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";

export default function ImageCompressor() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [quality, setQuality] = useState(0.7);
    const [maxWidth, setMaxWidth] = useState(800);
    const [format, setFormat] = useState("jpeg");

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                setSelectedImage(acceptedFiles[0]);
                setCompressedUrl(null);
            }
        },
        accept: "image/*",
        maxFiles: 1,
    });

    const handleCompressImage = async () => {
        if (!selectedImage) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("quality", quality.toString());
        formData.append("width", maxWidth.toString());
        formData.append("format", format);

        try {
            const response = await fetch("/api/compress", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Compression failed");

            const blob = await response.blob();
            const compressedUrl = URL.createObjectURL(blob);
            setCompressedUrl(compressedUrl);
        } catch (error) {
            console.error("Compression Error:", error);
        }
        setLoading(false);
    };

    return (
        <Container>
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h4" fontWeight="bold">
                    Server-Side Image Compressor
                </Typography>
                <Typography variant="subtitle1" color="gray" sx={{ mb: 3 }}>
                    Drag & drop or select an image to compress via the server.
                </Typography>

                {/* Drag & Drop Upload */}
                <Box
                    {...getRootProps()}
                    sx={{
                        border: "2px dashed #1976d2",
                        p: 4,
                        borderRadius: 4,
                        cursor: "pointer",
                        mb: 3,
                        bgcolor: "#f5f5f5",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUploadIcon sx={{ fontSize: 50, color: "#1976d2" }} />
                    <Typography>Drag & Drop Image Here or Click to Upload</Typography>
                </Box>

                {/* Show Selected Image */}
                {selectedImage && (
                    <Typography color="gray">
                        {selectedImage.name} ({(selectedImage.size / 1024).toFixed(2)} KB)
                    </Typography>
                )}

                {/* Quality Slider */}
                <Typography gutterBottom>Quality</Typography>
                <Slider
                    value={quality}
                    min={0.1}
                    max={1}
                    step={0.1}
                    onChange={(e, newValue) => setQuality(newValue as number)}
                    valueLabelDisplay="auto"
                />

                {/* Max Width Slider */}
                <Typography gutterBottom>Max Width (px)</Typography>
                <Slider
                    value={maxWidth}
                    min={100}
                    max={1920}
                    step={100}
                    onChange={(e, newValue) => setMaxWidth(newValue as number)}
                    valueLabelDisplay="auto"
                />

                {/* Compress Button */}
                {selectedImage && (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleCompressImage}
                        disabled={loading}
                        sx={{ mt: 3 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Compress Image"}
                    </Button>
                )}

                {/* Show Compressed Image */}
                {compressedUrl && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6">Compressed Image:</Typography>
                        <img src={compressedUrl} alt="Compressed" style={{ maxWidth: "100%" }} />
                        <a href={compressedUrl} download="compressed-image">
                            <Button variant="outlined" sx={{ mt: 2 }} startIcon={<DownloadIcon />}>
                                Download Compressed Image
                            </Button>
                        </a>
                    </Box>
                )}
            </Box>
        </Container>
    );
}
