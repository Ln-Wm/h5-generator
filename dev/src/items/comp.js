import pic from './pic.vue'

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
        pic
    }
};
