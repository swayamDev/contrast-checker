"use client";

import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Accessibility,
  BookOpen,
  Palette,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/swayamDev",
      icon: FaGithub,
    },
    {
      name: "Twitter",
      href: "https://x.com/Swayam_Dev",
      icon: FaXTwitter,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/swayam-webdev/",
      icon: FaLinkedinIn,
    },
  ];

  const accessibilityResources = [
    {
      name: "WCAG Guidelines",
      href: "https://www.w3.org/WAI/WCAG21/quickref/",
      icon: BookOpen,
      description: "Complete WCAG 2.1 guidelines",
    },
    {
      name: "WebAIM Contrast Checker",
      href: "https://webaim.org/resources/contrastchecker/",
      icon: Zap,
      description: "Alternative contrast checker tool",
    },
    {
      name: "Color Universal Design",
      href: "https://jfly.uni-koeln.de/color/",
      icon: Palette,
      description: "Color accessibility for everyone",
    },
    {
      name: "Accessible Colors",
      href: "https://accessible-colors.com/",
      icon: Accessibility,
      description: "Find accessible color combinations",
    },
  ];

  return (
    <footer className="relative mt-20 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-t border-white/20 dark:border-slate-700/50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-y-12 md:gap-y-0 md:gap-x-12">
          {/* Social Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Connect With Us
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                Follow us for updates on accessibility tools and design
                resources.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${link.name}`}
                    title={`Visit ${link.name}`}
                    className="flex items-center"
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Accessibility Resources Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Accessibility Resources
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                Essential tools and guidelines for creating accessible designs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {accessibilityResources.map((resource) => (
                <Button
                  key={resource.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-auto p-4 text-left justify-start bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300"
                >
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <resource.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-sm truncate">
                        {resource.name}
                      </span>
                      <ExternalLink className="h-3 w-3 text-slate-400" />
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {resource.description}
                    </span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 dark:border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 flex-shrink-0 overflow-hidden rounded-xl flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Contrast Studio logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  Contrast Studio
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                  WCAG 2.1 Compliance Checker
                </p>
              </div>
            </div>

            {/* Build Credit */}
            <div className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-right leading-tight">
              <p>Built with Next.js 15 and Tailwind CSS</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                Ensuring accessible design for everyone
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
