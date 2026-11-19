"use client";

import { motion } from "framer-motion";

interface ProfileTabProps {
  t: any;
}

// Name, role and facts live in the identity block above the tabs; this tab
// holds the short bio (translated; profileData only keeps the English copy the
// chatbot uses).
export const ProfileTab = ({ t }: ProfileTabProps) => (
  <motion.div
    className="tab-content profile-tab"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.25 }}
  >
    <p className="bio-text">{t("profileBio")}</p>
  </motion.div>
);
