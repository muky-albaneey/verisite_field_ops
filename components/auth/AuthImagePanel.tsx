import Image from 'next/image'

interface AuthImagePanelProps {
  text?: string
}

export default function AuthImagePanel({ 
  text = "I'm done with project updates, milestone checking, documentation, and answered all the questions about all the construction projects. we will be done in a day."
}: AuthImagePanelProps) {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[600px]">
      <Image
        src="https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80"
        alt="Construction workers"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay text box at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm">
        <p className="text-sm text-gray-700 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  )
}

