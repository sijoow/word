const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// MongoDB 연결 정보
const mongoURI = 'mongodb+srv://admin:admin@cluster0.unz3ui3.mongodb.net/forum?retryWrites=true&w=majority';
const dbName = 'word';
const collectionName = 'dango';

// MongoDB 클라이언트 생성
const client = new MongoClient(mongoURI);


// MongoDB에서 즐겨찾기 목록을 가져오는 함수
async function getdangoFromDB() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const dango = await collection.find({}).toArray();
        return dango;
    } catch (error) {
        console.error('Error fetching dango:', error);
        return [];
    } finally {
        await client.close();
    }
}

// 단어 목록 데이터 (임시 데이터)
const wordLists = {
    1: [
        { word: "改札", kana: "かいさつ", meaning: "개찰" },
        { word: "価格", kana: "かかく", meaning: "가격" },
        { word: "各駅", kana: "かくえき", meaning: "각 역" },
        { word: "観客", kana: "かんきゃく", meaning: "관객" },
        { word: "完成", kana: "かんせい", meaning: "완성" },
        { word: "血液型", kana: "けつえきがた", meaning: "혈액형" },
        { word: "方向", kana: "ほうこう", meaning: "방향" },
        { word: "録画", kana: "ろくが", meaning: "녹화" },
        { word: "演技", kana: "えんぎ", meaning: "연기" },
        { word: "気温", kana: "きおん", meaning: "기온" },
        { word: "機械", kana: "きかい", meaning: "기계" },
        { word: "議会", kana: "ぎかい", meaning: "의회" },
        { word: "疑問", kana: "ぎもん", meaning: "의문" },
        { word: "行事", kana: "ぎょうじ", meaning: "행사" },
        { word: "訓練", kana: "くんれん", meaning: "훈련" },
        { word: "予約", kana: "よやく", meaning: "예약" },
        { word: "家具", kana: "かぐ", meaning: "가구" },
        { word: "計算", kana: "けいさん", meaning: "계산" },
        { word: "経営", kana: "けいえい", meaning: "경영" },
        { word: "外科", kana: "げか", meaning: "외과" },
        { word: "下車", kana: "げしゃ", meaning: "하차" },
        { word: "現象", kana: "げんしょう", meaning: "현상" },
        { word: "上下", kana: "じょうげ", meaning: "상하" },
        { word: "講義", kana: "こうぎ", meaning: "강의" },
        { word: "工事", kana: "こうじ", meaning: "공사" },
        { word: "敬語", kana: "けいご", meaning: "경어" },
        { word: "集合", kana: "しゅうごう", meaning: "집합" },
        { word: "単語", kana: "たんご", meaning: "단어" },
        { word: "団子", kana: "だんご", meaning: "경단" },
        { word: "削除", kana: "さくじょ", meaning: "삭제" },
        { word: "製作", kana: "せいさく", meaning: "제작" },
        { word: "残業", kana: "ざんぎょう", meaning: "잔업" },
        { word: "存在", kana: "そんざい", meaning: "존재" },
        { word: "指示", kana: "しじ", meaning: "지시" },
        { word: "指導", kana: "しどう", meaning: "지도" },
        { word: "水道", kana: "すいどう", meaning: "수도" },
        { word: "維持", kana: "いじ", meaning: "유지" },
        { word: "個人", kana: "こじん", meaning: "개인" },
        { word: "文字", kana: "もじ", meaning: "문자" },
        { word: "睡眠", kana: "すいみん", meaning: "수면" },
        { word: "数字", kana: "すうじ", meaning: "숫자" },
        { word: "信号", kana: "しんごう", meaning: "신호" },
        { word: "絵", kana: "え", meaning: "그림" },
        { word: "頭痛", kana: "ずつう", meaning: "두통" },
        { word: "成績", kana: "せいせき", meaning: "성적" },
        { word: "節約", kana: "せつやく", meaning: "절약" },
    ],
    2: [
        { word: "専門家", kana: "せんもんか", meaning: "전문가" },
        { word: "以前", kana: "いぜん", meaning: "이전" },
        { word: "完全", kana: "かんぜん", meaning: "완전" },
        { word: "税金", kana: "ぜいきん", meaning: "세금" },
        { word: "想像", kana: "そうぞう", meaning: "상상" },
        { word: "相談", kana: "そうだん", meaning: "상담" },
        { word: "製造", kana: "せいぞう", meaning: "제조" },
        { word: "増加", kana: "ぞうか", meaning: "증가" },
        { word: "保存", kana: "ほぞん", meaning: "보존" },
        { word: "連続", kana: "れんぞく", meaning: "연속" },
        { word: "洗濯", kana: "せんたく", meaning: "세탁" },
        { word: "横断", kana: "おうだん", meaning: "횡단" },
        { word: "温暖だ", kana: "おんだんだ", meaning: "온난하다" },
        { word: "手段", kana: "しゅだん", meaning: "수단" },
        { word: "相対", kana: "そうたい", meaning: "상대" },
        { word: "指定", kana: "してい", meaning: "지정" },
        { word: "停電", kana: "ていでん", meaning: "정전" },
        { word: "全員", kana: "ぜんいん", meaning: "전원" },
        { word: "伝言", kana: "でんごん", meaning: "전언" },
        { word: "伝達", kana: "でんたつ", meaning: "전달" },
        { word: "土地", kana: "とち", meaning: "토지" },
        { word: "冷凍", kana: "れいとう", meaning: "냉동" },
        { word: "同意", kana: "どうい", meaning: "동의" },
        { word: "独身", kana: "どくしん", meaning: "독신" },
        { word: "独立", kana: "どくりつ", meaning: "독립" },
        { word: "努力", kana: "どりょく", meaning: "노력" },
        { word: "出前", kana: "でまえ", meaning: "배달" },
        { word: "発売", kana: "はつばい", meaning: "발매" },
        { word: "範囲", kana: "はんい", meaning: "범위" },
        { word: "看板", kana: "かんばん", meaning: "간판" },
        { word: "順番", kana: "じゅんばん", meaning: "순번" },
        { word: "売買", kana: "ばいばい", meaning: "매매" },
        { word: "失敗", kana: "しっぱ", meaning: "실패" },
        { word: "心配", kana: "しんぱい", meaning: "걱정" },
        { word: "消費", kana: "しょうひ", meaning: "소비" },
        { word: "準備", kana: "じゅんび", meaning: "준비" },
        { word: "郵便", kana: "ゆうびん", meaning: "우편" },
        { word: "割引", kana: "わりびき", meaning: "할인" },
        { word: "月日", kana: "がっぴ", meaning: "월일" },
        { word: "発表", kana: "はっぴょう", meaning: "발표" },
        { word: "往復", kana: "おうふく", meaning: "왕복" },
        { word: "台風", kana: "たいふう", meaning: "태풍" },
        { word: "無事", kana: "ぶじ", meaning: "무사" },
        { word: "部分", kana: "ぶぶん", meaning: "부분" },
        { word: "文章", kana: "ぶんしょう", meaning: "문장" },
        { word: "分布", kana: "ぶんぷ", meaning: "분포" },
        { word: "分類", kana: "ぶんるい", meaning: "분류" },
        { word: "変化", kana: "へんか", meaning: "변화" },

    ],
    3: [
        { word: "欧米", kana: "おうべい", meaning: "유럽과 미국" },
        { word: "区別", kana: "くべつ", meaning: "구별" },
        { word: "弁当", kana: "べんとう", meaning: "도시락" },
        { word: "短編", kana: "たんぺん", meaning: "단편" },
        { word: "翻訳", kana: "ほんやく", meaning: "번역" },
        { word: "応募", kana: "おうぼ", meaning: "응모" },
        { word: "貿易", kana: "ぼうえき", meaning: "무역" },
        { word: "予防", kana: "よぼう", meaning: "예방" },
        { word: "散策", kana: "さんさく", meaning: "산책" },
        { word: "進歩", kana: "しんぽ", meaning: "진보" },
        { word: "一般", kana: "しんぽ", meaning: "일반" },
        { word: "一方", kana: "いっぽう", meaning: "한쪽,한편" },
        { word: "学科", kana: "がくか", meaning: "학과" },
        { word: "活気", kana: "かっき", meaning: "활기" },
        { word: "楽器", kana: "がっき", meaning: "악기" },
        { word: "各国", kana: "かっこく", meaning: "각국" },
        { word: "結果", kana: "けっか", meaning: "결과" },
        { word: "結果", kana: "こっかい", meaning: "국회" },
        { word: "作曲", kana: "さっきょく", meaning: "작곡" },
        { word: "実家", kana: "じっか", meaning: "친정,본가" },
        { word: "実験", kana: "じっけん", meaning: "실험" },
        { word: "借金", kana: "しゃっきん", meaning: "차금/빚" },

    ],
    4: [
        { word: "7", kana: "ななつ", meaning: "솔로" },
        { word: "8", kana: "やっつ", meaning: "돈" },
        { word: "9", kana: "ここのつ", meaning: "운동" }
    ],
    5: [
        { word: "7", kana: "ななつ", meaning: "솔로" },
        { word: "8", kana: "やっつ", meaning: "돈" },
        { word: "9", kana: "ここのつ", meaning: "운동" }
    ],
    6: [
        { word: "7", kana: "ななつ", meaning: "솔로" },
        { word: "8", kana: "やっつ", meaning: "돈" },
        { word: "9", kana: "ここのつ", meaning: "운동" }
    ]
};

// MongoDB에서 즐겨찾기 목록을 가져오는 함수
async function getdangoFromDB() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const dango = await collection.find({}).toArray();
        return dango;
    } catch (error) {
        console.error('Error fetching dango:', error);
        return [];
    } finally {
        await client.close();
    }
}

// 즐겨찾기 추가 엔드포인트
app.post('/dango', async (req, res) => {
    try {
        // 클라이언트가 요청한 데이터 추출
        const { word, kana, meaning } = req.body;
        // MongoDB에 연결
        await client.connect();
        // 데이터베이스 및 컬렉션 선택
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // 즐겨찾기 추가
        await collection.insertOne({ word, kana, meaning });
        // 클라이언트에 응답
        res.status(201).json({ message: 'Favorite added successfully' });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Failed to add favorite' });
    } finally {
        // 연결 종료
        await client.close();
    }
});

// 즐겨찾기 목록을 가져오는 엔드포인트
app.get('/dango', async (req, res) => {
    // MongoDB에서 즐겨찾기 목록을 가져오는 함수 호출
    const dango = await getdangoFromDB();
    res.json(dango);
});

app.get('/wordlist', (req, res) => {
    const chapter = req.query.chapter || 1;
    const wordList = wordLists[chapter] || [];
    res.json(wordList);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.delete('/dango/:word', async (req, res) => {
    try {
        // 클라이언트가 요청한 데이터 추출
        const word = req.params.word;
        // MongoDB에 연결
        await client.connect();
        // 데이터베이스 및 컬렉션 선택
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // 즐겨찾기 삭제
        await collection.deleteOne({ word });
        // 클라이언트에 응답
        res.json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Failed to remove favorite' });
    } finally {
        // 연결 종료
        await client.close();
    }
});


// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});