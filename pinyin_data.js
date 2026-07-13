// Deck "Tabela Pinyin": todas as sílabas do mandarim.
// Frente: a sílaba escrita. Ao virar: apenas o som (nada mais é revelado).
//
// Os dados abaixo espelham pinyin_table.json (o app roda via file://, então
// não dá para carregar o JSON com fetch — os dados ficam embutidos aqui).

const PINYIN_TABLE = {
  iniciais: ["", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "zh", "ch", "sh", "r", "z", "c", "s"],
  finais: {
    grupo_a: {
      "-i": { "zh": "zhi", "ch": "chi", "sh": "shi", "r": "ri", "z": "zi", "c": "ci", "s": "si" },
      "a": { "": "a", "b": "ba", "p": "pa", "m": "ma", "f": "fa", "d": "da", "t": "ta", "n": "na", "l": "la", "g": "ga", "k": "ka", "h": "ha", "zh": "zha", "ch": "cha", "sh": "sha", "z": "za", "c": "ca", "s": "sa" },
      "o": { "": "o", "b": "bo", "p": "po", "m": "mo", "f": "fo" },
      "e": { "": "e", "m": "me", "d": "de", "t": "te", "n": "ne", "l": "le", "g": "ge", "k": "ke", "h": "he", "zh": "zhe", "ch": "che", "sh": "she", "r": "re", "z": "ze", "c": "ce", "s": "se" },
      "ê": {},
      "ai": { "": "ai", "b": "bai", "p": "pai", "m": "mai", "d": "dai", "t": "tai", "n": "nai", "l": "lai", "g": "gai", "k": "kai", "h": "hai", "zh": "zhai", "ch": "chai", "sh": "shai", "z": "zai", "c": "cai", "s": "sai" },
      "ei": { "": "ei", "b": "bei", "p": "pei", "m": "mei", "f": "fei", "d": "dei", "n": "nei", "l": "lei", "g": "gei", "h": "hei", "zh": "zhei", "sh": "shei", "z": "zei" },
      "ao": { "": "ao", "b": "bao", "p": "pao", "m": "mao", "d": "dao", "t": "tao", "n": "nao", "l": "lao", "g": "gao", "k": "kao", "h": "hao", "zh": "zhao", "ch": "chao", "sh": "shao", "r": "rao", "z": "zao", "c": "cao", "s": "sao" },
      "ou": { "": "ou", "p": "pou", "m": "mou", "f": "fou", "d": "dou", "t": "tou", "n": "nou", "l": "lou", "g": "gou", "k": "kou", "h": "hou", "zh": "zhou", "ch": "chou", "sh": "shou", "r": "rou", "z": "zou", "c": "cou", "s": "sou" },
      "an": { "": "an", "b": "ban", "p": "pan", "m": "man", "f": "fan", "d": "dan", "t": "tan", "n": "nan", "l": "lan", "g": "gan", "k": "kan", "h": "han", "zh": "zhan", "ch": "chan", "sh": "shan", "r": "ran", "z": "zan", "c": "can", "s": "san" },
      "en": { "": "en", "b": "ben", "p": "pen", "m": "men", "f": "fen", "n": "nen", "g": "gen", "k": "ken", "h": "hen", "zh": "zhen", "ch": "chen", "sh": "shen", "r": "ren", "z": "zen", "c": "cen", "s": "sen" },
      "ang": { "": "ang", "b": "bang", "p": "pang", "m": "mang", "f": "fang", "d": "dang", "t": "tang", "n": "nang", "l": "lang", "g": "gang", "k": "kang", "h": "hang", "zh": "zhang", "ch": "chang", "sh": "shang", "r": "rang", "z": "zang", "c": "cang", "s": "sang" },
      "eng": { "": "eng", "b": "beng", "p": "peng", "m": "meng", "f": "feng", "d": "deng", "t": "teng", "n": "neng", "l": "leng", "g": "geng", "k": "keng", "h": "heng", "zh": "zheng", "ch": "cheng", "sh": "sheng", "r": "reng", "z": "zeng", "c": "ceng", "s": "seng" },
      "er": { "": "er" }
    },
    grupo_i: {
      "i": { "": "yi", "b": "bi", "p": "pi", "m": "mi", "d": "di", "t": "ti", "n": "ni", "l": "li", "j": "ji", "q": "qi", "x": "xi" },
      "ia": { "": "ya", "l": "lia", "j": "jia", "q": "qia", "x": "xia" },
      "io": { "": "yo" },
      "ie": { "": "ye", "b": "bie", "p": "pie", "m": "mie", "d": "die", "t": "tie", "n": "nie", "l": "lie", "j": "jie", "q": "qie", "x": "xie" },
      "iai": { "": "yai" },
      "iao": { "": "yao", "b": "biao", "p": "piao", "m": "miao", "d": "diao", "t": "tiao", "n": "niao", "l": "liao", "j": "jiao", "q": "qiao", "x": "xiao" },
      "iu": { "": "you", "m": "miu", "d": "diu", "n": "niu", "l": "liu", "j": "jiu", "q": "qiu", "x": "xiu" },
      "ian": { "": "yan", "b": "bian", "p": "pian", "m": "mian", "d": "dian", "t": "tian", "n": "nian", "l": "lian", "j": "jian", "q": "qian", "x": "xian" },
      "in": { "": "yin", "b": "bin", "p": "pin", "m": "min", "n": "nin", "l": "lin", "j": "jin", "q": "qin", "x": "xin" },
      "iang": { "": "yang", "n": "niang", "l": "liang", "j": "jiang", "q": "qiang", "x": "xiang" },
      "ing": { "": "ying", "b": "bing", "p": "ping", "m": "ming", "d": "ding", "t": "ting", "n": "ning", "l": "ling", "j": "jing", "q": "qing", "x": "xing" }
    },
    grupo_u: {
      "u": { "": "wu", "b": "bu", "p": "pu", "m": "mu", "f": "fu", "d": "du", "t": "tu", "n": "nu", "l": "lu", "g": "gu", "k": "ku", "h": "hu", "zh": "zhu", "ch": "chu", "sh": "shu", "r": "ru", "z": "zu", "c": "cu", "s": "su" },
      "ua": { "": "wa", "g": "gua", "k": "kua", "h": "hua", "zh": "zhua", "ch": "chua", "sh": "shua" },
      "uo": { "": "wo", "d": "duo", "t": "tuo", "n": "nuo", "l": "luo", "g": "guo", "k": "kuo", "h": "huo", "zh": "zhuo", "ch": "chuo", "sh": "shuo", "r": "ruo", "z": "zuo", "c": "cuo", "s": "suo" },
      "uai": { "": "wai", "g": "guai", "k": "kuai", "h": "huai", "zh": "zhuai", "ch": "chuai", "sh": "shuai" },
      "ui": { "": "wei", "d": "dui", "t": "tui", "g": "gui", "k": "kui", "h": "hui", "zh": "zhui", "ch": "chui", "sh": "shui", "r": "rui", "z": "zui", "c": "cui", "s": "sui" },
      "uan": { "": "wan", "d": "duan", "t": "tuan", "n": "nuan", "l": "luan", "g": "guan", "k": "kuan", "h": "huan", "zh": "zhuan", "ch": "chuan", "sh": "shuan", "r": "ruan", "z": "zuan", "c": "cuan", "s": "suan" },
      "un": { "": "wen", "d": "dun", "t": "tun", "l": "lun", "g": "gun", "k": "kun", "h": "hun", "zh": "zhun", "ch": "chun", "sh": "shun", "r": "run", "z": "zun", "c": "cun", "s": "sun" },
      "uang": { "": "wang", "g": "guang", "k": "kuang", "h": "huang", "zh": "zhuang", "ch": "chuang", "sh": "shuang" },
      "ong": { "": "weng", "d": "dong", "t": "tong", "n": "nong", "l": "long", "g": "gong", "k": "kong", "h": "hong", "zh": "zhong", "ch": "chong", "r": "rong", "z": "zong", "c": "cong", "s": "song" }
    },
    "grupo_ü": {
      "ü": { "": "yu", "n": "nü", "l": "lü", "j": "ju", "q": "qu", "x": "xu" },
      "üe": { "": "yue", "n": "nüe", "l": "lüe", "j": "jue", "q": "que", "x": "xue" },
      "üan": { "": "yuan", "l": "lüan", "j": "juan", "q": "quan", "x": "xuan" },
      "ün": { "": "yun", "l": "lün", "j": "jun", "q": "qun", "x": "xun" },
      "iong": { "": "yong", "j": "jiong", "q": "qiong", "x": "xiong" }
    }
  }
};

// O TTS não sabe ler pinyin em letras latinas, então cada sílaba aponta para
// um caractere comum com exatamente essa leitura — é ele que o TTS pronuncia.
// Sílabas teóricas sem caractere real (yai, lüan, lün) ficam fora do mapa e,
// portanto, fora do deck.
const PINYIN_TTS = {
  // -i
  zhi: "之", chi: "吃", shi: "诗", ri: "日", zi: "资", ci: "词", si: "思",
  // a
  a: "啊", ba: "八", pa: "怕", ma: "妈", fa: "发", da: "大", ta: "他", na: "那",
  la: "拉", ga: "嘎", ka: "卡", ha: "哈", zha: "炸", cha: "茶", sha: "沙",
  za: "杂", ca: "擦", sa: "撒",
  // o
  o: "哦", bo: "波", po: "婆", mo: "摸", fo: "佛",
  // e
  e: "鹅", me: "么", de: "德", te: "特", ne: "呢", le: "乐", ge: "哥", ke: "科",
  he: "喝", zhe: "这", che: "车", she: "蛇", re: "热", ze: "则", ce: "册", se: "色",
  // ai
  ai: "爱", bai: "白", pai: "拍", mai: "买", dai: "带", tai: "太", nai: "奶",
  lai: "来", gai: "该", kai: "开", hai: "海", zhai: "摘", chai: "拆", shai: "晒",
  zai: "在", cai: "菜", sai: "赛",
  // ei
  ei: "诶", bei: "杯", pei: "陪", mei: "美", fei: "飞", dei: "得", nei: "内",
  lei: "雷", gei: "给", hei: "黑", zhei: "这", shei: "谁", zei: "贼",
  // ao
  ao: "奥", bao: "包", pao: "跑", mao: "猫", dao: "到", tao: "桃", nao: "脑",
  lao: "老", gao: "高", kao: "考", hao: "好", zhao: "找", chao: "超", shao: "少",
  rao: "绕", zao: "早", cao: "草", sao: "扫",
  // ou
  ou: "欧", pou: "剖", mou: "谋", fou: "否", dou: "豆", tou: "头", nou: "耨",
  lou: "楼", gou: "狗", kou: "口", hou: "后", zhou: "周", chou: "抽", shou: "手",
  rou: "肉", zou: "走", cou: "凑", sou: "搜",
  // an
  an: "安", ban: "班", pan: "盘", man: "慢", fan: "饭", dan: "蛋", tan: "谈",
  nan: "南", lan: "蓝", gan: "干", kan: "看", han: "汉", zhan: "站", chan: "产",
  shan: "山", ran: "然", zan: "咱", can: "餐", san: "三",
  // en
  en: "恩", ben: "本", pen: "盆", men: "门", fen: "分", nen: "嫩", gen: "根",
  ken: "肯", hen: "很", zhen: "真", chen: "陈", shen: "深", ren: "人", zen: "怎",
  cen: "岑", sen: "森",
  // ang
  ang: "肮", bang: "帮", pang: "旁", mang: "忙", fang: "方", dang: "当",
  tang: "糖", nang: "囊", lang: "狼", gang: "刚", kang: "康", hang: "航",
  zhang: "张", chang: "常", shang: "上", rang: "让", zang: "脏", cang: "仓", sang: "桑",
  // eng
  eng: "鞥", beng: "崩", peng: "朋", meng: "梦", feng: "风", deng: "等",
  teng: "疼", neng: "能", leng: "冷", geng: "更", keng: "坑", heng: "横",
  zheng: "正", cheng: "成", sheng: "生", reng: "扔", zeng: "增", ceng: "层", seng: "僧",
  // er
  er: "二",
  // i
  yi: "一", bi: "笔", pi: "皮", mi: "米", di: "低", ti: "提", ni: "你", li: "里",
  ji: "鸡", qi: "七", xi: "西",
  // ia
  ya: "牙", lia: "俩", jia: "家", qia: "恰", xia: "下",
  // io
  yo: "哟",
  // ie
  ye: "也", bie: "别", pie: "撇", mie: "灭", die: "爹", tie: "铁", nie: "捏",
  lie: "列", jie: "姐", qie: "切", xie: "谢",
  // iao
  yao: "要", biao: "表", piao: "票", miao: "秒", diao: "掉", tiao: "条",
  niao: "鸟", liao: "料", jiao: "叫", qiao: "桥", xiao: "小",
  // iu
  you: "有", miu: "谬", diu: "丢", niu: "牛", liu: "六", jiu: "九", qiu: "球", xiu: "修",
  // ian
  yan: "眼", bian: "边", pian: "片", mian: "面", dian: "点", tian: "天",
  nian: "年", lian: "脸", jian: "见", qian: "钱", xian: "先",
  // in
  yin: "音", bin: "宾", pin: "品", min: "民", nin: "您", lin: "林", jin: "金",
  qin: "亲", xin: "新",
  // iang
  yang: "羊", niang: "娘", liang: "亮", jiang: "江", qiang: "强", xiang: "想",
  // ing
  ying: "英", bing: "冰", ping: "平", ming: "明", ding: "定", ting: "听",
  ning: "宁", ling: "零", jing: "京", qing: "请", xing: "星",
  // u
  wu: "五", bu: "不", pu: "普", mu: "木", fu: "福", du: "读", tu: "图", nu: "怒",
  lu: "路", gu: "古", ku: "哭", hu: "湖", zhu: "住", chu: "出", shu: "书",
  ru: "如", zu: "组", cu: "醋", su: "素",
  // ua
  wa: "蛙", gua: "瓜", kua: "夸", hua: "花", zhua: "抓", chua: "欻", shua: "刷",
  // uo
  wo: "我", duo: "多", tuo: "拖", nuo: "挪", luo: "罗", guo: "国", kuo: "阔",
  huo: "火", zhuo: "桌", chuo: "戳", shuo: "说", ruo: "弱", zuo: "做", cuo: "错", suo: "所",
  // uai
  wai: "外", guai: "怪", kuai: "快", huai: "坏", zhuai: "拽", chuai: "揣", shuai: "帅",
  // ui
  wei: "位", dui: "对", tui: "推", gui: "贵", kui: "亏", hui: "会", zhui: "追",
  chui: "吹", shui: "水", rui: "瑞", zui: "最", cui: "脆", sui: "岁",
  // uan
  wan: "万", duan: "短", tuan: "团", nuan: "暖", luan: "乱", guan: "关",
  kuan: "宽", huan: "换", zhuan: "转", chuan: "穿", shuan: "拴", ruan: "软",
  zuan: "钻", cuan: "窜", suan: "算",
  // un
  wen: "问", dun: "吨", tun: "吞", lun: "轮", gun: "滚", kun: "困", hun: "婚",
  zhun: "准", chun: "春", shun: "顺", run: "润", zun: "尊", cun: "村", sun: "孙",
  // uang
  wang: "王", guang: "光", kuang: "矿", huang: "黄", zhuang: "装",
  chuang: "床", shuang: "双",
  // ong
  weng: "翁", dong: "东", tong: "同", nong: "农", long: "龙", gong: "工",
  kong: "空", hong: "红", zhong: "中", chong: "冲", rong: "容", zong: "总",
  cong: "从", song: "送",
  // ü
  yu: "鱼", "nü": "女", "lü": "绿", ju: "举", qu: "去", xu: "需",
  // üe
  yue: "月", "nüe": "虐", "lüe": "略", jue: "决", que: "缺", xue: "学",
  // üan
  yuan: "远", juan: "卷", quan: "全", xuan: "选",
  // ün
  yun: "云", jun: "军", qun: "群", xun: "寻",
  // iong
  yong: "用", jiong: "窘", qiong: "穷", xiong: "熊",
};

// Monta as cartas na ordem da tabela (linha a linha, seguindo as iniciais).
const PINYIN_SYLLABLES = [];
{
  const seen = new Set();
  for (const grupo of Object.values(PINYIN_TABLE.finais)) {
    for (const linha of Object.values(grupo)) {
      for (const inicial of PINYIN_TABLE.iniciais) {
        const syl = linha[inicial];
        if (!syl || seen.has(syl)) continue;
        seen.add(syl);
        const tts = PINYIN_TTS[syl];
        if (!tts) continue;
        PINYIN_SYLLABLES.push({ hanzi: syl, pinyin: "", translation: "", tts });
      }
    }
  }
}
