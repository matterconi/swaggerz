import { motion } from 'framer-motion';

interface CollectionBadgeProps {
  badge: string;
  badgeColor: string;
}

export default function CollectionBadge({ badge, badgeColor }: CollectionBadgeProps) {
  return (
    <motion.div
      className={`inline-block px-4 py-2 bg-${badgeColor}-500/20 backdrop-blur-sm border border-${badgeColor}-500/50 rounded-full mb-6`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <span className={`text-white text-sm font-semibold uppercase tracking-wider`}>
        {badge}
      </span>
    </motion.div>
  );
}
