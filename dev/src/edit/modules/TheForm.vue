<template>
  <div class="edit">
    <h1>活动设置</h1>
    <el-form ref="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <!-- 页面设置 -->
    <h1 v-if="editForm=='page'">页面设置</h1>
    <el-form v-if="editForm=='page'" ref="form" label-width="80px">
      <el-form-item label="页面名称">
        <el-input v-model="edit.name"></el-input>
      </el-form-item>
      <el-form-item label="页面类型">
        <el-select v-model="edit.type" placeholder="页面类型" @change="changePageType()">
          <el-option label="固定高度" :value="0"></el-option>
          <el-option label="长页面" :value="1"></el-option>
          <el-option label="弹窗" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="滑动翻页" v-if="edit.type==0">
        <el-switch v-model="edit.swipe"></el-switch>
      </el-form-item>
      <el-form-item label="目标页面" v-if="edit.type==0">
        <el-select v-model="edit.target" placeholder="请选择跳转到的页面">
          <el-option label="下一页" :value="0"></el-option>
          <el-option
            v-for="op in pages"
            v-if="op.id!=edit.id"
            :key="op.id"
            :label="op.name"
            :value="op.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="背景图片" v-if="edit.type!=2">
        <!-- <el-input v-model="edit.bgImg"></el-input> -->
        <el-button @click="upload()">上传图片</el-button>
      </el-form-item>
      <el-form-item label="背景颜色" v-if="edit.type!=2">
        <el-input v-model="edit.bgColor"></el-input>
      </el-form-item>
    </el-form>
    <!-- 区块设置 -->
    <h1 v-if="editForm=='block'">区块设置</h1>
    <el-form v-if="editForm=='block'" ref="form" label-width="80px">
      <el-form-item label="区块高度">
        <el-input v-model="block.height"></el-input>
      </el-form-item>
      <el-form-item label="背景图片">
        <el-button @click="blockBg()">上传图片</el-button>
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-input v-model="block.bgColor"></el-input>
      </el-form-item>
    </el-form>
    <!-- 组件设置 -->
    <h1 v-if="editForm=='item'">组件设置</h1>
    <div style="margin: 20px 0" v-if="editForm=='item'">
      <el-radio-group v-model="itemEditType" size="small">
        <el-radio-button :label="0">基础</el-radio-button>
        <el-radio-button :label="1">{{item.name}}</el-radio-button>
        <el-radio-button :label="2">事件</el-radio-button>
        <el-radio-button :label="3">动画</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 基础设置 -->
    <el-form v-if="editForm=='item' && itemEditType==0" ref="form" label-width="80px">
      <el-form-item label="宽度">
        <el-input v-model="item.width"></el-input>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="item.height"></el-input>
      </el-form-item>
      <el-form-item label="左边距">
        <el-input v-model="item.left"></el-input>
      </el-form-item>
      <el-form-item label="上边距">
        <el-input v-model="item.top"></el-input>
      </el-form-item>
      <el-form-item label="背景图片" v-if="item.key!='pic'">
        <el-button @click="itemBg()">上传图片</el-button>
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-input v-model="item.bgColor"></el-input>
      </el-form-item>
    </el-form>
    <!-- 组件设置 -->
    <item-config v-if="editForm=='item' && itemEditType==1" :item="item"></item-config>
    <!-- 事件设置 -->
    <el-form v-if="editForm=='item' && itemEditType==2" ref="form" label-width="80px">
      <el-form-item label="事件">
        <el-select v-model="item.event" placeholder="请选择触发条件">
          <el-option label="不触发" :value="0"></el-option>
          <el-option label="点击" :value="1"></el-option>
          <!-- <el-option label="长按" :value="2"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="触发事件" v-if="item.event">
        <el-select v-model="item.operate" placeholder="请选择触发事件">
          <el-option label="打开页面" :value="1"></el-option>
          <el-option label="跳转链接" :value="2"></el-option>
          <el-option label="打开弹窗" :value="3"></el-option>
          <el-option label="关闭弹窗" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标页面" v-if="item.event && item.operate==1">
        <el-select v-model="item.target" placeholder="请选择跳转到的页面">
          <el-option
            v-for="op in pages"
            v-if="op.id!=edit.id && op.type!=2"
            :key="op.id"
            :label="op.name"
            :value="op.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标弹窗" v-if="item.event && item.operate==3">
        <el-select v-model="item.target" placeholder="请选择打开的弹窗">
          <el-option
            v-for="op in pages"
            v-if="op.id!=edit.id && op.type==2"
            :key="op.id"
            :label="op.name"
            :value="op.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转链接" v-if="item.event && item.operate==2">
        <el-input v-model="item.target"></el-input>
      </el-form-item>
    </el-form>
    <!-- 动画设置 -->
    <el-form v-if="editForm=='item' && itemEditType==3" ref="form" label-width="80px">
      <div class="">
        <el-button type="primary" v-if="item.animate.length" @click="play(playing)">{{playing?'停止':'播放'}}</el-button>
        <el-button type="primary" @click="addAnimate()">添加动画</el-button>
      </div>
      <div class="" v-for="(op,i) in item.animate">
        <h3>
          动画{{parseInt(i)+1}}
          <el-button type="danger" @click="deleteAction(i)">删除</el-button>
        </h3>
        <el-form-item label="动画类型">
          <el-select v-model="op.type" placeholder="请选择触发事件">
            <el-option label="进入" value="enter"></el-option>
            <el-option label="强调" value="emphasize"></el-option>
            <el-option label="退出" value="exit"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动画效果">
          <el-select v-model="op.name"
            placeholder="请选择触发事件"
            v-for="(type,key) in animates"
            :key="key"
            v-if="key==op.type">
            <el-option
              v-for="(opt,name) in type"
              :key="name"
              :label="opt.name"
              :value="name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="循环次数">
          <el-select v-model="op.loop" placeholder="请选择循环次数">
            <el-option
              :label="i==1?'永远':parseInt(i)-1"
              :key="i"
              v-for="i in 6"
              :value="parseInt(i)-1">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { item,block } from '@/assets/models'
    import animates from '@/assets/animates'
    import picUpload from '@/assets/picUpload'
    import ItemConfig from './forms/ItemConfig'
    export default {
        name:'Tools',
        data(){
          return {
            itemEditType:0,
            playing:false,
            animates:animates
          }
        },
        computed:{
          ...mapState(['pages','edit','add','block','item','editForm','editBlock','editItem']),
        },
        methods:{
          ...mapMutations({
            changeEditItem: 'changeEditItem',
            changeAdd: 'changeAdd',
          }),
          upload(){
            picUpload()
            .then(res=>{
              this.edit.bgImg=res.src;
            })
          },
          blockBg(){
            picUpload()
            .then(res=>{
              this.block.bgImg=res.src;
            })
          },
          itemBg(){
            picUpload()
            .then(res=>{
              this.item.bgImg=res.src;
        	    let obj = new Image();
        	    obj.src = res.src;
        	    obj.onload = ()=>{
      	        this.item.width=obj.width/2,
      	        this.item.height=obj.height/2;
        	    }
            })
          },
          changePageType(){
            if(this.edit.type==2){
              this.edit.bgColor='rgba(0,0,0,.5)'
            }
          },
          addAnimate(){
            let config={
                type:'enter',
                name:'fadeIn',
                time:0,
                loop:1,
                duration:1000
            }
            this.item.animate.push(config);
          },
          deleteAction(i){
            this.item.animate.splice(i,1);
          },
          play(playing){
              let self=this;
              if(playing){
                  self.playing=false;
              }else{
                  self.playing=true;
                  let action=[];
                  let preset=JSON.parse(JSON.stringify(self.item.animate));
                  for(let i in preset){
                      let animate=preset[i];
                      if(animate.loop==0){
                          action.push(animate);
                          break;
                      }else{
                          for(let q=0;q<parseInt(animate.loop);q++){
                              let frame=JSON.parse(JSON.stringify(animate));
                              if(q>0){
                                  frame.time=0;
                              }
                              action.push(frame);
                          }
                      }
                  }
                  function play(i){
                      let $this=$('.phone').find('.block').eq(self.editBlock).find('.item').eq(self.editItem);
                      $this.removeClass().addClass('item zoom animated '+action[i].name);
                      setTimeout(()=>{
                          $this.removeClass().addClass('item zoom');
                          if(action[i].loop==0){
                              action[i].time=0;
                              action.push(action[i]);
                          }
                          i++;
                          if(i<action.length && self.playing){
                              setTimeout(()=>{
                                  play(i);
                              },parseInt(action[i].time)*1000+50);
                          }else if(i>=action.length){
                              self.playing=false;
                          }
                      },action[i].duration);
                  }
                  if(action.length){
                      play(0);
                  }
              }
          },
          chooseAction(item){
            this.playing=false;
            item.duration=this.animates[item.type][item.name].time;
          }
        },
        components:{
          ItemConfig
        }
    }
</script>

<style lang="scss" scoped>
  h1{
    font-size: 22px;
  }
</style>
