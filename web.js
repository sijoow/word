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
        { word: "一般", kana: "いっぱん", meaning: "일반" },

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
        { word: "出身", kana: "しゅっしん", meaning: "출신" },
        { word: "出張", kana: "しゅっちょう", meaning: "출장" },
        { word: "食器", kana: "しょっき", meaning: "식기" },
        { word: "接近", kana: "せっきん", meaning: "접근" },
        { word: "特急", kana: "とっきゅう", meaning: "급행" },
        { word: "日課", kana: "にっか", meaning: "일과" },
        { word: "日程", kana: "にってい", meaning: "일정" },
        { word: "熱心", kana: "ねっしん", meaning: "열심" },
        { word: "発刊", kana: "はっかん", meaning: "발간" },
        { word: "発見", kana: "はっけん", meaning: "발견" },
        { word: "発想", kana: "はっそう", meaning: "발상" },
        { word: "立派だ", kana: "りっぱだ", meaning: "훌륭한" },
        { word: "以降", kana: "いこう", meaning: "이후" },
        { word: "応用", kana: "おうよう", meaning: "응용" },
        { word: "共通", kana: "きょうつう", meaning: "공통" },
        { word: "興味", kana: "きょうみ.", meaning: "흥미" },
        { word: "苦労", kana: "くろう", meaning: "고생" },
        { word: "効果", kana: "こうか", meaning: "효과" },
        { word: "合格", kana: "ごうかく", meaning: "합격" },
        { word: "講義", kana: "こうぎ", meaning: "강의" },
        { word: "広告", kana: "こうこく", meaning: "광고" },
        { word: "交代", kana: "こうたい", meaning: "교대" },
    ],
    4: [
        { word: "紅茶", kana: "こうたい", meaning: "홍차" },
        { word: "交通", kana: "こうつう", meaning: "교통" },
        { word: "作業", kana: "さぎょう", meaning: "작업" },
        { word: "時間割", kana: "じかんひょう", meaning: "시간표" },
        { word: "事情", kana: "じじょう", meaning: "사정" },
        { word: "失業", kana: "しつぎょう", meaning: "실업" },
        { word: "授業料", kana: "じゅぎょうりょう", meaning: "수업료" },
        { word: "主要だ", kana: "しゅようだ", meaning: "주요하다" },
        { word: "使用", kana: "しよう", meaning: "사용" },
        { word: "商業", kana: "しょうぎょう", meaning: "상업" },
        { word: "正直", kana: "しょうじき", meaning: "정직" },
        { word: "常識", kana: "じょうしき", meaning: "상식" },
        { word: "技能", kana: "ぎのう", meaning: "기능" },
        { word: "商品", kana: "しょうひん", meaning: "상품" },
        { word: "情報", kana: "じょうひん", meaning: "정보" },
        { word: "早退", kana: "そうたい", meaning: "조퇴" },
        { word: "大量", kana: "たいりょう", meaning: "대량" },
        { word: "調査", kana: "ちょうさ", meaning: "조사" },
        { word: "正常", kana: "ちょうじょう", meaning: "정상" },
        { word: "到着", kana: "とうちゃく", meaning: "도착" },
        { word: "道路", kana: "どうろ", meaning: "도로" },
        { word: "表面", kana: "ひょうめん", meaning: "표면" },
        { word: "方向", kana: "ほうこう", meaning: "방향" },
        { word: "流行", kana: "りゅうこう", meaning: "유행" },
        { word: "漁師", kana: "りょうし", meaning: "어부" },
        { word: "完成", kana: "かんせい", meaning: "완성" },
        { word: "経営", kana: "けいえい", meaning: "경영" },
        { word: "経営学", kana: "けいえいがく", meaning: "경영학" },
        { word: "計画", kana: "けいかく", meaning: "계획" },
        { word: "成長", kana: "せいちょう", meaning: "성장" },
        { word: "提供", kana: "ていきょう", meaning: "제공" },
        { word: "停止", kana: "ていし", meaning: "정지" },
        { word: "反省", kana: "はんせい", meaning: "반성" },
        { word: "平均", kana: "へいきん", meaning: "평균" },
        { word: "命令", kana: "めいれい", meaning: "명령" },
        { word: "構造", kana: "こうぞう", meaning: "구조" },
        { word: "空気", kana: "くうき", meaning: "공기" },
        { word: "空席", kana: "くうせき", meaning: "공석" },
        { word: "研究", kana: "けんきゅう", meaning: "연구" },
        { word: "呼吸", kana: "こきゅう", meaning: "호흡" },
        { word: "就職", kana: "しゅうしょく", meaning: "취직" },
        { word: "自由", kana: "じゆう", meaning: "자유" },
        { word: "住宅", kana: "じゅうたく", meaning: "주택" },
        { word: "集中", kana: "しゅうちゅう", meaning: "집중" },
        { word: "台風", kana: "たいふう", meaning: "태풍" },
        { word: "地球", kana: "ちきゅう", meaning: "지구" },
        { word: "中止", kana: "ちゅうし", meaning: "중지" },
        { word: "お昼", kana: "おひる", meaning: "점심" },
        { word: "通勤", kana: "つうきん", meaning: "통근" },
    ],
    5: [
        { word: "通知", kana: "つうち", meaning: "통지" },
        { word: "途中", kana: "とちゅう", meaning: "도중" },
        { word: "入荷", kana: "にゅうか", meaning: "입하" },
        { word: "夫婦", kana: "ふうふ", meaning: "부부" },
        { word: "輸入", kana: "ゆにゅう", meaning: "수입" },
        { word: "余裕", kana: "よゆう", meaning: "여유" },
        { word: "休日", kana: "きゅうじつ", meaning: "휴일" },
        { word: "平日", kana: "へいじつ", meaning: "평일" },
        { word: "日時", kana: "にちじ", meaning: "일시" },
        { word: "日課", kana: "にっか", meaning: "일과" },
        { word: "下記", kana: "かき", meaning: "하기" },
        { word: "下線", kana: "かせん", meaning: "밑줄" },
        { word: "地下", kana: "ちか", meaning: "지하" },
        { word: "下車", kana: "げしゃ", meaning: "하차" },
        { word: "下宿", kana: "げしゅく", meaning: "하숙" },
        { word: "上下", kana: "じょう げ", meaning: "상하" },
        { word: "間接", kana: "かんせつ", meaning: "간접" },
        { word: "期間", kana: "きかん", meaning: "기간" },
        { word: "居間", kana: "いま", meaning: "거실" },
        { word: "仲間", kana: "なかま", meaning: "동료" },
        { word: "行為", kana: "こうい", meaning: "행위" },
        { word: "発行", kana: "はっこう", meaning: "발행" },
        { word: "流行", kana: "りゅうこう", meaning: "유행" },
       { word: "行事", kana:"ぎょうじ",meaning:"행사"},
       { word: "王様", kana:"おうさま", meaning:"왕, 임금님"},
       { word: "様々だ",kana:"さまざま", meaning:"여러 가지다"},
       { word: "模様", kana:"もよう", meaning:"모양, 무늬"},
       { word: "様子", kana:"ようす", meaning:"상태, 상황"},
       { word: "個人", kana:"こじん", meaning:"개인"},
       { word: "知人", kana:"ちじん", meaning:"지인"},
       { word: "他人", kana:"たにん", meaning:"타인"},
       { word: "人形", kana:"にんぎょう", meaning:"인형"},
       { word: "意外", kana:"いがい", meaning:"의외"},
       { word: "外貨", kana:"がいか", meaning:"외화"},
       { word: "外食", kana:"がいしょく", meaning:"외식"},
       { word: "外科", kana:"げか", meaning:"외과"},
       { word: "活気", kana:"かっき", meaning:"활기"},
       { word: "空気", kana:"くうき", meaning:"공기"},
       { word: "景気", kana:"けいき", meaning:"경기"},
       { word: "雰囲気",kana:"ふんいき", meaning:"분위기"},
       { word: "気配", kana:"けはい", meaning:"낌새, 느낌"},
       { word: "湿気", kana:"しっけ", meaning:"습기"},
       { word: "大会", kana:"たいかい", meaning:"대회"},
       { word: "大量", kana:"たいりょう", meaning:"대량"},
       { word: "拡大", kana:"かくだい", meaning:"확대"},
       { word: "大部分", kana:"だいぶぶん", meaning:"대부분"},
       { word: "生地", kana:"きじ", meaning:"옷감, 반죽"},
       { word: "地震", kana:"じしん", meaning:"지진"},
       
        
    ],
    6: [
        { word: "地面", kana: "じめん", meaning: "지면, 땅	" },
        { word: "自由", kana: "じゆう", meaning: "자유" },
        { word: "地球", kana: "ちきゅう", meaning: "지구" },
        { word: "地図", kana: "ちず", meaning: "지도" },
        { word: "地方", kana: "ちほう", meaning: "지방" },
        { word: "加速", kana: "かそく", meaning: "가속" },
        { word: "工夫", kana: "くふう", meaning: "궁리함" },
        { word: "参加", kana: "さんか", meaning: "참가" },
        { word: "大工", kana: "だいく", meaning: "목수" },
        { word: "増加", kana: "ぞうか", meaning: "증가" },
        { word: "工業", kana: "こうぎょう", meaning: "공업" },
        { word: "追加", kana: "ついか", meaning: "추가" },
        { word: "工事", kana: "こうじ", meaning: "공사" },
        { word: "超過", kana: "ちょうか", meaning: "초과" },
        { word: "後日", kana: "ごじつ", meaning: "후일" },
        { word: "通過", kana: "つうか", meaning: "통과" },
        { word: "直後", kana: "ちょくご", meaning: "직후" },
        { word: "支給", kana: "しきゅう", meaning: "지급" },
        { word: "後期", kana: "こうき", meaning: "후기" },
        { word: "時給", kana: "じきゅう", meaning: "시급" },
        { word: "後輩", kana: "こうはい", meaning: "후배" },
        { word: "作業", kana: "さぎょう", meaning: "작업" },
        { word: "重視", kana: "じゅうし", meaning: "중시" },
        { word: "残業", kana: "ざんぎょう", meaning: "잔업" },
        { word: "重大だ", kana: "じゅうだい", meaning: "중대하다" },
        { word: "商業", kana: "しょうぎょう", meaning: "상업" },
        { word: "重要だ", kana: "じゅうよう", meaning: "중요하다" },
        { word: "卒業", kana: "そつぎょう", meaning: "졸업" },
        { word: "貴重だ", kana: "きちょう", meaning: "귀중하다" },
        { word: "現金", kana: "げんきん", meaning: "현금" },
        { word: "交代", kana: "こうたい", meaning: "교대" },
        { word: "税金", kana: "ぜいきん", meaning: "세금" },
        { word: "近代", kana: "きんだい", meaning: "근대" },
        { word: "貯金", kana: "ちょきん", meaning: "저금" },
        { word: "現代", kana: "げんだい", meaning: "현대" },
        { word: "料金", kana: "りょうきん", meaning: "요금" },
        { word: "時代", kana: "じだい", meaning: "시대" },
        { word: "血圧", kana: "けつあつ", meaning: "혈압" },
        { word: "世代", kana: "せだい", meaning: "세대" },
        { word: "血液", kana: "けつえき", meaning: "혈액" },
        { word: "代金", kana: "だいきん", meaning: "대금" },
        { word: "敬語", kana: "けいご", meaning: "경어" },
        { word: "自然", kana: "しぜん", meaning: "자연" },
        { word: "言語", kana: "げんご", meaning: "언어" },
        { word: "各自", kana: "かくじ", meaning: "각자" },
        { word: "語学", kana: "ごがく", meaning: "어학" },
        { word: "自覚", kana: "じかく", meaning: "자각" },
        { word: "検査", kana: "けんさ", meaning: "검사" },
        { word: "交通", kana: "こうつう", meaning: "교통" },
        { word: "調査", kana: "ちょうさ", meaning: "조사" },
    ],
    7: [
        { word: "宣伝", kana: "せんでん", meaning: "선전" },
        { word: "事件", kana: "じけん", meaning: "사건" },
        { word: "伝言", kana: "でんごん", meaning: "전언" },
        { word: "事故", kana: "じこ", meaning: "사고" },
        { word: "伝染", kana: "でんせん", meaning: "전염" },
        { word: "事実", kana: "じじつ", meaning: "사실" },
        { word: "伝統", kana: "でんとう", meaning: "전통" },
        { word: "伝統", kana: "でんとう", meaning: "전통" },
        { word: "食事", kana: "しょくじ", meaning: "식사" },
        { word: "商売", kana: "しょうばい", meaning: "장사" },
        { word: "休日", kana: "きゅうじつ", meaning: "휴일" },
        { word: "売店", kana: "ばいてん", meaning: "매점" },
        { word: "祝日", kana: "しゅくじつ", meaning: "축일" },
        { word: "発売", kana: "はつばい", meaning: "발매" },
        { word: "平日", kana: "へいじつ", meaning: "평일" },
        { word: "販売", kana: "はんばい", meaning: "판매" },
        { word: "本日", kana: "ほんじつ", meaning: "금일" },
        { word: "方角", kana: "ほうがく", meaning: "방향" },
        { word: "少食", kana: "しょうしょく", meaning: "소식" },
        { word: "方向", kana: "ほうこう", meaning: "방향" },
        { word: "昼食", kana: "ちゅうしょく", meaning: "점심식사" },
        { word: "正面", kana: "しょうめん", meaning: "정면" },
        { word: "朝食", kana: "ちょうしょく", meaning: "아침식사" },
        { word: "表面", kana: "ひょうめん", meaning: "표면" },
        { word: "面接", kana: "めんせつ", meaning: "면접" },
        { word: "選挙", kana: "せんきょ", meaning: "선거" },
        { word: "面倒だ", kana: "めんどう", meaning: "번잡하고 성가시다" },
        { word: "選手", kana: "せんしゅ", meaning: "선수" },
        { word: "輸出", kana: "ゆしゅつ", meaning: "수출" },
        { word: "配達", kana: "はいたつ", meaning: "배달" },
        { word: "輸入", kana: "ゆにゅう", meaning: "수입" },
        { word: "発達", kana: "はったつ", meaning: "발달" },
        { word: "協力", kana: "きょうりょく", meaning: "협력" },
        { word: "冗談", kana: "じょうだん", meaning: "농담" },
        { word: "実力", kana: "じつりょく", meaning: "실력" },
        { word: "相談", kana: "そうだん", meaning: "상담" },
        { word: "体力", kana: "たいりょく", meaning: "체력" },
        { word: "各地", kana: "かくち", meaning: "각지" },
        { word: "努力", kana: "どりょく", meaning: "노력" },
        { word: "基地", kana: "きち", meaning: "기지" },
        { word: "地域", kana: "ちいき", meaning: "지역" },
        { word: "地区", kana: "ちく", meaning: "지구" },
        { word: "疑う", kana: "うたがう", meaning: "의심하다" },
        { word: "共通", kana: "きょうつう", meaning: "공통" },
        { word: "嫌う", kana: "きら", meaning: "동 싫어하다" },       
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
