import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { RiTiktokLine } from "react-icons/ri"
import { FiFacebook, FiLinkedin } from "react-icons/fi"
import { FaXTwitter } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa"
import { LuGithub, LuYoutube } from "react-icons/lu"
import type { ReactNode } from "react"

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "email"
  | "twitter"
  | "tiktok"
  | "facebook"
  | "youtube"
  | "instagram"

interface SocialLinkDefinition {
  platform: SocialPlatform
  href: string
  ariaLabel: string
  icon: ReactNode
  external: boolean
}

const allSocialLinks: SocialLinkDefinition[] = [
  {
    platform: "github",
    href: "https://github.com/LeMarechalDeFer",
    ariaLabel: "GitHub",
    icon: <LuGithub className="h-5 w-5" />,
    external: true,
  },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/in/romain-blanchot-449941284/",
    ariaLabel: "LinkedIn",
    icon: <FiLinkedin className="h-5 w-5" />,
    external: true,
  },
  {
    platform: "instagram",
    href: "https://www.instagram.com/_romain_blanchot_/",
    ariaLabel: "Instagram",
    icon: <FaInstagram className="h-5 w-5" />,
    external: true,
  },
  {
    platform: "email",
    href: "mailto:blanchot@et.esiea.fr",
    ariaLabel: "Email",
    icon: <Mail className="h-5 w-5" />,
    external: false,
  },
  {
    platform: "twitter",
    href: "https://x.com/talleyrand1000",
    ariaLabel: "Twitter",
    icon: <FaXTwitter className="h-5 w-5" />,
    external: true,
  },
  {
    platform: "tiktok",
    href: "https://www.tiktok.com/@romain.blanchot",
    ariaLabel: "TikTok",
    icon: <RiTiktokLine className="h-5 w-5" />,
    external: true,
  },
  {
    platform: "facebook",
    href: "https://web.facebook.com/people/Romain-Blanchot/pfbid034Hz3fp8rLVBXKJkS31RF8pCSVCVbN7zGtNZZR53GZmwHgyxizSupZj9J1Qact2Nzl/",
    ariaLabel: "Facebook",
    icon: <FiFacebook className="h-5 w-5" />,
    external: true,
  },
  {
    platform: "youtube",
    href: "https://www.youtube.com/@romainblanchot",
    ariaLabel: "Youtube",
    icon: <LuYoutube className="h-5 w-5" />,
    external: true,
  },
]

const defaultPlatforms: SocialPlatform[] = [
  "github",
  "linkedin",
  "email",
  "twitter",
  "tiktok",
  "facebook",
  "youtube",
]

interface SocialLinksProps {
  variant?: "ghost" | "outline"
  className?: string
  buttonClassName?: string
  include?: SocialPlatform[]
}

export function SocialLinks({
  variant = "ghost",
  className,
  buttonClassName,
  include = defaultPlatforms,
}: Readonly<SocialLinksProps>) {
  const links = allSocialLinks.filter((link) => include.includes(link.platform))

  return (
    <div className={className}>
      {links.map((link) => (
        <Link
          key={link.platform}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
        >
          <Button
            variant={variant}
            size="icon"
            aria-label={link.ariaLabel}
            className={buttonClassName}
          >
            {link.icon}
          </Button>
        </Link>
      ))}
    </div>
  )
}
