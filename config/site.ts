import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  logo: "/logo.svg",
  name: "HederaAI",
  description:
    "HederaAI is an innovative AI-driven screening platform designed to revolutionize the recruitment process. By leveraging advanced voice AI technology, HederaAI automates initial candidate interviews, providing quick, efficient, and unbiased evaluations. This streamlined approach not only saves valuable time for HR professionals but also ensures a consistent and fair screening process. With its ability to operate 24/7, HederaAI is ideal for both local and international recruitment, accommodating candidates from different time zones seamlessly. Whether you’re a small business or a large enterprise, HederaAI enhances your talent acquisition strategy, making hiring faster, smarter, and more effective.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/voicetechguy1",
    github: "https://github.com/goldzulu/nextstart",
  },
  mailSupport: "info@metagineers.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
