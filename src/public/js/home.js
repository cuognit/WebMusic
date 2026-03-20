            //toast sau reload
        document.addEventListener('DOMContentLoaded', () => {
            const data = sessionStorage.getItem('message');
            if (data) {
                gToast.success(JSON.parse(data).message);
                sessionStorage.removeItem('message');
            }
            });
       
    //  const likeIcon = document.querySelector('.like_icon');
    //                 likeIcon.addEventListener('click', async () => {
    //                     console.log('Like icon clicked');
    //                     if(likeIcon.classList.contains('fa-regular')) {
    //                         likeIcon.classList.remove('fa-regular');
    //                         likeIcon.classList.add('fa-solid');
                            
    //                         try{
                                 
    //                             await fetch(`/user/like/${idLiked}`, {
    //                                 method: 'POST',
    //                                 headers: {
    //                                     'Content-Type': 'application/json',
    //                                 },
    //                             })
    //                             .then((response) => {
    //                                 if (response.ok) {
    //                                     return response.json();
    //                                 } else {
    //                                     throw new Error('Network response was not ok');
    //                                 }
    //                             })
    //                             .then((data) => {
    //                                 sessionStorage.setItem('message', JSON.stringify({message: data.message}));
    //                                 location.reload();
    //                             })
    //                             .catch((error) => {
    //                                 console.error('Fetch error:', error);
    //                             });
    //                         }
    //                         catch(err){ console.error('Error liking song:', err); }
    //                     } else {
    //                         likeIcon.classList.remove('fa-solid');
    //                         likeIcon.classList.add('fa-regular');
    //                     }
    //             });
           
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
        // Lấy các phần tử DOM
        const sidebar = document.getElementById('sidebar');
        const mainContainer = document.getElementById('main-container');
        
        const songCards = document.querySelectorAll('.song-card');
        
        // DOM Khu vực nội dung
       
        const playerView = document.getElementById('player-view');
        
        
        // DOM Thanh điều khiển (Control Bar)
        const playerMini = document.getElementById('music-player-mini');
        const toggleViewBtn = document.getElementById('toggle-view-btn');
        const toggleViewIconUp = document.getElementById('toggle-view-icon-up'); 
        const toggleViewIconDown = document.getElementById('toggle-view-icon-down');
        
        // DOM thông tin bài hát (mini)
        const miniImg = document.getElementById('mini-img');
        const miniTitle = document.getElementById('mini-title');
        const miniArtist = document.getElementById('mini-artist');
        
        // DOM thanh thời lượng (chính)
        const mainProgressBar = document.getElementById('main-progress-bar');
        const currentTimeText = document.getElementById('current-time-text');
        const durationTimeText = document.getElementById('duration-time-text');

        // DOM nút điều khiển
        const miniPlayBtn = document.getElementById('mini-play-btn');
        const miniPlayIconPlay = document.getElementById('mini-play-icon-play');
        const miniPlayIconPause = document.getElementById('mini-play-icon-pause');
        const miniSkipBackBtn = document.getElementById('mini-skip-back-btn');
        const miniSkipFwdBtn = document.getElementById('mini-skip-fwd-btn');
        
        // Nút mới
    
        const miniVolumeBtn = document.getElementById('mini-volume-btn');
        const miniRepeatBtn = document.getElementById('mini-repeat-btn');
        const miniShuffleBtn = document.getElementById('mini-shuffle-btn');
       
        const volumeSlider = document.getElementById('volume-slider'); 
        const volumeIcon = document.getElementById('volume-icon'); 
        
        const songCards_List = document.querySelectorAll('.player-queue-item'); 
        // --- THÊM: Biến cho YouTube API ---
        let player; // Biến này sẽ giữ đối tượng YT.Player
        // Trạng thái trình phát
        let isPlaying = false;
        let currentSongIndex = -1;
        const allSongs = Array.from(songCards).map(card => card.dataset);
        let currentTime = 0;
        let duration = 0; 
        let progressInterval = null;
        let isPlayerViewVisible = false;
        let playerReady = false;
        let ytbId;
        
        
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        // 2. Logic cho Trình phát nhạc
            window.addEventListener('load', () => {
                console.log('Window fully loaded');
                const params = new URLSearchParams(window.location.search);
                if(params.has('videoId')){
                    const videoId = params.get('videoId');
                    songCards_List.forEach((item) => {
                    const itemVideoId = item.getAttribute('data-fileUrl');
                    if(itemVideoId === videoId){            
                        item.style.backgroundColor = '#8d696f';
                    }             
                    });
                    document.getElementById('music-player-mini').classList.add('visible');
                    const songIndex = allSongs.findIndex(song => song.youtubeId === videoId);
                    if(songIndex !== -1){
                        playSong(songIndex);
                        showPlayerView();
                        updatePlayerUI(allSongs[songIndex].title, allSongs[songIndex].artist, allSongs[songIndex].img);   
                        unmuteOnInteraction();
                    }
                }
            });

        // --- Các hàm điều khiển ---

    
        window.onYouTubeIframeAPIReady = function () {
            player = new YT.Player('full-youtube-player', {
                height: '100%',
                width: '100%',
                videoId: '', // Sẽ được đặt khi phát
                playerVars: {
                    'autoplay': 1,        // Tự động phát khi tải
                    'controls': 0,        // Ẩn điều khiển gốc của YouTube
                    'modestbranding': 1,  // Ẩn logo YouTube (một phần)
                    'rel': 0,             // Không hiển thị video liên quan
                    'enablejsapi': 1,     // BẬT JS API
                    'origin': window.location.origin, // Quan trọng để bảo mật
                              
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    
                }
            });
        }
       
        
        // --- THÊM: Các hàm sự kiện của YouTube API ---

        // (1) Khi trình phát sẵn sàng
        function onPlayerReady(event) {
            playerReady = true; // Đánh dấu trình phát đã sẵn sàng
            console.log("YouTube Player is ready.");
            // Đặt âm lượng ban đầu từ thanh trượt
            player.setVolume(volumeSlider.value);

            // --- Autoplay on load (muted) ---
            // Nhiều trình duyệt chặn autoplay có âm thanh. Giải pháp: mute trước khi play.
            try {
                // Chỉ autoplay khi đã có bài được chọn (ví dụ từ param ?videoId=...) —
                // không tự động chọn bài đầu tiên trên load
                if (allSongs.length > 0 && currentSongIndex !== -1) {
                    // Mute trước khi phát để tránh bị chặn
                    if (player && typeof player.mute === 'function') {
                        player.mute();
                    }

                    // Play bài hiện tại (load và play)
                    playSong(currentSongIndex);
                    
                    if (player && typeof player.playVideo === 'function') {
                        // đảm bảo gọi playVideo nếu loadVideoById không play ngay
                        player.playVideo();
                    }

                    // Một lần: khi user tương tác (click), unmute và khôi phục volume
                    const unmuteOnInteraction = function() {
                        if (player && typeof player.unMute === 'function' && player.isMuted && player.isMuted()) {
                            player.unMute();
                            player.setVolume(volumeSlider.value);
                        }
                        document.removeEventListener('click', unmuteOnInteraction);
                    };
                    document.addEventListener('click', unmuteOnInteraction);
                }
            } catch (err) {
                console.warn('Autoplay flow error:', err);
            }
        }

        // (2) Khi trạng thái trình phát thay đổi (quan trọng nhất)
        function onPlayerStateChange(event) {
            const state = event.data;
            
            if (state === YT.PlayerState.PLAYING) {
                // Video đang phát
                isPlaying = true;
                updatePlayPauseIcons();
                
                // Lấy thời lượng thực tế
                duration = player.getDuration(); 
                durationTimeText.textContent = formatTime(duration);
                
                // Bắt đầu theo dõi tiến độ
                startProgressTracking();
                
            } else if (state === YT.PlayerState.PAUSED) {
                // Video tạm dừng
                isPlaying = false;
                updatePlayPauseIcons();
                stopProgressTracking();
                
            } else if (state === YT.PlayerState.ENDED) {
                // Video kết thúc
                isPlaying = false;
                updatePlayPauseIcons();
                stopProgressTracking();
                playNextSong(); // Tự động phát bài tiếp theo
            }
        }


        // --- SỬA: Các hàm điều khiển ---
        let idLiked;
        // (SỬA) Hàm này bây giờ sẽ gọi API
        function playSong(index) {
            // Nếu không có bài nào trong danh sách thì không làm gì
            if (!allSongs || allSongs.length === 0) return;

            // Lưu chỉ số yêu cầu ngay lập tức (để onPlayerReady có thể kiểm tra)
            currentSongIndex = index;
            if (currentSongIndex < 0) currentSongIndex = allSongs.length - 1;
            else if (currentSongIndex >= allSongs.length) currentSongIndex = 0;

            // Nếu player chưa khởi tạo xong, chờ rồi phát lại sau khi sẵn sàng
            if (!playerReady) {
                console.warn("⏳ Player chưa sẵn sàng, đang chờ...");
                // Hiện mini player (nếu chưa)
                if (playerMini && !playerMini.classList.contains('visible')) {
                    playerMini.classList.add('visible');
                }
                // Thử lại sau 300ms với chỉ số đã lưu
                setTimeout(() => playSong(currentSongIndex), 300);
                return;
            }

            // Hiện mini player
            playerMini.classList.add('visible');

            const songData = allSongs[currentSongIndex];

            // Cập nhật UI
            updatePlayerUI(songData.title, songData.artist, songData.img);

            // Phát video thật
            player.loadVideoById(songData.youtubeId);

            // Đặt lại thời lượng tạm
            duration = parseInt(songData.duration) || 0;
            durationTimeText.textContent = formatTime(duration);
            currentTime = 0;
            updateProgressUI();
            history.pushState(null, '', `?videoId=${songData.youtubeId}`);
            ytbId = new URLSearchParams(window.location.search).get('videoId');
            document.title = `${songData.title} - ${songData.artist}` ;
            idLiked = songData.id;
            console.log('Playing song:', songData.title, 'by', songData.artist, 'with YouTube ID:', songData.id);
            songCards_List.forEach((item) => {
            const itemVideoId = item.getAttribute('data-fileUrl');
            item.style.backgroundColor = '';
            if(itemVideoId === ytbId){            
                item.style.backgroundColor = '#8d696f';
              } 
            });       

            setTimeout(() => {
            let hasRunWatched = sessionStorage.getItem('hasRunWatched') === 'true';
            if(hasRunWatched === false){
                watched();    
            }
            sessionStorage.removeItem('hasRunWatched');

                }, 5000); // Gọi sau 5 giây
            
        }
        
        if(sessionStorage.getItem('hasRunWatched') === null){
            sessionStorage.setItem('hasRunWatched', 'false');
        }
        
        async function watched() { 
                try{
                                 
                    await fetch(`/user/watched/${idLiked}`, {
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
                        // sessionStorage.setItem('message', JSON.stringify({message: data.message}));
                        sessionStorage.setItem('hasRunWatched', 'true');                
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                    });}
                catch(err){ console.error('Error liking song:', err); }

                
            }


        // (SỬA) Hàm này bây giờ sẽ gọi API
        function togglePlayPause() {
            if (currentSongIndex === -1 || !player) return; 

            if (isPlaying) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
            // 'onPlayerStateChange' sẽ cập nhật 'isPlaying' và icon
        }

        function playNextSong() {
            playSong(currentSongIndex + 1);
        }

        function playPrevSong() {
            // Lấy thời gian hiện tại từ API
            const realCurrentTime = player.getCurrentTime() || 0;
            
            if (realCurrentTime > 3) {
                player.seekTo(0, true); // Quay lại đầu bài hát
            } else {
                playSong(currentSongIndex - 1); // Chuyển về bài trước
            }
        }

        // --- SỬA: Các hàm mô phỏng -> theo dõi UI ---

        // Xử lý danh sách trong trình phát nhạc
        
        songCards_List.forEach((item,index) => {
            item.addEventListener('click', () => {
                const fileUrl = item.getAttribute('data-fileUrl');
                const songIndex = allSongs.findIndex(song => song.youtubeId === fileUrl);
                if(songIndex !== -1)
                playSong(songIndex);
                songCards_List.forEach(i => i.style.backgroundColor = '');               
                if(item){
                    item.style.backgroundColor = '#8d696f';
                }             
            });       
        });
        // (SỬA) Tên hàm + Logic
        function startProgressTracking() {
            if (progressInterval) clearInterval(progressInterval);
            
            progressInterval = setInterval(() => {
                if (isPlaying && player && typeof player.getCurrentTime === 'function') {
                    // Lấy thời gian thực tế từ API
                    currentTime = player.getCurrentTime();
                    // Lấy thời lượng thực tế (có thể thay đổi một chút)
                    duration = player.getDuration(); 
                    updateProgressUI();
                }
            }, 250); // Cập nhật 4 lần mỗi giây cho mượt
        }

        // (SỬA) Tên hàm
        function stopProgressTracking() {
            clearInterval(progressInterval);
        }

        function updateProgressUI() {
            // Đảm bảo không chia cho 0
            const progressPercent = (duration > 0) ? (currentTime / duration) * 100 : 0;
            
            mainProgressBar.value = progressPercent;
            currentTimeText.textContent = formatTime(currentTime);
            // Cập nhật thời lượng (nếu chưa có)
            if (durationTimeText.textContent === "0:00" && duration > 0) {
                durationTimeText.textContent = formatTime(duration);
            }
        }

        function updatePlayPauseIcons() {
            if (isPlaying) {
                miniPlayIconPlay.classList.add('hidden');
                miniPlayIconPause.classList.remove('hidden');
            } else {
                miniPlayIconPlay.classList.remove('hidden');
                miniPlayIconPause.classList.add('hidden');
            }
        }

        function updatePlayerUI(title, artist, img) {
            miniImg.src = img;
            miniTitle.textContent = title;
            miniArtist.textContent = artist;
        }

        // (SỬA) Hàm này bây giờ sẽ gọi API
        function seek(percent) {
            if (currentSongIndex === -1 || !player) return;
            
            const newTime = (percent / 100) * duration;
            player.seekTo(newTime, true); // true = cho phép tua tới
            
            // Cập nhật UI ngay lập tức
            currentTime = newTime;
            updateProgressUI();
        }

        // --- Hàm tiện ích (Giữ nguyên) ---
        function formatTime(seconds) {
            seconds = Math.floor(seconds); // Đảm bảo là số nguyên
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }

        // --- Gán sự kiện (SỬA ĐỔI) ---

        songCards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.song-card-button')) {
                    e.stopPropagation(); 
                    console.log('Button clicked');
                    return;
                }
                playSong(index);
                showPlayerView();  

                const ytbId = new URLSearchParams(window.location.search).get('videoId');
                
                songCards_List.forEach((item) => {
                const itemVideoId = item.getAttribute('data-fileUrl');
                
                item.style.backgroundColor = '';
                if(itemVideoId === ytbId){            
                    item.style.backgroundColor = '#8d696f';
                    
                }         
                });
               
            });
        });
        
        playerMini.addEventListener('click', (e) => {
            if (currentSongIndex === -1) return; 

            // (Giữ nguyên logic bỏ qua)
            const nonToggleElement = e.target.closest(
                '#mini-skip-back-btn, #mini-play-btn, #mini-skip-fwd-btn, #mini-dislike-btn, #mini-like-btn, #main-progress-bar, #mini-volume-btn, #volume-slider, #mini-repeat-btn, #mini-shuffle-btn, #mini-more-btn'
            );
            if (nonToggleElement) return; 
            
            togglePlayerView();
        });

        
        miniPlayBtn.addEventListener('click', togglePlayPause);
        miniSkipBackBtn.addEventListener('click',playPrevSong);
        miniSkipFwdBtn.addEventListener('click', playNextSong);
        
        // SỬA: Dùng 'input' thay vì 'change' để cập nhật mượt hơn
        mainProgressBar.addEventListener('input', (e) => {
            // Tạm dừng cập nhật thời gian khi đang kéo
            stopProgressTracking();
        });
        
        // SỬA: Dùng 'change' để seek khi thả chuột
        mainProgressBar.addEventListener('change', (e) => {
            seek(e.target.value);
            // Bắt đầu lại việc theo dõi sau khi seek
            if (isPlaying) {
                startProgressTracking();
            }
        });


        // --- THÊM: Sự kiện cho Âm lượng ---
        const volumeIcons = {
            high: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>',
            low: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>',
            muted: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>'
        };

        let lastVolume = 100;

        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value;
            
            // THÊM: Gọi API
            if (player) player.setVolume(volume);
            
            lastVolume = volume; // Lưu âm lượng cuối
            
            // Cập nhật icon
            let iconHTML = volumeIcons.high;
            if (volume == 0) {
                iconHTML = volumeIcons.muted;
            } else if (volume < 50) {
                iconHTML = volumeIcons.low;
            }
            volumeIcon.innerHTML = iconHTML;
            
            // THÊM: Nếu đang Mute, hãy UnMute
            if (player && player.isMuted() && volume > 0) {
                player.unMute();
            }
        });
        
        // THÊM: Nút Mute/UnMute
        miniVolumeBtn.addEventListener('click', () => {
            if (!player) return;
            
            if (player.isMuted()) {
                // Đang Mute -> UnMute
                player.unMute();
                volumeSlider.value = lastVolume > 0 ? lastVolume : 50; // Khôi phục âm lượng
                volumeIcon.innerHTML = lastVolume > 50 ? volumeIcons.high : volumeIcons.low;
            } else {
                // Đang bật -> Mute
                lastVolume = volumeSlider.value; // Lưu lại âm lượng
                player.mute();
                volumeSlider.value = 0;
                volumeIcon.innerHTML = volumeIcons.muted;
            }
        });

         // --- THÊM: Sự kiện cho các nút mới ---

        // (Sự kiện Âm lượng đã có)
        // ...

        // THÊM: Sự kiện cho nút Repeat
        const repeatIconAll = document.getElementById('repeat-icon-all');
        const repeatIconOne = document.getElementById('repeat-icon-one');

        miniRepeatBtn.addEventListener('click', () => {
            if (repeatMode === 'none') {
                // Chuyển sang Lặp lại tất cả
                repeatMode = 'all';
                miniRepeatBtn.classList.add('active');
                repeatIconAll.classList.remove('hidden');
                repeatIconOne.classList.add('hidden');
            } else if (repeatMode === 'all') {
                // Chuyển sang Lặp lại một
                repeatMode = 'one';
                miniRepeatBtn.classList.add('active'); // Vẫn active
                repeatIconAll.classList.add('hidden');
                repeatIconOne.classList.remove('hidden');
            } else {
                // Chuyển về Tắt
                repeatMode = 'none';
                miniRepeatBtn.classList.remove('active');
                repeatIconAll.classList.remove('hidden');
                repeatIconOne.classList.add('hidden');
            }
        });

        // THÊM: Sự kiện cho nút Shuffle
        miniShuffleBtn.addEventListener('click', () => {
            isShuffled = !isShuffled; // Toggle trạng thái
            miniShuffleBtn.classList.toggle('active', isShuffled); // Thêm/xóa class 'active'
        });    
        
        // --- Hàm hiển thị Giao diện (Giữ nguyên) ---
        function showPlayerView() {
            playerView.classList.add('visible'); 
            toggleViewIconUp.classList.add('hidden'); 
            toggleViewIconDown.classList.remove('hidden'); 
            isPlayerViewVisible = true;
        }

        function showMainContentView() {
            playerView.classList.remove('visible'); 
            toggleViewIconUp.classList.remove('hidden'); 
            toggleViewIconDown.classList.add('hidden'); 
            isPlayerViewVisible = false;
        }

        function togglePlayerView() {
            if (isPlayerViewVisible) {
                showMainContentView();
            } else {
                showPlayerView();
            }
        }
        
        // (Sự kiện click vào nút 'toggle-view-btn' đã được xử lý bởi 'playerMini.addEventListener')
        // Nếu muốn gán riêng, bạn có thể thêm:
        toggleViewBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn sự kiện nổi bọt lên playerMini
            togglePlayerView();
        });




            // Lấy các phần tử DOM
        const signUpButton = document.getElementById('signUp'); // Nút "Đăng Ký" trên overlay
        const signInButton = document.getElementById('signIn'); // Nút "Đăng Nhập" trên overlay
        const container = document.getElementById('container');   // Container chính

        // Thêm sự kiện click cho nút "Đăng Ký"
        // Khi click, thêm class 'auth-right-panel-active' vào container
        signUpButton.addEventListener('click', () => {
            container.classList.add('auth-right-panel-active');
        });

        // Thêm sự kiện click cho nút "Đăng Nhập"
        // Khi click, xóa class 'auth-right-panel-active' khỏi container
        signInButton.addEventListener('click', () => {
            container.classList.remove('auth-right-panel-active');
        });
        // Hiển thị form đăng nhập/đăng ký khi nhấn nút "Đăng Nhập" ở header
        
           document.getElementById('login-btn').addEventListener('click', function() {
            const authLayout = document.getElementById('auth-layout');
                authLayout.style.display = 'flex';
            const loginRegisterContainer = document.querySelector('.auth-container');
               loginRegisterContainer.style.display = 'block';
               history.pushState(null, '', 'auth');
           });
            document.addEventListener('click', function(event) {
                const authLayout = document.getElementById('auth-layout');
                if (event.target === authLayout) {
                {    authLayout.style.display = 'none'; 
                
                history.pushState(null, '','/')
                if (ytbId)
                        {history.pushState(null, '', `?videoId=${ytbId}`);}
                }               
                }            
           });
            
            window.addEventListener('load',
            () =>{
                const params = new URL(window.location.href)
                if(params.pathname === '/auth'){                   
                    const authLayout = document.getElementById('auth-layout');
                    authLayout.style.display = 'flex';
                    const loginRegisterContainer = document.querySelector('.auth-container');
                    loginRegisterContainer.style.display = 'block';
                    }   
            })

        