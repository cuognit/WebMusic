    document.addEventListener('DOMContentLoaded', () => {
            const data = sessionStorage.getItem('message');
            if (data) {
                gToast.success(JSON.parse(data).message);
                sessionStorage.removeItem('message');
            }
            });
            
    const likeIcons = document.querySelectorAll('.like_icon');
           
                likeIcons.forEach(icon =>  {
                    icon.parentElement.addEventListener('click', async () => {
                        if(icon.classList.contains('fa-regular')) {
                            icon.classList.remove('fa-regular');
                            icon.classList.add('fa-solid');
                            console.log('Liking song with ID:', icon.dataset.id);
                            try{
                                const songId = icon.dataset.id;
                                await fetch(`/user/like/${songId}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                })
                                .then((response) => {
                                    if (response.ok) {
                                        return response.json();
                                    } else {
                                        throw new Error('Network response was not ok');
                                    }
                                })
                                .then((data) => {
                                    sessionStorage.setItem('message', JSON.stringify({message: data.message}));
                                    location.reload();
                                })
                                .catch((error) => {
                                    console.error('Fetch error:', error);
                                });
                            }
                            catch(err){ console.error('Error liking song:', err); }
                        } else {
                            icon.classList.remove('fa-solid');
                            icon.classList.add('fa-regular');
                             try{
                                const songId = icon.dataset.id;
                                await fetch(`/user/like/${songId}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                })
                                .then((response) => {
                                    if (response.ok) {
                                        return response.json();
                                    } else {
                                        throw new Error('Network response was not ok');
                                    }
                                })
                                .then((data) => {
                                    sessionStorage.setItem('message', JSON.stringify({message: data.message}));
                                    location.reload();
                                })
                                .catch((error) => {
                                    console.error('Fetch error:', error);
                                });
                            }
                            catch(err){ console.error('Error liking song:', err); }

                        }
                });
            });

                    
                   
        // //toast sau reload
        // document.addEventListener('DOMContentLoaded', () => {
        //     const data = sessionStorage.getItem('message');
        //     if (data) {
        //         gToast.success(JSON.parse(data).message);
        //         sessionStorage.removeItem('message');
        //     }
        //     });


        // //toast
        // const gToast = (() => {
        //     const container = document.getElementById('g-toast-box-container');
            
        //     const icons = {
        //         success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
        //         error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
        //         warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        //         info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
        //     };

        //     const defaultHeaders = {
        //         success: 'Thành công', error: 'Lỗi', warning: 'Cảnh báo', info: 'Thông báo'
        //     };

        //     const create = (type, message, header, duration = 5000) => {
        //         const toastItem = document.createElement('div');
        //         toastItem.className = `g-toast-item g-toast-${type}`;
        //         const titleText = header || defaultHeaders[type];

        //         toastItem.innerHTML = `
        //             <div class="g-toast-icon-wrap">${icons[type]}</div>
        //             <div class="g-toast-content">
        //                 <div class="g-toast-header">${titleText}</div>
        //                 <div class="g-toast-body-container">
        //                     <span class="g-toast-body-text">${message}</span>
        //                 </div>
        //             </div>
        //             <button class="g-toast-close-btn" aria-label="Đóng">
        //                 <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        //             </button>
        //             <div class="g-toast-progress-bar">
        //                 <div class="g-toast-progress-fill" style="animation: g-toast-progress-anim ${duration}ms linear forwards"></div>
        //             </div>
        //         `;

        //         container.appendChild(toastItem);

        //         // Kiểm tra nội dung có bị tràn không để kích hoạt marquee
        //         const bodyContainer = toastItem.querySelector('.g-toast-body-container');
        //         const bodyText = toastItem.querySelector('.g-toast-body-text');
                
        //         if (bodyText.offsetWidth > bodyContainer.offsetWidth) {
        //             // Nhân đôi nội dung để tạo vòng lặp mượt mà
        //             bodyText.innerHTML = `${message} &nbsp;&nbsp;&nbsp;&nbsp; ${message}`;
        //             bodyText.classList.add('g-toast-marquee');
        //             // Tính toán thời gian chạy dựa trên độ dài chữ
        //             const speed = 50; // pixels per second
        //             const animDuration = (bodyText.offsetWidth / 2) / speed;
        //             bodyText.style.setProperty('--g-duration', `${animDuration}s`);
        //         }

        //         const closeBtn = toastItem.querySelector('.g-toast-close-btn');
        //         closeBtn.onclick = () => remove(toastItem);

        //         const timer = setTimeout(() => remove(toastItem), duration);
        //         toastItem.dataset.timer = timer;
        //     };

        //     const remove = (el) => {
        //         if (!el || el.classList.contains('g-toast-leaving')) return;
        //         el.classList.add('g-toast-leaving');
        //         clearTimeout(el.dataset.timer);
        //         el.addEventListener('animationend', (e) => {
        //             if (e.animationName === 'g-toast-slide-out') el.remove();
        //         });
        //     };

        //     return {
        //         success: (m, h) => create('success', m, h),
        //         error: (m, h) => create('error', m, h, 7000),
        //         warning: (m, h) => create('warning', m, h),
        //         info: (m, h) => create('info', m, h)
        //     };
        // })();
        