<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>일본어단어장</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/be2c4ebe83.js" crossorigin="anonymous"></script>
    <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: #f9f9fb;
            margin: 0;
            padding:0;
            color: #333;
        }

        .btn-primary {
            color: #fff;
            background-color:  #dc3545;
            border-color:   #dc3545
        }
        h1 {
            color: #333;
            text-align: center;
        }

        .word-list {
            margin: 0 auto;
            list-style-type: none;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
        }

        .word-item {
            border: 2px solid #ccc;
            border-radius: 8px;
            background-color: #fff;
            padding: 20px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            display: flex;
            flex-direction: column;
        }

        .word-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .word-title {
            font-size: 1.4rem;
            color:#111;
            font-weight:bold;
            text-align:center;
        }

        .word-meaning {
            color: #555;
            margin-top: 10px;
            font-size: 1.3rem;
            display: none;
            background: #1c2679;
            color: #fff;
            display:none;
        }

        .kana {
            color: #ff0000;
            font-weight:bold;
            font-size: 1.3rem;
            display: none; /* 기본적으로 숨깁니다. */
        }

        /* 반응형 웹 디자인 */
        @media screen and (max-width: 768px) {
            .word-list {
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }
        }

        button {
            margin: 20px auto;
            display: block;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: #0056b3;
        }
        .list-group-item{border:1px solid #111;}
        .list-group-item+.list-group-item {border-top-width: thin;}
        /*타이틀*/
        .word-title{text-align:center;}
        /*단어 뜻*/
        .list-group-item div{text-align:center;}
        .fa-solid{font-size:20px}
        .header{width:100%;height:40px;line-height:40px;transition: top 0.3s ease;}
        .header.fixed{position:fixed;top:0;background-color:#fff;left:0;z-index:1000;width:100%;height:40px;line-height:40px;}
        .header div{float:left;}
        .logo{margin-left:4%;}
        .logo img{max-width:80px;}
        #toggleAllMeanings{float:right;}

        #wordList {
            position: absolute;
            width: 100%;
            top: 40px;
            background: #f3f3f3;
            left: 0;
        }
        
        #wordList li{width:90%;margin:0 auto;background:#fff;border-radius:8px;box-shadow: inset;}
        .wrapper{padding:0px;}
        .prev{margin-left:2%;cursor:pointer;}
        #toggleAllMeanings{margin-right:2%;}

        #chapterButtons{margin-top:20px;width:100%;}
        #chapterButtons div {
            float: left;
            width: 44%;
            margin: 10px;
            height: 80px;
            line-height: 70px;
            text-align: center; 
            vertical-align: middle;
        }
        .btnChoice{position:absolute;top:-10px;right:0;}
        .deleteButton {position: absolute;top: 15px;right: 9px;border: none}
        .deleteButton .fa-solid{font-size:14px;color:#ff0018;}
        .btn-outline-primary{border:none;color:#666;font-size:12px;}
        .btn-outline-primary:hover{border:none;color:#ff0018;font-size:12px;background:none;}
        #wordList{display:none;}
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <div class="prev"> <i class="fa-solid fa-chevron-left"></i></div>
            <div class="logo"><i class="fa-solid fa-l"></i> <i class="fa-solid fa-s"></i> <i class="fa-solid fa-h"></i></div>
            <div id="toggleAllMeanings"><i class="fa-solid fa-robot"></i></div>
        </div>
        <div class="container">
            <div id="chapterButtons" class="text-center mb-4">
                <div class="btn btn-primary" onclick="showChapter(1)">day1<span class="word_number"></span></div>
                <div class="btn btn-primary" onclick="showChapter(2)">day2<span class="word_number"></span></div>
                <div class="btn btn-primary" onclick="showChapter(3)">day3<span class="word_number"></span></div>
                <div class="btn btn-primary" onclick="showChapter(4)">day4<span class="word_number"></span></div>
                <div class="btn btn-primary" onclick="showChapter(5)">day5<span class="word_number"></span></div>
                <div class="btn btn-primary" onclick="showChapter(6)">day6<span class="word_number"></span></div>
                <div class="btn btn-primary" onclick="showChapter(7)">day7<span class="word_number"></span></div>



                <div id="favoriteButton" class="btn btn-primary">즐겨찾기</div>            
            </div>
            <ul id="wordList" class="list-group">
            </ul>
            <!-- 수정: 즐겨찾기 목록을 보여줄 영역 추가 -->
            <div id="favoriteList" class="list-group" >
            </div>
        </div>
    </div>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
const btn = document.querySelector('.btn');
    const wordList = document.getElementById('wordList');
    btn.addEventListener('click', function() {
    wordList.style.display = 'block';
});
const wordListElement = document.getElementById("wordList");
    let allMeaningsVisible = false; // 전체 뜻 보기 상태를 추적합니다.
    let favoriteListVisible = false;
    //최초 로딩시 즐겨찾기 숨김처리
    document.getElementById("favoriteButton").addEventListener("click", function() {
    favoriteListVisible = !favoriteListVisible;
    const favoriteList = document.getElementById("favoriteList");
    if (favoriteListVisible) {
        fetchdango(); // 즐겨찾기 목록을 갱신합니다.
        favoriteList.style.display = "block"; // 즐겨찾기 목록을 보이도록 설정합니다.
    } else {
        favoriteList.innerHTML = "추가된 목록이 없습니다."; // 즐겨찾기 목록을 비웁니다.
        favoriteList.style.display = "none"; // 즐겨찾기 목록을 숨깁니다.
    }
});
let favoriteWords = []; // 이미 즐겨찾기에 추가된 단어 목록을 저장합니다.

function addTodango(word, kana, meaning) {
    // 중복 확인
    if (favoriteWords.includes(word)) {
        console.log(`"${word}"는 이미 즐겨찾기에 추가되어 있습니다.`);
        return;
    }

    axios.post('/dango', { word, kana, meaning })
        .then(response => {
            console.log(`"${word}"가 즐겨찾기에 추가되었습니다.`);
            favoriteWords.push(word); // 즐겨찾기에 추가된 단어 목록에 추가합니다.
            showdango();
            // 즐겨찾기가 추가되었다는 메시지를 표시합니다.
            showMessage(`${word}가 즐겨찾기에 추가되었습니다.`);
            // 즐겨찾기 버튼의 색상을 빨간색으로 변경합니다.
            const favoriteButtons = document.querySelectorAll('.btnChoice');
            favoriteButtons.forEach(button => {
                if (button.getAttribute('data-word') === word) {
                    button.style.color = 'red';
                    button.disabled = true; // 버튼 비활성화
                }
            });
        })
        .catch(error => console.error('Error adding to dango:', error));
}


function removeFromdango(word) {
    console.log(`삭제 시작: ${word}`);
    axios.delete(`/dango/${word}`)
        .then(response => {
            console.log(`서버에서 삭제 성공: ${word}`);
            favoriteWords = favoriteWords.filter(w => w !== word); // 목록에서 제거합니다.
            console.log(`배열에서 삭제 후:`, favoriteWords);
            // 정확한 텍스트 일치 셀렉터를 사용하여 해당 단어의 항목을 선택하고 fadeOut으로 삭제
            $("li").filter(function() {
                return $(this).text().trim() === word;
            }).fadeOut(400, function() {
                $(this).remove(); // fadeOut 완료 후 요소를 문서에서 완전히 제거합니다.
                console.log(`화면에서 삭제 완료: "${word}"`);
            });
        })
        .catch(error => {
            console.error('Error removing from dango:', error);
        });
}

// fetchdango 함수 수정
function fetchdango() {
    axios.get('/dango')
        .then(response => {
            const dango = response.data;
            favoriteWords = dango.map(favorite => favorite.word); // 이미 즐겨찾기에 추가된 단어 목록을 업데이트합니다.
            showdango(dango);
        })
        .catch(error => console.error('Error fetching dango:', error));
}


// showdango 함수 수정
function showdango(dango) {
    // 서버에서 가져온 즐겨찾기 목록을 표시합니다.
    if (dango.length > 0) {
        wordListElement.innerHTML = "";
        dango.forEach(favorite => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item mt-4 ";

            const wordTitle = document.createElement("div");
            wordTitle.className = "word-title";
            wordTitle.textContent = favorite.word;

            const kanaElement = document.createElement("div");
            kanaElement.className = "kana";
            kanaElement.textContent = favorite.kana;

            const meaningElement = document.createElement("div");
            meaningElement.className = "word-meaning";
            meaningElement.textContent = favorite.meaning;
            meaningElement.style.display = "none"; // 기본적으로 숨깁니다.

            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-outline-danger btn-sm delete-button btnChoice";
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            // 삭제 버튼 클릭 시 removeFromdango 함수 호출
            deleteButton.addEventListener("click", function(event) {
                event.stopPropagation();
                const word = wordTitle.textContent;
                removeFromdango(word); 
            });

            listItem.appendChild(wordTitle);
            listItem.appendChild(kanaElement);
            listItem.appendChild(meaningElement);
            listItem.appendChild(deleteButton);
            wordListElement.appendChild(listItem);

            // 클릭한 단어의 뜻과 후리가나를 표시합니다.
            wordTitle.addEventListener("click", function() {
                const meaningsVisible = meaningElement.style.display === "block";
                meaningElement.style.display = meaningsVisible ? "none" : "block";
                kanaElement.style.display = meaningsVisible ? "none" : "block";
            });
        });
    } else {
        wordListElement.innerHTML = "<p></p>";
    }
}


// 단어 목록을 가져와서 표시하는 함수
function fetchWordList(chapter) {
    axios.get(`/wordlist?chapter=${chapter}`)
        .then(response => {
            const wordList = response.data;
            wordListElement.innerHTML = "";
            wordList.forEach(word => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item mt-4 ";

                const wordTitle = document.createElement("div");
                wordTitle.className = "word-title";
                wordTitle.textContent = word.word;

                const kanaElement = document.createElement("div");
                kanaElement.className = "kana";
                kanaElement.textContent = word.kana;

                const meaningElement = document.createElement("div");
                meaningElement.className = "word-meaning";
                meaningElement.textContent = word.meaning;
                meaningElement.style.display = "none"; // 기본적으로 숨깁니다.

                const favoriteButton = document.createElement("button");
                favoriteButton.className = "btn btn-outline-primary btn-sm favorite-button btnChoice";
                favoriteButton.textContent = "★";
                favoriteButton.addEventListener("click", function(event) {
                    event.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
                    const word = wordTitle.textContent;
                    const kana = kanaElement.textContent;
                    const meaning = meaningElement.textContent;
                    addTodango(word, kana, meaning); // 즐겨찾기에 추가하는 함수 호출
                    favoriteButton.style.color = "red"; // 버튼 색상을 붉은색으로 변경
                });

                listItem.appendChild(wordTitle);
                listItem.appendChild(kanaElement);
                listItem.appendChild(meaningElement);
                listItem.appendChild(favoriteButton);
                wordListElement.appendChild(listItem);

                // 단어 클릭 시 의미와 후리가가 표시됩니다.
                wordTitle.addEventListener("click", function() {
                    const meaningsVisible = meaningElement.style.display === "block";
                    meaningElement.style.display = meaningsVisible ? "none" : "block";
                    kanaElement.style.display = meaningsVisible ? "none" : "block";
                });
            });
        })
        .catch(error => console.error('Error fetching word list:', error));
    }

    //2024/05/22수정된부분
    window.showChapter = function(chapter) {
        fetchWordList(chapter);
        wordListElement.style.display = 'block'; // 단어 목록을 보이도록 설정합니다.
        document.getElementById("favoriteList").style.display = "none"; // 즐겨찾기 목록 숨기기
        favoriteListVisible = false; // 즐겨찾기 목록 상태 초기화
    };


    // 전체 뜻 보기 열기/닫기 기능
    document.getElementById("toggleAllMeanings").addEventListener("click", function() {
        allMeaningsVisible = !allMeaningsVisible;
        document.querySelectorAll(".word-meaning, .kana").forEach(function(element) {
            element.style.display = allMeaningsVisible ? "block" : "none";
        });

        const iconClass = allMeaningsVisible ? "fa-solid fa-robot" : "fa-solid fa-robot";
        const iconStyle = allMeaningsVisible ? "color:red;" : "color:black;";
        this.innerHTML = `<i class="${iconClass}" style="${iconStyle}"></i>`;
    });

    // 이전 버튼 클릭 시 초기 상태로 변경
    document.querySelector(".prev").addEventListener("click", function() {
        wordListElement.innerHTML = ""; // 단어 목록을 비웁니다.
        allMeaningsVisible = false; // 전체 뜻 보기 상태를 초기화합니다.
    });

    // 최상단 스크롤 업/다운
    document.addEventListener("DOMContentLoaded", function() {
        const articleWrapper = document.querySelector('.header');
        const articleInner = document.querySelector('.article_m_inner');
        const jbOffset = articleWrapper.offsetTop;

        window.addEventListener("scroll", function() {
            if (window.pageYOffset > jbOffset) {
                articleWrapper.classList.add('fixed');
            } else {
                articleWrapper.classList.remove('fixed');
            }
        });
    });

    // 페이지 로드 시 즐겨찾기 목록을 가져와서 표시합니다.
    document.addEventListener("DOMContentLoaded", function() {
        fetchdango();
    });

</script>



</body>
</html>
