const el = s => document.querySelector(s);
const templates = document.querySelectorAll('.template');
const toInput = el('#toInput'), msgInput = el('#msgInput'), signInput = el('#signInput');
const toText = el('#toText'), msgText = el('#msgText'), signText = el('#signText');
const charCount = el('#charCount'), decor = el('#decor');
const themeSelect = el('#themeSelect');
const cardEl = el('#card'); 
const galleryBtn = el('#galleryBtn');
const galleryContainer = el('#galleryContainer');

// Các element liên quan đến âm thanh và màn hình chào
const welcomeScreen = el('#welcomeScreen');
const startBtn = el('#startBtn');
const declarationAudio = el('#declarationAudio');
const toggleAudioBtn = el('#toggleAudioBtn'); // Nút bật/tắt âm thanh mới thêm

let state = { template: 'classic', theme: 'peace' };

function updateChar() {
  charCount.textContent = `${msgInput.value.length}/300`;
}
msgInput.addEventListener('input', updateChar);

// --- 1. HÀM XỬ LÝ GIAO DIỆN & DECOR (THEME) ---
function applyDecor() {
  decor.innerHTML = ''; 
  decor.className = 'decor'; 
  let themeClass = '';

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
      document.body.style.background = 'linear-gradient(180deg, #e0f7fa, #bbdefb)';
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
      document.body.style.background = 'linear-gradient(180deg, #e3f2fd, #bbdefb)';
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
      document.body.style.background = 'linear-gradient(180deg, #e8f5e9, #c8e6c9)';
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

// --- 2. HÀM XỬ LÝ MẪU (TEMPLATE) ---
templates.forEach(t => t.addEventListener('click', () => {
  templates.forEach(x => x.classList.remove('selected'));
  t.classList.add('selected');
  state.template = t.dataset.template;
  applyTemplateStyles(); 
}));

function applyTemplateStyles() {
  cardEl.style.fontFamily = '';
  cardEl.style.background = 'linear-gradient(145deg, #ffffff, #f0f8ff)'; 
  cardEl.style.boxShadow = '0 20px 50px var(--shadow-medium)';
  cardEl.style.transform = 'scale(0.95)';

  // Set nền cơ bản theo theme
  if (state.theme === 'peace') {
    cardEl.style.background = 'linear-gradient(145deg, #ffffff, #f0f8ff)';
  } else if (state.theme === 'digital') {
    cardEl.style.background = 'linear-gradient(145deg, #f0f8ff, #e3f2fd)';
  } else if (state.theme === 'environment') {
    cardEl.style.background = 'linear-gradient(145deg, #f0fdf0, #e8f5e9)';
  }

  // Override theo template
  switch (state.template) {
    case 'classic':
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
      cardEl.style.transform = 'scale(1)'; 
      cardEl.style.boxShadow = '0 25px 60px rgba(0,0,0,0.2)';
      cardEl.style.border = '2px solid var(--accent)';
      cardEl.querySelector('h2').style.fontFamily = "'Georgia', serif";
      cardEl.querySelector('p').style.fontStyle = 'italic';
      cardEl.querySelector('.footer').style.background = 'var(--accent)';
      cardEl.querySelector('.footer').style.color = 'white';
      break;
    case 'dream':
      cardEl.style.background = 'linear-gradient(135deg, #fce4ec, #e0f2f7, #e8f5e9)';
      cardEl.style.boxShadow = '0 15px 45px rgba(255,193,7,0.2)'; 
      cardEl.querySelector('h2').style.color = '#880e4f'; 
      cardEl.querySelector('p').style.color = '#4a148c'; 
      cardEl.querySelector('p#signText').style.color = '#f57f17'; 
      cardEl.querySelector('.footer').style.background = 'linear-gradient(90deg, #ff8a80, #ffcc80)';
      cardEl.querySelector('.footer').style.color = 'white';
      break;
  }
}

// --- 3. HÀM XEM TRƯỚC VÀ TẢI VỀ ---
el('#previewBtn').addEventListener('click', () => {
  toText.textContent = 'Gửi: ' + (toInput.value || 'Người bạn');
  msgText.textContent = msgInput.value || 'Hòa bình bắt đầu từ một nụ cười, một hành động nhỏ bé mang lại yêu thương và sự thấu hiểu.';
  signText.textContent = '— ' + (signInput.value || 'Người gửi');
  applyTemplateStyles(); 
});

el('#downloadBtn').addEventListener('click', () => {
  const originalTransform = cardEl.style.transform;
  cardEl.style.transform = 'none';
  html2canvas(document.querySelector('#card'), { scale: 2, useCORS: true }).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'thiep_hoa_binh.png';
    a.click();
    cardEl.style.transform = originalTransform; 
  });
});

// --- 4. LOGIC GÓC LAN TỎA (GALLERY) ---
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

function renderCardToGallery(cardData) {
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const textMain = getComputedStyle(document.documentElement).getPropertyValue('--text-main').trim();
  const textMuted = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();

  const cardDiv = document.createElement('div');
  cardDiv.className = 'gallery-card';
  cardDiv.classList.add(cardData.theme + '-theme'); 

  cardDiv.innerHTML = `
    <div class="to" style="color: ${accent};">Gửi: ${cardData.to}</div>
    <p class="msg" style="color: ${textMain};">"${cardData.msg}"</p>
    <div class="sign" style="color: ${textMuted};">— ${cardData.sign}</div>
  `;

  // Thêm vào đầu danh sách (mới nhất lên trên) hoặc cuối danh sách
  galleryContainer.appendChild(cardDiv);
}

function loadGallery() {
    galleryContainer.innerHTML = '';
    defaultMessages.forEach(msg => renderCardToGallery(msg));
}

// Sự kiện nút Gửi lên bảng chung
galleryBtn.addEventListener('click', () => {
    // a. Lấy dữ liệu
    const to = toInput.value || 'Người bạn';
    const msg = msgInput.value;
    const sign = signInput.value || 'Người gửi';
    
    // b. Kiểm tra dữ liệu
    const defaultMsg = 'Hòa bình bắt đầu từ một nụ cười, một hành động nhỏ bé mang lại yêu thương và sự thấu hiểu.';
    const placeholderMsg = "Mẹ Lạng đã chọn 'mất con' để tổ quốc 'không mất nước'. Câu chuyện hòa bình của bạn là gì?";
    
    if (msg.length < 5 || msg === defaultMsg || msg === placeholderMsg) {
        alert('Hãy viết một thông điệp ý nghĩa của riêng bạn trước khi gửi nhé!');
        msgInput.focus();
        return;
    }
    
    // c. Tạo object dữ liệu mới
    const newCardData = {
        to: to,
        msg: msg,
        sign: sign,
        theme: state.theme
    };

    // d. Gọi hàm vẽ lên giao diện (Fix lỗi cũ)
    renderCardToGallery(newCardData);
    
    // e. Thông báo và cuộn xuống
    alert(`Thông điệp của bạn đã được gửi đi thành công!\nHãy kéo xuống dưới để xem nhé.`);
    
    msgInput.value = '';
    updateChar();

    galleryContainer.scrollIntoView({ behavior: 'smooth' });
});

// --- 5. LOGIC MÀN HÌNH CHÀO MỪNG & ÂM THANH ---

// Hàm cập nhật trạng thái nút âm thanh
function updateAudioBtnState() {
    if (!toggleAudioBtn) return; // Nếu chưa có nút thì bỏ qua
    
    if (declarationAudio.paused) {
        toggleAudioBtn.innerHTML = '🔇 Tiếp tục';
        toggleAudioBtn.classList.add('muted');
    } else {
        toggleAudioBtn.innerHTML = '🔊 Dừng đọc';
        toggleAudioBtn.classList.remove('muted');
    }
}

// Xử lý nút [Lắng nghe & Bắt đầu]
startBtn.addEventListener('click', () => {
  declarationAudio.play()
    .then(() => {
      welcomeScreen.classList.add('hidden');
      document.body.classList.remove('content-hidden');
      document.body.classList.add('content-visible');
      
      // Cập nhật nút điều khiển
      if(toggleAudioBtn) toggleAudioBtn.innerHTML = '🔊 Dừng đọc';
    })
    .catch(error => {
      console.warn("Lỗi phát audio:", error);
      alert("Không thể phát tự động. Vui lòng bấm nút 'Tiếp tục' trên thanh menu để nghe.");
      welcomeScreen.classList.add('hidden');
      document.body.classList.remove('content-hidden');
      document.body.classList.add('content-visible');
      
      if(toggleAudioBtn) toggleAudioBtn.innerHTML = '🔇 Bật tiếng';
    });
});

// Xử lý nút [Bật/Tắt âm thanh] trên menu
if (toggleAudioBtn) {
    toggleAudioBtn.addEventListener('click', () => {
        if (declarationAudio.paused) {
            declarationAudio.play();
            toggleAudioBtn.innerHTML = '🔊 Dừng đọc';
        } else {
            declarationAudio.pause();
            toggleAudioBtn.innerHTML = '🔇 Tiếp tục';
        }
    });
}

// Khi audio chạy hết thì đổi nút thành Phát lại
declarationAudio.addEventListener('ended', () => {
    if(toggleAudioBtn) toggleAudioBtn.innerHTML = '🔄 Phát lại';
});

// --- 6. KHỞI TẠO ---
updateChar();
applyDecor();
applyTemplateStyles(); 
el('#previewBtn').click(); 
loadGallery();
