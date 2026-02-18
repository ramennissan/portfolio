import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

interface SocialLinkProps {
  href: string
  icon: React.ComponentType
  label: string
  hoverColorClass: string
  darkHoverColorClass: string
  sizeClass?: string
}

function SocialLink({ href, icon: Icon, label, hoverColorClass, darkHoverColorClass, sizeClass }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-block ${sizeClass || 'text-lg'} text-gray-700 dark:text-gray-300 cursor-pointer ${hoverColorClass} ${darkHoverColorClass} transition-colors duration-200`}
      aria-label={label}
      title={label}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      <Icon />
      <motion.div
        className="absolute bottom-[-2px] left-0 right-0 h-[1.5px] bg-current"
        initial={{ scaleX: 0 }}
        variants={{
          hover: { scaleX: 1 }
        }}
        style={{ originX: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />
    </motion.a>
  )
}

export default function SocialLinks({ sizeClass }: { sizeClass?: string }) {
  return (
    <div className="flex items-center gap-3">
      <SocialLink
        href="https://github.com/ramennissan"
        icon={FaGithub}
        label="GitHub"
        hoverColorClass="hover:text-gray-400"
        darkHoverColorClass="dark:hover:text-gray-400"
        sizeClass={sizeClass}
      />
      <SocialLink
        href="https://www.linkedin.com/in/ramennissan/"
        icon={FaLinkedin}
        label="LinkedIn"
        hoverColorClass="hover:text-blue-500"
        darkHoverColorClass="dark:hover:text-blue-400"
        sizeClass={sizeClass}
      />
    </div>
  )
}
