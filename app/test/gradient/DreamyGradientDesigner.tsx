'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const DreamyGradientDesigner = () => {
  const [color1, setColor1] = useState('#ff9a9e');
  const [color2, setColor2] = useState('#fad0c4');
  const [blur, setBlur] = useState(40);
  const [shape, setShape] = useState(50);
  const [blobPath, setBlobPath] = useState('');

  const generateBlobPath = useCallback(() => {
    const centerX = 150;
    const centerY = 150;
    const radius = 100 - shape / 2;
    let d = `M${centerX},${centerY - radius} `;
    for (let i = 1; i <= 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const x = centerX + Math.sin(angle) * (radius + Math.random() * shape);
      const y = centerY - Math.cos(angle) * (radius + Math.random() * shape);
      d += `Q${centerX + Math.sin(angle) * radius * 1.5},${centerY - Math.cos(angle) * radius * 1.5} ${x},${y} `;
    }
    d += 'Z';
    setBlobPath(d);
  }, [shape]);

  useEffect(() => {
    generateBlobPath();
  }, [generateBlobPath]);

  useEffect(() => {
    const svg = document.getElementById('blob');
    if (svg) {
      svg.innerHTML = `
        <defs>
          <filter id="blurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="${blur}" />
          </filter>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:${color1}" />
            <stop offset="100%" style="stop-color:${color2}" />
          </radialGradient>
        </defs>
        <path d="${blobPath}" fill="url(#grad)" filter="url(#blurFilter)" />
      `;
    }
  }, [color1, color2, blur, blobPath]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dreamy Gradient Designer</h1>
      
      <svg id="blob" viewBox="50 50 200 200" className="w-full h-auto mb-4 border-2 border-red-500"></svg>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="color1">Color 1</Label>
          <Input
            id="color1"
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="color2">Color 2</Label>
          <Input
            id="color2"
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="blur">Blur: {blur}</Label>
          <Slider
            id="blur"
            min={0}
            max={100}
            step={1}
            value={[blur]}
            onValueChange={(value) => setBlur(value[0])}
          />
        </div>
        
        <div>
          <Label htmlFor="shape">Shape Randomness: {shape}</Label>
          <Slider
            id="shape"
            min={0}
            max={100}
            step={1}
            value={[shape]}
            onValueChange={(value) => setShape(value[0])}
          />
        </div>

        <Button onClick={generateBlobPath}>Regenerate Shape</Button>
      </div>
    </div>
  );
};

export default DreamyGradientDesigner;