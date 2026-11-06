import React from 'react';
import { ArrowRight, Send } from 'lucide-react';

export default function Footer({ t }) {
  const { footer } = t;

  return (
    <footer id="footer" className="bg-[#0f2744] text-white pt-16 px-6 pb-10 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Brand and Description */}
          <div className="flex flex-col items-start">
            <a className="inline-flex items-center gap-2 mb-4 group" href="/">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md group-hover:shadow-lg transition-all">
                <img
                  alt="BigMallCambodia.com"
                  loading="lazy"
                  className="h-8 sm:h-9 w-auto object-contain"
                  src="/bigmall-logo.png"
                />
              </div>
            </a>
            
            <p className="text-white/70 text-sm md:text-base mb-6 max-w-md leading-relaxed">
              {footer.description}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/hang24hang/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#8b6914] text-white flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/hang24kh/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#8b6914] text-white flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@hang24kh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#8b6914] text-white flex items-center justify-center transition-all duration-200"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/hang24kh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#8b6914] text-white flex items-center justify-center transition-all duration-200"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 text-white" />
              </a>
            </div>

            <p className="text-white/60 text-xs sm:text-sm mt-5">
              {footer.poweredBy}{' '}
              <a
                className="underline hover:text-[#d4b878] transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
                href="#footer"
              >
                SAK DIGITAL Solution
              </a>
            </p>
          </div>

          {/* Stay in the Loop Newsletter Box */}
          <div className="flex flex-col justify-start lg:items-end">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full">
              <h4 className="text-white font-bold text-lg mb-2">
                {footer.newsletterTitle}
              </h4>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                {footer.newsletterDesc}
              </p>
              
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/hang24kh"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8b6914] hover:bg-[#a67e1a] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg w-full"
              >
                <span>{footer.telegramBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/50">
          <p>{footer.copyright}</p>
          <div className="flex gap-6">
            <a href="https://vendor.hang24.shop/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
              Vendor Portal
            </a>
            <a href="#footer" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <a href="#footer" className="hover:text-white/80 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
