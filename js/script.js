const names = [];
const log = [];
const questions = [
  "最近やらかしたことは？", "寝言で何か言ったことある？", "好きな駄菓子は？",
  "ゾンビが来たらどう逃げる？", "最近笑ったことは？", "好きなギャグは？",
  "実は苦手な食べ物は？", "宝くじが当たったら何する？", "子どもの頃の変な癖は？",
  "無人島に1つだけ持っていくなら？"
];

// ランダム選出ヘルパー
const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const addBtn = document.getElementById("addName");
  const nameList = document.getElementById("nameList");
  const startBtn = document.getElementById("start");
  const questionSection = document.getElementById("question");
  const selectedName = document.getElementById("selectedName");
  const selectedQuestion = document.getElementById("selectedQuestion");
  const countdownEl = document.getElementById("countdown");
  const showLogBtn = document.getElementById("showLog");
  const logArea = document.getElementById("logArea");

  // 名前登録処理
  const addName = () => {
    const name = nameInput.value.trim();
    if (!name) return alert("名前を入力してください！");
    names.push(name);
    const li = document.createElement("li");
    li.textContent = name;
    nameList.appendChild(li);
    nameInput.value = "";
  };

  addBtn.addEventListener("click", addName);
  nameInput.addEventListener("keydown", e => e.key === "Enter" && addName());

  // ログ表示処理
  showLogBtn.addEventListener("click", () => {
    logArea.style.display = "block";
    logArea.innerHTML = `
      <h3>今日の思い出</h3>
      <ul>${log.map(item => `<li>${item}</li>`).join("")}</ul>
    `;
  });

  // スタート処理
  startBtn.addEventListener("click", () => {
    if (names.length === 0) {
      alert("名前を登録してください！");
      return;
    }

    const selected = getRandomItem(names);
    const question = getRandomItem(questions);

    // ログ保存＆ボタン表示
    log.push(`${selected} さん：${question}`);
    showLogBtn.style.display = "block";

    // 表示処理
    selectedName.textContent = selected;
    selectedQuestion.textContent = question;
    countdownEl.textContent = "";
    questionSection.style.display = "block";

    // スクロール調整（PCのみ実行）
if (window.innerWidth > 768) {
  const offset = 15;
  const rect = questionSection.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetY = rect.top + scrollTop + offset;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
}

    // 7秒後に5秒カウントダウン開始
    setTimeout(() => {
      let count = 5;
      countdownEl.textContent = count;
      const timer = setInterval(() => {
        count--;
        countdownEl.textContent = count > 0 ? count : "";
        if (count <= 0) clearInterval(timer);
      }, 1000);
    }, 7000);
  });
});
