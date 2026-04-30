"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { Briefcase, Heart, Mail, MapPin, User } from "lucide-react";

import type { ProfileData } from "@/utils/data/profileData";

interface ProfileTabProps {
  data: ProfileData["profile"];
  t: any;
}

export const ProfileTab = ({ data, t }: ProfileTabProps) => {
  const details = [
    { icon: User, label: t("name"), value: data.name },
    { icon: Briefcase, label: t("role"), value: data.job },
    { icon: MapPin, label: t("location"), value: data.location },
    { icon: Mail, label: t("email"), value: data.email },
    { icon: Heart, label: t("experience"), value: data.experience },
  ];

  return (
    <motion.div
      className="tab-content profile-tab"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="profile-header">
        <motion.div
          className="avatar-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <div className="avatar">
            <Image
              src="/images/avatar.webp"
              alt="Javi García Magaldi"
              width={96}
              height={96}
              priority
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <div className="avatar-glow" />
        </motion.div>

        <div className="profile-info">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {data.name}
          </motion.h2>
          <motion.p
            className="job-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {data.job}
          </motion.p>
          <motion.div
            className="status-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="status-indicator" />
            <span>{data.status}</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="profile-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {details.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <motion.div
              key={detail.label}
              className="detail-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="detail-icon">
                <Icon size={18} />
              </div>
              <div className="detail-content">
                <span className="detail-label">{detail.label}</span>
                <span className="detail-value">{detail.value}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="bio-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4>{t("title")}</h4>
        <p className="bio-text">{data.bio}</p>
      </motion.div>
    </motion.div>
  );
};
