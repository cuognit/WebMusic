
       // --- DOM Elements ---
        const trackListBody = document.getElementById('trackList');
        const addTrackBtn = document.getElementById('addTrackBtn');
        const trackModal = document.getElementById('trackModal');
        const trackModalEdit = document.getElementById('trackModaledit');
        const modalContent = document.getElementById('modalContent');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const trackForm = document.getElementById('trackForm');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const checkAll = document.getElementById('checkAll');
        const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
        const searchInput = document.getElementById('searchTrack');
        const emptyMessage = document.getElementById('emptyMessage');
        const loadingMessage = document.getElementById('loadingMessage');
        const confirmModal = document.getElementById('confirmModal');
        const confirmContent = document.getElementById('confirmContent');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        const executeDeleteBtn = document.getElementById('executeDeleteBtn');
        const detailBtn = document.querySelectorAll('.detail-btn');
        const editBtn = document.querySelectorAll('.edit-btn');
        const deleteBtn = document.querySelectorAll('.delete-btn');
        // Detail Modal Elements
        const detailModal = document.getElementById('detailModal');
        const detailContent = document.getElementById('detailContent');
        const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
        const trackDetailsContainer = document.getElementById('trackDetailsContainer');
        const detailEditBtn = document.getElementById('detailEditBtn');
    
        const saveTrackBtn = document.getElementById('saveTrackBtn');


        // --- Utility Functions ---

        /**
         * Hiển thị modal với hiệu ứng chuyển tiếp
         * @param {HTMLElement} modalElement 
         * @param {HTMLElement} contentElement 
         */
        function showModal(modalElement) {
            modalElement.classList.remove('hidden-modal');
            // Thêm class 'show' để kích hoạt transition CSS
            setTimeout(() => {
                modalElement.classList.add('show');
            }, 10);
            
        }
            // Mở modal thêm bài hát
        addTrackBtn.addEventListener('click', () => {  
            showModal(trackModal);
            clearValue();
            submitForm(modalTitle.textContent); 
         });
        
            

          // Mở modal chi tiết bài hát
        detailBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                showModal(detailModal);
                const DataID = btn.getAttribute('data-id');   
                const song = songs.find(song => song._id === DataID);
                trackDetailsContainer.innerHTML = `
                
                <img src="${song.image}" class="detail-image" onerror="this.onerror=null;this.src='https://placehold.co/300x200/4f46e5/ffffff?text=Image+Not+Available';" alt="Ảnh bìa bài hát">
                <div class="detail-info">
                    <h3 class="detail-info-item"><span class="detail-label">Tên Bài Hát:</span> <span id="detailTrackTitle" style="color: var(--color-primary);"></span></h3>
                    <h3 class="detail-info-item"><span class="detail-label">Ca Sĩ:</span> <span id="detailTrackArtist" style="color: var(--color-primary);"></span></h3>
                    <h3 class="detail-info-item"><span class="detail-label">Album:</span> <span id="detailTrackAlbum" style="color: var(--color-primary);"></span></h3>
                    <h3 class="detail-info-item"><span class="detail-label">Thể loại:</span> <span id="detailTrackGenre" style="color: var(--color-primary);"></span></h3>
                    <h3 class="detail-info-item"><span class="detail-label">Năm phát hành:</span> <span id="detailTrackYear" style="color: var(--color-primary);"></span></h3>
                    <h3 class="detail-info-item"><span class="detail-label">Lượt xem:</span> <span id="detailTrackViews" style="color: var(--color-primary);"></span></h3>
                    <h3 class="detail-info-item"><span class="detail-label">Lượt thích:</span> <span id="detailTrackLikes" style="color: var(--color-primary);"></span></h3>
                    <h3 class="detail-info-item"><span class="detail-label">Đường dẫn File nhạc:</span> <a href="/?videoId=${song.fileUrl}" target="_blank" id="detailTrackFileUrl" style="color: var(--color-primary); text-decoration: underline;">Nghe ngay</a></h3>
                    <h3 class="detail-info-item"><span class="detail-label">Đường dẫn Ảnh bìa:</span> <a href="#" target="_blank" id="detailTrackImageUrl" style="color: var(--color-primary); text-decoration: underline;">Xem ảnh</a></h3>
                    <h3 class="detail-info-item"><span class="detail-label">Mô tả:</span></h3>
                    <p id="detailTrackDescription" style="color: #4b5563; line-height: 1.5; margin-top: 0.5rem;"></p>
                </div> `;
                // Điền dữ liệu vào modal
                document.getElementById('detailTrackTitle').textContent = song.title || 'N/A';
                document.getElementById('detailTrackArtist').textContent = song.artist || 'N/A';
                document.getElementById('detailTrackAlbum').textContent = song.album || 'N/A';
                document.getElementById('detailTrackGenre').textContent = song.genre || 'N/A';
                document.getElementById('detailTrackYear').textContent = song.year || 'N/A';
                document.getElementById('detailTrackViews').textContent = song.views || 0;
                document.getElementById('detailTrackLikes').textContent = song.likes || 0;
                document.getElementById('detailTrackImageUrl').href = song.image || '#';
                document.getElementById('detailTrackDescription').textContent = song.description || 'N/A';
                
                detailEditBtn.onclick = () => {
                    hideModal(detailModal); 
                    showModal(trackModal);
                    const DataID = btn.getAttribute('data-id');   
                    const song = songs.find(song => song._id === DataID);
                    addValue(song);
                    submitForm(modalTitle.textContent);
                    };  
            });
        });
        // Cập nhật liên kết chỉnh sửa
                function addValue(song){
                    document.getElementById('trackId').value = song._id;
                    document.getElementById('title').value = song.title;
                    document.getElementById('artist').value = song.artist;
                    document.getElementById('album').value = song.album;
                    document.getElementById('genre').value = song.genre;
                    document.getElementById('year').value = song.year;
                    document.getElementById('fileUrl').value = song.fileUrl;
                    document.getElementById('description').value = song.description;
                    document.getElementById('modalTitle').textContent = 'Chỉnh Sửa Bài Hát'; 
                }
                function clearValue(){
                    document.getElementById('trackId').value = '';
                    document.getElementById('title').value = '';
                    document.getElementById('artist').value = '';
                    document.getElementById('album').value = '';
                    document.getElementById('genre').value = '';
                    document.getElementById('year').value = '';
                    document.getElementById('fileUrl').value = '';
                    document.getElementById('description').value = '';
                    document.getElementById('modalTitle').textContent = 'Thêm Bài Hát Mới'; 
                }
        // hàm submitform
                function submitForm(modalTitle){
                saveTrackBtn.addEventListener('click', () => { 
                    trackForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    if(modalTitle =='Thêm Bài Hát Mới'){
                        try{
                    await fetch('/admin/addSong',{
                        method: 'POST',
                        body: JSON.stringify({
                            title: document.getElementById('title').value,
                            artist: document.getElementById('artist').value,
                            album: document.getElementById('album').value,
                            genre: document.getElementById('genre').value,
                            year: document.getElementById('year').value,
                            fileUrl: document.getElementById('fileUrl').value,
                            description: document.getElementById('description').value,
                        }),                       
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
                        hideModal(confirmModal);
                        sessionStorage.setItem('message', JSON.stringify({message: data.message}));                       
                        location.reload();             
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                    });
                    }
                    catch{
                        console.log('error');
                    }
                    }
                    else if(modalTitle =='Chỉnh Sửa Bài Hát'){
                        try{
                        const trackId = document.getElementById('trackId');
                        await fetch(`/admin/editSong/${trackId.value}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            title: document.getElementById('title').value,
                            artist: document.getElementById('artist').value,
                            album: document.getElementById('album').value,
                            genre: document.getElementById('genre').value,
                            year: document.getElementById('year').value,
                            fileUrl: document.getElementById('fileUrl').value,
                            description: document.getElementById('description').value,
                        }),                       
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
                        hideModal(confirmModal);
                        sessionStorage.setItem('message', JSON.stringify({message: data.message}));                       
                        location.reload();             
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                    });
                    }
                    catch{
                        console.log('error');
                    }
                    }
                });
                });}
        // Mở modal sửa 
        editBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                showModal(trackModal);
                const DataID = btn.getAttribute('data-id');   
                const song = songs.find(song => song._id === DataID);
                addValue(song); 

                submitForm(modalTitle.textContent)
                 
            });
        });

        // Mở modal xác nhận xóa
        deleteBtn.forEach(btn => { 
            btn.addEventListener('click', () => {
                showModal(confirmModal);});
        });
        // delete many
        bulkDeleteBtn.addEventListener('click', () => {
            showModal(confirmModal);
            executeDeleteBtn.onclick = async () =>  {
                    try{
                    await fetch(`/admin/deleteManySong/${dataid}`, {
                        method: 'PATCH',
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
                        hideModal(confirmModal);
                        sessionStorage.setItem('message', JSON.stringify({message: data.message}));
                        
                        location.reload();
                         
                        
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                    });
                    }
                    catch{
                        console.log('error');
                    }
                };
        });




        /**
         * Ẩn modal với hiệu ứng chuyển tiếp
         * @param {HTMLElement} modalElement 
         * @param {HTMLElement} contentElement 
         */
        function hideModal(modalElement) {
            modalElement.classList.remove('show');
            setTimeout(() => {
                modalElement.classList.add('hidden-modal');
            }, 300); // Đợi cho hiệu ứng chuyển tiếp kết thúc
        }



        // Đóng các modal
        closeModalBtn.addEventListener('click', () => {hideModal(trackModal); clearValue();});
        trackModal.addEventListener('click', (e) => {
            if (e.target.id === 'trackModal') {
                hideModal(trackModal);
                clearValue();
            }
        });
        cancelDeleteBtn.addEventListener('click', () => hideModal(confirmModal));

        confirmModal.addEventListener('click', (e) => {
            if (e.target.id === 'confirmModal') {
                hideModal(confirmModal);
            }
        });
        closeDetailModalBtn.addEventListener('click', () => {hideModal(detailModal); clearValue();});
        detailModal.addEventListener('click', (e) => {
             if (e.target.id === 'detailModal') {
                hideModal(detailModal);
            }
        });
        
        const softDeleteButtons = document.querySelectorAll('#soft-delete-btn');
        softDeleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const trackId = button.getAttribute('data-id');
                executeDeleteBtn.onclick = async () =>  {
                    try{
                    await fetch(`/admin/deleteSong/${trackId}`, {
                        method: 'PATCH',
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
                        hideModal(confirmModal);
                        sessionStorage.setItem('message', JSON.stringify({message: data.message}));
                        location.reload();
       
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                    });
                    }
                    catch{
                        console.log('error');
                    }
                };
            });
        });

        // --- Checkbox and Bulk Actions ---

        /**
         * Cập nhật trạng thái nút xóa hàng loạt
         */
        const dataid=[];
        function updateBulkDeleteButton() {
            const checkedBoxes = document.querySelectorAll('.track-checkbox:checked');
            bulkDeleteBtn.disabled = checkedBoxes.length === 0;
            bulkDeleteBtn.classList.toggle('disabled', checkedBoxes.length === 0);
            bulkDeleteBtn.textContent = `Xóa Hàng Loạt (${checkedBoxes.length})`;
            if (checkedBoxes.length === 0) {
                bulkDeleteBtn.textContent = 'Xóa Hàng Loạt';
            }
        }
        
        /**
         * Cập nhật trạng thái checkbox tổng (Check All)
         */
        function updateCheckAllState() {
            const allCheckboxes = document.querySelectorAll('.track-checkbox');
            const checkedBoxes = document.querySelectorAll('.track-checkbox:checked');
             
            if (allCheckboxes.length > 0 && checkedBoxes.length === allCheckboxes.length) {
                checkAll.checked = true;
            } else if (checkedBoxes.length > 0) {
                checkAll.checked = false;
            } else {
                checkAll.checked = false;
            }
        }

        // Xử lý Check All
        checkAll.addEventListener('change', () => {
            const isChecked = checkAll.checked;
            document.querySelectorAll('#trackList tr .track-checkbox').forEach(cb => {
                cb.checked = isChecked;
                const id = cb.getAttribute('data-id');
                if(cb.checked) {
                dataid.push(id);
                }
                else{
                dataid.splice(dataid.indexOf(id)-0, 1);
                }
            });
            updateBulkDeleteButton();
        });
        

        // Xử lý checkbox riêng lẻ
        trackListBody.addEventListener('change', (e) => {
            if (e.target.classList.contains('track-checkbox')) {
                updateCheckAllState();
                updateBulkDeleteButton();
            }
               
        });
        document.querySelectorAll('.track-checkbox').forEach(cb =>{
           cb.addEventListener('change', (e) => { 
            const id = cb.getAttribute('data-id');
             if(cb.checked) {
                dataid.push(id);
            }
            else{
                dataid.splice(dataid.indexOf(id)-0, 1);
                
            }
            });

        })

        //toast sau reload
        document.addEventListener('DOMContentLoaded', () => {
            const data = sessionStorage.getItem('message');
            if (data) {
                gToast.success(JSON.parse(data).message);
                sessionStorage.removeItem('message');
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
        