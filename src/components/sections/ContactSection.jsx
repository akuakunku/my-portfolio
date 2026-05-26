import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { Send, Mail } from 'lucide-react';
import { site } from '../../data/site';
import { SectionReveal } from '../layout/section-reveal';
import { MagneticButton } from '../ui/magnetic-button';

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState('');
  const [open, setOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    emailjs
      .sendForm('service_ovz66xg', 'template_3dhvh0j', e.target, 'twXbYizQcqegiXwB0')
      .then(() => {
        setFormStatus('success');
        setTimeout(() => {
          setOpen(false);
          setFormStatus('');
        }, 2000);
      })
      .catch(() => setFormStatus('error'));

    e.target.reset();
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-glow-primary md:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">
                  Contact
                </p>
                <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                  Let&apos;s build something great
                </h2>
                <p className="mt-4 text-muted">
                  Open to freelance, collaborations, and full-time opportunities.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <MagneticButton variant="primary" onClick={() => setOpen(true)}>
                    <Mail size={16} />
                    Send a message
                  </MagneticButton>
                  <MagneticButton variant="secondary" href={site.github}>
                    GitHub
                  </MagneticButton>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-sm text-muted">
                <a
                  href={site.github}
                  className="link-underline w-fit transition-premium hover:text-foreground"
                >
                  github.com/chesko21
                </a>
                <a
                  href={site.instagram}
                  className="link-underline w-fit transition-premium hover:text-foreground"
                >
                  @chesko_afiq
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-glow-primary"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <h3 className="text-lg font-semibold text-foreground">Get in touch</h3>
              <form className="mt-4 flex flex-col gap-3" onSubmit={sendEmail}>
                <input
                  name="from_name"
                  required
                  placeholder="Your name"
                  className="input-premium"
                />
                <input
                  name="reply_to"
                  type="email"
                  required
                  placeholder="Email"
                  className="input-premium"
                />
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Message"
                  className="input-premium resize-none"
                />
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-premium hover:brightness-110 disabled:opacity-50"
                >
                  <Send size={16} />
                  {formStatus === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                {formStatus === 'success' && (
                  <p className="text-center text-sm text-emerald-400">Message sent!</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-center text-sm text-red-400">Something went wrong. Try again.</p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;
