'use client';

import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold font-heading">
                <span className="gradient-text">FoodResQ</span>
                <span className="text-white ml-1">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              AI-powered food rescue network reducing waste through realtime logistics and smart matching.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-neon-purple hover:border-neon-purple/30 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Workflow', 'Dashboard', 'Pricing', 'API'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-neon-purple transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Blog', 'Careers', 'Press', 'Partners'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-neon-purple transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact', 'Support'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-neon-purple transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © 2025 FoodResQ AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-600">
            Built with 💜 for a hunger-free world
          </p>
        </div>
      </div>
    </footer>
  );
}
