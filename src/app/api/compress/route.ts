import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import multer from "multer";
import { writeFile, unlink } from "fs/promises";
import path from "path";

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

export async function POST(req: NextRequest) {
    try {
        // Extract file from formData
        const formData = await req.formData();
        const file = formData.get("image") as File;
        const quality = parseFloat(formData.get("quality") as string) || 0.7;
        const width = parseInt(formData.get("width") as string) || 800;
        const format = formData.get("format") as string || "jpeg";

        if (!file) return NextResponse.json({ error: "No image uploaded" }, { status: 400 });

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const outputFileName = `compressed.${format}`;
        const outputPath = path.join("/tmp", outputFileName);

        // Compress and save the image
        await sharp(fileBuffer)
            .resize({ width })
            .toFormat(format, { quality: quality * 100 })
            .toFile(outputPath);

        const compressedBuffer = await readFile(outputPath);
        await unlink(outputPath); // Delete the temporary file

        return new NextResponse(compressedBuffer, {
            headers: {
                "Content-Type": `image/${format}`,
                "Content-Disposition": `attachment; filename=${outputFileName}`,
            },
        });
    } catch (error) {
        console.error("Compression Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
