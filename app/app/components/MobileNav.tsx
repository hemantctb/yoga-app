"use client"

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Menu, X, Home, Book, Wind, Sparkles } from 'lucide-react'

interface MobileNavProps {
  currentPath?: string
}

export default function MobileNav({ currentPath }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/asanas', label: 'Asana Library', icon: Book },
    { href: '/pranayamas', label: 'Pranayama', icon: Wind },
  ]

  // Mount check for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const drawer = isOpen ? (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998]"
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-72 z-[9999] shadow-2xl"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-clay rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-serif font-bold text-ink">Sutra</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-800 transition"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 bg-white">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = currentPath === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-clay/10 text-clay font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="space-y-2">
            <button className="w-full px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
              Sign In
            </button>
            <button className="w-full px-4 py-3 text-sm font-medium bg-ink text-white rounded-lg hover:bg-ink/90 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-ink-light hover:text-ink transition touch-target"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Render drawer in portal to escape parent styling */}
      {mounted && drawer && createPortal(drawer, document.body)}
    </>
  )
}
