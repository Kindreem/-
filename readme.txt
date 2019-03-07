工具使用：
var utils=require('../../utils/util.js')










*********************************************** JavaScript语法 *******************************************************

1.由于JavaScript这个设计缺陷，不要使用【==】比较，始终坚持使用【===】比较。
2.NaN这个特殊的Number与所有其他值都不相等，包括它自己 ，唯一能判断NaN的方法是通过isNaN()函数
3.浮点数 不能直接比较，要用绝对值比较 如：Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true 
4.null表示一个“空”的值，它和0以及空字符串''不同，0是一个数值，''表示长度为0的字符串，而null表示“空”。大多数情况下，我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下有用。
5.如果一个变量没有通过var申明就被使用，那么该变量就自动被申明为全局变量

-------最新ES6标准---------------------------字符串------------------------
1、` ... `【...表示字符串内容】反引号表示使用 \n 换行
2、字符串拼接 你好, ${name}, 你今年${age}岁了!
3、字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果
4、toUpperCase() 把一个字符串全部变为大写     s.toUpperCase()
5、toLowerCase() 把一个字符串全部变为小写     s.toLowerCase()
6、indexOf() 会搜索指定字符串出现的位置       s.indexOf('...')
7、substring() 返回指定索引区间的子串         s.substring(0, 5)

--------------------数组------------------------
下标从0开始
1、要取得Array的长度，直接访问length属性                           arr.length;
2、直接给Array的length赋一个新的值会导致Array大小的变化             arr.length = 6;没有的用 undefined表示
3、如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化      var arr = [1, 2, 3];arr[5] = 'x';arr; // arr变为[1, 2, 3, undefined, undefined, 'x']
4、Array也可以通过indexOf() 来搜索一个指定的元素的位置 arr.indexOf(20)
5、slice() 就是对应String的substring()版本  slice()的起止参数包括开始索引，不包括结束索引。****如果不给slice()传递任何参数就是复制一个Array
  1)、arr.slice(0, 3) 从索引0开始，到索引3结束，但不包括索引3
  2)、arr.slice(3); // 从索引3开始到结束
6、push() 向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉
7、如果要往Array的头部添加若干元素，使用unshift() 方法，shift() 方法则把Array的第一个元素删掉
8、sort() 可以对当前Array进行排序，它会直接修改当前Array的元素位置，直接调用时，按照默认顺序排序
9、reverse() 把整个Array的元素给反转
10、splice() 方法是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素
    var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
    // 从索引2开始删除3个元素,然后再添加两个元素:
    arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
    arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
    // 只删除,不添加:
    arr.splice(2, 2); // ['Google', 'Facebook']
    arr; // ['Microsoft', 'Apple', 'Oracle']
    // 只添加,不删除:
    arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
    arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
11、concat() 方法把当前的Array和另一个Array连接起来，并返回一个新的Array   【******】并没有修改当前Array，而是返回了一个新的Array    
12、join() 把当前Array的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：arr.join('-'); // 'A-B-C-1-2-3'
----------------------------对象------------------------------------
1、访问属性是通过【.】操作符完成的，但这要求属性名必须是一个有效的变量名。如果属性名包含特殊字符，就必须用【''】括起来
  'middle-school': 'No.1 Middle School'
   xxxxx['middle-school']  获得 No.1 Middle School
2、JavaScript的对象是 动态类型，你可以自由地给一个对象添加或删除属性 delete
    delete xiaoming.age; // 删除age属性
3、如果我们要检测xiaoming是否拥有某一属性，可以用in操作符 继承得到的也返回true 譬如:toString
    'name' in xiaoming; // true    
4、要判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()方法
    xiaoming.hasOwnProperty('name'); // true
    xiaoming.hasOwnProperty('toString'); // false
  1、全部获取：
      for(var k in xiaoming){
      console.log(k+':'+xiaoming[k]);
      }
--------------------------条件判断--------------------------------------
if(){}else if(){} else{}
----------------------------循环----------------------------------------
1、for (i=1; i<=10000; i++)； 2、for(var key in object) 遍历自身所有属性于长度无关； 3、while  4、do while至少执行一次
----------------------------ES6---Map---Set-----------------------------
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
var m = new Map();
m.set('Adam', 88);
m.get('Adam'); 
m.add();
m.delete();
----------------------------遍历---------------------------------------
1、for of 和 for in 的区别
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}
for (var x of a) {
    console.log(x); // 'A', 'B', 'C'
}
2、forEach() 的使用
   var s = new Set(['A', 'B', 'C']); //或者 new Map

  1) 、Set没有索引，因此回调函数的前两个参数都是元素本身
    s.forEach(function (element, sameElement, set) {
      console.log(element);
    });
  2) 、Map的回调函数参数依次为value、key和map本身：
    m.forEach(function (value, key, map) {
      console.log(value);
    });
  3）、a.forEach(function (element) {
      console.log(element);
    });  

