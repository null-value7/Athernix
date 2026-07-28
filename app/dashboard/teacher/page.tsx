'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TeacherDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Temporalmente redirigir al dashboard principal hasta que se implemente
    router.push('/dashboard')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Cargando dashboard de profesor...</p>
      </div>
    </div>
  )
}
