import React, { useState, useEffect } from 'react';
import { Volume2, Eye, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

const ChineseQuizApp = () => {
  const [currentMode, setCurrentMode] = useState('pinyin'); // 'pinyin', 'greeting', or 'character'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPinyin, setShowPinyin] = useState(false);

  // 한어병음 발음 연습 데이터
  const pinyinQuestions = [
    { pinyin: 'fēi jī', chinese: '飞机', korean: '비행기', audio: 'fei-ji' },
    { pinyin: 'gōng yuán', chinese: '公园', korean: '공원', audio: 'gong-yuan' },
    { pinyin: 'gōng zhǔ', chinese: '公主', korean: '공주', audio: 'gong-zhu' },
    { pinyin: 'shēng rì', chinese: '生日', korean: '생일', audio: 'sheng-ri' },
    { pinyin: 'gē ge', chinese: '哥哥', korean: '형/오빠', audio: 'ge-ge' },
    { pinyin: 'xióng māo', chinese: '熊猫', korean: '판다', audio: 'xiong-mao' },
    { pinyin: 'qí páo', chinese: '旗袍', korean: '치파오', audio: 'qi-pao' },
    { pinyin: 'nán nǚ', chinese: '男女', korean: '남녀', audio: 'nan-nu' },
    { pinyin: 'xué xiào', chinese: '学校', korean: '학교', audio: 'xue-xiao' },
    { pinyin: 'yé ye', chinese: '爷爷', korean: '할아버지', audio: 'ye-ye' },
    { pinyin: 'lǎo shī', chinese: '老师', korean: '선생님', audio: 'lao-shi' },
    { pinyin: 'měi guó', chinese: '美国', korean: '미국', audio: 'mei-guo' },
    { pinyin: 'shuǐ guǒ', chinese: '水果', korean: '과일', audio: 'shui-guo' },
    { pinyin: 'nǔ lì', chinese: '努力', korean: '노력하다', audio: 'nu-li' },
    { pinyin: 'jiě jie', chinese: '姐姐', korean: '누나/언니', audio: 'jie-jie' },
    { pinyin: 'chàng gē', chinese: '唱歌', korean: '노래하다', audio: 'chang-ge' },
    { pinyin: 'tài yáng', chinese: '太阳', korean: '태양', audio: 'tai-yang' },
    { pinyin: 'fù mǔ', chinese: '父母', korean: '부모', audio: 'fu-mu' },
    { pinyin: 'diàn huà', chinese: '电话', korean: '전화', audio: 'dian-hua' },
    { pinyin: 'mèi mei', chinese: '妹妹', korean: '여동생', audio: 'mei-mei' },
    { pinyin: 'hēi bǎn', chinese: '黑板', korean: '칠판', audio: 'hei-ban' },
    { pinyin: 'diàn nǎo', chinese: '电脑', korean: '컴퓨터', audio: 'dian-nao' },
    { pinyin: 'zhuō zi', chinese: '桌子', korean: '책상', audio: 'zhuo-zi' },
    { pinyin: 'bāo', chinese: '包', korean: '가방', audio: 'bao' },
    { pinyin: 'yǐ zi', chinese: '椅子', korean: '의자', audio: 'yi-zi' },
    { pinyin: 'niú nǎi', chinese: '牛奶', korean: '우유', audio: 'niu-nai' },
    { pinyin: 'yī', chinese: '一', korean: '1', audio: 'yi' },
    { pinyin: 'èr', chinese: '二', korean: '2', audio: 'er' },
    { pinyin: 'sān', chinese: '三', korean: '3', audio: 'san' },
    { pinyin: 'sì', chinese: '四', korean: '4', audio: 'si' },
    { pinyin: 'wǔ', chinese: '五', korean: '5', audio: 'wu' },
    { pinyin: 'liù', chinese: '六', korean: '6', audio: 'liu' },
    { pinyin: 'qī', chinese: '七', korean: '7', audio: 'qi' },
    { pinyin: 'bā', chinese: '八', korean: '8', audio: 'ba' },
    { pinyin: 'jiǔ', chinese: '九', korean: '9', audio: 'jiu' },
    { pinyin: 'shí', chinese: '十', korean: '10', audio: 'shi' },
    { pinyin: 'dōng xī nán běi', chinese: '东西南北', korean: '동서남북', audio: 'dong-xi-nan-bei' },
    { pinyin: 'wǔ xīng hóng qí', chinese: '五星红旗', korean: '오성홍기', audio: 'wu-xing-hong-qi' },
    { pinyin: 'nǐ', chinese: '你', korean: '너/당신', audio: 'ni' },
    { pinyin: 'hǎo', chinese: '好', korean: '좋다/안녕하다', audio: 'hao' },
    { pinyin: 'nǐ men', chinese: '你们', korean: '너희(들)', audio: 'ni-men' },
    { pinyin: 'jiàn miàn', chinese: '见面', korean: '만나다/보다', audio: 'jian-mian' },
    { pinyin: 'nín', chinese: '您', korean: '당신의 존칭', audio: 'nin' },
    { pinyin: 'dà jiā', chinese: '大家', korean: '여러분/모두들', audio: 'da-jia' },
    { pinyin: 'wǒ', chinese: '我', korean: '나', audio: 'wo' },
    { pinyin: 'wǒ men', chinese: '我们', korean: '우리들', audio: 'wo-men' },
    { pinyin: 'tā', chinese: '他', korean: '그', audio: 'ta' },
    { pinyin: 'tā men', chinese: '他们', korean: '그들', audio: 'ta-men' },
    { pinyin: 'tā', chinese: '她', korean: '그녀', audio: 'ta2' },
    { pinyin: 'tā men', chinese: '她们', korean: '그녀들', audio: 'ta-men2' }
  ];

  // 한자 발음 맞추기 데이터
  const characterQuestions = [
    { chinese: '好', pinyin: 'hǎo', korean: '좋다', audio: 'hao' },
    { chinese: '不', pinyin: 'bù', korean: '~이 아니다', audio: 'bu' }
  ];

  // 인사말 번역 데이터
  const greetingQuestions = [
    { korean: '안녕!', chinese: '你好!', pinyin: 'nǐ hǎo!', audio: 'ni-hao' },
    { korean: '얘들아 안녕!', chinese: '你们好!', pinyin: 'nǐ men hǎo!', audio: 'ni-men-hao' },
    { korean: '잘가!', chinese: '再见!', pinyin: 'zài jiàn!', audio: 'zai-jian' },
    { korean: '내일 보자!', chinese: '明天见!', pinyin: 'míng tiān jiàn!', audio: 'ming-tian-jian' },
    { korean: '좋은 아침!', chinese: '早上好!', pinyin: 'zǎo shàng hǎo!', audio: 'zao-shang-hao' },
    { korean: '좋은 저녁!', chinese: '晚上好!', pinyin: 'wǎn shàng hǎo!', audio: 'wan-shang-hao' },
    { korean: '잘자!', chinese: '晚安!', pinyin: 'wǎn ān!', audio: 'wan-an' },
    { korean: '만나서 반갑습니다!', chinese: '很高兴认识你!', pinyin: 'hěn gāo xìng rèn shi nǐ!', audio: 'hen-gao-xing-ren-shi-ni' },
    { korean: '오랜만이야!', chinese: '认识你很高兴!', pinyin: 'rèn shi nǐ hěn gāo xìng!', audio: 'ren-shi-ni-hen-gao-xing' },
    { korean: '어서오세요/오신걸 환영합니다.', chinese: '欢迎光临!', pinyin: 'huān yíng guāng lín!', audio: 'huan-ying-guang-lin' },
    { korean: '살펴가세요!', chinese: '慢走!', pinyin: 'màn zǒu!', audio: 'man-zou' },
    { korean: '다음에 보자!', chinese: '下次见!', pinyin: 'xià cì jiàn!', audio: 'xia-ci-jian' },
    { korean: '잠시후에 보자!', chinese: '一会儿见!', pinyin: 'yī huì ér jiàn!', audio: 'yi-hui-er-jian' }
  ];

  const currentData = currentMode === 'pinyin' ? pinyinQuestions : 
                     currentMode === 'greeting' ? greetingQuestions : 
                     characterQuestions;
  const currentItem = currentData[currentQuestion];

  // TTS 음성 재생 함수 (브라우저 내장 음성 합성 엔진 사용)
  const playAudio = (text, lang = 'zh-CN') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    } else {
      alert('죄송합니다. 이 브라우저에서는 음성 재생이 지원되지 않습니다.');
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % currentData.length);
    setShowPinyin(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setShowPinyin(false);
  };

  const switchMode = (mode) => {
    setCurrentMode(mode);
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">中文学习</h1>
          <p className="text-lg text-gray-600">중국어 발음 학습 앱</p>
          {/* 버튼들 */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={nextQuestion}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              다음 문제
            </button>
            
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              <RotateCcw size={20} />
              처음부터
            </button>
          </div>
        </div>

        {/* 모드 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => switchMode('pinyin')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all ${
              currentMode === 'pinyin'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50'
            }`}
          >
            한어병음 발음
          </button>
          <button
            onClick={() => switchMode('greeting')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all ${
              currentMode === 'greeting'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50'
            }`}
          >
            인사말 번역
          </button>
          <button
            onClick={() => switchMode('character')}
            className={`py-3 px-4 rounded-lg font-semibold transition-all ${
              currentMode === 'character'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50'
            }`}
          >
            한자 발음
          </button>
        </div>

        {/* 퀴즈 카드 */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
          {/* 문제 표시 */}
          <div className="text-center mb-8">
            <div className="text-sm text-gray-500 mb-2">
              문제 {currentQuestion + 1} / {currentData.length}
            </div>
            
            {currentMode === 'pinyin' ? (
              <div>
                <div className="text-4xl font-bold text-gray-800 mb-4">
                  {currentItem.pinyin}
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  위 한어병음의 발음을 들어보세요
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="text-2xl font-bold text-red-600 mb-2">{currentItem.chinese}</div>
                  <div className="text-lg text-gray-600">{currentItem.korean}</div>
                </div>
              </div>
            ) : currentMode === 'greeting' ? (
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  "{currentItem.korean}"
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  위 한국어의 중국어 발음을 들어보세요
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="text-2xl font-bold text-red-600">{currentItem.chinese}</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-6xl font-bold text-gray-800 mb-4" style={{fontFamily: 'serif, "SimSun", "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", sans-serif'}}>
                  {currentItem.chinese}
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  위 한자의 중국어 발음을 들어보세요
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="text-lg text-gray-600">뜻: {currentItem.korean}</div>
                </div>
              </div>
            )}

            {/* 정답 발음 듣기 버튼 */}
            <button
              onClick={() => playAudio(currentItem.chinese)}
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors mb-4 text-lg font-semibold"
            >
              <Volume2 size={24} />
              중국어 발음 듣기
            </button>

            {/* 인사말 모드에서 한어병음 보기 버튼 */}
            {currentMode === 'greeting' && (
              <div className="mb-4">
                <button
                  onClick={() => setShowPinyin(!showPinyin)}
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors mr-2"
                >
                  <Eye size={20} />
                  한어병음 {showPinyin ? '숨기기' : '보기'}
                </button>
                {showPinyin && (
                  <div className="mt-2 text-xl text-purple-600 font-semibold">
                    {currentItem.pinyin}
                  </div>
                )}
              </div>
            )}

            {/* 한자 모드에서 한어병음 보기 버튼 */}
            {currentMode === 'character' && (
              <div className="mb-4">
                <button
                  onClick={() => setShowPinyin(!showPinyin)}
                  className="inline-flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors mr-2"
                >
                  <Eye size={20} />
                  발음 {showPinyin ? '숨기기' : '보기'}
                </button>
                {showPinyin && (
                  <div className="mt-2 text-2xl text-purple-600 font-bold">
                    {currentItem.pinyin}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-red-600">사용법 및 음성 기능</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>한어병음 발음:</strong> 주어진 한어병음을 보고 해당하는 중국어 발음을 들어보세요.</p>
            <p><strong>인사말 번역:</strong> 한국어 인사말에 해당하는 중국어 발음을 들어보세요.</p>
            <p><strong>한자 발음:</strong> 한자를 보고 중국어식 발음(한어병음)을 맞춰보세요. 예: 好 → hǎo</p>
            <p><strong>음성 기능:</strong> 브라우저 내장 음성 합성 엔진(Web Speech API)을 사용하여 중국어 발음을 재생합니다.</p>
            <p><strong>한어병음 보기:</strong> 인사말 모드와 한자 모드에서 힌트로 한어병음을 확인할 수 있습니다.</p>
            <p className="text-xs text-gray-500 mt-2">
              ※ 음성 품질은 사용하는 브라우저와 운영체제에 따라 다를 수 있습니다. Chrome, Edge 등에서 더 자연스러운 중국어 발음을 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChineseQuizApp;