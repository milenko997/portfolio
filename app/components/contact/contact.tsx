'use client';

import { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import styles from './contact.module.scss';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      alert('reCAPTCHA not yet available');
      return;
    }

    setLoading(true);

    try {
      const token = await executeRecaptcha('contact_form');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptcha: token }),
      });

      if (!res.ok) {
        throw new Error('Failed to send');
      }

      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Contact</span>
              <h2 className={styles.sectionTitle}>Let's Work Together</h2>
            </div>
            <p className={styles.contactText}>
              Have a project in mind or want to collaborate? I'd love to hear from you.
              Drop me a message and let's create something amazing together.
            </p>

            <div className={styles.contactDetails}>
                <a href="mailto:milenko.ilic997@gmail.com" className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <span>milenko.ilic997@gmail.com</span>
                </a>
                <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <span>Novi Sad, Serbia</span>
                </div>
            </div>
            
            <div className={styles.contactSocial}>
                <a href="https://github.com/milenko997" className={styles.socialBtn} aria-label="GitHub" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>

                <a href="https://www.linkedin.com/in/milenko-ilic-637b7915b/" className={styles.socialBtn} aria-label="LinkedIn" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
            </div>
          </div>

          <div className={styles.contactFormWrapper}>
            {!success ? (
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </div>

                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>

                <div className={styles.formGroup}>
                  <label>Message</label>
                  <textarea name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Tell me about your project..." required />
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </form>
            ) : (
              <div className={styles.formSuccess}>
                <div className={styles.successIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
    <ContactForm />
  </GoogleReCaptchaProvider>
);

export default Contact;
