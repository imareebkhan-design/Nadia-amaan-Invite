const SmallDivider = () => (
  <div className="flex items-center justify-center gap-2" style={{ margin: '16px 0' }}>
    <div style={{ width: 32, height: 0.5, background: '#E0C8B0' }} />
    <div style={{ width: 5, height: 5, border: '1px solid #C9A84C', transform: 'rotate(45deg)' }} />
    <div style={{ width: 32, height: 0.5, background: '#E0C8B0' }} />
  </div>
);

const CoupleSection = () => {
  return (
    <section
      id="couple"
      className="relative flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: '#FFF8F4', padding: '72px 24px 80px' }}
    >
      {/* Top ornament */}
      <div className="flex items-center gap-3 mb-8">
        <div style={{ width: 48, height: 0.5, background: '#E0C8B0' }} />
        <div style={{ width: 3, height: 3, background: '#E06B82', borderRadius: '50%' }} />
        <div style={{ width: 6, height: 6, background: '#C9A84C', transform: 'rotate(45deg)', flexShrink: 0 }} />
        <div style={{ width: 3, height: 3, background: '#E06B82', borderRadius: '50%' }} />
        <div style={{ width: 48, height: 0.5, background: '#E0C8B0' }} />
      </div>

      {/* Bismillah */}
      <p
        className="font-sub italic text-[15px] text-center mb-8"
        style={{ color: '#4A7C59', letterSpacing: '0.06em', opacity: 0.8 }}
      >
        In the Name of Allah, the Most Beneficent, the Most Merciful
      </p>

      {/* Flowing invitation text */}
      <div className="flex flex-col items-center" style={{ maxWidth: 380 }}>
        <p className="font-sub italic text-[15px] text-center font-semibold" style={{ color: '#2D2D2D', lineHeight: 1.8 }}>
          Mr. Afzal Mustafa &amp; Mrs. Abida Afzal
        </p>
        <p className="font-sub italic text-[13px] text-center font-medium" style={{ color: '#3A3A3A', lineHeight: 1.7, marginTop: 4 }}>
          Grandson of Late Mr. A.S. Mustafa &amp; Late Mrs. Zubaida Mustafa
        </p>

        <p className="font-sub italic text-[15px] text-center font-semibold" style={{ color: '#2D2D2D', lineHeight: 1.7, marginTop: 16 }}>
          cordially invite you to the Waleema of their beloved son
        </p>

        <SmallDivider />

        {/* Groom name — the hero moment */}
        <span className="font-display text-[36px] font-normal" style={{ color: '#E06B82', letterSpacing: '0.02em' }}>
          Amaan
        </span>

        <p className="font-sub italic text-[15px] text-center" style={{ color: '#888', marginTop: 12 }}>
          with
        </p>

        {/* Bride name */}
        <span className="font-display text-[36px] font-normal" style={{ color: '#E06B82', letterSpacing: '0.02em', marginTop: 4 }}>
          Nadia
        </span>
        <p className="font-sub italic text-[13px] text-center" style={{ color: '#AAA', lineHeight: 1.7, marginTop: 6 }}>
          D/O Late Mr. Mohd. Sulaiman Khan &amp; Mrs. Naseem Bano
        </p>

        <SmallDivider />

        {/* Closing */}
        <p className="font-sub italic text-[14px] text-center" style={{ color: '#C9A84C', letterSpacing: '0.08em' }}>
          two families, one beautiful beginning
        </p>
      </div>
    </section>
  );
};

export default CoupleSection;
