import pic from './pic.vue'

export default {
  props:['item','preview'],
  render: function (createElement) {
    return createElement(this.item.key,{
      props: {
        preview:this.preview,
        item: this.item,
      },
    })
  },
  components: {
    pic
  }
};
