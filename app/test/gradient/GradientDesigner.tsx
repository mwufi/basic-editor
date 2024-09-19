'use client'
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const GradientDesigner = () => {
  const [color1, setColor1] = useState('#ff9a9e');
  const [color2, setColor2] = useState('#fad0c4');
  const [angle, setAngle] = useState(0);
  const [opacity, setOpacity] = useState(0.7);

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${color1}${Math.round(opacity * 255).toString(16)} 0%, ${color2}${Math.round(opacity * 255).toString(16)} 100%)`,
    width: '100%',
    height: '200px',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">CSS Gradient Designer</h1>

      <div style={gradientStyle}></div>

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
          <Label htmlFor="angle">Angle: {angle}°</Label>
          <Slider
            id="angle"
            min={0}
            max={360}
            step={1}
            value={[angle]}
            onValueChange={(value) => setAngle(value[0])}
          />
        </div>

        <div>
          <Label htmlFor="opacity">Opacity: {opacity.toFixed(2)}</Label>
          <Slider
            id="opacity"
            min={0}
            max={1}
            step={0.01}
            value={[opacity]}
            onValueChange={(value) => setOpacity(value[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default GradientDesigner;