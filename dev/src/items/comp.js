import pic from './pic.vue'
import txt from './txt.vue'
import veo from './veo.vue'
import slider from './slider.vue'

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
    pic,
    txt,
    veo,
    slider
  }
};
