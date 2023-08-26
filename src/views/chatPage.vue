<template>
    <div class="contain">
        <div class="head">
            <el-icon size = "large"><TurnOff /></el-icon>
            <span>cyberBouns</span>
            <div><el-icon size = "middle"><CloseBold /></el-icon></div>
        </div>
        <div class="main">
        <!-- 左侧-->
            <div class="leftNav">
            <div class="brand">
                <span>赛博算卦</span>
            </div>
            <div class="newWindow">
                <div>对话</div>
            </div>
            <div class="setting">
                <el-icon size = 'large'><Sunny /></el-icon>
                <el-icon size = 'large'><Moon /></el-icon>
            </div>
        </div>

        <!-- 右侧 -->
        <div class="rightContext">
            <!-- 聊天框头部 -->
            <div class="contextHead">
                <el-icon size = "large"><ChatDotSquare /></el-icon>
                <div class="headMsg">Rondom Talk</div>
                <el-icon size = "large"><Delete /></el-icon>
            </div>
            <!-- 聊天框主体 -->
            <div class="chatBox">
                <div class="charMSG" v-for="item in contentHistory" :key="item.time">
                    <div class="waiter" v-if="!item.ownChat">
                        <img src="../assets/lucky.jpg" alt="">
                        <div class="chatContent">{{ item.content }}</div>
                    </div>
                    
                    <div class="user" v-if="item.ownChat">
                        <img src="../assets/guoyuan.jpg" alt="">
                        <div class="chatContent">{{ item.content }}</div>
                    </div>
                </div>

            </div>
            <!-- 输入框 -->
            <div class="inputMsg">
                <el-input v-model="person.name" placeholder="输入名字首字母" maxlength = 5  />
                <el-select v-model="person.num1" class="m-2" placeholder="Select" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
                <el-select v-model="person.num2" class="m-2" placeholder="Select" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
                <el-select v-model="person.num3" class="m-2" placeholder="Select" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
                <div class="sendBox" @click="bouns"><el-button icon = "Promotion"></el-button></div>
            </div>
            <div class="prompt">:请输入您名字的首字母，然后随机选取三个数字进行卜卦</div>
        </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted,toRefs} from "vue" 
import bounsData from './data.json'
interface Person {
    name :string,
    num1 : number,
    num2 : number,
    num3 : number,
    dayNum : number
}
interface chatType{
    ownChat : boolean,
    content : string,
    name : string,
    time : string,
}

type DataStructure = {
  [key: string]: { omen: string; describe: string };
};

const person:Person = reactive({
    name: '',
    num1: 0,
    num2: 0,
    num3: 0,
    dayNum : 0,
})
const state = reactive({
    assitent:{
        4 : '果园',
        5 : '幸运',
        6 : '杰宝',
        7 : '张张'
    }as any,
    options : [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 6,
        label: '6',
    },
    {
        value: 7,
        label: '7',
    },
    {
        value: 8,
        label: '8',
    },
    {
        value: 9,
        label: '9',
    }
    ]as any
})
const {assitent,options} = toRefs(state)

const contentHistory:chatType[] = reactive([])
onMounted(()=> {
    const date = new Date()
    person.dayNum = date.getDay()
    let currentTime = getTime(date)
    contentHistory.push({
        ownChat : false,
        content : `小助手${assitent.value[person.dayNum]}友情提示：本作使用的卦辞来自周易六十四卦，卜卦结果则添加了较大的随机因素，因此仅供参考，切勿当真，要相信人定胜天。最后，望各位大人皆能顺风顺水，心想事成。`,
        name : assitent.value[person.dayNum],
        time : currentTime,
    })
} )


// 辅助函数
function getTime(currentDate:Date){
    var year = currentDate.getFullYear();
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    var day = ("0" + currentDate.getDate()).slice(-2);
    var hours = ("0" + currentDate.getHours()).slice(-2);
    var minutes = ("0" + currentDate.getMinutes()).slice(-2);
    var dateTimeString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
    return dateTimeString
}

function init(){
    person.name = '';
    person.num1 = person.num2 = person.num3 = 0
}

function cyberBouns(){
    const rendom = Math.random()
    let afterNum = 0;
    if(rendom < 1/3){
        afterNum = person.num1 + person.num2
    }else if (rendom < 2/3){
        afterNum = person.num1 + person.num3
    }else{
        afterNum = person.num2 + person.num3
    }
    let beforeNum = person.name.charCodeAt( Math.floor(rendom*person.name.length))%6
    let allNum = ((beforeNum + afterNum)%20).toString() || "1"
    const data:DataStructure = bounsData
    let res = data[allNum]
    contentHistory.push({
        ownChat: false,
        content : `你的签位是 ${res.omen} ,描述是${res.describe}`,
        name : assitent.value[person.dayNum],
        time : ''
    })

    
}

//发送数据，开始卜卦
function bouns(){
    const date = new Date()
    person.dayNum = date.getDay()
    let currentTime = getTime(date)
    contentHistory.push({
        ownChat : true,
        content : `${person.name} ${person.num1}${person.num2}${person.num3}`,
        name : assitent.value[person.dayNum],
        time : currentTime,
    })
    cyberBouns()
    init()
} 




</script>


<style lang="less" scoped>
.contain{ 
    padding-bottom: 20px;
    border: 1px solid;
    background-color: white;
    .head{
        position: relative;
        display: flex;
        justify-content: left;
        align-items: center;
        padding: 2px 5px;
        top: 0;
        span{
            margin-left: 5px;
            font-size: 13px;
        }
        div{
            flex: 1;
            text-align: right;
        }
    }
    .main{
        display: flex;
        height: 60vh;
       
        .leftNav{
        display: flex;
        flex-direction: column;
        width: 20%;
        .brand{
            height: 0.7rem;
            line-height: 0.7rem;
        }
        .newWindow{
            flex :1;
            color: #ccc;
        }
        .setting{
            padding: 0 30px;
            display: flex;
            justify-content: space-around;
        }
    }
    .rightContext{
        flex: 1;
        display: flex;
        flex-direction: column;
      
        .contextHead{
            height: 0.7rem;
            padding-left: 10px;
            padding-right: 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .headMsg{
                flex: 1;
                margin-left: 10px;
                text-align: left;
            }
        }
        .chatBox {
            flex: 1;
            background-color: rgb(235, 235, 235);
            overflow: scroll;
            overflow-x: hidden;
            .user,.waiter{
                display: flex;
                justify-content: right;
                padding-right: 10px;
                align-items: center;
                // line-height: 40px;
                padding: 10px 5px;
                // background-color: #ffffff;
                .chatContent{
                    position: relative;
                    order: 1;
                    text-align: left;
                    margin-right: 10px;
                    border: 1px solid white;
                    padding: 5px;
                    background-color: rgb(255, 255, 255);
                    border-radius: 5px;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
                    font-size: 14px;
                }
                .chatContent:before{
                    display: none;
                }
                .chatContent:after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    right: -10px;
                    border-left: 8px;
                    border-top: 5px ;
                    border-bottom:5px; 
                    border-right: px;
                    border-style: solid;
                    border-color: transparent  transparent transparent rgb(255, 255, 255);
                    // border-radius: 0px;
                    transform: translateY(-50%);
            }
        

                img{
                    order: 2;
                    width: 30px;
                    border-radius: 50%;
                }
            }
            .waiter{
                justify-content: left;
                padding-left: 10px;
                align-items: center;
                // background-color: #ffffff;
                .chatContent{
                    order: 2;
                    margin-left: 10px;
                }
                .chatContent:after{
                    display: none;
                }
                .chatContent:before {
                    display: block;
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: -10px;
                    border-left: 3px;
                    border-right: 10px;
                    border-top: 8px;
                    border-bottom: 8px;
                    border-style: solid;
                    border-color: transparent rgb(255, 255, 255) transparent transparent;
                    transform: translateY(-50%);
            }
                img{
                    order: 1;
                }


            }
        }
        .prompt{
            padding-top: 5px;
            text-align: left;
            font-size: 10px;
            color: #ccc;
        }
        .inputMsg{
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: white;
            .send{
                cursor: pointer;
                color: rgb(9, 20, 25);
            }

           
        }
    }

    }

}
</style>