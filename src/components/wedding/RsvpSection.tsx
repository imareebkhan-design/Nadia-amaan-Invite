import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';


const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};


const RsvpSection = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    guest_count: 1,
    
    dietary_preference: 'Veg',
    attending: null as 'yes' | 'no' | null,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    setStatus('submitting');
    try {
      const { error } = await supabase.from('rsvp_responses').insert({
        name: form.name.trim().slice(0, 100),
        phone: form.phone.trim().slice(0, 20),
        guest_count: Math.min(Math.max(1, form.guest_count), 6),
        
        dietary_preference: form.dietary_preference,
        message: form.message.trim().slice(0, 500),
      });

      if (error) throw error;
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="w-full py-24 px-6 flex flex-col items-center text-center"
        style={{ backgroundColor: 'hsl(var(--wedding-cream))' }}
      >
        <div className="max-w-md mx-auto space-y-6">
          <span className="text-6xl block">🌸</span>
          <h3 className="font-display text-3xl" style={{ color: '#E06B82' }}>Thank you!</h3>
          <p className="font-sub italic text-lg" style={{ color: '#4A7C59' }}>
            Noted, loved, and now slightly more excited than we were five minutes ago. 🌸
          </p>
        </div>
      </motion.section>
    );
  }

  const inputStyle = {
    border: '1px solid rgba(201,168,76,0.4)',
    color: '#4A7C59',
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full py-24 px-6 flex flex-col items-center text-center"
      style={{ backgroundColor: 'transparent' }}
    >
      
      <motion.div
        className="max-w-xl w-full mx-auto space-y-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.h2
          variants={staggerItem}
          className="font-sub text-[36px] sm:text-[48px]"
          style={{ color: '#4A7C59', fontWeight: 400 }}
        >
          RSVP
        </motion.h2>

        <motion.div
          variants={staggerItem}
          style={{
            background: '#FFFDF9',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '16px',
            padding: '32px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-1">
              <label className="font-body text-[10px] tracking-[0.3em] uppercase block" style={{ color: '#C9A84C' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg bg-transparent px-4 py-3 font-sub text-sm placeholder:opacity-30 focus:outline-none"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="font-body text-[10px] tracking-[0.3em] uppercase block" style={{ color: '#C9A84C' }}>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                required
                maxLength={20}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg bg-transparent px-4 py-3 font-sub text-sm placeholder:opacity-30 focus:outline-none"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
              />
            </div>

            {/* Guest count - dropdown */}
            <div className="space-y-1">
              <label className="font-body text-[10px] tracking-[0.3em] uppercase block" style={{ color: '#C9A84C' }}>
                Number of Guests (including you)
              </label>
              <select
                value={form.guest_count}
                onChange={(e) => {
                  const count = Number(e.target.value);
                  setForm({ ...form, guest_count: count });
                }}
                className="w-full rounded-lg bg-transparent px-4 py-3 font-sub text-sm focus:outline-none appearance-none cursor-pointer"
                style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>


            {/* Will you attend? */}
            <div className="space-y-2">
              <label className="font-body text-[10px] tracking-[0.3em] uppercase block" style={{ color: '#C9A84C' }}>
                Will you attend?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, attending: 'yes' })}
                  className="flex-1 py-3 rounded-lg font-sub text-sm transition-all"
                  style={{
                    border: '1px solid #4A7C59',
                    background: form.attending === 'yes' ? '#4A7C59' : 'transparent',
                    color: form.attending === 'yes' ? '#FFF8F4' : '#4A7C59',
                  }}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, attending: 'no' })}
                  className="flex-1 py-3 rounded-lg font-sub text-sm transition-all"
                  style={{
                    border: '1px solid #4A7C59',
                    background: form.attending === 'no' ? '#4A7C59' : 'transparent',
                    color: form.attending === 'no' ? '#FFF8F4' : '#4A7C59',
                  }}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {/* Dietary */}
            <div className="space-y-1">
              <label className="font-body text-[10px] tracking-[0.3em] uppercase block" style={{ color: '#C9A84C' }}>
                Dietary Preferences
              </label>
              <select
                value={form.dietary_preference}
                onChange={(e) => setForm({ ...form, dietary_preference: e.target.value })}
                className="w-full rounded-lg bg-transparent px-4 py-3 font-sub text-sm focus:outline-none appearance-none"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
              >
                {['Veg', 'Non Veg'].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="font-body text-[10px] tracking-[0.3em] uppercase block" style={{ color: '#C9A84C' }}>
                Message to the Couple
              </label>
              <textarea
                placeholder="Your wishes for the couple..."
                maxLength={500}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg bg-transparent px-4 py-3 font-sub text-sm placeholder:opacity-30 focus:outline-none resize-none"
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
              />
            </div>

            {status === 'error' && (
              <p className="font-body text-sm text-red-500 text-center">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 rounded-xl font-body text-sm uppercase transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
              style={{ background: '#4A7C59', color: '#FFF8F4', letterSpacing: '0.2em' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              {status === 'submitting' ? 'Sending...' : 'Confirm RSVP'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default RsvpSection;
