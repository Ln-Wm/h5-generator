import pic from './comps/pic.js'
import txt from './comps/txt.js'
import veo from './comps/veo.js'
const item={
  pic,
  txt,
  veo
}
const page={
  id:0,
  name:'',
  type:0, //0绝对布局 1相对布局 2弹窗
  swipe:false,
  bgImg:'',
  bgColor:'',
  target:0,
  blocks:[
    {
      height:667,
      items:[],
      bgImg:'',
      bgColor:'',
    },
  ],
  blockIndex:0
}
const pop={
  id:0,
  name:'',
  type:2, //0绝对布局 1相对布局 2弹窗
  swipe:false,
  bgImg:'',
  bgColor:'rgba(0,0,0,.5)',
  target:0,
  blocks:[
    {
      height:667,
      items:[
        {
          key:'pic',
          name:'图片',
          width:325,
          height:350,
          top:100,
          left:25,
          size:true,
          bgColor:'#fff',
          bgImg:'',
          text:'',
          event:0,
          operate:1,
          target:'',
          animate:[],
        },
        {
          key:'pic',
          name:'图片',
          width:25,
          height:25,
          top:110,
          left:315,
          size:true,
          bgColor:'',
          bgImg:'http://staticdev.vivo.com.cn/campaign/commodity/20180307/20180307160147856366_original.png',
          text:'',
          event:1,
          operate:4,
          target:'',
          animate:[],
        },
      ],
      bgImg:'',
      bgColor:'',
    },
  ],
  blockIndex:0
}
const block={
  height:667,
  items:[],
  bgImg:'',
  bgColor:'',
}
export { page, pop, item, block }
