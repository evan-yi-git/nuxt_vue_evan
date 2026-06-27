// 初始化 3D 傾斜卡片
export const initVanillaTilt = async () => {
  if (process.client) {
    try {
      const VanillaTilt = (await import('vanilla-tilt')).default
      const cards = document.querySelectorAll('.brand-card')
      if (cards.length) VanillaTilt.init(cards)
    } catch (err) {
      console.error('VanillaTilt 載入失敗:', err)
    }
  }
}

// 刷新 GSAP 滾動高度（整合安全版）
export const refreshScrollTrigger = () => {
  if (typeof window !== 'undefined' && window.ScrollTrigger) {
    window.ScrollTrigger.refresh()
  } else if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh()
  }
}

// 核心 GSAP 履歷動畫
export const initResumeAnimations = () => {
  // 1. 安全防禦：確保環境支援且物件存在
  if (typeof window === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ force3D: true });

  // A. Header 載入動態
  gsap.timeline({ delay: 0.2 })
    .fromTo('.resume-header .avatar-box', 
      { opacity: 1, scale: 1, rotationY: -92 }, 
      { opacity: 1, scale: 1, rotationY: 0, z: 0, duration: 1.2, ease: 'back.out(1.5)' }
    )
    .fromTo('.resume-header .header-left', 
      { opacity: 0, x: -50, skewX: -10 }, 
      { opacity: 1, x: 0, skewX: 0, duration: 0.8, ease: 'power3.out' }, 
      '<=0.6'
    )
    .fromTo('.resume-header .header-right', 
      { opacity: 0, x: 50, skewX: 10 }, 
      { opacity: 1, x: 0, skewX: 0, duration: 0.8, ease: 'power3.out' }, 
      '<'
    );

  // B. 時間軸進度條 (優化：快取 DOM 與狀態阻斷)
  const wrapper = document.querySelector('.resume-wrapper');
  
  gsap.fromTo('.timeline-axis-fill', 
    { scaleY: 0, xPercent: -50 }, 
    { 
      scaleY: 1, 
      xPercent: -50, 
      ease: 'none', 
      scrollTrigger: {
        trigger: '.timeline-main',
        start: 'top 30%',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!wrapper) return;
          const isAtBottom = self.progress >= 0.99;
          // 只有在狀態真正改變時才操作 classList，避免重複渲染
          if (wrapper.classList.contains('is-bottom') !== isAtBottom) {
            wrapper.classList.toggle('is-bottom', isAtBottom);
          }
        }
      }
    }
  );

  // C. 各時間軸項目文字登場效果 (優化：合併重複邏輯)
  const timelineItems = gsap.utils.toArray('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    const chars = item.querySelectorAll('.char-item');
    const textGroup = [
      item.querySelector('.mobile-intro-header'),
      item.querySelector('.desktop-intro-header'),
      item.querySelector('.mobile-only-content'),
      item.querySelector('.desktop-only-content')
    ].filter(Boolean);

    // 動態參數配置
    const isFirst = index === 0;
    const startPos = isFirst ? 'top 95%' : 'top 85%';
    const charDuration = isFirst ? 0.5 : 0.6;
    const textDuration = isFirst ? 1.6 : 1.2;
    const textDelay = isFirst ? '<=0.3' : '<=0.15';

    const tl = gsap.timeline({ 
      scrollTrigger: { 
        trigger: item, 
        start: startPos, 
        toggleActions: 'play none restart reverse', 
        invalidateOnRefresh: true 
      } 
    });

    if (chars.length) {
      tl.fromTo(chars, 
        { opacity: 0, y: 40, scale: 0.5, rotationX: -45 }, 
        { opacity: 1, y: 0, scale: 1, rotationX: 0, ease: 'power2.out', duration: charDuration, stagger: 0.1 }
      );
    }

    if (textGroup.length) {
      tl.fromTo(textGroup, 
        { opacity: 0, y: isFirst ? 55 : 40 }, 
        { opacity: 1, y: 0, duration: textDuration, ease: 'power2.out' }, 
        textDelay
      );
    }
  });

  // D. 作品成果圖片滑動登場
  const projectCards = gsap.utils.toArray('.mockup-pc-card, .mockup-mb-card');
  projectCards.forEach((card) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 60, scale: 0.95 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.0, 
        ease: 'power2.out', 
        scrollTrigger: { 
          trigger: card, 
          start: 'top 88%', 
          toggleActions: 'play none none reverse', 
          invalidateOnRefresh: true 
        } 
      }
    );
  });

  // E. Footer 謝幕 (優化：調整動態行為)
  const footerText = document.querySelector('.resume-footer .thank-you-text');
  if (footerText) {
    gsap.fromTo(footerText, 
      { opacity: 0, y: 35 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power2.out', 
        scrollTrigger: { 
          trigger: '.resume-footer', 
          start: 'top 95%', 
          toggleActions: 'play none none reverse', // 改為更平滑的單向觸發
          invalidateOnRefresh: true 
        } 
      }
    );
  }
};

