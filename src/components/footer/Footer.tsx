import Link from "next/link";
import Logo from "../shared/Logo";
import NewsletterForm from "../footer/NewsletterForm";

const socialLinks = [
    {
        name: "Github",
        href: "https://github.com",
        svgPath: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
    },
    {
        name: "Twitter",
        href: "https://twitter.com",
        svgPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com",
        svgPath: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    }
];

const footerLinks = {
    navigation: [
        { name: "Home", href: "/" },
        { name: "Templates Gallery", href: "/templates" },
        { name: "Create Poster", href: "/create-poster" },
        { name: "My History", href: "/history" },
    ],
    resources: [
        { name: "About Us", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Contact", href: "/contact" },
    ],
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/80 bg-background/80 backdrop-blur-md text-card-foreground font-sans mt-auto overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">

                    {/* Description */}
                    <div className="lg:col-span-2 space-y-4">
                        <Logo />
                        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                            The ultimate AI-powered platform for political workers and campaign managers to design professional, print-ready posters instantly with custom Bangla typography.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map(({ name, href, svgPath }) => (
                                <a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={name}
                                    className="w-9 h-9 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d={svgPath} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {footerLinks.navigation.map(({ name, href }) => (
                                <li key={href}>
                                    <Link href={href} className="hover:text-primary transition-colors">{name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources / Support / Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {footerLinks.resources.map(({ name, href }) => (
                                <li key={href}>
                                    <Link href={href} className="hover:text-primary transition-colors">{name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Separated Newsletter */}
                    <NewsletterForm />

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border/80 pt-8 flex items-center justify-center text-sm md:text-sm text-muted-foreground">
                    <p>&copy; {currentYear} BanglaPoster. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}