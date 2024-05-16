export type KanaModesKeys = keyof typeof KanaModes;

export const KanaModes = {
        "hirabasic-a":{
            "あ": {
                answers:["a"],
                audio:"a"
            },
            "い": {
                answers:["i"],
                audio:"i"
            },
            "う": {
                answers:["u"],
                audio:"u"
            },
            "え": {
                answers:["e"],
                audio:"e"
            },
            "お": {
                answers:["o"],
                audio:"o"
            },
        },
        "katabasic-a":{
            "ア": {
                answers:["a"],
                audio:"a"
            },
            "イ": {
                answers:["i"],
                audio:"i"
            },
            "ウ": {
                answers:["u"],
                audio:"u"
            },
            "エ": {
                answers:["e"],
                audio:"e"
            },
            "オ": {
                answers:["o"],
                audio:"o"
            },
        },
        "hirabasic-k":{
            "か": {
                answers:["ka"],
                audio:"ka"
            },
            "き": {
                answers:["ki"],
                audio:"ki"
            },
            "く": {
                answers:["ku"],
                audio:"ku"
            },
            "け": {
                answers:["ke"],
                audio:"ke"
            },
            "こ": {
                answers:["ko"],
                audio:"ko"
            },
        },
        "katabasic-k":{
            "カ": {
                answers:["ka"],
                audio:"ka"
            },
            "キ": {
                answers:["ki"],
                audio:"ki"
            },
            "ク": {
                answers:["ku"],
                audio:"ku"
            },
            "ケ": {
                answers:["ke"],
                audio:"ke"
            },
            "コ": {
                answers:["ko"],
                audio:"ko"
            },
        },
        "hirabasic-s":{
            "さ": {
                answers:["sa"],
                audio:"sa"
            },
            "し": {
                answers:["shi","si"],
                audio:"shi"
            },
            "す": {
                answers:["su"],
                audio:"su"
            },
            "せ": {
                answers:["se"],
                audio:"se"
            },
            "そ": {
                answers:["so"],
                audio:"so"
            },
        },
        "katabasic-s":{
            "サ": {
                answers:["sa"],
                audio:"sa"
            },
            "シ": {
                answers:["shi","si"],
                audio:"shi"
            },
            "ス": {
                answers:["su"],
                audio:"su"
            },
            "セ": {
                answers:["se"],
                audio:"se"
            },
            "ソ": {
                answers:["so"],
                audio:"so"
            },
        },
        "hirabasic-t":{
            "た": {
                answers:["ta"],
                audio:"ta"
            },
            "ち": {
                answers:["chi","ti"],
                audio:"chi"
            },
            "つ": {
                answers:["tsu","tu"],
                audio:"tsu"
            },
            "て": {
                answers:["te"],
                audio:"te"
            },
            "と": {
                answers:["to"],
                audio:"to"
            },
        },
        "katabasic-t":{
            "タ": {
                answers:["ta"],
                audio:"ta"
            },
            "チ": {
                answers:["chi","ti"],
                audio:"chi"
            },
            "ツ": {
                answers:["tsu","tu"],
                audio:"tsu"
            },
            "テ": {
                answers:["te"],
                audio:"te"
            },
            "ト": {
                answers:["to"],
                audio:"to"
            },
        },
        "hirabasic-n":{
            "な": {
                answers:["na"],
                audio:"na"
            },
            "に": {
                answers:["ni"],
                audio:"ni"
            },
            "ぬ": {
                answers:["nu"],
                audio:"nu"
            },
            "ね": {
                answers:["ne"],
                audio:"ne"
            },
            "の": {
                answers:["no"],
                audio:"no"
            },
        },
        "katabasic-n":{
            "ナ": {
                answers:["na"],
                audio:"na"
            },
            "ニ": {
                answers:["ni"],
                audio:"ni"
            },
            "ヌ": {
                answers:["nu"],
                audio:"nu"
            },
            "ネ": {
                answers:["ne"],
                audio:"ne"
            },
            "ノ": {
                answers:["no"],
                audio:"no"
            },
        },
        "hirabasic-h":{
            "は": {
                answers:["ha"],
                audio:"ha",
            },
            "ひ": {
                answers:["hi"],
                audio:"hi",
            },
            "ふ": {
                answers:["fu","hu"],
                audio:"fu",
            },
            "へ": {
                answers:["he"],
                audio:"he",
            },
            "ほ": {
                answers:["ho"],
                audio:"ho",
            },
        },
        "katabasic-h":{
            "ハ": {
                answers:["ha"],
                audio:"ha",
            },
            "ヒ": {
                answers:["hi"],
                audio:"hi",
            },
            "フ": {
                answers:["fu","hu"],
                audio:"fu",
            },
            "ヘ": {
                answers:["he"],
                audio:"he",
            },
            "ホ": {
                answers:["ho"],
                audio:"ho",
            },
        },
        "hirabasic-m":{
            "ま": {
                answers:["ma"],
                audio:"ma",
            },
            "み": {
                answers:["mi"],
                audio:"mi",
            },
            "む": {
                answers:["mu"],
                audio:"mu",
            },
            "め": {
                answers:["me"],
                audio:"me",
            },
            "も": {
                answers:["mo"],
                audio:"mo",
            },
        },
        "katabasic-m":{
            "マ": {
                answers:["ma"],
                audio:"ma",
            },
            "ミ": {
                answers:["mi"],
                audio:"mi",
            },
            "ム": {
                answers:["mu"],
                audio:"mu",
            },
            "メ": {
                answers:["me"],
                audio:"me",
            },
            "モ": {
                answers:["mo"],
                audio:"mo",
            },
        },
        "hirabasic-y":{
            "や": {
                answers:["ya"],
                audio:"ya",
            },
            "ゆ": {
                answers:["yu"],
                audio:"yu",
            },
            "よ": {
                answers:["yo"],
                audio:"yo",
            },
        },
        "katabasic-y":{
            "ヤ": {
                answers:["ya"],
                audio:"ya",
            },
            "ユ": {
                answers:["yu"],
                audio:"yu",
            },
            "ヨ": {
                answers:["yo"],
                audio:"yo",
            },
        },
        "hirabasic-r":{
            "ら": {
                answers:["ra"],
                audio:"ra"
            },
            "り": {
                answers:["ri"],
                audio:"ri"
            },
            "る": {
                answers:["ru"],
                audio:"ru"
            },
            "れ": {
                answers:["re"],
                audio:"re"
            },
            "ろ": {
                answers:["ro"],
                audio:"ro"
            },
        },
        "katabasic-r":{
            "ラ": {
                answers:["ra"],
                audio:"ra"
            },
            "リ": {
                answers:["ri"],
                audio:"ri"
            },
            "ル": {
                answers:["ru"],
                audio:"ru"
            },
            "レ": {
                answers:["re"],
                audio:"re"
            },
            "ロ": {
                answers:["ro"],
                audio:"ro"
            },
        },
        "hirabasic-w":{
            "わ": {
                answers:["wa"],
                audio:"wa",
            },
            "を": {
                answers:["wo"],
                audio:"wo",
            },
            "ん": {
                answers:["n"],
                audio:"n",
            },
        },
        "katabasic-w":{
            "ワ": {
                answers:["wa"],
                audio:"wa",
            },
            "ヲ": {
                answers:["wo"],
                audio:"wo",
            },
            "ン": {
                answers:["n"],
                audio:"n",
            },
        },
        "hiraadakuten-g":{
            "が": {
                answers:["ga"],
                audio:"ga"
            },
            "ぎ": {
                answers:["gi"],
                audio:"gi"
            },
            "ぐ": {
                answers:["gu"],
                audio:"gu"
            },
            "げ": {
                answers:["ge"],
                audio:"ge"
            },
            "ご": {
                answers:["go"],
                audio:"go"
            },
        },
        "kataadakuten-g":{
            "ガ": {
                answers:["ga"],
                audio:"ga"
            },
            "ギ": {
                answers:["gi"],
                audio:"gi"
            },
            "グ": {
                answers:["gu"],
                audio:"gu"
            },
            "ゲ": {
                answers:["ge"],
                audio:"ge"
            },
            "ゴ": {
                answers:["go"],
                audio:"go"
            },
        },
        "hiraadakuten-z":{
            "ざ": {
                answers:["za"],
                audio:"za"
            },
            "じ": {
                answers:["ji"],
                audio:"ji"
            },
            "ず": {
                answers:["zu"],
                audio:"zu"
            },
            "ぜ": {
                answers:["ze"],
                audio:"ze"
            },
            "ぞ": {
                answers:["zo"],
                audio:"zo"
            },
        },
        "kataadakuten-z":{
            "ザ": {
                answers:["za"],
                audio:"za"
            },
            "ジ": {
                answers:["ji"],
                audio:"ji"
            },
            "ズ": {
                answers:["zu"],
                audio:"zu"
            },
            "ゼ": {
                answers:["ze"],
                audio:"ze"
            },
            "ゾ": {
                answers:["zo"],
                audio:"zo"
            },
        },
        "hiraadakuten-d":{
            "だ": {
                answers:["da"],
                audio:"da"
            },
            "ぢ": {
                answers:["ji","di"],
                audio:"ji"
            },
            "づ": {
                answers:["zu","du"],
                audio:"zu"
            },
            "で": {
                answers:["de"],
                audio:"de"
            },
            "ど": {
                answers:["do"],
                audio:"do"
            },
        },
        "kataadakuten-d":{
            "ダ": {
                answers:["da"],
                audio:"da"
            },
            "ヂ": {
                answers:["ji","di"],
                audio:"ji"
            },
            "ヅ": {
                answers:["zu","du"],
                audio:"zu"
            },
            "デ": {
                answers:["de"],
                audio:"de"
            },
            "ド": {
                answers:["do"],
                audio:"do"
            },
        },
        "hiraadakuten-b":{
            "ば": {
                answers:["ba"],
                audio:"ba",
            },
            "び": {
                answers:["bi"],
                audio:"bi",
            },
            "ぶ": {
                answers:["bu"],
                audio:"bu",
            },
            "べ": {
                answers:["be"],
                audio:"be",
            },
            "ぼ": {
                answers:["bo"],
                audio:"bo",
            },
        },
        "kataadakuten-b":{
            "バ": {
                answers:["ba"],
                audio:"ba",
            },
            "ビ": {
                answers:["bi"],
                audio:"bi",
            },
            "ブ": {
                answers:["bu"],
                audio:"bu",
            },
            "ベ": {
                answers:["be"],
                audio:"be",
            },
            "ボ": {
                answers:["bo"],
                audio:"bo",
            },
        },
        "hiraadakuten-p":{
            "ぱ": {
                answers:["pa"],
                audio:"pa"
            },
            "ぴ": {
                answers:["pi"],
                audio:"pi"
            },
            "ぷ": {
                answers:["pu"],
                audio:"pu"
            },
            "ぺ": {
                answers:["pe"],
                audio:"pe"
            },
            "ぽ": {
                answers:["po"],
                audio:"po"
            },
        },
        "kataadakuten-p":{
            "パ": {
                answers:["pa"],
                audio:"pa"
            },
            "ピ": {
                answers:["pi"],
                audio:"pi"
            },
            "プ": {
                answers:["pu"],
                audio:"pu"
            },
            "ペ": {
                answers:["pe"],
                audio:"pe"
            },
            "ポ": {
                answers:["po"],
                audio:"po"
            },
        },
        "hirayoon-k":{
            "きゃ": {
                answers:["kya"],
                audio:"kya",
            },
            "きゅ": {
                answers:["kyu"],
                audio:"kyu",
            },
            "きょ": {
                answers:["kyo"],
                audio:"kyo",
            },
        },
        "katayoon-k":{
            "キャ": {
                answers:["kya"],
                audio:"kya",
            },
            "キュ": {
                answers:["kyu"],
                audio:"kyu",
            },
            "キョ": {
                answers:["kyo"],
                audio:"kyo",
            },
        },
        "hirayoon-s":{
            "しゃ": {
                answers:["sha"],
                audio:"sha",
            },
            "しゅ": {
                answers:["shu"],
                audio:"shu",
            },
            "しょ": {
                answers:["sho"],
                audio:"sho",
            },
        },
        "katayoon-s":{
            "シャ": {
                answers:["sha"],
                audio:"sha",
            },
            "シュ": {
                answers:["shu"],
                audio:"shu",
            },
            "ショ": {
                answers:["sho"],
                audio:"sho",
            },
        },
        "hirayoon-t":{
            "ちゃ": {
                answers:["cha"],
                audio:"cha",
            },
            "ちゅ": {
                answers:["chu"],
                audio:"chu",
            },
            "ちょ": {
                answers:["cho"],
                audio:"cho",
            },
        },
        "katayoon-t":{
            "チャ": {
                answers:["cha"],
                audio:"cha",
            },
            "チュ": {
                answers:["chu"],
                audio:"chu",
            },
            "チョ": {
                answers:["cho"],
                audio:"cho",
            },
        },
        "hirayoon-n":{
            "にゃ": {
                answers:["nya"],
                audio:"nya",
            },
            "にゅ": {
                answers:["nyu"],
                audio:"nyu",
            },
            "にょ": {
                answers:["nyo"],
                audio:"nyo",
            },
        },
        "katayoon-n":{
            "ニャ": {
                answers:["nya"],
                audio:"nya",
            },
            "ニュ": {
                answers:["nyu"],
                audio:"nyu",
            },
            "ニョ": {
                answers:["nyo"],
                audio:"nyo",
            },
        },
        "hirayoon-h":{
            "ひゃ": {
                answers:["hya"],
                audio:"hya",
            },
            "ひゅ": {
                answers:["hyu"],
                audio:"hyu",
            },
            "ひょ": {
                answers:["hyo"],
                audio:"hyo",
            },
        },
        "katayoon-h":{
            "ヒャ": {
                answers:["hya"],
                audio:"hya",
            },
            "ヒュ": {
                answers:["hyu"],
                audio:"hyu",
            },
            "ヒョ": {
                answers:["hyo"],
                audio:"hyo",
            },
        },
        "hirayoon-m":{
            "みゃ": {
                answers:["mya"],
                audio:"mya",
            },
            "みゅ": {
                answers:["myu"],
                audio:"myu",
            },
            "みょ": {
                answers:["myo"],
                audio:"myo",
            },
        },
        "katayoon-m":{
            "ミャ": {
                answers:["mya"],
                audio:"mya",
            },
            "ミュ": {
                answers:["myu"],
                audio:"myu",
            },
            "ミョ": {
                answers:["myo"],
                audio:"myo",
            },
        },
        "hirayoon-r":{
            "りゃ": {
                answers:["rya"],
                audio:"rya",
            },
            "りゅ": {
                answers:["ryu"],
                audio:"ryu",
            },
            "りょ": {
                answers:["ryo"],
                audio:"ryo",
            },
        },
        "katayoon-r":{
            "リャ": {
                answers:["rya"],
                audio:"rya",
            },
            "リュ": {
                answers:["ryu"],
                audio:"ryu",
            },
            "リョ": {
                answers:["ryo"],
                audio:"ryo",
            },
        },
        "hiradakutenYoon-g":{
            "ぎゃ": {
                answers:["gya"],
                audio:"gya",
            },
            "ぎゅ": {
                answers:["gyu"],
                audio:"gyu",
            },
            "ぎょ": {
                answers:["gyo"],
                audio:"gyo",
            },
        },
        "katadakutenYoon-g":{
            "ギャ": {
                answers:["gya"],
                audio:"gya",
            },
            "ギュ": {
                answers:["gyu"],
                audio:"gyu",
            },
            "ギョ": {
                answers:["gyo"],
                audio:"gyo",
            },
        },
        "hiradakutenYoon-j":{
            "じゃ": {
                answers:["ja"],
                audio:"ja",
            },
            "じゅ": {
                answers:["ju"],
                audio:"ju",
            },
            "じょ": {
                answers:["jo"],
                audio:"jo",
            },
        },
        "katadakutenYoon-j":{
            "ジャ": {
                answers:["ja"],
                audio:"ja",
            },
            "ジュ": {
                answers:["ju"],
                audio:"ju",
            },
            "ジョ": {
                answers:["jo"],
                audio:"jo",
            },
        },
        "hiradakutenYoon-b":{
            "びゃ": {
                answers:["bya"],
                audio:"bya",
            },
            "びゅ": {
                answers:["byu"],
                audio:"byu",
            },
            "びょ": {
                answers:["byo"],
                audio:"byo",
            },
        },
        "katadakutenYoon-b":{
            "ビャ": {
                answers:["bya"],
                audio:"bya",
            },
            "ビュ": {
                answers:["byu"],
                audio:"byu",
            },
            "ビョ": {
                answers:["byo"],
                audio:"byo",
            },
        },
        "hiradakutenYoon-p":{
            "ぴゃ": {
                answers:["pya"],
                audio:"pya",
            },
            "ぴゅ": {
                answers:["pyu"],
                audio:"pyu",
            },
            "ぴょ": {
                answers:["pyo"],
                audio:"pyo",
            },
        },
        "katadakutenYoon-p":{
            "ピャ": {
                answers:["pya"],
                audio:"pya",
            },
            "ピュ": {
                answers:["pyu"],
                audio:"pyu",
            },
            "ピョ": {
                answers:["pyo"],
                audio:"pyo",
            },
        }
}

export const KanaCategories = {
    "basic": ["basic-a", "basic-k", "basic-s", "basic-t", "basic-n", "basic-h", "basic-m", "basic-y", "basic-r", "basic-w"],
    "dakuten": ["dakuten-g", "dakuten-z", "dakuten-d", "dakuten-b", "dakuten-p"],
    "yoon": ["yoon-k", "yoon-s", "yoon-t", "yoon-n", "yoon-h", "yoon-m", "yoon-r"],
    "dakutenYoon": ["dakutenYoon-g", "dakutenYoon-z", "dakutenYoon-d", "dakutenYoon-b", "dakutenYoon-p"]
}