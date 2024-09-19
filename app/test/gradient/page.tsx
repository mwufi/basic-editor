import DreamyGradientDesigner from "./DreamyGradientDesigner";
import GradientDesigner from "./GradientDesigner";

export default function GradientPage() {
  return (
    <div className="border-2 border-red-500 h-screen" style={{
      background: 'linear-gradient(293deg, #b4edf970 0%, #6912d370 100%)'
    }}>
      <DreamyGradientDesigner />
    </div>
  )
}