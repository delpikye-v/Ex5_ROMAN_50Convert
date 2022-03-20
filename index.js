const ROMAN = {
  I: 1,
  // 'II': 2,
  // 'III': 3,
  // 'IV': 4,
  V: 5,
  // 'VI': 6,
  // 'VII': 7,
  // 'VIII': 8,
  // 'IX': 9,
  X: 10,
  // 'XX': 20,
  // 'XXX': 30,
  // 'XL': 40,
  L: 50,
};

const ROMAN2 = {
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

function fromRoman(s) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    let cur = ROMAN[s[i]];
    let next = ROMAN[s[i + 1]];
    if (cur < next) {
      result += next - cur;
      i++;
    } else {
      result += cur;
    }
  }
  return result;
}

function convertToRoman(num) {
  let str = "";
  for (let i of Object.keys(ROMAN2)) {
    let q = Math.floor(num / ROMAN2[i]);
    num -= q * ROMAN2[i];
    str += i.repeat(q);
  }
  return str;
}

/*
function mySort(arrayObj) {
    return arrayObj.sort( (a, b)=> {
      let aNum = a.substr(a.lastIndexOf(" ") + 1, a.length);
      let bNum = b.substr(b.lastIndexOf(" ") + 1, b.length);
      // return romanNumberToDec[aNum] - romanNumberToDec[bNum]; 
      return fromRoman(aNum) - fromRoman(bNum);
    });
    //console.log(arrayObj);
};
*/

function sortRoman(names = []) {
  // Write your code here
  let parseNames = [];
  for (let i = 0; i < names.length; i++) {
    // only two:   name xx
    let temp = names[i].split(" ");
    if (isNaN(parseInt(temp[1]))) {
      parseNames.push({
        parse: `${temp[0]} ${temp[1]}`,
        sortName: temp[0],
        sortNumber: fromRoman(temp[1]),
      });
    } else {
      parseNames.push({
        parse: `${temp[0]} ${convertToRoman(temp[1])}`,
        sortName: temp[0],
        sortNumber: parseInt(temp[1]),
      });
    }
    //if (temp.length > 1) {
    //ronamKey = convertToRoman(temp[1]) || temp[1]
    //parseNames.push(`${temp[0]} ${ronamKey}`);
    //} else {
    //	ronamKey = convertToRoman(temp[0]) || temp[0]
    //  parseNames.push(`${ronamKey}`);
    //}
  }

  return parseNames
    .sort((a, b) => {
      let value = ("" + a.sortName).localeCompare(b.sortName);
      if (value === 0) {
        return a.sortNumber - b.sortNumber;
      }
      return value;
    })
    .map((item) => item.parse);
}

console.log(
  sortRoman([
    "Louis 20",
    "Louis 19",
    "Mouis 20",
    "Louis IX",
    "Louis VIII",
    "Louis 11",
  ])
);
