import pic from './pic.js'
const item={
  pic
}
const page={
    id:0,
    name:'',
    type:0, //0绝对布局 1相对布局 2弹窗
    bgImg:'',
    bgColor:'',
    target:false,
    blocks:[
      {
        height:667,
        items:[]
      },
    ],
    blockIndex:0
}
const block={
    id:0,
    name:'',
    height:10,
    top:0,
    left:0,
    bgUrl:'',
    bgColor:'',
}
export { page, item, block }
