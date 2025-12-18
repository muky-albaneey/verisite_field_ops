'use client'

import { Search, Phone, Mail, MessageSquare, Instagram, Send, Facebook, MessageCircle } from 'lucide-react'

const popularTopics = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'certifications', label: 'Certifications' },
]

const contactOptions = [
  { type: 'call', label: 'Call us', icon: Phone, description: 'Our team is on the line Mon-Fri 9-17' },
  { type: 'text', label: 'Text us', icon: MessageSquare, description: 'Our team is on the line Mon-Fri 9-17' },
  { type: 'email', label: 'Email us', icon: Mail, description: 'Our team is on the line Mon-Fri 9-17' },
]

const socialMedia = [
  {
    name: 'Facebook',
    icon: Facebook,
    followers: '3.2K',
    posts: '136 Posts',
    available: false,
  },
  {
    name: 'Whatsapp',
    icon: MessageCircle,
    followers: '',
    posts: '',
    available: true,
    availability: 'Available Mon-Fri 9-17',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    followers: '4.6K',
    posts: '118 Posts',
    available: false,
  },
  {
    name: 'Telegram',
    icon: Send,
    followers: '1.9K',
    posts: '65 Posts',
    available: false,
  },
]

export default function HelpSupportPanel() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Help and Support</h2>
        <p className="text-gray-600 mb-4">
          Explore our Verisite for answers to your questions and assistance with your social media experience.
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
          />
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h3>
        <div className="flex flex-wrap gap-3">
          {popularTopics.map((topic) => (
            <button
              key={topic.id}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Us */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact us</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactOptions.map((option) => {
            const Icon = option.icon
            return (
              <div
                key={option.type}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#0F5132] transition-colors cursor-pointer"
              >
                <Icon className="w-6 h-6 text-[#0F5132] mb-3" />
                <h4 className="font-medium text-gray-900 mb-1">{option.label}</h4>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact us in Social Media</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialMedia.map((social) => {
            const Icon = social.icon
            return (
              <div
                key={social.name}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#0F5132] transition-colors cursor-pointer relative"
              >
                <Icon className="w-8 h-8 text-[#0F5132] mb-3" />
                <h4 className="font-medium text-gray-900 mb-2">{social.name}</h4>
                {social.available ? (
                  <p className="text-sm text-gray-500">{social.availability}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">{social.followers} Followers</p>
                    <p className="text-sm text-gray-500">{social.posts}</p>
                  </>
                )}
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

