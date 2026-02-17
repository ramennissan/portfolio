import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Socials() {
    const links = [
        { icon: FaGithub, label: 'GitHub', href: 'https://github.com/ramennissan', color: 'hover:text-gray-400' },
        { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/ramennissan', color: 'hover:text-blue-500' },
        { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-blue-400' },
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Stay Connected</h2>
            <div className="flex gap-6">
                {links.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-2xl transition-colors ${link.color}`}
                        aria-label={link.label}
                    >
                        <link.icon />
                    </a>
                ))}
            </div>
        </section>
    );
}
