"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-100"
      >
        Get In Touch 📞
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/30 dark:bg-gray-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4">
            Send Us a Message ✉️
          </h2>

          <Input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/60 dark:bg-gray-800/60 focus:ring-2 focus:ring-yellow-500"
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/60 dark:bg-gray-800/60 focus:ring-2 focus:ring-yellow-500"
          />
          <Textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/60 dark:bg-gray-800/60 focus:ring-2 focus:ring-yellow-500 min-h-[120px]"
          />
          <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all">
            Send Message 🚀
          </Button>
        </motion.form>

        {/* Google Maps Location */}
        <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1.2 }}
  className="overflow-hidden rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700"
>
  <iframe
    className="w-full h-[450px] rounded-2xl"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3749495906504!2d85.32043907525376!3d27.705707276183556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a54a78b935%3A0x1ccc90ceebec3cba!2sBurger%20Hub%20Nepal!5e0!3m2!1sen!2snp!4v1739359998023!5m2!1sen!2snp"
    allowFullScreen
    loading="lazy"
  />
 

</motion.div>

      </div>
    </section>
  );
};

export default ContactPage;
