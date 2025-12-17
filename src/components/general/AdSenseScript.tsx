'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

const AdSenseScript = () => {
  const pathname = usePathname()
  const disallowed = ['/cookies', '/aviso-legal', '/terminos', '/politica-de-privacidad']

  if (disallowed.includes(pathname)) {
    return null
  }

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4757220441000409"
      crossOrigin="anonymous"
    />
  )
}

export default AdSenseScript