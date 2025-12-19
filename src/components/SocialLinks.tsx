import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

interface SocialLinkProps {
  href: string
  icon: React.ComponentType
  label: string
  hoverColorClass: string
  darkHoverColorClass: string
}

function SocialLink({ href, icon: Icon, label, hoverColorClass, darkHoverColorClass }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-block text-lg text-gray-700 dark:text-gray-300 cursor-pointer ${hoverColorClass} ${darkHoverColorClass} transition-colors duration-200`}
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      <Icon />
      <motion.div
        className="absolute -bottom-1.5 left-0 h-[1.5px] bg-current origin-left"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />
    </motion.a>
  )
}

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <SocialLink
        href="https://github.com/ramennissan"
        icon={FaGithub}
        label="GitHub"
        hoverColorClass="hover:text-gray-400"
        darkHoverColorClass="dark:hover:text-gray-400"
      />
      <SocialLink
        href="https://www.linkedin.com/in/ramennissan/"
        icon={FaLinkedin}
        label="LinkedIn"
        hoverColorClass="hover:text-blue-500"
        darkHoverColorClass="dark:hover:text-blue-400"
      />
    </div>
  )
}
