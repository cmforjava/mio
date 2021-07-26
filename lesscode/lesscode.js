let fs = require('fs');
//系统路径模块
let path = require('path');


let test = [
  {
    type: 'view',
    class: 'mfw mh44 mc',
    children: [
      {
        type: 'view2',
        class: 'mfw mh44 mc',
        children: [
          { type: 'view3', class: 'mfw mh44 mc', text: '123' },
          { type: 'view3', class: 'mfw mh44 mc', text: '123' },
        ],
      },
      { type: 'view2', class: 'mfw mh44 mc', text: '123' },
    ],
  }
]
let num = 0
let mreduce = (arr, num) => {
  num++
  return arr.reduce((a, b) => {
    return (
      a + `
${`   `.repeat(num)}<${b.type} class="${b.class}">${b.children ? mreduce(b.children, num) : b.text}
${`   `.repeat(num)}</${b.type}>`
    )
  }, '')
 }


let text =`
<template>${mreduce(test, num)}
</template>

<script>
	export default {
		data() {
			return {
				test:"试试"
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
  `

  console.log(text)

  // 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
  let file = path.join(__dirname, './lesscode.vue');

  //写入文件
  fs.writeFileSync(file, text);


