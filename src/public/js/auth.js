
const logoutBtn = document.querySelector('.logoutBtn');
        if(logoutBtn){
             logoutBtn.addEventListener('click', async (e) => {
                   e.preventDefault();
                    console.log('logout');
                    try {
                        const response = await fetch('/logout', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            
                        });

                        if (!response.ok) {
                            throw new Error('failed');
                        }

                        const data = await response.json();

                        
                        sessionStorage.setItem(
                            'message2',
                            JSON.stringify({ message2: data.message2 })
                        );
                        
                        location.reload();

                    } catch (error) {
                        console.error('Login error:', error);
                    }
                });
            }
     //login----------
            const loginBtn = document.getElementById('loginBtn');
            const loginForm = document.getElementById('login-form');
            if(loginBtn && loginForm) {
            loginBtn.addEventListener('click', function(event) {
                loginForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    try {
                        const response = await fetch('/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: document.getElementById('email2').value,
                                password: document.getElementById('password2').value,
                            }),
                        });

                        if (!response.ok) {
                            throw new Error('Login failed');
                        }

                        const data = await response.json();

                        
                        sessionStorage.setItem(
                            'message1',
                            JSON.stringify({ message1: data.message1 })
                        );
                        sessionStorage.setItem(
                            'message2',
                            JSON.stringify({ message2: data.message2 })
                        );
                        sessionStorage.setItem(
                            'message3',
                            JSON.stringify({ message3: data.message3 })
                        );
                        location.reload();

                    } catch (error) {
                        console.error('Login error:', error);
                    }
                });
            });
            }
        //register
        const registerBtn = document.getElementById('registerBtn');
        const registerForm = document.getElementById('register-form');
        if(registerBtn && registerForm){
        registerBtn.addEventListener('click', function(event) {
                registerForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    try {
                        const response = await fetch('/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: document.getElementById('name').value,
                                email: document.getElementById('email').value,
                                password: document.getElementById('password').value,
                            }),
                        });

                        if (!response.ok) {
                            throw new Error('failed');
                        }

                        const data = await response.json();

                        
                        sessionStorage.setItem(
                            'message2',
                            JSON.stringify({ message2: data.message2 })
                        );
                        sessionStorage.setItem(
                            'message3',
                            JSON.stringify({ message3: data.message3 })
                        );
                        location.reload();

                    } catch (error) {
                        console.error('Login error:', error);
                    }
                });
            });
        }

             
            //toast sau reload
        document.addEventListener('DOMContentLoaded', () => {
            const data1 = sessionStorage.getItem('message1');
            const data2 = sessionStorage.getItem('message2');
            const data3 = sessionStorage.getItem('message3');
            if (data1&&JSON.parse(data1).message1!==undefined) {
                gToast.error(JSON.parse(data1).message1);
                sessionStorage.removeItem('message1');
            }else if (data2&&JSON.parse(data2).message2!==undefined) {
                gToast.success(JSON.parse(data2).message2);
                sessionStorage.removeItem('message2');
            }else if (data3&&JSON.parse(data3).message3!==undefined) {
                gToast.warning(JSON.parse(data3).message3);
                sessionStorage.removeItem('message3');
            }
            });
        
        


        //toast
        const gToast = (() => {
            const container = document.getElementById('g-toast-box-container');
            
            const icons = {
                success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
                error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
                warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
                info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
            };

            const defaultHeaders = {
                success: 'Thành công', error: 'Lỗi', warning: 'Cảnh báo', info: 'Thông báo'
            };

            const create = (type, message, header, duration = 5000) => {
                const toastItem = document.createElement('div');
                toastItem.className = `g-toast-item g-toast-${type}`;
                const titleText = header || defaultHeaders[type];

                toastItem.innerHTML = `
                    <div class="g-toast-icon-wrap">${icons[type]}</div>
                    <div class="g-toast-content">
                        <div class="g-toast-header">${titleText}</div>
                        <div class="g-toast-body-container">
                            <span class="g-toast-body-text">${message}</span>
                        </div>
                    </div>
                    <button class="g-toast-close-btn" aria-label="Đóng">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div class="g-toast-progress-bar">
                        <div class="g-toast-progress-fill" style="animation: g-toast-progress-anim ${duration}ms linear forwards"></div>
                    </div>
                `;

                container.appendChild(toastItem);

                // Kiểm tra nội dung có bị tràn không để kích hoạt marquee
                const bodyContainer = toastItem.querySelector('.g-toast-body-container');
                const bodyText = toastItem.querySelector('.g-toast-body-text');
                
                if (bodyText.offsetWidth > bodyContainer.offsetWidth) {
                    // Nhân đôi nội dung để tạo vòng lặp mượt mà
                    bodyText.innerHTML = `${message} &nbsp;&nbsp;&nbsp;&nbsp; ${message}`;
                    bodyText.classList.add('g-toast-marquee');
                    // Tính toán thời gian chạy dựa trên độ dài chữ
                    const speed = 50; // pixels per second
                    const animDuration = (bodyText.offsetWidth / 2) / speed;
                    bodyText.style.setProperty('--g-duration', `${animDuration}s`);
                }

                const closeBtn = toastItem.querySelector('.g-toast-close-btn');
                closeBtn.onclick = () => remove(toastItem);

                const timer = setTimeout(() => remove(toastItem), duration);
                toastItem.dataset.timer = timer;
            };

            const remove = (el) => {
                if (!el || el.classList.contains('g-toast-leaving')) return;
                el.classList.add('g-toast-leaving');
                clearTimeout(el.dataset.timer);
                el.addEventListener('animationend', (e) => {
                    if (e.animationName === 'g-toast-slide-out') el.remove();
                });
            };

            return {
                success: (m, h) => create('success', m, h),
                error: (m, h) => create('error', m, h, 7000),
                warning: (m, h) => create('warning', m, h),
                info: (m, h) => create('info', m, h)
            };
        })();