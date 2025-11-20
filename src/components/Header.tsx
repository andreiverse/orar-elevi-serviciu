import { Link } from '@tanstack/react-router'
import { Calendar } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 py-2 sm:py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 sm:p-2 rounded-lg shadow-md">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Orar Serviciu
            </h1>
            <p className="hidden sm:block text-[10px] text-muted-foreground">Organizare grupe elevi</p>
          </div>
        </Link>
      </div>
    </header>
  )
}
