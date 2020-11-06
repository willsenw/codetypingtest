var config = {
  type : Phaser.AUTO,
  scale: {
      mode: Phaser.Scale.FIT,
      parent: 'phaser-example',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600
  },
  backgroundColor : '#000000',
  scene : {
    preload : preload,
    create : create,
    update : update
  }
};
var game = new Phaser.Game(config);
var txt,arr_text;
var cursors;
var text;
var nextIndex, currentRow, currentColumn;
var cursors, ascii;
var pressed = {};
var typingSound, playlist = [];
var currentSound;
var begun;
var soundLoop;
var withMusic = false;
var endTime = -1;

var hsv;
var title;
var hsv_it;

function preload(){
  var rdm = Phaser.Math.Between(1,7);
  this.load.text('code', './assets/srcode/cpp/code' + rdm.toString() + ".cpp");

  var sountPath = "./assets/audio/";

  //this.load.audio('bass', [ sountPath + 'bass.ogg', sountPath + 'bass.mp3' ]);
  //this.load.audio('drums', [ sountPath + 'drums.ogg', sountPath + 'drums.mp3' ]);
  //this.load.audio('percussion', [ sountPath + 'percussion.ogg', sountPath + 'percussion.mp3' ]);
  //this.load.audio('synth1', [ sountPath + 'synth1.ogg', sountPath + 'synth1.mp3' ]);
  //this.load.audio('synth2', [ sountPath + 'synth2.ogg', sountPath + 'synth2.mp3' ]);
  //this.load.audio('top1', [ sountPath + 'top1.ogg', sountPath + 'top1.mp3' ]);
  //this.load.audio('top2', [ sountPath + 'top2.ogg', sountPath + 'top2.mp3' ]);
  this.load.audio("type", ["./assets/audio/touchtype.mp3"]);
}

function create(){
  hsv = Phaser.Display.Color.HSVColorWheel();
  ascii = {
    "10": "\n",
    "31": "",      "32": " ",     "33": "!",     "34": "\"",    "35": "#",
    "36": "$",     "37": "%",     "38": "&",     "39": "'",     "40": "(",
    "41": ")",     "42": "*",     "43": "+",     "44": ",",     "45": "-",
    "46": ".",     "47": "/",     "48": "0",     "49": "1",     "50": "2",
    "51": "3",     "52": "4",     "53": "5",     "54": "6",     "55": "7",
    "56": "8",     "57": "9",     "58": ":",     "59": ";",     "60": "<",
    "61": "=",     "62": ">",     "63": "?",     "64": "@",     "65": "A",
    "66": "B",     "67": "C",     "68": "D",     "69": "E",     "70": "F",
    "71": "G",     "72": "H",     "73": "I",     "74": "J",     "75": "K",
    "76": "L",     "77": "M",     "78": "N",     "79": "O",     "80": "P",
    "81": "Q",     "82": "R",     "83": "S",     "84": "T",     "85": "U",
    "86": "V",     "87": "W",     "88": "X",     "89": "Y",     "90": "Z",
    "91": "[",     "92": "\\",    "93": "]",     "94": "^",     "95": "_",
    "96": "`",     "97": "a",     "98": "b",     "99": "c",     "100": "d",
    "101": "e",    "102": "f",    "103": "g",    "104": "h",    "105": "i",
    "106": "j",    "107": "k",    "108": "l",    "109": "m",    "110": "n",
    "111": "o",    "112": "p",    "113": "q",    "114": "r",    "115": "s",
    "116": "t",    "117": "u",    "118": "v",    "119": "w",    "120": "x",
    "121": "y",    "122": "z",    "123": "{",    "124": "|",    "125": "}",
    "126": "~",    "127": ""
  };
  cursors = {
    a : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    alt : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT),
    b : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B),
    back_slash : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACK_SLASH),
    backspace : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE),
    c : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
    caps_lock : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CAPS_LOCK),
    clear : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CLEAR),
    closed_bracket : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CLOSED_BRACKET),
    colon : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COLON),
    comma : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA),
    control : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CONTROL),
    d : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    delete : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DELETE),
    down : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    e : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    eight : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT),
    end : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END),
    enter : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    esc : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    f : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
    f1 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F1),
    f2 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F2),
    f3 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F3),
    f4 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F4),
    f5 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F5),
    f6 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F6),
    f7 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F7),
    f8 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F8),
    f9 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F9),
    f10 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F10),
    f11 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F11),
    f12 : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F12),
    five : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE),
    forward_slash : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH),
    four : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
    g : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G),
    h : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H),
    home : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.HOME),
    i : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I),
    insert : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.INSERT),
    j : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
    k : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
    l : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
    left : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
    m : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
    minus : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS),
    n : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N),
    nine : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE),
    num_lock : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUM_LOCK),
    numpad_zero : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO),
    numpad_one : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE),
    numpad_two : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO),
    numpad_three : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE),
    numpad_four : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR),
    numpad_five : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE),
    numpad_six : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX),
    numpad_seven : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN),
    numpad_eight : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT),
    numpad_nine : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE),
    numpad_add : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD),
    numpad_decimal : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_DECIMAL),
    numpad_divide : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_DIVIDE),
    numpad_enter : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ENTER),
    numpad_multiply : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_MULTIPLY),
    numpad_subtract : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT),
    o : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O),
    one : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
    open_bracket : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.OPEN_BRACKET),
    p : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),
    page_down : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN),
    page_up : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_UP),
    period : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD),
    plus : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS),
    print_screen : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PRINT_SCREEN),
    q : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
    quotes : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.QUOTES),
    r : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
    right : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    s : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    semicolon : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON),
    seven : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN),
    shift : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
    six : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX),
    space : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    t : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T),
    tab : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB),
    three : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
    tilde : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TILDE),
    two : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
    u : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U),
    up : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    v : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V),
    w : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    x : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
    y : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y),
    z : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
    zero : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
  };
  //playlist = playlist.concat([this.sound.add('drums')]);
  //playlist = playlist.concat([this.sound.add('synth1')]);
  //playlist = playlist.concat([this.sound.add('top1')]);
  //playlist = playlist.concat([this.sound.add('percussion')]);
  //playlist = playlist.concat([this.sound.add('drums')]);
  //playlist = playlist.concat([this.sound.add('synth2')]);
  //playlist = playlist.concat([this.sound.add('top2')]);
  //playlist = playlist.concat([this.sound.add('percussion')]);
  //playlist = playlist.concat([this.sound.add('bass')]);
  typingSound = this.sound.add('type');
  soundLoop = 2;
  begun = false;
  withMusic = false;

  title = this.add.text(300, 0, 'Code Typing Test', { font: "20px Arial Black", fill: "#fff" });
  title.setStroke('#00f', 16);
  title.setShadow(2, 2, "#333333", 2, true, true);
  hsv_it = 0;

  var textTemp = this.add.text(10, 60, ['Hello, click anywhere and the timer will start!'], { font: '18px Courier', fill: '#00ff00' });
  let cache = this.cache.text;
  let code = cache.get('code');
  pressed[ascii["10"]] = false;
  for ( var c = 31; c < 128; c++ ){
    pressed[ascii[c.toString()]] = false;
  }

  txt = code.split('\n');
  arr_text = "";
  for ( let i = 0; i < txt.length; i++ ){
    txt[i] += "\n";
    arr_text = arr_text + txt[i];
  }
  for ( var i = 0; i < txt.length; i++ ){
    for ( var j = 0; j < txt[i].length; j++ ){
      if ( i == 0 && j == 0 ) text = [this.add.text(j*10,i*20+50,txt[i][j], {fontSize: "20px", fontFamily:"Courier New", fill: "#FFFFFF", align: "center"})];
      else text = text.concat([this.add.text(j*10,i*20+50,txt[i][j], {fontSize: "20px", fontFamily:"Courier New", fill: "#FFFFFF", align: "center"})]);
    }
  }
  for ( var i = 0; i < text.length ; i++ ) text[i].visible = false;

  nextIndex = 0;
  currentRow = 0;
  currentColumn = 0;
  currentSound = 8;

  if ( this.sound.locked ){
    this.sound.once('unlocked', function(){
      textTemp.setText("");
      if ( begun ) return;
      begun = true;
      withMusic = true;
      for ( var i = 0; i < text.length ; i++ ) text[i].visible = true;
      //playlist[currentSound].play();
    });
  }
}

function update( time, delta ){

  var top = hsv[hsv_it].color;
  var bottom = hsv[359 - hsv_it].color;
  title.setTint(top, top, bottom, bottom);
  hsv_it++;
  if ( hsv_it == 360 ) hsv_it = 0;

  if ( begun == false ) return;

  for ( var i = 0; i < playlist.length; i++ ){
    if ( withMusic ){
      //playlist[i].setVolume(1);
    } else {
      //playlist[i].setVolume(0);
    }
  }

  if ( nextIndex == arr_text.length ){
      this.sound.stopAll();
      if ( endTime == -1 ) endTime = time / 1000.0;
      alert("Conratulation you have finish the test! , " + "with time : " + endTime.toString() + " second(s)");
      alert("Reload Page to Restart the test!");
      return;
  }

  var ch = arr_text[nextIndex];
  var hit = false;

  // Cursors alpahbet=================
  if ( cursors.a.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'A' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.a.isDown ){
    if ( pressed[ch] == false && ch == 'a' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.b.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'B' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.b.isDown ){
    if ( pressed[ch] == false && ch == 'b' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.c.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'C' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.c.isDown ){
    if ( pressed[ch] == false && ch == 'c' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.d.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'D' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.d.isDown ){
    if ( pressed[ch] == false && ch == 'd' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.e.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'E' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.e.isDown ){
    if ( pressed[ch] == false && ch == 'e' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.f.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'F' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.f.isDown ){
    if ( pressed[ch] == false && ch == 'f' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.g.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'G' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.g.isDown ){
    if ( pressed[ch] == false && ch == 'g' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.h.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'H' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.h.isDown ){
    if ( pressed[ch] == false && ch == 'h' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.i.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'I' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.i.isDown ){
    if ( pressed[ch] == false && ch == 'i' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.j.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'J' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.j.isDown ){
    if ( pressed[ch] == false && ch == 'j' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.k.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'K' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.k.isDown ){
    if ( pressed[ch] == false && ch == 'k' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.l.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'L' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.l.isDown ){
    if ( pressed[ch] == false && ch == 'l' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.m.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'M' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.m.isDown ){
    if ( pressed[ch] == false && ch == 'm' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.n.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'N' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.n.isDown ){
    if ( pressed[ch] == false && ch == 'n' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.o.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'O' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.o.isDown ){
    if ( pressed[ch] == false && ch == 'o' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.p.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'P' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.p.isDown ){
    if ( pressed[ch] == false && ch == 'p' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.q.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'Q' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.q.isDown ){
    if ( pressed[ch] == false && ch == 'q' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.r.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'R' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.r.isDown ){
    if ( pressed[ch] == false && ch == 'r' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.s.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'S' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.s.isDown ){
    if ( pressed[ch] == false && ch == 's' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.t.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'T' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.t.isDown ){
    if ( pressed[ch] == false && ch == 't' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.u.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'U' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.u.isDown ){
    if ( pressed[ch] == false && ch == 'u' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.v.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'V' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.v.isDown ){
    if ( pressed[ch] == false && ch == 'v' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.w.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'W' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.w.isDown ){
    if ( pressed[ch] == false && ch == 'w' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.x.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'X' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.x.isDown ){
    if ( pressed[ch] == false && ch == 'x' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.y.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'Y' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.y.isDown ){
    if ( pressed[ch] == false && ch == 'y' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.z.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == 'Z' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.z.isDown ){
    if ( pressed[ch] == false && ch == 'z' ){
      hit = true, pressed[ch] = true;
    }
  }
  //======================

  // Cursor Misc
  if ( cursors.space.isDown ){
    if ( pressed[ch] == false && ch == ' ' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.enter.isDown ){
    if ( pressed[ch] == false && ch == '\n' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.open_bracket.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '{' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.open_bracket.isDown ){
    if ( pressed[ch] == false && ch == '[' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.closed_bracket.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '}' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.closed_bracket.isDown ){
    if ( pressed[ch] == false && ch == ']' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.back_slash.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '|' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.back_slash.isDown ){
    if ( pressed[ch] == false && ch == '\\' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.semicolon.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == ':' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.semicolon.isDown ){
    if ( pressed[ch] == false && ch == ';' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.quotes.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch.charCodeAt(0) == 34 ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.quotes.isDown ){
    if ( pressed[ch] == false && ch.charCodeAt(0) == 39 ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.comma.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '<' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.comma.isDown ){
    if ( pressed[ch] == false && ch == ',' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.period.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '>' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.period.isDown ){
    if ( pressed[ch] == false && ch == '.' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.forward_slash.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '?' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.forward_slash.isDown ){
    if ( pressed[ch] == false && ch == '/' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.tab.isDown ){
    if ( ch == ' ' && currentColumn + 1 < txt[currentRow].length && txt[currentRow][currentColumn+1] == ' ' ){
      hit = true;
      text[nextIndex].setFill("#000000");
      text[nextIndex].setBackgroundColor("#00FF00");
      nextIndex++;
      currentColumn++;
      if ( txt[currentRow].length == currentColumn ){
        currentRow++;
        var curIndex = 0;
        for ( var i = 0; i < txt.length; i++ ){
          for ( var j =0; j < txt[i].length; j++ ){
            if ( i < currentRow ) {
              text[curIndex].visible = false;
            } else {
              text[curIndex].y =(i-currentRow) * 20 + 50;
              text[curIndex].x = j * 10;
            }
            curIndex++;
          }
        }
        currentColumn = 0;
      }
    }
  }

  //=======================

  // Cursor Number Above Alphabet
  if ( cursors.one.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '!' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.one.isDown ){
    if ( pressed[ch] == false && ch == '1' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.two.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '@' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.two.isDown ){
    if ( pressed[ch] == false && ch == '2' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.three.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '#' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.three.isDown ){
    if ( pressed[ch] == false && ch == '3' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.four.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '$' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.four.isDown ){
    if ( pressed[ch] == false && ch == '4' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.five.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '%' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.five.isDown ){
    if ( pressed[ch] == false && ch == '5' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.six.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '^' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.one.isDown ){
    if ( pressed[ch] == false && ch == '6' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.seven.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '&' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.seven.isDown ){
    if ( pressed[ch] == false && ch == '7' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.eight.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '*' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.eight.isDown ){
    if ( pressed[ch] == false && ch == '8' ){
      hit = true, pressed[ch] = true;
    }
  }

  if ( cursors.nine.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '(' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.nine.isDown ){
    if ( pressed[ch] == false && ch == '9' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.zero.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == ')' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.zero.isDown ){
    if ( pressed[ch] == false && ch == '0' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.minus.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '_' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.minus.isDown ){
    if ( pressed[ch] == false && ch == '-' ){
      hit = true, pressed[ch] = true;
    }
  }
  if ( cursors.plus.isDown && cursors.shift.isDown ){
    if ( pressed[ch] == false && ch == '+' ){
      hit = true, pressed[ch] = true;
    }
  } else if ( cursors.plus.isDown ){
    if ( pressed[ch] == false && ch == '=' ){
      hit = true, pressed[ch] = true;
    }
  }
  // =======================

  // isUp && ( pressed['A'] || pressed['c'] ) == true Release
  if ( cursors.a.isUp && ( pressed['A'] || pressed['a'] ) == true ) pressed['A'] = pressed['a'] = false;
  if ( cursors.b.isUp && ( pressed['B'] || pressed['b'] ) == true ) pressed['B'] = pressed['b'] = false;
  if ( cursors.c.isUp && ( pressed['C'] || pressed['c'] ) == true ) pressed['C'] = pressed['c'] = false;
  if ( cursors.d.isUp && ( pressed['D'] || pressed['d'] ) == true ) pressed['D'] = pressed['d'] = false;
  if ( cursors.e.isUp && ( pressed['E'] || pressed['e'] ) == true ) pressed['E'] = pressed['e'] = false;
  if ( cursors.f.isUp && ( pressed['F'] || pressed['f'] ) == true ) pressed['F'] = pressed['f'] = false;
  if ( cursors.g.isUp && ( pressed['G'] || pressed['g'] ) == true ) pressed['G'] = pressed['g'] = false;
  if ( cursors.h.isUp && ( pressed['H'] || pressed['h'] ) == true ) pressed['H'] = pressed['h'] = false;
  if ( cursors.i.isUp && ( pressed['I'] || pressed['i'] ) == true ) pressed['I'] = pressed['i'] = false;
  if ( cursors.j.isUp && ( pressed['J'] || pressed['j'] ) == true ) pressed['J'] = pressed['j'] = false;
  if ( cursors.k.isUp && ( pressed['K'] || pressed['k'] ) == true ) pressed['K'] = pressed['k'] = false;
  if ( cursors.l.isUp && ( pressed['L'] || pressed['l'] ) == true ) pressed['L'] = pressed['l'] = false;
  if ( cursors.m.isUp && ( pressed['M'] || pressed['m'] ) == true ) pressed['M'] = pressed['m'] = false;
  if ( cursors.n.isUp && ( pressed['N'] || pressed['n'] ) == true ) pressed['N'] = pressed['n'] = false;
  if ( cursors.o.isUp && ( pressed['O'] || pressed['o'] ) == true ) pressed['O'] = pressed['o'] = false;
  if ( cursors.p.isUp && ( pressed['P'] || pressed['p'] ) == true ) pressed['P'] = pressed['p'] = false;
  if ( cursors.q.isUp && ( pressed['Q'] || pressed['q'] ) == true ) pressed['Q'] = pressed['q'] = false;
  if ( cursors.r.isUp && ( pressed['R'] || pressed['r'] ) == true ) pressed['R'] = pressed['r'] = false;
  if ( cursors.s.isUp && ( pressed['S'] || pressed['s'] ) == true ) pressed['S'] = pressed['s'] = false;
  if ( cursors.t.isUp && ( pressed['T'] || pressed['t'] ) == true ) pressed['T'] = pressed['t'] = false;
  if ( cursors.u.isUp && ( pressed['U'] || pressed['u'] ) == true ) pressed['U'] = pressed['u'] = false;
  if ( cursors.v.isUp && ( pressed['V'] || pressed['v'] ) == true ) pressed['V'] = pressed['v'] = false;
  if ( cursors.w.isUp && ( pressed['W'] || pressed['w'] ) == true ) pressed['W'] = pressed['w'] = false;
  if ( cursors.x.isUp && ( pressed['X'] || pressed['x'] ) == true ) pressed['X'] = pressed['x'] = false;
  if ( cursors.y.isUp && ( pressed['Y'] || pressed['y'] ) == true ) pressed['Y'] = pressed['y'] = false;
  if ( cursors.z.isUp && ( pressed['Z'] || pressed['z'] ) == true ) pressed['Z'] = pressed['z'] = false;

  if ( cursors.space.isUp && pressed[' '] == true ) pressed[' '] = false;
  if ( cursors.enter.isUp && pressed['\n'] == true ) pressed['\n'] = false;
  if ( cursors.open_bracket.isUp && ( pressed['['] || pressed['{'] ) == true ) pressed['['] = pressed['{'] = false;
  if ( cursors.closed_bracket.isUp && ( pressed[']'] || pressed['}'] ) == true ) pressed[']'] = pressed['}'] = false;
  if ( cursors.back_slash.isUp && (pressed['\\'] || pressed['|']) == true ) pressed['\\'] = pressed['|'] = false;
  if ( cursors.semicolon.isUp && (pressed[';'] || pressed[':']) == true ) pressed[';'] = pressed[':'] = false;
  if ( cursors.quotes.isUp && (pressed["'"] || pressed['\'']) == true ) pressed["'11"] = pressed['\''] = false;
  if ( cursors.comma.isUp && ( pressed[','] || pressed['<'] ) == true ) pressed[','] = pressed['<'] = false;
  if ( cursors.period.isUp && ( pressed['.'] || pressed['>'] ) == true ) pressed['.'] = pressed['>'] = false;
  if ( cursors.forward_slash.isUp && ( pressed['/'] || pressed['?'] ) == true ) pressed['/'] = pressed['?'] = false;

  if ( cursors.one.isUp && ( pressed['1'] || pressed['!'] ) == true ) pressed['1'] = pressed['!'] = false;
  if ( cursors.two.isUp && ( pressed['2'] || pressed['@'] ) == true ) pressed['2'] = pressed['@'] = false;
  if ( cursors.three.isUp && ( pressed['3'] || pressed['#'] ) == true ) pressed['3'] = pressed['#'] = false;
  if ( cursors.four.isUp && ( pressed['4'] || pressed['$'] ) == true ) pressed['4'] = pressed['$'] = false;
  if ( cursors.five.isUp && ( pressed['5'] || pressed['%'] ) == true ) pressed['5'] = pressed['%'] = false;
  if ( cursors.six.isUp && ( pressed['6'] || pressed['^'] ) == true ) pressed['6'] = pressed['^'] = false;
  if ( cursors.seven.isUp && ( pressed['7'] || pressed['&'] ) == true ) pressed['7'] = pressed['&'] = false;
  if ( cursors.eight.isUp && ( pressed['8'] || pressed['*'] ) == true ) pressed['8'] = pressed['*'] = false;
  if ( cursors.nine.isUp && ( pressed['9'] || pressed['('] ) == true ) pressed['9'] = pressed['('] = false;
  if ( cursors.zero.isUp && ( pressed['0'] || pressed[')'] ) == true ) pressed['0'] = pressed[')'] = false;
  if ( cursors.minus.isUp && ( pressed['-'] || pressed['_'] ) == true ) pressed['-'] = pressed['_'] = false;
  if ( cursors.plus.isUp && ( pressed['+'] || pressed['='] ) == true ) pressed['+'] = pressed['='] = false;
  //=========================
  if ( hit ){

    text[nextIndex].setFill("#000000");
    text[nextIndex].setBackgroundColor("#00FF00");
    nextIndex++;
    currentColumn++;
    if ( txt[currentRow].length == currentColumn ){
      currentRow++;
      var curIndex = 0;
      for ( var i = 0; i < txt.length; i++ ){
        for ( var j =0; j < txt[i].length; j++ ){
          if ( i < currentRow ) {
            text[curIndex].visible = false;
          } else {
            text[curIndex].y =(i-currentRow) * 20 + 50;
            text[curIndex].x = j * 10;
          }
          curIndex++;
        }
      }
      currentColumn = 0;
    }
    typingSound.play();
  }

  return;
  if ( !playlist[currentSound].isPlaying ){
    soundLoop--;
    if ( soundLoop == 0 ){
      soundLoop = 2;
      currentSound = ( currentSound + 1 ) % 8;
    }
    playlist[currentSound].play();
    if ( soundLoop == 1 ){
      playlist[(currentSound+1)%8].play();
    }
  }
}
