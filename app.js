
    // --- DOM ELEMENTS ---
    const el = s => document.querySelector(s);
    const els = s => document.querySelectorAll(s);

    const welcomeScreen = el('#welcomeScreen');
    const startBtn = el('#startBtn');
    const audio = el('#declarationAudio');
    const toggleAudioBtn = el('#toggleAudioBtn');

    const themeSelect = el('#themeSelect');
    const templateOptions = els('.template-option');
    const toInput = el('#toInput'), msgInput = el('#msgInput'), signInput = el('#signInput');
    const charCount = el('#charCount');
    const previewBtn = el('#previewBtn'), shareBtn = el('#shareBtn'), downloadBtn = el('#downloadBtn');

    const cardPreview = el('#cardPreview');
    const cardDecor = el('#cardDecor');
    const cardTo = el('#cardTo'), cardMsg = el('#cardMsg'), cardSign = el('#cardSign');
    const galleryGrid = el('#galleryGrid');

    // --- STATE ---
    let currentTheme = 'peace';
    let currentTemplate = 'classic';

    // --- AUDIO & WELCOME ---
    startBtn.addEventListener('click', () => {
      welcomeScreen.classList.add('hidden');
      document.body.classList.remove('content-hidden');
      document.body.classList.add('content-visible');
      audio.play().catch(() => {
          toggleAudioBtn.textContent = '🔇 Bật âm thanh';
          alert('Vui lòng bật âm thanh thủ công để nghe Tuyên ngôn.');
      });
    });

    toggleAudioBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play(); toggleAudioBtn.textContent = '🔊 Dừng đọc';
      } else {
        audio.pause(); toggleAudioBtn.textContent = '🔇 Tiếp tục nghe';
      }
    });
    audio.addEventListener('ended', () => toggleAudioBtn.textContent = '🔄 Nghe lại');

    // --- CARD CREATION LOGIC ---
    
    // 1. Update Character Count
    msgInput.addEventListener('input', () => {
      charCount.textContent = `${msgInput.value.length}/250`;
    });

    // 2. Handle Theme Change
    const themeDecors = {
        peace: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10,50 Q25,25 50,50 T90,50" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="20" cy="30" r="5" fill="currentColor"/><circle cx="80" cy="70" r="8" fill="currentColor"/></svg>`,
        love: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,90 C20,60 0,40 0,25 C0,10 15,0 30,0 C40,0 50,10 50,20 C50,10 60,0 70,0 C85,0 100,10 100,25 C100,40 80,60 50,90 Z" fill="currentColor"/></svg>`,
        future: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,90 L50,50 M50,50 L30,30 M50,50 L70,30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="30" cy="30" r="10" fill="currentColor"/><circle cx="70" cy="30" r="10" fill="currentColor"/></svg>`
    };

    themeSelect.addEventListener('change', () => {
      currentTheme = themeSelect.value;
      cardPreview.setAttribute('data-theme', currentTheme);
      cardDecor.innerHTML = themeDecors[currentTheme];
    });

    // 3. Handle Template Change
    templateOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        templateOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        currentTemplate = opt.dataset.template;
        // Áp dụng style template (ví dụ đơn giản)
        cardPreview.style.fontFamily = currentTemplate === 'artistic' ? "'Dancing Script', cursive" : (currentTemplate === 'modern' ? "'Montserrat', sans-serif" : "'Poppins', sans-serif");
      });
    });

    // 4. Update Preview
    function updatePreview() {
      cardTo.textContent = `Gửi: ${toInput.value.trim() || 'Mọi người'}`;
      cardMsg.textContent = msgInput.value.trim() || 'Hãy cùng nhau lan tỏa yêu thương và xây dựng một thế giới hòa bình...';
      cardSign.textContent = `— ${signInput.value.trim() || 'Một người bạn'}`;
    }
    previewBtn.addEventListener('click', updatePreview);

    // 5. Share to Gallery
    shareBtn.addEventListener('click', () => {
      const msg = msgInput.value.trim();
      if (msg.length < 10) return alert('Vui lòng viết thông điệp dài hơn 10 ký tự!');
      
      updatePreview();
      
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.style.borderTop = `4px solid var(--accent-${currentTheme === 'love' ? 'red' : (currentTheme === 'future' ? 'gold' : 'blue')})`; // Màu viền tạm
      galleryItem.innerHTML = `
        <div class="to">Gửi: ${toInput.value.trim() || 'Ẩn danh'}</div>
        <div class="msg">${msg}</div>
        <div class="sign">— ${signInput.value.trim() || 'Người giấu tên'}</div>
      `;
      galleryGrid.prepend(galleryItem);
      
      alert('Thông điệp đã được gửi lên Bảng vàng!');
      galleryGrid.scrollIntoView({ behavior: 'smooth' });
      
      // Reset form
      toInput.value = ''; msgInput.value = ''; signInput.value = ''; charCount.textContent = '0/250';
      updatePreview();
    });

    // 6. Download Card
    downloadBtn.addEventListener('click', () => {
        updatePreview();
        const originalTransform = cardPreview.style.transform;
        cardPreview.style.transform = 'none'; // Reset scale để chụp ảnh nét
        html2canvas(cardPreview, { scale: 2, useCORS: true, backgroundColor: null }).then(canvas => {
            const link = document.createElement('a');
            link.download = `Thiep-HoaBinh-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            cardPreview.style.transform = originalTransform; // Restore hover effect
        });
    });

    // --- INIT ---
    // Load một số thông điệp mẫu
    const sampleMessages = [
        { to: "Thế hệ tương lai", msg: "Chúng tôi xin hứa sẽ gìn giữ màu xanh của hòa bình mà cha ông đã đánh đổi bằng xương máu, để các bạn được sống trong một thế giới tốt đẹp hơn.", sign: "Minh Anh, 2025" },
        { to: "Các Anh hùng Liệt sĩ", msg: "Lòng biết ơn vô hạn! Chúng con sẽ viết tiếp câu chuyện của các Người bằng trí tuệ và sự đoàn kết.", sign: "Nhóm Tuổi Trẻ Sáng Tạo" }
    ];
    sampleMessages.forEach(item => {
        const div = document.createElement('div'); div.className = 'gallery-item';
        div.innerHTML = `<div class="to">Gửi: ${item.to}</div><div class="msg">${item.msg}</div><div class="sign">— ${item.sign}</div>`;
        galleryGrid.appendChild(div);
    });
    
    // Kích hoạt theme/decor mặc định
    themeSelect.dispatchEvent(new Event('change'));
    // Thêm font phụ cho template nghệ thuật (cần link Google Fonts)
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
