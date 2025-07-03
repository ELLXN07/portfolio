// Theme definitions
const themes = [
  // Gruvbox dark (set as default)
  {
    name: 'gruvbox-dark', color: '#d79921',
    vars: {
      '--bg-dark': '#282828',
      '--bg-main': '#32302f',
      '--bg-secondary': '#3c3836',
      '--bg-accent': '#504945',
      '--accent': '#d79921',
      '--light': '#ebdbb2',
    }
  },
  // Dark themes
  {
    name: 'dark1', color: '#697565',
    vars: {
      '--bg-dark': '#191a19', '--bg-main': '#1E201E', '--bg-secondary': '#3C3D37', '--bg-accent': '#53594E', '--accent': '#697565', '--light': '#ECDFCC',
    }
  },
  {
    name: 'dark2', color: '#7C9CBF',
    vars: {
      '--bg-dark': '#181C1F', '--bg-main': '#23272A', '--bg-secondary': '#31363B', '--bg-accent': '#4B535C', '--accent': '#7C9CBF', '--light': '#E3EAF2',
    }
  },
  {
    name: 'blue-dark', color: '#5B8FF9',
    vars: {
      '--bg-dark': '#101624', '--bg-main': '#18213A', '--bg-secondary': '#22304A', '--bg-accent': '#2B3A5A', '--accent': '#5B8FF9', '--light': '#E3EAF2',
    }
  },
  {
    name: 'green-dark', color: '#7ED957',
    vars: {
      '--bg-dark': '#142019', '--bg-main': '#1B2B1A', '--bg-secondary': '#2A3C2A', '--bg-accent': '#3B5C3B', '--accent': '#7ED957', '--light': '#E3EAF2',
    }
  },
  {
    name: 'purple-dark', color: '#B388FF',
    vars: {
      '--bg-dark': '#1A1625', '--bg-main': '#2B2046', '--bg-secondary': '#3C2A5A', '--bg-accent': '#5A3A7C', '--accent': '#B388FF', '--light': '#F3E8FF',
    }
  },
  {
    name: 'red-dark', color: '#FF5C5C',
    vars: {
      '--bg-dark': '#241616', '--bg-main': '#3A1A1A', '--bg-secondary': '#5A2B2B', '--bg-accent': '#7C3A3A', '--accent': '#FF5C5C', '--light': '#FFE3E3',
    }
  },
  // Light themes
  {
    name: 'light', color: '#FDFDFD',
    vars: {
      '--bg-dark': '#F5F6FA', '--bg-main': '#FDFDFD', '--bg-secondary': '#E3EAF2', '--bg-accent': '#C9D6E3', '--accent': '#4B535C', '--light': '#23272A',
    }
  },
  {
    name: 'warm-light', color: '#FFF3E2',
    vars: {
      '--bg-dark': '#FFF8F0', '--bg-main': '#FFF3E2', '--bg-secondary': '#FFE0B2', '--bg-accent': '#FFD59E', '--accent': '#FF8C42', '--light': '#23272A',
    }
  },
  {
    name: 'teal-light', color: '#F0FFFF',
    vars: {
      '--bg-dark': '#E0F7FA', '--bg-main': '#F0FFFF', '--bg-secondary': '#B2EBF2', '--bg-accent': '#80DEEA', '--accent': '#00BFAE', '--light': '#23272A',
    }
  },
  // Atom OneDark theme
  {
    name: 'onedark', color: '#61afef',
    vars: {
      '--bg-dark': '#282c34',
      '--bg-main': '#21252b',
      '--bg-secondary': '#2c313c',
      '--bg-accent': '#3a3f4b',
      '--accent': '#61afef',
      '--light': '#abb2bf',
    }
  },
  // Basic Black & White theme
  {
    name: 'black-white', color: '#000000',
    vars: {
      '--bg-dark': '#000000',
      '--bg-main': '#111111',
      '--bg-secondary': '#222222',
      '--bg-accent': '#333333',
      '--accent': '#ffffff',
      '--light': '#ffffff',
    }
  },
];
let currentTheme = 0;
const root = document.documentElement;
const themeSwitcher = document.getElementById('themeSwitcher');
const themeDropdown = document.getElementById('themeDropdown');
function applyTheme(themeIdx, animate = true) {
  if (animate) {
    document.body.classList.add('theme-fade-dynamic');
    setTimeout(() => {
      setThemeVars(themeIdx);
      document.body.classList.remove('theme-fade-dynamic');
    }, 800);
  } else {
    setThemeVars(themeIdx);
  }
}
function setThemeVars(themeIdx) {
  const vars = themes[themeIdx].vars;
  for (const key in vars) {
    root.style.setProperty(key, vars[key]);
  }
}
function circularRevealThemeChange(newThemeIdx, oldThemeIdx) {
  const overlay = document.getElementById('theme-reveal-overlay');
  const btn = document.getElementById('themeSwitcher');
  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  // Get viewport size
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Calculate max radius to cover screen
  const maxR = Math.sqrt(Math.max(cx, vw - cx) ** 2 + Math.max(cy, vh - cy) ** 2) * 1.1;
  // Set overlay color to old theme accent
  overlay.style.background = themes[oldThemeIdx].color;
  overlay.style.clipPath = `circle(0% at ${cx}px ${cy}px)`;
  overlay.style.opacity = 1;
  overlay.style.display = 'block';
  // Animate circle out (cover)
  gsap.to(overlay, {
    clipPath: `circle(${maxR}px at ${cx}px ${cy}px)`,
    duration: 0.6,
    delay: 0.08,
    ease: 'power1.inOut',
    onComplete: () => {
      // Blend color from old to new
      gsap.to(overlay, {
        backgroundColor: themes[newThemeIdx].color,
        duration: 0.45,
        ease: 'power1.inOut',
        onComplete: () => {
          setThemeVars(newThemeIdx);
          // Animate circle in (reveal)
          gsap.to(overlay, {
            clipPath: `circle(0% at ${cx}px ${cy}px)`,
            duration: 0.7,
            delay: 0.08,
            ease: 'power1.inOut',
            onComplete: () => {
              setTimeout(() => {
                overlay.style.opacity = 0;
                overlay.style.display = 'none';
              }, 60);
            }
          });
        }
      });
    }
  });
}
// Build dropdown
function buildThemeDropdown() {
  themeDropdown.innerHTML = '';
  themes.forEach((theme, idx) => {
    const btn = document.createElement('button');
    btn.className = 'theme-circle';
    btn.style.background = theme.color;
    btn.title = theme.name;
    btn.setAttribute('aria-label', theme.name + ' theme');
    if (idx === currentTheme) btn.classList.add('active');
    btn.onclick = (e) => {
      e.stopPropagation();
      if (currentTheme !== idx) {
        const oldTheme = currentTheme;
        currentTheme = idx;
        circularRevealThemeChange(currentTheme, oldTheme);
        buildThemeDropdown();
      }
      themeDropdown.classList.remove('open');
    };
    themeDropdown.appendChild(btn);
  });
  // Keyboard navigation for theme circles
  themeDropdown.onkeydown = (e) => {
    if (!themeDropdown.classList.contains('open')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      let next = (currentTheme + 1) % themes.length;
      const oldTheme = currentTheme;
      currentTheme = next;
      circularRevealThemeChange(currentTheme, oldTheme);
      buildThemeDropdown();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      let prev = (currentTheme - 1 + themes.length) % themes.length;
      const oldTheme = currentTheme;
      currentTheme = prev;
      circularRevealThemeChange(currentTheme, oldTheme);
      buildThemeDropdown();
    }
  };
}
themeSwitcher.addEventListener('click', (e) => {
  e.stopPropagation();
  themeDropdown.classList.toggle('open');
  buildThemeDropdown();
});
document.addEventListener('click', () => {
  themeDropdown.classList.remove('open');
});
// Initial theme
setThemeVars(currentTheme); 