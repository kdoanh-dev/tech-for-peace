const el = s => document.querySelector(s);
const templates = document.querySelectorAll('.template');
const toInput = el('#toInput'), msgInput = el('#msgInput'), signInput = el('#signInput');
const toText = el('#toText'), msgText = el('#msgText'), signText = el('#signText');
const charCount = el('#charCount'), decor = el('#decor');
const themeSelect = el('#themeSelect');
const cardEl = el('#card'); // Get the card element for template changes
// Đã loại bỏ aiSuggestBtn
let state = { template: 'classic', theme: 'peace' };

function updateChar() {
  charCount.textContent = `${msgInput.value.length}/300`;
}
msgInput.addEventListener('input', updateChar);

// Function to apply decor based on theme (Giữ nguyên)
function applyDecor() {
  decor.innerHTML = ''; // Clear previous decor
  decor.className = 'decor'; // Reset class
  let themeClass = '';

  // Sử dụng các biến CSS
  const textMain = getComputedStyle(document.documentElement).getPropertyValue('--text-main').trim();
  const textMuted = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();
  const accentDark = getComputedStyle(document.documentElement).getPropertyValue('--accent-dark').trim();


  switch (state.theme) {
    case 'peace':
      themeClass = 'peace-decor';
      decor.innerHTML = `
        <svg viewBox='0 0 400 400' class="circle-wave" style="top: 0; left: 0; width: 100%; height: 100%;"><path d='M0 200 Q100 100 200 200 T400 200' fill='none' stroke-dasharray='5 5'/><path d='M0 250 Q100 150 200 250 T400 250' fill='none' stroke-dasharray='5 5'/></svg>
        <svg viewBox='0 0 100 100' class="dove" style="top: 10%; left: 5%; width: 80px; height: 80px;">
<path d="M80.4 20.3c-4-4.2-10.2-6.5-16.7-6.5C55.2 13.8 48.7 16.5 44 21.6 40.5 17.6 35.8 15 30.5 15c-6.8 0-12.7 3.5-16 9 0 0-4.3 1.5-6.5 3.5-2.2 2.2-2.9 5.8-2 8.7 1.5 4.8 6.5 7.5 12 7.5h20c0 0 4 1 8 1s8-1 8-1h20c5.5 0 10.5-2.7 12-7.5 0.9-2.9 0.2-6.5-2-8.7-2.2-2-6.5-3.5-6.5-3.5zm-53.5 16.7c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zM50 40c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zM76.9 37c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
        </svg>
        <svg viewBox='0 0 100 100' class="flower" style="bottom: 0%; right: 0%; width: 100px; height: 100px;">
          <circle cx="50" cy="50" r="40" fill="#fff" opacity="0.8"/>
          <circle cx="50" cy="50" r="10" fill="#ffeb3b"/>
          <path d="M50 10 L60 30 L80 20 L70 40 L90 50 L70 60 L80 80 L60 70 L50 90 L40 70 L20 80 L30 60 L10 50 L30 40 L20 20 L40 30 Z" fill="#81d4fa"/>
        </svg>
      `;
      document.body.style.background = 'linear-gradient(180deg, #e0f7fa, #bbdefb)'; // Lighter blue to medium blue
      cardEl.style.setProperty('--text-main', '#263238');
      cardEl.style.setProperty('--text-muted', '#546e7a');
      cardEl.style.setProperty('--accent-dark', '#00838f');
      cardEl.style.background = 'linear-gradient(145deg, #ffffff, #f0f8ff)';
      break;
    case 'digital':
      themeClass = 'digital-decor';
      decor.innerHTML = `
        <svg viewBox='0 0 400 400' class="grid-pattern" style="width: 100%; height: 100%; top: 0; left: 0;">
          <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 L 0 20" fill="none" stroke="#e0f2f7" stroke-width="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <svg viewBox='0 0 100 100' class="code-bracket" style="top: 5%; right: 5%; width: 60px; height: 60px;">
          <path d="M20 20L40 0V20L20 40ZM80 20L60 0V20L80 40Z" fill="#b2ebf2"/>
          <path d="M50 10L60 0L70 10L60 20Z" fill="#80deea"/>
          <path d="M20 60L40 40V60L20 80ZM80 60L60 40V60L80 80Z" fill="#b2ebf2"/>
          <path d="M50 90L60 80L70 90L60 100Z" fill="#80deea"/>
        </svg>
        <svg viewBox='0 0 100 100' class="wifi-signal" style="bottom: 10%; left: 10%; width: 70px; height: 70px;">
          <path d="M50 75L50 85M50 65A10 10 0 0 0 40 75M50 55A20 20 0 0 0 30 75M50 45A30 30 0 0 0 20 75" fill="none" stroke="#64b5f6" stroke-width="5" stroke-linecap="round"/>
        </svg>
      `;
      document.body.style.background = 'linear-gradient(180deg, #e3f2fd, #bbdefb)'; // Lighter blue to medium blue
      cardEl.style.setProperty('--text-main', '#1a237e');
      cardEl.style.setProperty('--text-muted', '#3f51b5');
      cardEl.style.setProperty('--accent-dark', '#1976d2');
      cardEl.style.background = 'linear-gradient(145deg, #f0f8ff, #e3f2fd)';
      break;
    case 'environment':
      themeClass = 'environment-decor';
      decor.innerHTML = `
<svg viewBox='0 0 100 100' class="leaf" style="top: 5%; left: 5%; width: 90px; height: 90px;">
          <path d="M50 10 Q70 0 90 20 Q100 50 80 70 Q60 90 50 80 Q40 90 20 70 Q0 50 10 20 Q30 0 50 10 Z" fill="#a5d6a7"/>
        </svg>
        <svg viewBox='0 0 100 100' class="sun" style="top: 10%; right: 10%; width: 80px; height: 80px;">
          <circle cx="50" cy="50" r="20" fill="#ffecb3"/>
          <line x1="50" y1="10" x2="50" y2="20" stroke="#ffeb3b" stroke-width="4" stroke-linecap="round"/>
          <line x1="50" y1="80" x2="50" y2="90" stroke="#ffeb3b" stroke-width="4" stroke-linecap="round"/>
          <line x1="10" y1="50" x2="20" y2="50" stroke="#ffeb3b" stroke-width="4" stroke-linecap="round"/>
          <line x1="80" y1="50" x2="90" y2="50" stroke="#ffeb3b" stroke-width="4" stroke-linecap="round"/>
          <line x1="22.5" y1="22.5" x2="29" y2="29" stroke="#ffeb3b" stroke-width="4" stroke-linecap="round"/>
          <line x1="77.5" y1="77.5" x2="71" y2="71" stroke="#ffeb3b" stroke-width="4" stroke-linecap="round"/>
          <line x1="22.5" y1="77.5" x2="29" y2="71" stroke="#ffeb3b" stroke-width="4" stroke-linecap="round"/>
          <line x1="77.5" y1="22.5" x2="71" y2="29" stroke="#ffeb3b" stroke-width="4" stroke-linecap="round"/>
        </svg>
        <svg viewBox='0 0 100 100' class="water-drop" style="bottom: 5%; left: 15%; width: 60px; height: 60px;">
          <path d="M50 10 Q70 0 90 30 Q90 60 50 90 Q10 60 10 30 Q30 0 50 10 Z" fill="#90caf9"/>
        </svg>
      `;
      document.body.style.background = 'linear-gradient(180deg, #e8f5e9, #c8e6c9)'; // Lighter green to medium green
      cardEl.style.setProperty('--text-main', '#2e7d32');
      cardEl.style.setProperty('--text-muted', '#43a047');
      cardEl.style.setProperty('--accent-dark', '#388e3c');
      cardEl.style.background = 'linear-gradient(145deg, #f0fdf0, #e8f5e9)';
      break;
  }
  decor.classList.add(themeClass);
}

themeSelect.addEventListener('change', e => {
  state.theme = e.target.value;
  applyDecor();
});

templates.forEach(t => t.addEventListener('click', () => {
  templates.forEach(x => x.classList.remove('selected'));
  t.classList.add('selected');
  state.template = t.dataset.template;
  applyTemplateStyles(); // Apply template-specific styles
}));

function applyTemplateStyles() {
  // Reset card styles first to avoid conflicts
  cardEl.style.fontFamily = '';
  cardEl.style.background = 'linear-gradient(145deg, #ffffff, #f0f8ff)'; // Default
  cardEl.style.boxShadow = '0 20px 50px var(--shadow-medium)';
  cardEl.style.transform = 'scale(0.95)';

  // Apply theme-specific base background
  if (state.theme === 'peace') {
    cardEl.style.background = 'linear-gradient(145deg, #ffffff, #f0f8ff)';
  } else if (state.theme === 'digital') {
    cardEl.style.background = 'linear-gradient(145deg, #f0f8ff, #e3f2fd)';
  } else if (state.theme === 'environment') {
    cardEl.style.background = 'linear-gradient(145deg, #f0fdf0, #e8f5e9)';
}


  // Apply template-specific overrides
  switch (state.template) {
    case 'classic':
      // Default styles, subtle and clean
      break;
    case 'minimal':
      cardEl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
      cardEl.querySelector('.art').style.padding = '30px';
      cardEl.querySelector('h2').style.fontSize = '22px';
      cardEl.querySelector('p').style.fontSize = '14px';
      cardEl.querySelector('.footer').style.background = 'none';
      cardEl.querySelector('.footer').style.borderTop = 'none';
      break;
    case 'art':
      cardEl.style.transform = 'scale(1)'; // Larger
      cardEl.style.boxShadow = '0 25px 60px rgba(0,0,0,0.2)';
      cardEl.style.border = '2px solid var(--accent)';
      cardEl.querySelector('h2').style.fontFamily = "'Georgia', serif";
      cardEl.querySelector('p').style.fontStyle = 'italic';
      cardEl.querySelector('.footer').style.background = 'var(--accent)';
      cardEl.querySelector('.footer').style.color = 'white';
      break;
    case 'dream':
      cardEl.style.background = 'linear-gradient(135deg, #fce4ec, #e0f2f7, #e8f5e9)'; /* Pastel rainbow gradient */
      cardEl.style.boxShadow = '0 15px 45px rgba(255,193,7,0.2)'; /* Soft golden glow */
      cardEl.querySelector('h2').style.color = '#880e4f'; /* Darker pink */
      cardEl.querySelector('p').style.color = '#4a148c'; /* Darker purple */
      cardEl.querySelector('p#signText').style.color = '#f57f17'; /* Orange */
      cardEl.querySelector('.footer').style.background = 'linear-gradient(90deg, #ff8a80, #ffcc80)';
      cardEl.querySelector('.footer').style.color = 'white';
      break;
  }
}

el('#previewBtn').addEventListener('click', () => {
  toText.textContent = 'Gửi: ' + (toInput.value || 'Người bạn');
  msgText.textContent = msgInput.value || 'Hòa bình bắt đầu từ một nụ cười, một hành động nhỏ bé mang lại yêu thương và sự thấu hiểu.';
  signText.textContent = '— ' + (signInput.value || 'Người gửi');
  applyTemplateStyles(); // Ensure styles are re-applied
});

el('#downloadBtn').addEventListener('click', () => {
  // Temporarily remove transform to ensure full capture
  const originalTransform = cardEl.style.transform;
  cardEl.style.transform = 'none';
  html2canvas(document.querySelector('#card'), { scale: 2, useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'thiep_hoa_binh.png';
    a.click();
    cardEl.style.transform = originalTransform; // Restore transform
  });
});


// --- BẮT ĐẦU CODE CHO GÓC LAN TỎA (STATIC) ---

const galleryBtn = el('#galleryBtn');
const galleryContainer = el('#galleryContainer');

// Dữ liệu hai thông điệp mặc định
const defaultMessages = [
    { 
        to: "Thế hệ trẻ sau này", 
        msg: "Các anh hùng đã chiến đấu cho chúng ta có một nền hòa bình. Trách nhiệm của các bạn là dùng trí tuệ và lòng nhân ái để xóa bỏ mọi ranh giới, kết nối tri thức, và lan tỏa yêu thương. Hãy sống xứng đáng với những gì cha ông đã hy sinh!", 
        sign: "Nguyễn Khả Doanh", 
        theme: "peace"
    },
    { 
        to: "Thế hệ cha ông", 
        msg: "Chúng con xin gửi lòng tri ân sâu sắc nhất. Sự hy sinh và tinh thần quật cường của cha ông là ngọn đuốc soi đường cho chúng con. Chúng con sẽ dùng trí tuệ và công nghệ để bảo vệ và viết tiếp trang sử vàng của dân tộc.", 
        sign: "Dương Ngọc Trân", 
        theme: "digital"
    }
];

// Hàm để render một thiệp tĩnh lên thư viện
function renderCardToGallery(cardData) {
  // Lấy các biến màu từ CSS (để đảm bảo màu Đỏ-Vàng)
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const textMain = getComputedStyle(document.documentElement).getPropertyValue('--text-main').trim();
  const textMuted = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();

  const cardDiv = document.createElement('div');
  cardDiv.className = 'gallery-card';
  cardDiv.classList.add(cardData.theme + '-theme'); 

  // Tạo nội dung tĩnh (không có nút Like)
  cardDiv.innerHTML = `
    <div class="to" style="color: ${accent};">Gửi: ${cardData.to}</div>
    <p class="msg" style="color: ${textMain};">"${cardData.msg}"</p>
    <div class="sign" style="color: ${textMuted};">— ${cardData.sign}</div>
  `;

  galleryContainer.appendChild(cardDiv);
}

// Hàm tải gallery với 2 thông điệp mặc định
function loadGallery() {
    galleryContainer.innerHTML = ''; // Xóa nội dung cũ (nếu có)
    
    // Hiển thị hai thông điệp mặc định
    defaultMessages.forEach(msg => renderCardToGallery(msg));
}

// Cập nhật lại logic Gửi thông điệp (chỉ thông báo, loại bỏ localStorage)
galleryBtn.addEventListener('click', () => {
    // 1. Lấy dữ liệu
    const to = toInput.value || 'Người bạn';
    const msg = msgInput.value;
    const sign = signInput.value || 'Người gửi';
    
    // Kiểm tra xem người dùng đã viết gì đó chưa 
    const defaultMsg = 'Hòa bình bắt đầu từ một nụ cười, một hành động nhỏ bé mang lại yêu thương và sự thấu hiểu.';
    const placeholderMsg = "Mẹ Lạng đã chọn 'mất con' để tổ quốc 'không mất nước'. Câu chuyện hòa bình của bạn là gì?";
    
    if (msg.length < 5 || msg === defaultMsg || msg === placeholderMsg) {
        alert('Hãy viết một thông điệp ý nghĩa của riêng bạn trước khi gửi nhé!');
        return;
    }
    
    // Chỉ thông báo gửi thành công
    alert(`Thông điệp của bạn đã được gửi đi thành công! 
    - Gửi tới: ${to}
    - Thông điệp: "${msg}"
    - Ký tên: ${sign}`);
});

// --- KẾT THÚC CODE GÓC LAN TỎA (STATIC) ---


// --- CODE CHO MÀN HÌNH CHÀO MỪNG VÀ NHẠC NỀN ---
const welcomeScreen = el('#welcomeScreen');
const startBtn = el('#startBtn');
const declarationAudio = el('#declarationAudio');
const musicBtn = el('#musicBtn');
const bgMusic = el('#bgMusic');
let isMusicPlaying = false;

// Sự kiện khi bấm nút [Bắt đầu hành trình]
startBtn.addEventListener('click', () => {
  // 1. Phát Tuyên ngôn Độc lập
  declarationAudio.play()
    .then(() => {
      // Phát thành công: ẩn màn hình và hiện nội dung
      welcomeScreen.classList.add('hidden');
      document.body.classList.remove('content-hidden');
      document.body.classList.add('content-visible');
    })
    .catch(error => {
      console.warn("Lỗi phát audio (Tuyên ngôn Độc lập):", error);
      // Nếu lỗi (thường do trình duyệt chặn), vẫn hiện nội dung để không bị kẹt
      alert("Lưu ý: Không thể phát Tuyên ngôn Độc lập. Vui lòng kiểm tra file audio.");
      welcomeScreen.classList.add('hidden');
      document.body.classList.remove('content-hidden');
      document.body.classList.add('content-visible');
    });
});

// --- KẾT THÚC CODE MÀN HÌNH CHÀO MỪNG ---


// Initial calls
updateChar();
applyDecor();
applyTemplateStyles(); // Apply initial template styles
el('#previewBtn').click(); // Trigger initial preview to show default text
loadGallery(); // Khởi tạo Góc Lan Tỏa với 2 thông điệp mặc định
