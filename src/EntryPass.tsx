import React, { useRef, useEffect, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import jsPDF from "jspdf";

interface EntryPassProps {
  childName: string;
  age: string;
  parentName: string;
  phone: string;
  area: string;
  onRegisterAnother: () => void;
}

function generatePassId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "SC26-";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPass(canvas: HTMLCanvasElement, data: EntryPassProps & { passId: string }, logoImg: HTMLImageElement | undefined, qrImg: HTMLImageElement | undefined) {
  const ctx = canvas.getContext("2d")!;
  const W = 1000;
  const H = 600;
  canvas.width = W;
  canvas.height = H;
  ctx.clearRect(0, 0, W, H);

  // --- Card background with light gradient (like poster) ---
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#e8f4f8");   // very light blue
  grad.addColorStop(0.5, "#f0f7fa"); // lighter
  grad.addColorStop(1, "#e0eef5");   // light blue-gray
  drawRoundedRect(ctx, 0, 0, W, H, 40);
  ctx.fillStyle = grad;
  ctx.fill();

  // --- Mountain silhouette at bottom (like poster) ---
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = "#1e3a8a"; // dark blue
  
  // Draw layered mountains
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, H - 120);
  for (let i = 0; i < 15; i++) {
    const x = i * 70;
    const peakHeight = H - 120 - Math.random() * 60;
    ctx.lineTo(x, peakHeight);
    ctx.lineTo(x + 35, H - 100);
  }
  ctx.lineTo(W - 220, H);
  ctx.closePath();
  ctx.fill();
  
  // Draw trees silhouette
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 20; i++) {
    const x = i * 50 + Math.random() * 20;
    const treeHeight = 40 + Math.random() * 30;
    ctx.beginPath();
    ctx.moveTo(x, H);
    ctx.lineTo(x + 5, H - treeHeight);
    ctx.lineTo(x + 10, H);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // --- Decorative dots pattern (top left) ---
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = "#84cc16"; // lime green
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      ctx.beginPath();
      ctx.arc(35 + col * 14, 35 + row * 14, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  // --- Decorative wave/curve (left side) ---
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "#84cc16";
  ctx.beginPath();
  ctx.moveTo(0, 180);
  ctx.quadraticCurveTo(60, 230, 35, 290);
  ctx.quadraticCurveTo(15, 350, 45, 410);
  ctx.lineTo(0, 410);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // --- Dotted tear line ---
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = "rgba(100,116,139,0.25)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W - 220, 40);
  ctx.lineTo(W - 220, H - 40);
  ctx.stroke();
  ctx.setLineDash([]);

  // --- Left section (main info) ---
  // Torch logo (top left) - draw or use image
  const torchX = 50;
  const torchY = 60;
  
  if (logoImg) {
    // Draw the actual logo image
    ctx.save();
    ctx.drawImage(logoImg, torchX, torchY, 70, 70);
    ctx.restore();
  } else {
    // Fallback: Draw torch base (blue circle with star)
    ctx.fillStyle = "#1e40af"; // dark blue
    ctx.beginPath();
    ctx.arc(torchX + 35, torchY + 35, 35, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw yellow star in center
    ctx.fillStyle = "#fbbf24";
    ctx.font = "36px serif";
    ctx.textAlign = "center";
    ctx.fillText("⭐", torchX + 35, torchY + 46);
    
    // Draw flame on top
    ctx.font = "42px serif";
    ctx.fillText("🔥", torchX + 35, torchY + 10);
  }
  
  ctx.textAlign = "start";

  // Title text - Urdu (smaller, positioned better)
  ctx.fillStyle = "#64748b"; // slate gray
  ctx.font = "bold 13px 'Fredoka', sans-serif";
  ctx.letterSpacing = "1.5px";
  ctx.fillText("شاہیں کی طرح پرواز کر بلندی کا خواب دیکھ", 145, 70);
  ctx.letterSpacing = "0px";

  // SUMMER CAMP title (large, professional)
  ctx.fillStyle = "#1e3a8a"; // dark blue
  ctx.font = "800 72px 'Fredoka', sans-serif";
  ctx.fillText("SUMMER", 145, 145);

  ctx.fillStyle = "#84cc16"; // lime green
  ctx.font = "800 72px 'Fredoka', sans-serif";
  ctx.fillText("CAMP", 460, 145); // Reduced gap from 500 to 460

  // 2026 - positioned inline with better styling
  ctx.fillStyle = "#1e3a8a"; // dark blue
  ctx.font = "800 36px 'Fredoka', sans-serif";
  ctx.fillText("2026", 145, 190);

  // --- English Tagline (better positioned, single line) ---
  ctx.fillStyle = "#84cc16"; // lime green
  ctx.font = "italic 600 19px 'Fredoka', sans-serif";
  ctx.fillText("Dare to Explore, Learn to Lead!", 145, 220);

  // --- Camper details (professional registration card style) ---
  const labelStyle = () => {
    ctx.fillStyle = "#84cc16"; // lime green
    ctx.font = "700 12px 'Fredoka', sans-serif";
    ctx.letterSpacing = "1px";
  };
  const valueStyle = () => {
    ctx.fillStyle = "#1e293b"; // dark slate
    ctx.font = "700 24px 'Fredoka', sans-serif";
  };

  // Separator line
  ctx.strokeStyle = "rgba(132, 204, 22, 0.2)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 260);
  ctx.lineTo(760, 260);
  ctx.stroke();

  // Row 1 - Camper Name (full width)
  labelStyle(); 
  ctx.fillText("CAMPER NAME", 60, 295);
  ctx.letterSpacing = "0px";
  valueStyle(); 
  ctx.fillText(data.childName.toUpperCase(), 60, 325);

  // Row 2 — two cols (Age and Guardian)
  labelStyle(); 
  ctx.fillText("AGE", 60, 375);
  ctx.letterSpacing = "0px";
  valueStyle(); 
  ctx.fillText(data.age + " Years", 60, 405);

  labelStyle(); 
  ctx.fillText("GUARDIAN", 320, 375);
  ctx.letterSpacing = "0px";
  valueStyle(); 
  ctx.fillText(data.parentName.toUpperCase(), 320, 405);

  // Row 3 — two cols (Phone and Area)
  labelStyle(); 
  ctx.fillText("PHONE", 60, 455);
  ctx.letterSpacing = "0px";
  valueStyle(); 
  ctx.fillText(data.phone, 60, 485);

  labelStyle(); 
  ctx.fillText("AREA", 420, 455);
  ctx.letterSpacing = "0px";
  valueStyle(); 
  ctx.fillText(data.area.toUpperCase(), 420, 485);

  // --- Venue information at bottom (professional style) ---
  ctx.fillStyle = "rgba(132, 204, 22, 0.08)"; // very light lime green
  drawRoundedRect(ctx, 40, 525, 740, 50, 15);
  ctx.fill();
  
  // Add border
  ctx.strokeStyle = "rgba(132, 204, 22, 0.2)";
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 40, 525, 740, 50, 15);
  ctx.stroke();
  
  ctx.fillStyle = "#84cc16";
  ctx.font = "bold 12px 'Fredoka', sans-serif";
  ctx.fillText("📍 VENUE: Rose Garden & Fahad Lawn (Day 1) • Farm House (Day 2)", 60, 548);
  
  ctx.fillStyle = "#64748b";
  ctx.font = "600 12px 'Fredoka', sans-serif";
  ctx.fillText("⏰ 20-21 June 2026 • 8:00 AM onwards", 60, 565);

  // --- Right stub (Pass ID) ---
  const stubX = W - 200;

  // Draw torch on stub (top)
  ctx.textAlign = "center";
  
  if (logoImg) {
    // Draw the actual logo image on stub
    ctx.save();
    ctx.drawImage(logoImg, stubX + 65, 50, 70, 70);
    ctx.restore();
  } else {
    // Fallback: Draw torch
    ctx.fillStyle = "#1e40af";
    ctx.beginPath();
    ctx.arc(stubX + 100, 90, 32, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#fbbf24";
    ctx.font = "32px serif";
    ctx.fillText("⭐", stubX + 100, 102);
    
    ctx.font = "38px serif";
    ctx.fillText("🔥", stubX + 100, 70);
  }

  // Summer Camp text on stub (professional style)
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "800 22px 'Fredoka', sans-serif";
  ctx.fillText("SUMMER", stubX + 100, 155);
  
  ctx.fillStyle = "#84cc16";
  ctx.font = "800 22px 'Fredoka', sans-serif";
  ctx.fillText("CAMP", stubX + 100, 180);
  
  ctx.fillStyle = "#1e293b";
  ctx.font = "800 18px 'Fredoka', sans-serif";
  ctx.fillText("2026", stubX + 100, 202);

  // Pass ID section (professional style)
  ctx.fillStyle = "#84cc16";
  ctx.font = "bold 11px 'Fredoka', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("PASS ID", stubX + 100, 235);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = "#1e293b";
  ctx.font = "800 14px 'Fredoka', sans-serif";
  ctx.fillText(data.passId, stubX + 100, 255);

  // QR Code (larger size with border)
  if (qrImg) {
    ctx.save();
    // White background with border for QR
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(stubX + 40, 275, 120, 120);
    
    // Border
    ctx.strokeStyle = "rgba(30, 41, 59, 0.1)";
    ctx.lineWidth = 2;
    ctx.strokeRect(stubX + 40, 275, 120, 120);
    
    // Draw QR code
    ctx.drawImage(qrImg, stubX + 45, 280, 110, 110);
    ctx.restore();
  } else {
    // QR Code placeholder if image fails to load
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(stubX + 45, 280, 110, 110);
  }
  
  // QR Code label (professional style)
  ctx.fillStyle = "#84cc16";
  ctx.font = "bold 10px 'Fredoka', sans-serif";
  ctx.letterSpacing = "1px";
  ctx.fillText("SCAN FOR", stubX + 100, 415);
  ctx.fillText("WEBSITE", stubX + 100, 430);
  ctx.letterSpacing = "0px";

  // Decorative dots on stub (3x3 grid) - professional style
  ctx.fillStyle = "rgba(132, 204, 22, 0.25)";
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      ctx.beginPath();
      ctx.arc(stubX + 75 + col * 18, 460 + row * 18, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Barcode-like decoration at bottom (professional style)
  ctx.fillStyle = "rgba(30, 41, 59, 0.12)";
  for (let i = 0; i < 28; i++) {
    const bw = i % 3 === 0 ? 3 : 2;
    const bh = i % 2 === 0 ? 38 : 32;
    ctx.fillRect(stubX + 35 + i * 6, H - 65, bw, bh);
  }

  ctx.textAlign = "start";
}

const EntryPass: React.FC<EntryPassProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [passId] = useState(generatePassId);
  const [logo, setLogo] = useState<HTMLImageElement | null | undefined>(null);
  const [qrCode, setQrCode] = useState<HTMLImageElement | null | undefined>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/logo.png";
    img.onload = () => setLogo(img);
    img.onerror = () => setLogo(undefined);
  }, []);

  useEffect(() => {
    const qr = new Image();
    qr.src = "/qrcode_348894120_e09e7acbbc4f709fe6887e73935fd0ad.png";
    qr.onload = () => setQrCode(qr);
    qr.onerror = () => setQrCode(undefined);
  }, []);

  useEffect(() => {
    if (canvasRef.current && logo !== null && qrCode !== null) {
      // Load Fredoka font before drawing
      document.fonts.ready.then(() => {
        drawPass(canvasRef.current!, { ...props, passId }, logo, qrCode);
      });
    }
  }, [props, passId, logo, qrCode]);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

      // Manually trigger download to ensure proper filename
      const filename = `SummerCamp_Pass_${props.childName ? props.childName.replace(/\s+/g, "_") : "Camper"}.pdf`;
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);

    } catch (e) {
      console.error("Failed to generate PDF:", e);
      alert("Failed to generate PDF. If you are using a browser that blocks canvas data extraction, please try another browser.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] text-center shadow-2xl border-2 sm:border-4 border-sky-100"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <span className="text-3xl sm:text-4xl">🎉</span>
      </div>
      <h3 className="text-2xl sm:text-3xl font-playful font-black text-sky-900 mb-2 uppercase">
        Registration Successful!
      </h3>
      <p className="text-sky-600 font-bold text-base sm:text-lg mb-6 sm:mb-8">
        Your entry pass has been generated. Download it below!
      </p>

      {/* Pass preview */}
      <div className="overflow-x-auto pb-4 mb-6 sm:mb-8">
        <canvas
          ref={canvasRef}
          className="mx-auto rounded-xl sm:rounded-2xl shadow-xl"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-orange-500 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl font-playful font-black uppercase tracking-widest shadow-[0_6px_0_rgb(194,65,12)] sm:shadow-[0_8px_0_rgb(194,65,12)] hover:bg-orange-400 active:translate-y-1 active:shadow-none transition-all"
        >
          <Download className="w-5 h-5 sm:w-6 sm:h-6" />
          Download Pass
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={props.onRegisterAnother}
          className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-sky-100 text-sky-700 px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-playful font-black uppercase tracking-widest hover:bg-sky-200 transition-all"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          Register Another
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EntryPass;
