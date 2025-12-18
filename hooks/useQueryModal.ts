'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function useQueryModal() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isOpen = (modalName: string): boolean => {
    return searchParams.get('modal') === modalName
  }

  const openModal = (modalName: string, currentPath?: string) => {
    if (typeof window === 'undefined') return
    
    // Extract base path and existing query params
    let basePath = currentPath ? currentPath.split('?')[0] : window.location.pathname
    const existingParams = currentPath?.includes('?') 
      ? new URLSearchParams(currentPath.split('?')[1])
      : new URLSearchParams(window.location.search)
    
    existingParams.set('modal', modalName)
    router.push(`${basePath}?${existingParams.toString()}`)
  }

  const closeModal = () => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    params.delete('modal')
    const newParams = params.toString()
    const path = window.location.pathname
    router.replace(newParams ? `${path}?${newParams}` : path)
  }

  return {
    isOpen,
    openModal,
    closeModal,
  }
}
