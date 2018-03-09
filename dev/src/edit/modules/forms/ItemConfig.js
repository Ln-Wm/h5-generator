import pic from './Pic.vue'
import Txt from './Txt.vue'
import Veo from './Veo.vue'

export default {
  props:['item'],
  render: function (createElement) {
    return createElement(this.item.key,{
      props: {
        item: this.item,
      },
    })
  },
  components: {
    pic,
    Txt,
    Veo
  }
};
