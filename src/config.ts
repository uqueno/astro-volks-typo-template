export interface SiteConfig {
  title: string;
  description: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
  social: {
    github?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
  siteUrl: string;
}

export const config: SiteConfig = {
  title: "Volks-Typo",
  description: "A blog exploring the intersection of design, typography, and history",
  author: {
    name: "Yukio Ueno",
    bio: "Writer, designer, and explorer of aesthetic tensions between past and present.",
    // avatar: "/images/avatar.jpg" // Uncomment and add your avatar image to public/images/
  },
  social: {
    github: "https://github.com/uqueno",
    twitter: "https://twitter.com/uqueno",
    linkedin: "https://linkedin.com/in/yukio",
    email: "info@yukioueno.com"
  },
  siteUrl: "https://blog.yukioueno.com"
};

// Export constants for SEO component
export const SITE_TITLE = config.title;
export const SITE_DESCRIPTION = config.description;